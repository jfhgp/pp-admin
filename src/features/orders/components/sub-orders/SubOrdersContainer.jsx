import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubOrdersComponent from './SubOrdersComponent';
import apiServices from '../../../../service/RequestHandler';
import { deepClone } from '../../../../utils/functions';

const INITIAL_STATE = {
  pickupTransporters: undefined,
  dropoffTransporters: undefined,
  tempRoutes: [],
  creatingFrom: 'pickup',
  currentIndex: 0,
  transportersAtCurrentLocation: [],
  spacesAtCurrentLocation: [],
  activity: false,
  anchorEl: null,
  options: [],
  isInfoOpen: ''

};

export default class SubOrdersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleBreakOrder = async () => {
    this.setState({ activity: true });
    try {
      const response = await apiServices.autoBreakOrder(this.props.details._id);
      this.setState({
        activity: false,
        pickupTransporters: response.data.pickupTransporters,
        dropoffTransporters: response.data.dropoffTransporters
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleOpenInfoWindow = (isOpen) => {
    this.setState({ isInfoOpen: isOpen })

  }

  handleUpdateSubOrder = (space) => {
    debugger;
    let tempRoutes = this.state.tempRoutes
    let item = tempRoutes[this.state.currentIndex]
    let destination = { ...item.destination }
    destination.location = space.item.location;
    destination.name = space.item.name;
    destination["space"] = space.item._id;
    item.destination = destination;
    tempRoutes[this.state.currentIndex] = item;
    this.setState({ tempRoutes });
  }

  handleSpaceSearch = async (location) => {
    this.setState({ activity: true });
    try {
      const response = await apiServices.findSpaces(location);
      this.setState({
        activity: false,
        spacesAtCurrentLocation: response.data.data
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleFindTransporters = async (transporter, travelling, specific) => {
    const tempRoutes = [...this.state.tempRoutes];
    const travellingClone = { ...travelling };
    travellingClone.transporter = transporter;

    let location = null;
    let currentIndex = 0;

    if (specific === 'pickup') {
      tempRoutes.push(travellingClone);
      currentIndex = tempRoutes.length - 1;
      location = travellingClone.destination.location;
    } else {
      tempRoutes.unshift(travellingClone);
      location = travellingClone.origin.location;
    }

    this.setState({
      tempRoutes,
      creatingFrom: specific,
      currentIndex,
      activity: true
    });

    try {
      const response = await apiServices.findTransportersToBreakOrder(
        location,
        specific
      );
      this.setState({
        activity: false,
        transportersAtCurrentLocation: response.data
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleResetTempRoutes = () => {
    this.setState({ tempRoutes: [], transportersAtCurrentLocation: [] });
  };

  handleSubmit = async e => {
    e.stopPropagation();

    const { details } = this.props;
    const subOrders = deepClone(this.state.tempRoutes);

    subOrders[0].origin = {
      name: this.props.details.pickup.address,
      location: this.props.details.pickup.location
    };

    subOrders[subOrders.length - 1].destination = {
      name: this.props.details.dropoff.address,
      location: this.props.details.dropoff.location
    };

    const finalObject = { _id: details._id };
    const finalSubOrders = subOrders.map((item, index) => {
      const temp = {
        pickupDate: details.pickupDate,
        transporter: item.transporter._id,
        pickup: { location: item.origin.location, address: item.origin.name },
        dropoff: {
          location: item.destination.location,
          address: item.destination.name
        },
        flexibleDate: true
      };

      if (subOrders[index + 1]) {
        const transporter = subOrders[index + 1].transporter;
        temp.contact = {
          name: `${transporter.firstName} ${transporter.lastName}`,
          number: transporter.mobile
        };
      } else {
        temp.contact = details.contact;
      }
      return temp;
    });
    finalObject.routes = finalSubOrders;

    this.setState({ activity: true, anchorEl: null });

    try {
      const result = await apiServices.updateRoute(finalObject);

      if (result.data.status === 200) {
        const tempRoutes = [];
        const newDetails = deepClone(details);
        result.data.data.routes.forEach((id, index) => {
          tempRoutes[index] = {
            _id: id,
            pickup: finalObject.routes[index].pickup,
            dropoff: finalObject.routes[index].dropoff,
            transporter: subOrders[index].transporter
          };
        });

        newDetails.routes = tempRoutes;
        this.props.handleDetailsAfterAction(newDetails);
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleMapClick = e => {
    // if (this.state.current === 'pickup' || this.state.current === 'dropoff') {
    //   const value = e.anchor
    //     ? [e.anchor[1], e.anchor[0]]
    //     : [e.latLng[1], e.latLng[0]];
    //   this.handleChange('map', value);
    // }
  };

  handleStopsClick = (e, options) => {
    e.stopPropagation();
    this.setState({ anchorEl: e.currentTarget, options });
  };

  handleStopsClose = e => {
    e.stopPropagation();
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <SubOrdersComponent
        {...this.state}
        isVisible={this.props.isVisible}
        details={this.props.details}
        handleDetailsAfterAction={this.props.handleDetailsAfterAction}
        handleBreakOrder={this.handleBreakOrder}
        handleMapClick={this.handleMapClick}
        handleStopsClick={this.handleStopsClick}
        handleSubmit={this.handleSubmit}
        handleStopsClose={this.handleStopsClose}
        handleFindTransporters={this.handleFindTransporters}
        handleResetTempRoutes={this.handleResetTempRoutes}
        handleSpaceSearch={this.handleSpaceSearch}
        handleOpenInfoWindow={this.handleOpenInfoWindow}
        handleUpdateSubOrder={this.handleUpdateSubOrder}
      />
    );
  }
}

SubOrdersContainer.propTypes = {
  isVisible: PropTypes.bool,
  details: PropTypes.shape(),
  routes: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func
};

// async getAddress(current, data) {
// this.setState({ activity: true });
// try {
//   const result = await apiServices.getAddress([data[1], data[0]]);
//   this.setState({
//     [current]: {
//       location: data,
//       address: result.data.display_name
//     },
//     activity: false
//   });
// } catch (error) {
//   this.setState({ activity: false });
// }
// }
