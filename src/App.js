import Navbar from "./components/navbar/navbar";
import Page from "./pages/page";
import ScannerPage from "./pages/qrScanner";
import { useState } from "react";

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const hideScanner = (bool) => setShowPicker(!bool);

  return showPicker ? (
    <ScannerPage hideScanner={hideScanner} />
  ) : (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Page showScanner={setShowPicker} />
    </div>
  );
}

export default App;
