import Button from "@material-ui/core/Button";
import TOTPCard from "../components/totp/card";
import Fingerprint from "../pages/fingerprint";
import { useState } from "react";
import { isMobile } from "react-device-detect";

let refreshInterval = undefined;

function TOTPPage(props) {
  const { showScanner } = props;
  const [auth, setAuth] = useState(
    !isMobile || localStorage.getItem("fingerprint") === "false"
  );

  let credentials = JSON.parse(localStorage.getItem("collection"));

  var [cards, setCards] = useState(
    credentials &&
      credentials.map((d, index) => <TOTPCard key={index} details={d} />)
  );

  const handleRefresh = () => {
    credentials = JSON.parse(localStorage.getItem("collection"));
    if (credentials)
      setCards(
        credentials.map((d, index) => <TOTPCard key={index} details={d} />)
      );
  };

  const noCredentialsText = isMobile
    ? "No credentials found. Add some using the button below."
    : "This app is not meant for desktop devices as of now. Peace.";

  refreshInterval = clearInterval(refreshInterval);
  refreshInterval = setInterval(handleRefresh, 30000);

  const switchToScanner = () => {
    refreshInterval = clearInterval(refreshInterval);
    showScanner(true);
  };

  return auth ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {credentials == null ? (
        <div style={{ margin: 100 }}>{noCredentialsText}</div>
      ) : (
        <div>{cards}</div>
      )}

      <div align="center">
        {isMobile && (
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
            onClick={switchToScanner}
          >
            ADD
          </Button>
        )}
        <Button
          style={{ margin: "10px" }}
          onClick={handleRefresh}
          variant="contained"
          color="primary"
        >
          Refresh
        </Button>
        {/* <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="secondary"
          onClick={networkFetch}
        >
          Network Sync
        </Button> */}
      </div>
    </div>
  ) : (
    <Fingerprint authorized={auth} setAuthorized={setAuth} />
  );
}

export default TOTPPage;
