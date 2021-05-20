import QrScanner from "qr-scanner";
import Button from "@material-ui/core/Button";

function qrScanner(props) {
  const { hideScanner } = props;

  function startScanner() {
    const videoElem = document.getElementById("scanner-video-element");
    const qrScanner = new QrScanner(videoElem, complete);

    function verifyURL(url) {
      var valid = true;
      const urlParser = new URL(url);
      if (urlParser.protocol !== "otpauth:") valid = false;
      const secret = urlParser.searchParams.get("secret");
      if (secret == null) valid = false;
      if (!valid) return null;
      return { secret };
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
