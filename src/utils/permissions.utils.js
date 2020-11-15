/**
 * Utils for permissions
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import routeConstants from '../constants/route-constants';
import featureConstants from '../constants/feature-constants';
import { authClass } from './auth.util';

// Rates
// import Rates from '../features/rates/rates-routes';
// Orders
import Orders from '../features/orders/orders-routes';
// Promotions
import Promotions from '../features/promotions/promotions-routes';
// Transporters
import Transporters from '../features/transporters/transporters-routes';
// Categories
import Categories from '../features/categories/categories-routes';
// Finances
import Finances from '../features/finances/finances-routes';
// Users
import Users from '../features/users/users-routes';
// Vehicles
import Vehicles from '../features/vehicles/VehiclesListContainer';
// User Roles
import UserRoles from '../features/user-roles/UserRolesListContainer';
// Customer Support
import CustomerSupport from '../features/customer-support/customersupport-routes';
// Insurance
// import { Insurance } from '../Insurance';

export const permissionFeatures = [
  'users',
  'transporters',
  'orders',
  // 'rates',
  'promotions',
  'categories',
  'finance',
  'vehicles',
  'customerSupport'

];

const getDataForRoute = route => {
  switch (route) {
    case 'users': {
      return {
        comp: Users,
        path: routeConstants[route],
        label: 'Users',
        icon: 'fas fa-users drawer-list-item'
      };
    }
    case 'transporters': {
      return {
        comp: Transporters,
        path: routeConstants[route],
        label: 'Transporters',
        icon: 'fas fa-car drawer-list-item'
      };
    }
    case 'orders': {
      return {
        comp: Orders,
        path: routeConstants[route],
        label: 'Orders',
        icon: 'fas fa-clipboard-list drawer-list-item'
      };
    }
    // case 'rates': {
    //   return {
    //     comp: Rates,
    //     path: routeConstants[route],
    //     label: 'Rates',
    //     icon: 'fas fa-dollar-sign drawer-list-item'
    //   };
    // }
    case 'promotions': {
      return {
        comp: Promotions,
        path: routeConstants[route],
        label: 'Promotions',
        icon: 'fas fa-tag drawer-list-item'
      };
    }
    case 'categories': {
      return {
        comp: Categories,
        path: routeConstants[route],
        label: 'Categories',
        icon: 'fas fa-th-list drawer-list-item'
      };
    }
    case 'finance': {
      return {
        comp: Finances,
        path: routeConstants[route],
        label: 'Finances',
        icon: 'fas fa-university drawer-list-item'
      };
    }
    case 'vehicles': {
      return {
        comp: Vehicles,
        path: routeConstants[route],
        label: 'Vehicles',
        icon: 'fas fa-car-alt drawer-list-item'
      };
    }
    case 'userRoles': {
      return {
        comp: UserRoles,
        path: routeConstants.roles,
        label: 'User Roles',
        icon: 'fas fa-user-cog drawer-list-item'
      };
    }

    case 'customerSupport': {
      return {
        comp: CustomerSupport,
        path: routeConstants[route],
        label: 'Customer Support',
        icon: 'fas fa-user-cog drawer-list-item'
      };
    }

    default: {
      return false;
    }
  }
};

export const extractPermissions = user => {
  const tempPermissions = {};

  if (user.roles.length && user.roles[0] === 'admin') {
    tempPermissions.all = true;
  } else {
    permissionFeatures.forEach(feature => {
      const tempArray = Object.keys(user[feature]).filter(perm => {
        if (user[feature][perm]) {
          return perm;
        }
        return false;
      });

      if (tempArray.length) {
        tempPermissions[feature] = tempArray;
      }
    });
  }

  return tempPermissions;
};

export const getRoutesData = userPermissions => {
  const availableRoutes = [];

  if (userPermissions) {
    if (userPermissions.all) {
      permissionFeatures.forEach(key => {
        const data = getDataForRoute(key);
        if (data) {
          availableRoutes.push(data);
        }
      });
      availableRoutes.push({
        comp: UserRoles,
        path: routeConstants.roles,
        label: 'User Roles',
        icon: 'fas fa-user-cog drawer-list-item'
      });
    } else {
      Object.keys(userPermissions).forEach(key => {
        availableRoutes.push(getDataForRoute(key));
      });
    }
  }

  return availableRoutes;
};

export const canPerformAction = ({ feature, action }) => {
  // if action is login or signup
  if (
    feature === featureConstants.login ||
    feature === featureConstants.signup ||
    feature === featureConstants.dashboard
  ) {
    return true;
  }

  const permissions = authClass.getUser.permissions;
  if (permissions.all === true) {
    return true;
  }

  if (
    authClass.getUser.permissions[feature] &&
    authClass.getUser.permissions[feature].includes(action)
  ) {
    return true;
  } else {
    throw Object.assign(new Error('Not allowed to perform this action.'), {
      response: {
        data: { status: 401, message: 'Not allowed to perform this action.' }
      }
    });
  }
};

export const CanRender = props => {
  const {
    featureAndAction: { feature, action }
  } = props;

  try {
    if (canPerformAction({ feature, action })) {
      return props.yes;
    }
  } catch (error) {
    return props.no;
  }
};

CanRender.propTypes = {
  yes: PropTypes.shape(),
  no: PropTypes.shape(),
  featureAndAction: PropTypes.shape()
};

export class RestrictedLink extends React.Component {
  constructor(props) {
    super(props);
    this.disabled = false;
  }

  componentDidMount() {
    try {
      canPerformAction(this.props.featureAndAction);
    } catch (error) {
      this.disabled = true;
    }
  }

  handleClick = e => {
    if (this.disabled) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <Link
        to={this.props.to}
        className={this.props.className}
        onClick={this.handleClick}
        target={this.props.target}
        style={this.props.style}
      >
        {this.props.children}
      </Link>
    );
  }
}

RestrictedLink.propTypes = {
  featureAndAction: PropTypes.shape(),
  to: PropTypes.string,
  className: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.shape(),
  children: PropTypes.shape()
};
