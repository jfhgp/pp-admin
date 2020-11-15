import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Page from '../../components/layout/Page';
import VehicleCardComponent, {
  styles
} from './components/VehicleCardComponent';
import { getNewColors } from '../../utils/functions';
import EmptyDataPlaceholder from '../../components/layout/EmptyDataPlaceholder';

const VehiclesListComponent = props => {
  const { activity, vehicles, dialogData, classes } = props;
  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: '0 1rem' }}
      style={{}}
    >
      <div className="p-grid vehicles-list-grid">
        <div className="p-col-12">
          <Typography variant="h5">Vehicles</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: getNewColors('secondary') }}>Vehicles</div>
          </Breadcrumbs>
        </div>
        {vehicles.length ? (
          vehicles.map((vehicle, index) => (
            <div key={vehicle._id} className="p-col-12 p-md-6">
              <VehicleCardComponent
                vehicle={vehicle}
                type="vehicles"
                onDetailsClick={() =>
                  props.handleDialogData({ ...vehicle, index })
                }
              />
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <EmptyDataPlaceholder message="No vehicles available." />
          </div>
        )}
      </div>
      <Dialog
        open={props.isDialogVisible}
        onClose={props.handleVehiclesAfterAction}
        maxWidth="sm"
        className="vehicles-list-dialog"
      >
        <DialogContent>
          <div>
            <Divider />
            <p>TRANSPORTER</p>
            <Divider />
            <div>
              <p>
                <i className="fas fa-user" />
                {dialogData.transporter.firstName}{' '}
                {dialogData.transporter.lastName}
              </p>
              <p>
                <i className="fas fa-mobile-alt" />
                {dialogData.transporter.mobile}
              </p>
              <p>
                <i className="fas fa-envelope" />
                {dialogData.transporter.email}
              </p>
            </div>
          </div>
          <div>
            <Divider />
            <p>DOCUMENTS</p>
            <Divider />
            <div>
              {dialogData.documents.length ? (
                dialogData.documents.map((item, index) => {
                  return (
                    <img
                      key={`document-${index + 1}`}
                      alt="Documents"
                      src={item}
                      onClick={props.handleDocumentClick}
                    />
                  );
                })
              ) : (
                <span>No Documents.</span>
              )}
            </div>
          </div>
        </DialogContent>
        <div className={dialogData.approved ? 'actions approved' : 'actions'}>
          <FormControlLabel
            control={
              <Switch
                disableRipple
                disabled={dialogData.approved}
                classes={{
                  switchBase: classes.colorSwitchBase,
                  checked: classes.colorChecked,
                  bar: classes.colorBar
                }}
                checked={dialogData.approved}
                onChange={props.handleApprove}
              />
            }
            label="APPROVED"
            labelPlacement="start"
          />
        </div>
      </Dialog>
    </Page>
  );
};

VehiclesListComponent.defaultProps = {
  dialogData: {
    transporter: {},
    documents: [],
    approved: false
  }
};

VehiclesListComponent.propTypes = {
  activity: PropTypes.bool,
  isDialogVisible: PropTypes.bool,
  vehicles: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape(),
  dialogData: PropTypes.shape(),
  handleApprove: PropTypes.func,
  handleDocumentClick: PropTypes.func,
  handleDialogData: PropTypes.func,
  handleVehiclesAfterAction: PropTypes.func
};

export default withStyles(styles)(VehiclesListComponent);
