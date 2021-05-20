import TOTPPage from "./totp-page";

const styles = {
  page: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

function pageRenderer(props) {
  const { showScanner } = props;

  // TODO: currently fingerprint not implemented (expected: server won't be needed)
  function checkFingerprintAuth() {
    // const value = sessionStorage.getItem("authenticated");
    return true;
  }
  return (
    <div style={styles.page}>
      {checkFingerprintAuth() ? (
        <div className="main-content">
          <TOTPPage showScanner={showScanner} />
        </div>
      ) : (
        <div>Login in first</div>
      )}
    </div>
  );
}
export default pageRenderer;
