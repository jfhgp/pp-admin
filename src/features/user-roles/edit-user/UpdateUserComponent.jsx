import React from "react";
import PropTypes from "prop-types";

import {
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  Typography,
  FormLabel,
  FormGroup
} from "@material-ui/core";

import Page from "../../../components/layout/Page";

const UpdateUserComponent = props => {
  const { activity, errors, handleInputChange } = props;
  const permissionKeys = Object.keys(props.permissions);

  return (
    <Page
      className="layout-page user-roles-update-user-page"
      activity={activity}
      style={{ minHeight: "unset" }}
    >
      <DialogTitle>Update {props.dialogData.email} </DialogTitle>
      <DialogContent>
        <div className="p-grid" style={{ margin: 0 }}>
          <div className="p-col-12 p-md-6">
            <TextField
              label="Name"
              value={props.name}
              name="name"
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              error={errors.name}
              variant="outlined"
            />
          </div>
          <div className="p-col-12 p-md-6">
            <TextField
              label="Email"
              type="email"
              value={props.email}
              name="email"
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              error={errors.email}
              variant="outlined"
            />
          </div>
          <div className="p-col-12 p-md-6">
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.isSuperAdmin}
                  onChange={props.handleCheckBoxChange}
                  name="isSuperAdmin"
                  color="primary"
                />
              }
              label="Super Admin"
            />
          </div>
          {!props.isSuperAdmin ? (
            <React.Fragment>
              <div className="p-col-12 p-md-6">
                <Typography variant="subheading">Assign Permissions</Typography>
                <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ margin: "1rem 0" }}
                  error={errors.tempFeature}
                >
                  <InputLabel htmlFor="select-feature">
                    Select Feature
                  </InputLabel>
                  <Select
                    value={props.tempFeature}
                    name="tempFeature"
                    onChange={handleInputChange}
                    input={<OutlinedInput id="select-feature" labelWidth={0} />}
                    variant="outlined"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="users">Users</MenuItem>
                    <MenuItem value="transporters">Transporters</MenuItem>
                    <MenuItem value="orders">Orders</MenuItem>
                    {/* <MenuItem value="rates">Rates</MenuItem> */}
                    <MenuItem value="promotions">Promotions</MenuItem>
                    <MenuItem value="categories">Categories</MenuItem>
                    <MenuItem value="finance">Finance</MenuItem>
                    <MenuItem value="vehicles">Vehicles</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ margin: "1rem 0" }}
                  error={errors.tempPermissions}
                >
                  <FormLabel component="legend">Select Permissions</FormLabel>
                  <FormGroup row>
                    {[
                      { name: "Create", value: "create" },
                      { name: "Read", value: "read" },
                      { name: "Update", value: "update" },
                      { name: "Delete", value: "delete" }
                    ].map((permission, i) => {
                      let checked = props.tempPermissions.some(
                        per => per === permission.value
                      );
                      return (
                        <div key={i}>
                          <FormControlLabel
                            name="tempPermissions"
                            control={
                              <Checkbox
                                checked={checked}
                                value={permission.value}
                                onChange={handleInputChange}
                                color="primary"
                              />
                            }
                            label={permission.name}
                          />
                        </div>
                      );
                    })}
                  </FormGroup>
                </FormControl>
                {/* <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ margin: "1rem 0" }}
                  error={errors.tempPermissions}
                >
                  <InputLabel htmlFor="select-permissions">
                    Select Permissions
                  </InputLabel>
                  <Select
                    multiple
                    value={props.tempPermissions}
                    name="tempPermissions"
                    onChange={handleInputChange}
                    input={
                      <OutlinedInput id="select-permissions" labelWidth={0} />
                    }
                    variant="outlined"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="create">Create</MenuItem>
                    <MenuItem value="read">Read</MenuItem>
                    <MenuItem value="update">Update</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                  </Select>
                </FormControl> */}
                <div className="text-right">
                  <button onClick={props.handleAddPermissions}>
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
              <div className="p-col-12">
                <Typography
                  variant="title"
                  style={errors.permissions ? { color: "#f44336" } : {}}
                >
                  Permissions
                </Typography>
                <div style={{ display: "flex" }}>
                  {permissionKeys.length ? (
                    permissionKeys.map((key, index) => {
                      return (
                        <div
                          className="permissions-box"
                          key={`permissions-${index + 1}`}
                        >
                          <Typography variant="body2">{key}</Typography>
                          <div>{props.permissions[key].join(", ")}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No permissions assigned.</div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : null}
        </div>

        <div>
          <Button onClick={props.hideDialog} disabled={activity}>
            Go Back
          </Button>
          {permissionKeys.length ? (
            <Button
              variant="contained"
              disabled={activity}
              onClick={props.removeAllPermissions}
              style={{ marginLeft: "1rem" }}
            >
              Remove All Permissions
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            disabled={activity}
            onClick={props.handleUpdate}
            style={{ marginLeft: "1rem" }}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Page>
  );
};

UpdateUserComponent.propTypes = {
  dialogData: PropTypes.shape({ email: PropTypes.string }),
  name: PropTypes.string,
  email: PropTypes.string,
  tempFeature: PropTypes.string,
  tempPermissions: PropTypes.arrayOf(PropTypes.string),
  activity: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  errors: PropTypes.shape(),
  permissions: PropTypes.shape(),
  handleInputChange: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  handleUpdate: PropTypes.func,
  hideDialog: PropTypes.func,
  handleAddPermissions: PropTypes.func,
  removeAllPermissions: PropTypes.func
};

export default UpdateUserComponent;
