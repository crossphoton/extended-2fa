import Navbar from "./components/navbar/navbar";
import { createClient } from "@supabase/supabase-js";
import Page from "./pages/page";
import ScannerPage from "./pages/qrScanner";
import { useState } from "react";

const supaClient = createClient(
  "https://eowxmpvqnxlnzyxdmatv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTMzOTA1NSwiZXhwIjoxOTM2OTE1MDU1fQ.LAv9mB6v07KYl24NPeouLFSF06PAjaHQC8CvH7E4-gA"
);

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const hideScanner = (bool) => setShowPicker(!bool);

  return showPicker ? (
    <ScannerPage hideScanner={hideScanner} />
  ) : (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar supaClient={supaClient} />
      <Page showScanner={setShowPicker} supaClient={supaClient} />
    </div>
  );
}

export default App;
