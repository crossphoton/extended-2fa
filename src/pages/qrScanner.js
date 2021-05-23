import TOTPURIParser from "../lib/parseUri";
import Button from "@material-ui/core/Button";
import CameraUtil from "../lib/startCamera";
import ScannerUtil from "../lib/qrScanner";

function qrScanner(props) {
  const { hideScanner } = props;
  var stream;
  const stopStreams = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  async function startScanner() {
    const videoElem = document.getElementById("scanner-video-element");
    stream = await CameraUtil(videoElem);
    videoElem.srcObject = stream;
    ScannerUtil(videoElem, complete, barcodeError);

    function barcodeError(err) {
      stopStreams();
      alert(err);
      hideScanner(true);
    }

    function verifyURL(url) {
      var valid = true;
      var result = {};
      const parsed = TOTPURIParser(url);
      result.secret = parsed.query.secret;
      result.issuer = parsed.query.issuer || parsed.label.issuer || "N/A";
      result.algorithm = parsed.query.algorithm || "sha1";
      result.digits = Number(parsed.query.digits) || 6;
      result.step = Number(parsed.query.period) || 30;
      result.label = parsed.label.account;
      result.algorithm = String(result.algorithm).toLowerCase();
      if (result.secret == null) valid = false;
      if (result.label == null) valid = false;
      if (!valid) return null;
      return result;
    }

    function complete(result) {
      const verify = verifyURL(result);
      console.log("It came here with    ", result);
      if (verify != null) {
        stopStreams();
      } else {
        ScannerUtil(videoElem, complete);
        return;
      }
      var collection = [];
      var current = JSON.parse(localStorage.getItem("collection"));
      if (current == null) {
        localStorage.setItem("collection", JSON.stringify(collection));
      } else {
        collection = current;
      }

      collection.push(verify);
      localStorage.setItem("collection", JSON.stringify(collection));
      localStorage.setItem("toPush", true);
      hideScanner(true);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <video
        autoPlay
        id="scanner-video-element"
        style={{ maxWidth: "100vw", maxHeight: "100vh", padding: "10px 10px" }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{ padding: "20 5" }}
          variant="outlined"
          onClick={() => {
            startScanner();
          }}
        >
          START
        </Button>
        <Button
          style={{ padding: "20 5" }}
          variant="outlined"
          onClick={() => {
            stopStreams();
            hideScanner(true);
          }}
        >
          CANCEL
        </Button>
      </div>
      <div style={{ display: "none" }}>
        {true ? setTimeout(startScanner, 0) : null}
      </div>
    </div>
  );
}

export default qrScanner;
