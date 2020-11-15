import React, { Component } from "react";
import PropTypes from "prop-types";

import UpdateUserComponent from "./UpdateUserComponent";
import { deepClone } from "../../../utils/functions";
import {
  permissionFeatures,
  extractPermissions
} from "../../../utils/permissions.utils";
import apiServices from "../../../service/RequestHandler";
import { validateUpdateUser } from "../user-roles-validator";

export default class UpdateUserContainer extends Component {
  constructor(props) {
    super(props);

    const tempPermissions = {};
    permissionFeatures.forEach(item => {
      const actions = Object.keys(props.dialogData[item]).filter(action => {
        if (props.dialogData[item][action]) {
          return true;
        }
        return false;
      });

      if (actions.length) {
        tempPermissions[item] = actions;
      }
    });

    this.state = {
      activity: false,
      errors: {},

      isSuperAdmin: props.dialogData.roles[0] === "admin",
      tempFeature: "",
      tempPermissions: [],
      permissions: { ...tempPermissions },
      name: props.dialogData.name,
      email: props.dialogData.email,
      _id: props.dialogData._id
    };
    this.permissionsArray = [];
  }

  handleUpdate = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });

      const data = {
        name: this.state.name,
        email: this.state.email,
        _id: this.state._id
      };

      if (this.state.isSuperAdmin) {
        data.roles = ["admin"];
      } else {
        const permissionKeys = Object.keys(this.state.permissions);

        permissionKeys.forEach(key => {
          const tempPermissions = {
            create: false,
            read: false,
            update: false,
            delete: false
          };

          this.state.permissions[key].forEach(item => {
            tempPermissions[item] = true;
          });

          data[key] = tempPermissions;
        });
      }

      permissionFeatures.forEach(permission => {
        if (!data[permission]) {
          data[permission] = {
            create: false,
            read: false,
            update: false,
            delete: false
          };
        }
      });

      try {
        const response = await apiServices.updateAdminUser(data);
        const adminUsers = deepClone(this.props.adminUsers);
        response.data.permissions = extractPermissions(response.data);
        adminUsers.forEach((user, index) => {
          if (user._id === response.data._id) {
            adminUsers[index] = response.data;
          }
        });

        this.props.handleAfterAction(adminUsers);
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "tempPermissions") {
      if (this.state.tempPermissions.indexOf(value) < 1) {
        this.permissionsArray.push(value);
      }
      this.setState(prevState => ({
        ...prevState,
        tempPermissions: this.permissionsArray,
        errors: { ...prevState.errors, [name]: false }
      }));
    } else {
      this.setState(prevState => ({
        [name]: value,
        errors: { ...prevState.errors, [name]: false }
      }));
    }
  };

  handleCheckBoxChange = e => {
    const { name, checked } = e.target;
    if (name === "isSuperAdmin" && checked === true) {
      this.setState({
        [name]: checked,
        permissions: {},
        tempFeature: "",
        tempPermissions: []
      });
    } else {
      this.setState({ [name]: checked });
    }
  };

  handleAddPermissions = () => {
    if (this.state.tempFeature && this.state.tempPermissions.length) {
      const permissions = { ...this.state.permissions };
      permissions[this.state.tempFeature] = this.state.tempPermissions;
      this.setState(prevState => ({
        permissions,
        tempFeature: "",
        tempPermissions: [],
        errors: {
          ...prevState.errors,
          permissions: false,
          tempFeature: false,
          tempPermissions: false
        }
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          tempFeature: true,
          tempPermissions: true
        }
      }));
    }
  };

  removeAllPermissions = () => {
    this.setState({ permissions: {} });
  };

  hideDialog = () => {
    this.props.handleDialogVisibility();
  };

  isValid = () => {
    const { errors, isValid } = validateUpdateUser(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  render() {
    return (
      <UpdateUserComponent
        {...this.state}
        dialogData={this.props.dialogData}
        handleInputChange={this.handleInputChange}
        handleCheckBoxChange={this.handleCheckBoxChange}
        hideDialog={this.hideDialog}
        handleAddPermissions={this.handleAddPermissions}
        handleUpdate={this.handleUpdate}
        removeAllPermissions={this.removeAllPermissions}
      />
    );
  }
}

UpdateUserContainer.propTypes = {
  dialogData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    manager: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string)
  }),
  handleDialogVisibility: PropTypes.func,
  handleAfterAction: PropTypes.func,
  adminUsers: PropTypes.arrayOf(PropTypes.object)
};
