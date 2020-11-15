import React from "react";
import PropTypes from "prop-types";

import {
  Typography,
  Button,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";

import Page from "../../components/layout/Page";
import EmptyRow from "../../components/table/EmptyRow";
import CreateUserContainer from "./create-user/CreateUserContainer";
import UpdateUserContainer from "./edit-user/UpdateUserContainer";
import ShowPermissionsContainer from "./permissions/ShowPermissionsContainer";
import { getNewColors } from "../../utils/functions";

const UserRolesListComponent = props => {
  const { activity, handleDialogVisibility, adminUsers } = props;
  const DialogComp = props.dialogComp;

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: "0 1rem" }}
      style={{}}
    >
      <div className="p-grid user-roles-list-container" style={{ margin: 0 }}>
        <div className="p-col-12">
          <Typography variant="h5">User Roles</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <div>Dashboard</div>
            <div style={{ color: getNewColors("secondary") }}>User Roles</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12 text-right">
          <Button
            variant="contained"
            disabled={activity}
            onClick={() => handleDialogVisibility(true, CreateUserContainer)}
          >
            Create User
          </Button>
        </div>
        <div className="p-col-12">
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox className="table-check-box" checked={false} />
                  </TableCell>
                  <TableCell style={{ width: "25%" }}>Name</TableCell>
                  <TableCell style={{ width: "25%" }}>Email</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {adminUsers.length ? (
                  adminUsers.map(item => {
                    const permissionKeys = Object.keys(item.permissions);

                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Checkbox
                            className="table-check-box"
                            checked={false}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          <button
                            onClick={() =>
                              handleDialogVisibility(
                                true,
                                ShowPermissionsContainer,
                                item.permissions
                              )
                            }
                          >
                            {permissionKeys.join(", ")}
                          </button>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() =>
                              handleDialogVisibility(
                                true,
                                UpdateUserContainer,
                                item
                              )
                            }
                          >
                            <i
                              className="fas fa-ellipsis-h"
                              style={{ color: "#888" }}
                            />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <EmptyRow colSpan={6} message="No admin users found." />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Dialog
        open={props.isDialogVisible}
        onClose={handleDialogVisibility}
        className="user-roles-dialog"
        maxWidth="md"
      >
        <DialogComp
          adminUsers={adminUsers}
          dialogData={props.dialogData}
          handleDialogVisibility={handleDialogVisibility}
          handleAfterAction={props.handleAfterAction}
        />
      </Dialog>
    </Page>
  );
};

UserRolesListComponent.defaultProps = {
  adminUsers: [],
  dialogData: {},
  dialogComp: () => null
};

UserRolesListComponent.propTypes = {
  activity: PropTypes.bool,
  adminUsers: PropTypes.arrayOf(PropTypes.object),
  isDialogVisible: PropTypes.bool,
  handleDialogVisibility: PropTypes.func,
  handleAfterAction: PropTypes.func,
  dialogData: PropTypes.shape(),
  dialogComp: PropTypes.func
};

export default UserRolesListComponent;
