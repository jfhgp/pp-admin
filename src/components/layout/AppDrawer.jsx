import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import classNames from "classnames";
import {
  withStyles,
  Drawer,
  ListItem,
  Divider,
  ListItemText,
  List,
  ListItemIcon
} from "@material-ui/core";

import routeConstants from "../../constants/route-constants";

/**
 * Material UI Styles
 */
const drawerWidth = 240;
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background: "#152972",
    border: "none"
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#152972",
    border: "none",
    overflowX: "hidden",
    // width: 60,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  label: {
    color: "#fff",
    opacity: 0.7
  },
  item: {
    borderBottom: "1px solid rgba(0,0,0,0.4)"
  },
  menuButton: {},
  hide: {
    display: "none"
  }
});
/* ************************************************ */

const AppDrawer = props => {
  const { classes, isDrawerOpen, minHeight } = props;

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
        "app-drawer-close": !isDrawerOpen
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen
        })
      }}
      open={isDrawerOpen}
    >
      <div
        style={{
          minHeight,
          background: "#ea7627",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <img
          src={require("../../static/logo/White-PPost-Logo-600.png")}
          alt=""
          style={{ maxWidth: "8rem" }}
        />
        <img
          src={require("../../static/icons/White-Slide-Icon-Top.png")}
          alt=""
          onClick={props.toggleDrawer}
          style={{ maxWidth: "3rem", cursor: "pointer" }}
          className={classNames(
            classes.menuButton,
            !isDrawerOpen && classes.hide
          )}
        />
      </div>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          to={routeConstants.dashboard}
          activeClassName="active-list-item"
          className={classes.item}
        >
          <ListItemIcon>
            <i
              className="fas fa-tachometer-alt drawer-list-item"
              style={{ color: "#ea7627" }}
            />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.label}>Dashboard</span>
          </ListItemText>
        </ListItem>

        {props.routesData.map((route, index) => (
          <ListItem
            key={`${route.path}-${index + 1}`}
            button
            component={NavLink}
            to={route.path}
            activeClassName="active-list-item"
            className={classes.item}
          >
            <ListItemIcon>
              <i className={route.icon} style={{ color: "#ea7627" }} />
            </ListItemIcon>
            <ListItemText>
              <span className={classes.label}>{route.label}</span>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

AppDrawer.propTypes = {
  classes: PropTypes.shape(),
  isDrawerOpen: PropTypes.bool,
  minHeight: PropTypes.number,
  routesData: PropTypes.arrayOf(PropTypes.shape()),
  toggleDrawer: PropTypes.func
};

export default withStyles(styles)(AppDrawer);
