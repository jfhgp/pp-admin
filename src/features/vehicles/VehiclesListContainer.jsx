import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VehiclesListComponent from './VehiclesListComponent';
import apiServices from '../../service/RequestHandler';
import { withStore } from '../../utils/store.util';
import { deepClone } from '../../utils/functions';

class VehiclesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      vehicles: [],
      isDialogVisible: false,
      dialogData: undefined
    };
  }

  componentDidMount() {
    this.getAllVehicles();
  }

  async getAllVehicles() {
    try {
      const response = await apiServices.getAllVehicles();
      this.setState({ activity: false, vehicles: response.data.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleApprove = async () => {
    this.setState({ activity: true });
    try {
      const response = await apiServices.activateVehicle({
        vehicle: this.state.dialogData._id
      });

      if (response.data.data) {
        const state = deepClone(this.state);
        state.vehicles[state.dialogData.index].approved =
          response.data.data.approved;
        state.dialogData.approved = response.data.data.approved;

        this.setState({ ...state, activity: false });
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleDialogData = data => {
    this.setState({
      dialogData: data,
      isDialogVisible: true
    });
  };

  handleDocumentClick = () => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: this.state.dialogData.documents.map(item => ({
        src: item
      }))
    });
  };

  handleVehiclesAfterAction = vehicles => {
    this.setState(prevState => ({
      vehicles: vehicles instanceof Array ? vehicles : prevState.vehicles,
      dialogData: undefined,
      isDialogVisible: false
    }));
  };

  render() {
    return (
      <VehiclesListComponent
        {...this.state}
        handleApprove={this.handleApprove}
        handleDialogData={this.handleDialogData}
        handleDocumentClick={this.handleDocumentClick}
        handleVehiclesAfterAction={this.handleVehiclesAfterAction}
      />
    );
  }
}

VehiclesListContainer.propTypes = {
  store: PropTypes.shape({ setMultiWithRender: PropTypes.func })
};

export default withStore(VehiclesListContainer);
