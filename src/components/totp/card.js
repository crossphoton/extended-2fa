import { authenticator } from "otplib";

function card(props) {
  const { details } = props;
  var { secret, issuer, label, algorithm, digits, step } = details;
  authenticator.options = { step, digits, algorithm };

  var totp = authenticator.generate(secret);

  return (
    <div
      className="totp-card"
      style={{
        width: "90vw",
        margin: "30px 0px",
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
        <div className="provider-name">{issuer}</div>
        <div
          className="account-name"
          style={{ fontWeight: "300", fontSize: "10px" }}
        >
          {label}
        </div>
      </div>
      <div className="code" style={{ display: "flex", alignItems: "center" }}>
        {/* <div
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
        </div> */}
        <div>{totp}</div>
      </div>
    </div>
  );
}

export default card;
