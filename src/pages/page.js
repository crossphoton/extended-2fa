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

  return (
    <div style={styles.page}>
      <div className="main-content">
        <TOTPPage showScanner={showScanner} />
      </div>
    </div>
  );
}
export default pageRenderer;
