import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
// import logo from "./images/logo_green_transparent.png";
import logo from "./images/logo_green_transparent.png";
import { connect, useDispatch } from "react-redux";
import { authAction } from "../../store/user";
import { profitPercentAction } from "../../store/profitPercent";

function Header({ sections, givenName, ligUserId, isAdminAccount, isDealerAccount }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await dispatch(authAction.removeUser());
    await dispatch(profitPercentAction.removeProfitPercent());
    signOut();
    navigate("/signin");
  };
  

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <img src={logo} style={{ width: "150px" }} />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >

        </Typography>
        {ligUserId ? (
          <>
            <p>Hi {givenName.toUpperCase()}</p>
            <button
              style={{ fontSize: "2px", marginLeft: "15px" }}
              onClick={() => {
                handleSignOut();
                navigate("/signin");
              }}
            >
              <LogoutIcon />
            </button>
          </>
        ) : (
          <RouterLink to={"/signin"}>Sign In</RouterLink>
        )}
      </Toolbar>
      {ligUserId && (
        <>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: "space-between", overflowX: "auto" }}
          >
            {sections.map((section) => (
              <RouterLink
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                to={section.url}
                sx={{ p: 1, flexShrink: 0 }}
              >
                {section.title}
              </RouterLink>
            ))}
            {isAdminAccount && <button onClick={() => {
              // handleSignOut();
              navigate("/dashboard");
            }}>Admin</button>}
            { !isAdminAccount && isDealerAccount && (
              <button onClick={() => {
                // handleSignOut();
                navigate("/dashboard");
              }}>Dealer</button>
            )}
          </Toolbar>
        </>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  ligUserId: state.auth.user.sub,
  isAdminAccount: state.auth.isAdmin,
  isDealerAccount: state.auth.isDealer
})

export default connect(mapStateToProps)(Header);
