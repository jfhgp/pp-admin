import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import UserRolesListComponent from './UserRolesListComponent';
import apiServices from '../../service/RequestHandler';
import { extractPermissions } from '../../utils/permissions.utils';

export default class UserRolesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      dialogComp: undefined,
      dialogData: undefined,
      activity: true,
      adminUsers: undefined
    };
  }

  componentDidMount() {
    this.getAllAdminUsers();
  }

  getAllAdminUsers = async () => {
    try {
      const response = await apiServices.getAllAdminUsers();
      response.data.forEach(item => {
        item.permissions = extractPermissions(item);
      });

      this.setState({ activity: false, adminUsers: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleDialogVisibility = (value, dialogComp = undefined, dialogData = {}) => {
    this.setState({
      isDialogVisible: typeof value === 'boolean' ? value : false,
      dialogComp: typeof dialogComp === 'function' ? dialogComp : undefined,
      dialogData
    });
  };

  handleAfterAction = adminUsers => {
    this.setState({
      adminUsers,
      isDialogVisible: false,
      dialogComp: undefined,
      dialogData: {}
    });
  };

  render() {
    return (
      <UserRolesListComponent
        {...this.state}
        handleDialogVisibility={this.handleDialogVisibility}
        handleAfterAction={this.handleAfterAction}
      />
    );
  }
}

// UserRolesListContainer.propTypes = {};
