/* eslint import/no-webpack-loader-syntax: off */
import QrScannerWorkerPath from "file-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js";
import QrScanner from "qr-scanner";
import TOTPUriParser from "otpauth-uri-parser";
import Button from "@material-ui/core/Button";

function qrScanner(props) {
  QrScanner.WORKER_PATH = QrScannerWorkerPath;
  const { hideScanner } = props;
  var qrScanner;

  function startScanner() {
    const videoElem = document.getElementById("scanner-video-element");
    qrScanner = new QrScanner(videoElem, complete);

    function verifyURL(url) {
      var valid = true;
      var result = {};
      const parsed = TOTPUriParser(url);
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
      localStorage.setItem("toPush", true);

      var token = localStorage.getItem("supabase.auth.token");
      if (token) {
        token = JSON.parse(token).currentSession.access_token;

        fetch("/api/sync", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(collection),
        }).then(() => localStorage.setItem("toPush", false));
      }
    }

    qrScanner.start();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <video
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
          onClick={startScanner}
        >
          START
        </Button>
        <Button
          style={{ padding: "20 5" }}
          variant="outlined"
          onClick={() => {
            if (qrScanner) qrScanner.stop();
            hideScanner(true);
          }}
        >
          STOP
        </Button>
      </div>
    </div>
  );
}

export default qrScanner;
