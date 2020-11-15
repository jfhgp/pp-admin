import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import RatesListComponent from './RatesListComponent';

export default class RatesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: [],
      activity: true,
      visible: false,
      currentData: {}
    };

    this.handleOnChange = (key, value) => this.onChange(key, value);
    this.hideModal = () => this.onChange('visible', false);
    this.handleModalData = (visible, comp, data, setRates) =>
      this.setModalData(visible, comp, data, setRates);
    this.handleSetRates = rates => this.setRates(rates);
  }

  componentDidMount() {
    this.getRates();
  }

  async getRates() {
    let result;
    try {
      result = await apiServices.getRates();
      this.setState({ rates: result.data, activity: false });
    } catch (e) {
      this.onChange('activity', false);
    }
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  setModalData(visible, comp, data) {
    this.setState({
      visible,
      currentData: { Comp: comp, data, setRatesFunc: this.handleSetRates }
    });
  }

  setRates(rates) {
    this.setState({ rates, visible: false });
  }

  render() {
    return (
      <RatesListComponent
        {...this.state}
        onChange={this.handleOnChange}
        setModalData={this.handleModalData}
        hideModal={this.hideModal}
      />
    );
  }
}
