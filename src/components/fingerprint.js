import { Button } from "@material-ui/core";
import decode from "./base64tobuffer";
import { randomBytes } from "crypto";

const noFingerPrintError =
  "NotAllowedError: The operation either timed out or was not allowed. See: https://www.w3.org/TR/webauthn-2/#sctn-privacy-considerations-client.";
function FingerprintPage(props) {
  const { setAuthorized } = props;

  if (localStorage.getItem("fingerprint") === "false") {
    setTimeout(() => setAuthorized(true), 100);
    return null;
  }

  function fingerStart() {
    navigator.credentials.preventSilentAccess();
    navigator.credentials
      .create({
        publicKey: {
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          challenge: decode(randomBytes(16).toString("hex")),
          rp: { id: document.domain, name: "crossphoton inc." },
          user: {
            id: decode(randomBytes(4).toString("hex")),
            name: "You",
            displayName: "You",
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -257 },
          ],
        },
      })
      .then(() => setAuthorized(true))
      .catch((err) => {
        if (noFingerPrintError.toString() === err.toString()) {
          setAuthorized(true);
          localStorage.setItem("fingerprint", "false");
        }
      });
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
