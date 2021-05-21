import Button from "@material-ui/core/Button";
import TOTPCard from "../components/totp/card";
import { useState } from "react";

function TOTPPage(props) {
  const { showScanner } = props;
  function getCredentials() {
    var collection = JSON.parse(localStorage.getItem("collection"));
    return collection;
  }
  const [value, setValue] = useState(0);
  const handleRefresh = () => setValue(value + 1);

  var credentials = getCredentials();

  const noCredentialsText =
    "No credentials found. " +
    (navigator.userAgentData.mobile
      ? "Add some using the button below."
      : "Add them in your phone.");

  var cards;
  if (credentials != null)
    cards = credentials.map((d, index) => <TOTPCard key={index} details={d} />);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {credentials == null ? (
        <div style={{ margin: 100 }}>{noCredentialsText}</div>
      ) : (
        <div>{cards}</div>
      )}
      <div>
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
      </div>
    </div>
  );
}

export default TOTPPage;
