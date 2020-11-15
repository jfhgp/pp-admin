import React, { Component } from 'react';
import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import OrderDetails from './OrdersDetailsComponent';
import SubOrdersContainer from '../components/sub-orders/SubOrdersContainer';
import { withStore } from '../../../utils/store.util';

class OrdersDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: undefined,
      modalData: { Comp: SubOrdersContainer, component: 'sub-orders' },
      activity: true,
      routeDialogVisible: false,
      mapOverlay: { visible: false, data: {} }
    };
  }

  componentDidMount() {
    this.handleGetDetails();
  }

  handleGetDetails = async () => {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }

    try {
      const result = await apiServices.getOrderById({
        id: this.props.match.params.id
      });
      if (result.data.status === 200) {
        this.setState({
          details: result.data.data,
          activity: false,
          routeDialogVisible: false
        });
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSetModalData = (value, comp, component) => {
    this.setState({
      routeDialogVisible: value,
      modalData: { Comp: comp, component }
    });
  };

  handleOverlay = (show, data) => {
    this.handleChange('mapOverlay', { visible: show, data });
  };

  handleDetailsAfterAction = (details, visible = false) => {
    this.setState({ details, routeDialogVisible: visible });
  };

  handleImagesClick = images => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: images.map(item => ({
        src: item
      }))
    });
  };

  render() {
    return (
      <OrderDetails
        {...this.state}
        handleChange={this.handleChange}
        handleSetModalData={this.handleSetModalData}
        handleGetDetails={this.handleGetDetails}
        handleOverlay={this.handleOverlay}
        handleDetailsAfterAction={this.handleDetailsAfterAction}
        handleImagesClick={this.handleImagesClick}
      />
    );
  }
}

OrdersDetailsContainer.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  store: PropTypes.shape({ setMultiWithRender: PropTypes.func }),
  history: PropTypes.shape({ push: PropTypes.func })
};

export default withStore(OrdersDetailsContainer);
