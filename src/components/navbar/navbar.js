import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import GoogleLoginButton from "react-google-button";
import GithubLoginButton from "react-github-login-button";
import Avatar from "@material-ui/core/Avatar";

import { createClient } from "@supabase/supabase-js";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function SimpleDialog(props) {
  const { onClose, open, supaClient } = props;

  const handleClose = () => {
    onClose();
  };

  const handleLoginClick = (provider) => {
    supaClient.auth.signIn({ provider });
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

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const supaClient = createClient(
    "https://eowxmpvqnxlnzyxdmatv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTMzOTA1NSwiZXhwIjoxOTM2OTE1MDU1fQ.LAv9mB6v07KYl24NPeouLFSF06PAjaHQC8CvH7E4-gA"
  );

  var user = supaClient.auth.user();

  const checkLogin = () => {
    user = supaClient.auth.user();
    if (user) {
      setAuth(true);
    }
  };

  const handleLogout = () => {
    supaClient.auth.signOut();
    setAuth(false);
  };

  const handleLogin = () => {
    setOpenLogin(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLogin(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Extended 2FA
        </Typography>
        {auth && (
          <div style={{ display: "flex" }}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar
                  alt="Profile Picture"
                  src={user.user_metadata.avatar_url}
                />
              </IconButton>
            </div>
          </div>
        )}

        {!auth && <MenuItem onClick={handleLogin}>Login</MenuItem>}
        <SimpleDialog
          open={openLogin}
          supaClient={supaClient}
          onClose={handleLoginDialogClose}
        />
      </Toolbar>
      <div style={{ display: "none" }}>
        {!auth ? setTimeout(checkLogin, 200) : null}
      </div>
    </AppBar>
  );
}
