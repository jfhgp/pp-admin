import React, { Component } from "react";
import PropTypes from "prop-types";

import CreateUserComponent from "./CreateUserComponent";
import { deepClone } from "../../../utils/functions";
import apiServices from "../../../service/RequestHandler";
import { validateCreateUser } from "../user-roles-validator";
import { extractPermissions } from "../../../utils/permissions.utils";

export default class CreateUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      errors: {},
      isSuperAdmin: false,
      tempFeature: "",
      tempPermissions: [],
      permissions: {},

      name: "",
      email: "",
      password: ""
    };
    this.permissionsArray = [];
  }

  handleCreate = async () => {
    if (this.isValid()) {
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
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

      this.setState({ activity: true });
      try {
        const response = await apiServices.signup(data);
        const adminUsers = deepClone(this.props.adminUsers);
        response.data.permissions = extractPermissions(response.data);
        adminUsers.push(response);
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
      this.permissionsArray = [];
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

  isValid = () => {
    const { errors, isValid } = validateCreateUser(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  render() {
    return (
      <CreateUserComponent
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleCheckBoxChange={this.handleCheckBoxChange}
        handleCreate={this.handleCreate}
        handleDialogVisibility={this.props.handleDialogVisibility}
        handleAddPermissions={this.handleAddPermissions}
      />
    );
  }
}

CreateUserContainer.propTypes = {
  handleDialogVisibility: PropTypes.func,
  handleAfterAction: PropTypes.func,
  adminUsers: PropTypes.arrayOf(PropTypes.object)
};
