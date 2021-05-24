/* eslint import/no-webpack-loader-syntax: off */
import QrScannerWorkerPath from "file-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js";
import QrScanner from "qr-scanner";
import TOTPUriParser from "../lib/parseUri";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";

function QRScanner(props) {
  QrScanner.WORKER_PATH = QrScannerWorkerPath;
  const { hideScanner } = props;
  var qrScanner;

  function startScanner() {
    const videoElem = document.getElementById("scanner-video-element");
    qrScanner = new QrScanner(videoElem, complete);

    async function complete(result) {
      const verify = TOTPUriParser(result);
      if (verify != null) {
        qrScanner.stop();
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
      hideScanner(true);
    }

    qrScanner.start();
  }

  useEffect(startScanner);

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

export default QRScanner;
