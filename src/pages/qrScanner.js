import QrScanner from "qr-scanner";
import QrScannerWorkerPath from "!!file-loader!./node_modules/qr-scanner/qr-scanner-worker.min.js";
import TOTPUriParser from "otpauth-uri-parser";
import Button from "@material-ui/core/Button";

function qrScanner(props) {
  QrScanner.WORKER_PATH = QrScannerWorkerPath;
  const { hideScanner } = props;

  function startScanner() {
    const videoElem = document.getElementById("scanner-video-element");
    const qrScanner = new QrScanner(videoElem, complete);

    function verifyURL(url) {
      var valid = true;
      var result = {};
      const parsed = TOTPUriParser(url);
      result.secret = parsed.query.secret;
      result.issuer = parsed.query.issuer || parsed.label.issuer;
      result.algorithm = parsed.query.algorithm;
      result.digits = parsed.query.digits;
      result.period = parsed.query.period;
      result.label = parsed.label.account;
      if (result.secret == null) valid = false;
      if (result.label == null) valid = false;
      if (!valid) return null;
      return result;
    }

    function complete(result) {
      const verify = verifyURL(result);
      if (verify != null) {
        qrScanner.stop();
        hideScanner(true);
      } else return;
      var collection = [];
      var current = JSON.parse(localStorage.getItem("collection"));
      if (current == null) {
        localStorage.setItem("collection", JSON.stringify(collection));
      } else {
        collection = current;
      }

      collection.push(verify);
      localStorage.setItem("collection", JSON.stringify(collection));
    }

    qrScanner.start();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <video
        id="scanner-video-element"
        style={{ maxWidth: "100vw", maxHeight: "100vh" }}
      />
      <Button style={{ padding: 20 }} variant="outlined" onClick={startScanner}>
        START
      </Button>
    </div>
  );
}

export default qrScanner;
