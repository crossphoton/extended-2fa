import { Button } from "@material-ui/core";
import base64 from "base64-arraybuffer";

function FingerprintPage(props) {
  const { setAuthorized } = props;
  function fingerStart() {
    navigator.credentials.preventSilentAccess();
    navigator.credentials
      .create({
        publicKey: {
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          challenge: base64.decode(
            require("crypto").randomBytes(16).toString("hex")
          ),
          rp: { id: document.domain, name: "crossphoton inc." },
          user: {
            id: base64.decode(require("crypto").randomBytes(4).toString("hex")),
            name: "You",
            displayName: "You",
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -257 },
          ],
        },
      })
      .then(() => setAuthorized(true));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "60vh",
        margin: "100px 30px 30px 30px",
        alignItems: "center",
      }}
    >
      <p>Authorization required</p>
      <Button onClick={fingerStart} variant="contained" color="secondary">
        SCAN FINGERPRINT
      </Button>
    </div>
  );
}

export default FingerprintPage;
