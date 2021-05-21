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

  var cards;
  if (credentials != null)
    cards = credentials.map((d, index) => <TOTPCard key={index} details={d} />);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {credentials == null ? (
        <div> No credentials found</div>
      ) : (
        <div>{cards}</div>
      )}
      <div>
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          onClick={() => showScanner(true)}
        >
          ADD
        </Button>
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
