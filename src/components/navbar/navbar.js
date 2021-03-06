// import {useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MenuItem from "@material-ui/core/MenuItem";
// import Avatar from "@material-ui/core/Avatar";
// import SimpleDialog from "./loginDialog";
// import supaClient from "../../lib/supaClient";

export default function MenuAppBar() {
  // const [auth, setAuth] = React.useState(false);
  // const [openLogin, setOpenLogin] = React.useState(false);

  // var user = supaClient.auth.user();

  // const checkLogin = () => {
  //   user = supaClient.auth.user();
  //   if (user) {
  //     setAuth(true);
  //   }
  // };

  // useEffect(checkLogin);

  // const handleLogout = () => {
  //   supaClient.auth.signOut();
  //   setAuth(false);
  // };

  // const handleLogin = () => {
  //   setOpenLogin(true);
  // };

  // const handleLoginDialogClose = () => {
  //   setOpenLogin(false);
  // };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Extended 2FA</Typography>
        {/* {auth && (
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
          onClose={handleLoginDialogClose}
        /> */}
      </Toolbar>
    </AppBar>
  );
}
