import Button from "@material-ui/core/Button";
import TOTPCard from "../components/totp/card";
import Fingerprint from "../components/fingerprint";
import { useState } from "react";

function TOTPPage(props) {
  const { showScanner } = props;
  const [value, setValue] = useState(true);

  // function checkAuthorizationRequired() {}
  const [auth, setAuth] = useState(!navigator.userAgentData.mobile);

  function networkFetch() {
    var token = localStorage.getItem("supabase.auth.token");
    if (token) {
      token = JSON.parse(token).currentSession.access_token;
      var consent = window.confirm("Fetch from database?");
      if (consent) {
        fetch("/api/sync", { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => res.json())
          .then((data) => {
            if (data)
              localStorage.setItem(
                "collection",
                JSON.stringify(data.secrets.data)
              );
          });
      }
    } else {
      alert("User not logged in!!");
    }
  }

  function getCredentials() {
    var collection = JSON.parse(localStorage.getItem("collection"));
    return collection;
  }
  const handleRefresh = () => {
    setValue(!value);
  };

  var credentials = getCredentials();

  const noCredentialsText =
    "No credentials found. " +
    (navigator.userAgentData.mobile
      ? "Add some using the button below."
      : "Add them in your phone.");

  var cards;
  if (credentials != null)
    cards = credentials.map((d, index) => <TOTPCard key={index} details={d} />);

  setInterval(handleRefresh, 1000);

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
        {navigator.userAgentData.mobile && (
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => showScanner(true)}
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
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="secondary"
          onClick={networkFetch}
        >
          Network Sync
        </Button>
      </div>
    </div>
  ) : (
    <Fingerprint authorized={auth} setAuthorized={setAuth} />
  );
}

export default TOTPPage;
