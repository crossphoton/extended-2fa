import Button from "@material-ui/core/Button";
import TOTPCard from "../components/totp/card";

function TOTPPage(props) {
  const { showScanner } = props;
  function getCredentials() {
    var collection = JSON.parse(localStorage.getItem("collection"));
    return collection;
  }

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

      <Button
        variant="contained"
        color="primary"
        onClick={() => showScanner(true)}
      >
        Add more
      </Button>
    </div>
  );
}

export default TOTPPage;
