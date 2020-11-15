import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import OrdersEditComponent from './OrdersEditComponent';
import { validateCommodity } from '../orders-validators';
import apiServices from '../../../service/RequestHandler';
import { deepClone } from '../../../utils/functions';

import { newGrowl } from '../../../components/ui/GrowlComponent';

export default class OrdersEditContainer extends Component {
  constructor(props) {
    super(props);

    this.from = props.details.pickupTime
      ? props.details.pickupTime.from.split(':')
      : [];
    this.to = props.details.pickupTime
      ? props.details.pickupTime.to.split(':')
      : [];

    this.state = {
      pickupDate: props.details.pickupDate,
      from: moment({ h: this.from[0], m: this.from[1] }),
      to: moment({ h: this.to[0], m: this.to[1] }),
      name: props.details.contact.name,
      number: props.details.contact.number,
      commodities: this.normalizeCommodities(),
      rates: props.details.rates,
      currency: props.details.config.currency,
      measurementUnit: props.details.config.measurementUnit,
      weightUnit: props.details.config.weightUnit,

      activity: true,
      canUpdate: false,
      canUpdateItems: false,
      activeRow: null,
      isDialogOpen: false,

      categories: [],
      subCategories: [],
      parentCategory: '',
      subCategory: '',
      errors: {},
      nIName: '',
      nICategory: '',
      nIQuantity: '',
      nIWeight: '',
      nILength: '',
      nIWidth: '',
      nIHeight: '',
      showDialog: false
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    try {
      const result = await apiServices.getAllCategories();
      this.setState({ activity: false, categories: result.data.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleUpdateOrder = async () => {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }

    const updateObj = {
      _id: this.props.details._id,
      pickupDate: this.state.pickupDate,
      rates: this.state.rates
    };
    updateObj.pickupTime = {
      from: moment(this.state.from).format('HH:mm'),
      to: moment(this.state.to).format('HH:mm')
    };
    updateObj.contact = {
      name: this.state.name,
      number: this.state.number
    };
    updateObj.config = {
      currency: this.state.currency,
      measurementUnit: this.state.measurementUnit,
      weightUnit: this.state.weightUnit
    };
    console.log("This is all modify order data", updateObj)
    try {
      const response = await apiServices.modifyOrder(updateObj);
      this.setState({ activity: false, canUpdate: false });
      console.log("this is all details after modify", response.data.data)
      this.props.handleDetailsAfterAction(response.data.data, true);
      newGrowl.showGrowl('success', 'Success');
    } catch (error) {
      this.setState({ activity: false });
      throw error;
    }
  };

  handleDateChange = value => {
    this.setState({ pickupDate: value.toISOString(), canUpdate: true });
  };

  handleTimeChange = (name, value) => {
    this.setState({ [name]: value, canUpdate: true });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      canUpdate: true
    });
  };

  handleCommodityChange = index => e => {
    e.persist();
    this.setState(prevState => {
      return {
        canUpdateItems: true,
        commodities: {
          ...prevState.commodities,
          [index]: {
            ...prevState.commodities[index],
            [e.target.name]: e.target.value
          }
        },
        errors: { ...prevState.errors, [e.target.name]: false }
      };
    });
  };

  handleParentChange = async e => {
    const { value } = e.target;
    this.setState({ activity: true });
    try {
      const response = await apiServices.getSubCategoryByParent(value);
      this.setState({
        activity: false,
        subCategories: response.data.data,
        parentCategory: value
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleSubCategoryChange = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      canUpdateItems: true,
      subCategory: value,
      commodities: {
        ...prevState.commodities,
        [prevState.activeRow]: {
          ...prevState.commodities[prevState.activeRow],
          itemType:
            // eslint-disable-next-line
            prevState.subCategories.filter(item => item._id == value)[0] || ''
        }
      }
    }));
  };

  handleAddItem = () => {
    // if (this.isAddItemValid()) {
    //   const commodities = [...this.state.commodities];
    //   commodities.push({
    //     itemType: this.state.nICategory,
    //     length: this.state.nILength,
    //     height: this.state.nIHeight,
    //     name: this.state.nIName,
    //     quantity: this.state.nIQuantity,
    //     weight: this.state.nIWeight,
    //     width: this.state.nIWidth
    //   });
    //   this.setState({
    //     commodities,
    //     canUpdateItems: true,
    //     nICategory: { _id: '' },
    //     nILength: '',
    //     nIHeight: '',
    //     nIName: '',
    //     nIQuantity: '',
    //     nIWeight: '',
    //     nIWidth: ''
    //   });
    // }
  };

  handleGoBack = () => {
    this.props.handleDetailsAfterAction(this.props.details);
  };

  handleDialogOpen = () => {
    this.setState({ isDialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handleChangeUnits = (key, value) => {
    this.setState({ [key]: value });
  };

  handleItemClick = e => {
    const dataset = e.currentTarget.dataset;
    this.setState(prevState => {
      if (prevState.activeRow === null) {
        return { activeRow: dataset.index };
      }

      const { errors, isValid } = this.isCommodityValid(
        this.state.commodities[dataset.index]
      );

      // eslint-disable-next-line
      if (prevState.activeRow != dataset.index) {
        if (isValid) {
          return { activeRow: dataset.index };
        } else {
          return { errors };
        }
      } else {
        if (isValid) {
          if (prevState.canUpdateItems) {
            this.handleUpdateCommodities(dataset.index);
            return { activeRow: null, activity: true };
          } else {
            return { activeRow: null };
          }
        }
        return { errors };
      }
    });
  };

  handleUpdateCommodities = index => {
    this.estimateOrder(this.state.commodities)
      .then(() => this.updateCommodity(index))
      .then(() => this.handleUpdateOrder())
      .catch(() => {
        if (this.state.activity) {
          this.setState({ activity: false });
        }
      });
  };

  estimateOrder = async commodities => {
    const { details } = this.props;
    const orderObj = {
      user: details.user._id,
      pickup: details.pickup,
      dropoff: details.dropoff,
      deliveryType: details.deliveryType,
      priceImpact: 0,
      totalWeight: 0,
      totalWidth: 0,
      totalHeight: 0,
      totalLength: 0
    };

    Object.keys(commodities).forEach(key => {
      orderObj.totalHeight += parseFloat(commodities[key].height);
      orderObj.totalWidth += parseFloat(commodities[key].width);
      orderObj.totalWeight += parseFloat(commodities[key].weight);
      orderObj.totalLength += parseFloat(commodities[key].length);
      orderObj.priceImpact += parseFloat(commodities[key].itemType.priceImpact);
    });

    try {
      const response = await apiServices.estimateOrder(orderObj);
      this.setState({ rates: response.data.rates });
    } catch (error) {
      newGrowl.showGrowl(
        'error',
        error.response.data.status,
        error.response.data.message
      );
      throw error;
    }
  };

  updateCommodity = async index => {
    const commodity = deepClone(this.state.commodities[index]);
    commodity.itemType = commodity.itemType._id;

    try {
      await apiServices.updateCommodity(this.state.commodities[index]);
      this.setState({ canUpdateItems: false });
    } catch (error) {
      throw error;
    }
  };

  normalizeCommodities = () => {
    const commodities = {};
    this.props.details.commodities.forEach((item, index) => {
      commodities[index] = item;
    });
    return commodities;
  };

  isCommodityValid(commodity) {
    return validateCommodity(commodity);
  }

  render() {
    return (
      <OrdersEditComponent
        {...this.state}
        handleDateChange={this.handleDateChange}
        handleTimeChange={this.handleTimeChange}
        handleChange={this.handleChange}
        handleChangeUnits={this.handleChangeUnits}
        handleCommodityChange={this.handleCommodityChange}
        handleItemClick={this.handleItemClick}
        handleAddItem={this.handleAddItem}
        handleUpdateOrder={this.handleUpdateOrder}
        handleGoBack={this.handleGoBack}
        handleDialogOpen={this.handleDialogOpen}
        handleDialogClose={this.handleDialogClose}
        handleParentChange={this.handleParentChange}
        handleSubCategoryChange={this.handleSubCategoryChange}
        details={this.props.details}
      />
    );
  }
}

OrdersEditContainer.propTypes = {
  details: PropTypes.shape({
    _id: PropTypes.string,
    contact: PropTypes.shape(),
    pickupDate: PropTypes.string,
    pickupTime: PropTypes.shape(),
    commodities: PropTypes.arrayOf(PropTypes.shape()),
    rates: PropTypes.shape()
  }),
  handleDetailsAfterAction: PropTypes.func
};
