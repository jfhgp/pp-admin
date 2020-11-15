import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider, FormControlLabel, Switch, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { deepClone } from '../../../utils/functions';
import apiServices from '../../../service/RequestHandler';

export const styles = () => ({
  colorSwitchBase: {
    '&$colorChecked': {
      color: '#52d869',
      '& + $colorBar': {
        backgroundColor: '#52d869'
      }
    }
  },
  colorBar: {},
  colorChecked: {}
});

class VehicleCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activity: false };
  }

  handleApprove = async () => {
    this.setState({ activity: true });
    try {
      const response = await apiServices.activateVehicle({
        vehicle: this.props.vehicle._id
      });

      if (response.data.data) {
        const vehicles = deepClone(this.props.vehicles);
        vehicles[this.props.index].approved = response.data.data.approved;

        this.props.handleVehiclesAfterAction({ vehicles });
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { vehicle, classes, type } = this.props;

    switch (type) {
      case 'transporter': {
        return (
          <div className="vehicle-card" style={{ marginBottom: '1rem' }}>
            <div>
              <div>
                <i className="fas fa-car-alt" />
                <span>{vehicle.model}</span>
                <span>-</span>
                <span style={{ fontWeight: 'bold' }}>{vehicle.make}</span>
              </div>
              <span>{vehicle.numberPlate}</span>
            </div>
            <Divider style={{ margin: '0 1rem' }} />
            <div>
              <p>
                Color: <span>{vehicle.color}</span>
              </p>
              <p style={{ textAlign: 'center' }}>
                Mode: <span>{vehicle.mode}</span>
              </p>
              <p style={{ visibility: 'hidden' }}>sample</p>
            </div>
            <Divider style={{ margin: '0 1rem' }} />
            <div
              className={
                vehicle.approved ? 'is-approved approved' : 'is-approved'
              }
            >
              <Button
                onClick={this.props.onDocumentsClick}
                disabled={vehicle.documents.length < 1}
              >
                <i className="fas fa-info-circle" />
                View Documents
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    disableRipple
                    disabled={vehicle.approved}
                    classes={{
                      switchBase: classes.colorSwitchBase,
                      checked: classes.colorChecked,
                      bar: classes.colorBar
                    }}
                    checked={vehicle.approved}
                    onChange={this.handleApprove}
                  />
                }
                label="APPROVED"
                labelPlacement="start"
              />
            </div>
          </div>
        );
      }
      case 'vehicles': {
        return (
          <div className="vehicle-card" style={{ marginBottom: '1rem' }}>
            <div>
              <div>
                <i className="fas fa-car-alt" />
                <span>{vehicle.model}</span>
                <span>-</span>
                <span style={{ fontWeight: 'bold' }}>{vehicle.make}</span>
              </div>
              <span>{vehicle.numberPlate}</span>
            </div>
            <Divider style={{ margin: '0 1rem' }} />
            <div>
              <p>
                Color: <span>{vehicle.color}</span>
              </p>
              <p style={{ textAlign: 'center' }}>
                Mode: <span>{vehicle.mode}</span>
              </p>
              <p style={{ textAlign: 'right' }}>
                Approved: <span>{vehicle.approved ? 'Yes' : 'No'}</span>
              </p>
            </div>
            <Divider style={{ margin: '0 1rem' }} />
            <div className="vehicles">
              <Button onClick={this.props.onDetailsClick}>VIEW DETAILS</Button>
            </div>
          </div>
        );
      }
      default: {
        return null;
      }
    }
  }
}

VehicleCardComponent.propTypes = {
  vehicle: PropTypes.shape(),
  classes: PropTypes.shape(),
  vehicles: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  index: PropTypes.number,
  onDetailsClick: PropTypes.func,
  onDocumentsClick: PropTypes.func,
  handleVehiclesAfterAction: PropTypes.func
};

export default withStyles(styles)(VehicleCardComponent);
