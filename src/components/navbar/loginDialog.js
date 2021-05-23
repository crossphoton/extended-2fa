import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import GoogleLoginButton from "react-google-button";
import GithubLoginButton from "react-github-login-button";
import supaClient from "../../lib/supaClient";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleLoginClick = (provider) => {
    supaClient.auth.signIn(
      { provider },
      { redirectTo: window.location.origin }
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Choose Login method</DialogTitle>
      <List>
        <ListItem onClick={() => handleLoginClick("google")}>
          <GoogleLoginButton />
        </ListItem>
        <ListItem onClick={() => handleLoginClick("github")}>
          <GithubLoginButton />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default SimpleDialog;
