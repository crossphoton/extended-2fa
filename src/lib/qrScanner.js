export default function qrScanner(videoElement, onSuccess, onError) {
  if (window["BarcodeDetector"]) {
    var Scanner = new window["BarcodeDetector"]();
    var interval = setInterval(scan, 300);

    function scan() {
      Scanner.detect(videoElement).then((res) => {
        if (res.length) {
          clearInterval(interval);
          let value = res[0].rawValue;
          onSuccess(value, res);
        }
      });
    }
  } else {
    onError(new Error("Browser doesn't support barcode reading"));
  }
}
