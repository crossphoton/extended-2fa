// import TOTPGenerator from "totp-generator";  TODO

function card(props) {
  const { details } = props;
  // var { secret, issuer, label, algorithm, digits, period } = details;
  // TODO: use these details after filling with default values;
  // issuer = issuer || "";
  console.log(details);
  return (
    <div
      className="totp-card"
      style={{
        width: "80vw",
        margin: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "900",
        fontSize: "30px",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      <div className="left">
        <div className="provider-name">Github</div>
        <div
          className="account-name"
          style={{ fontWeight: "300", fontSize: "10px" }}
        >
          adiag1200@gmail.com
        </div>
      </div>
      <div className="code" style={{ display: "flex", alignItems: "center" }}>
        <div
          className="totp-timer"
          style={{
            fontWeight: 600,
            borderRadius: "50%",
            fontSize: 20,
            marginRight: 20,
            color: "#276b94",
            padding: "5px",
            border: "1px solid #276b94",
          }}
        >
          20
        </div>
        <div>132456</div>
      </div>
    </div>
  );
}

export default card;
