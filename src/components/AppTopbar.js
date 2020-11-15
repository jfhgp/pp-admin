import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classNames from "classnames";

import {
  Button,
  Popper,
  ClickAwayListener,
  Paper,
  Grow,
  MenuList,
  MenuItem,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  RootRef
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import routeConstants from "../constants/route-constants";
import { authClass } from "../utils/auth.util";

/**
 * Material UI Styles
 */
const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  }
});
/* ******************************************* */

class AppTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.anchorRef = {};
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleLogOut = async () => {
    await authClass.logout();
    this.props.history.push(routeConstants.login);
  };

  handleAnchorRef = ref => (this.anchorRef = ref);

  render() {
    const user = authClass.getUser;
    const { classes, isDrawerOpen } = this.props;

    return (
      <RootRef rootRef={this.props.appBarRef}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: isDrawerOpen
          })}
        >
          <Toolbar disableGutters={!isDrawerOpen} className="app-top-bar">
            {/* <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.toggleDrawer}
            >
              <MenuIcon />
            </IconButton> */}
            <img
              src={require("../static/icons/Slide-Icon-Top.png")}
              alt=""
              onClick={this.props.toggleDrawer}
              style={{ maxWidth: "3rem", cursor: "pointer" }}
              className={classNames(
                classes.menuButton,
                isDrawerOpen && classes.hide
              )}
            />
            <div></div>
            <div>
              <Button ref={this.handleAnchorRef} onClick={this.handleOpen}>
                <div>
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                </div>
                <img src="assets/layout/images/profile.png" alt="" />
              </Button>
              <Popper
                open={this.state.isOpen}
                anchorEl={this.anchorRef.current}
                transition
                disablePortal
                id="app-bar-popper"
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem>
                            <i
                              className="far fa-user-circle"
                              style={{ marginRight: "1rem" }}
                            />
                            <Typography variant="inherit">
                              My Profile
                            </Typography>
                          </MenuItem>
                          <MenuItem>
                            <i
                              className="fas fa-cog"
                              style={{ marginRight: "1rem" }}
                            />
                            <Typography variant="inherit">
                              Account Settings
                            </Typography>
                          </MenuItem>
                          <MenuItem button onClick={this.handleLogOut}>
                            <i
                              className="fas fa-power-off"
                              style={{ marginRight: "1rem" }}
                            />
                            <Typography variant="inherit">Log Out</Typography>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Toolbar>
        </AppBar>
      </RootRef>
    );
  }
}

AppTopBar.defaultProps = {
  toggleDrawer: null,
  appBarRef: null,
  classes: {},
  isDrawerOpen: false
};

AppTopBar.propTypes = {
  toggleDrawer: PropTypes.func,
  appBarRef: PropTypes.func,
  classes: PropTypes.shape(),
  isDrawerOpen: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func })
};

export default withRouter(withStyles(styles)(AppTopBar));
