import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { authClass } from '../../utils/auth.util';
import * as authUtil from '../../utils/auth.util';
/** Route Constants **/
import routeConstants from '../../constants/route-constants';
import { getRoutesData } from '../../utils/permissions.utils';

/** Image Light Box **/
import ImageLightBoxComponent from '../../components/ImageLightBoxComponent';

/** components **/
// menu
import AppTopBar from '../AppTopbar';
// Drawer
import AppDrawer from './AppDrawer';
// Dashboard
import DashboardContainer from '../../features/dashboard/DashboardContainer';

/**
 * Material UI Styles
 */
const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1
  }
});
/* ************************************************ */

class AppLayout extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: true,
      minHeight: 0
    };

    this.appBar = {};
    this.routesData = getRoutesData(authClass.getUser.permissions);
  }

  componentDidMount() {
    this.setState({ minHeight: this.appBar.offsetHeight });
    this.getUserCurrentLocation();
  }

  handleToggleDrawer = () => {
    this.setState(prevState => ({ isDrawerOpen: !prevState.isDrawerOpen }));
  };

  componentDidUpdate() {
    if (!this.isDesktop() && this.state.isDrawerOpen) {
      this.setState({ isDrawerOpen: false });
    }
    this.getUserCurrentLocation();
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  getUserCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(async position => {
      await authUtil.setCurrentLocation([
        position.coords.longitude,
        position.coords.latitude
      ])
    });
  };

  handleAppBarRef = ref => (this.appBar = ref);

  render() {
    const { classes } = this.props;
    const { isDrawerOpen } = this.state;

    let wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive':
        this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active':
        this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive
    });

    return (
      <div className={wrapperClass}>
        <AppTopBar
          toggleDrawer={this.handleToggleDrawer}
          isDrawerOpen={isDrawerOpen}
          appBarRef={this.handleAppBarRef}
        />
        <AppDrawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={this.handleToggleDrawer}
          minHeight={this.state.minHeight}
          routesData={this.routesData}
        />
        <main
          className={classes.content}
          style={{
            width: isDrawerOpen ? "calc(100vw - 240px)" : "calc(100vw - 60px)"
          }}
        >
          <div className="layout-main">
            <Switch>
              {/** Dashboard routes */}
              <PrivateRoute
                path={routeConstants.dashboard}
                exact
                component={DashboardContainer}
              />

              {this.routesData.map((route, index) => (
                <PrivateRoute
                  key={`${route.path}-${index + 1}`}
                  path={route.path}
                  component={route.comp}
                />
              ))}

              {/** Not found */}
              <Redirect to={routeConstants.notFound} />
            </Switch>
          </div>
        </main>
        <ImageLightBoxComponent />
      </div>
    );
  }
}

AppLayout.propTypes = {
  location: PropTypes.shape(),
  classes: PropTypes.shape()
};

export default withStyles(styles)(AppLayout);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authClass.getUser.token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.shape(),
  component: PropTypes.func
};
