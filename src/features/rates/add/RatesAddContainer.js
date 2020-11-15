import React, { Component } from 'react';
import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import RatesFormComponent from '../components/RatesFormComponent';
import { validate } from '../rates-validator';

const INITIAL_STATE = {
  customer: '',
  peakFactor: '',
  mode: '',
  type: '',
  minWeight: '0',
  maxWeight: '0',
  minWidth: '0',
  maxWidth: '0',
  minHeight: '0',
  maxHeight: '0',
  minLength: '0',
  maxLength: '0',
  minDistance: '0',
  maxDistance: '0',
  price: '0',
  activity: false,
  errors: {}
};

export default class RatesAddContainer extends Component {
  static propTypes = {
    rates: PropTypes.arrayOf(PropTypes.object),
    setRates: PropTypes.func,
    hideModal: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleChange = (key, value) => this.onChange(key, value);
    this.handleSubmit = () => this.onSubmit();
  }

  onChange(key, value) {
    const errors = this.state.errors;
    if (errors[key]) {
      if (key === 'customer') {
        if (value === 'customer') {
          this.setState({
            [key]: value,
            mode: '',
            errors: Object.assign({}, errors, { [key]: false })
          });
        }
        if (value === 'transporter') {
          this.setState({
            [key]: value,
            peakFactor: '',
            errors: Object.assign({}, errors, { [key]: false })
          });
        }
      } else {
        this.setState({
          [key]: value,
          errors: Object.assign({}, errors, { [key]: false })
        });
      }
    } else {
      if (key === 'customer') {
        if (value === 'customer') {
          this.setState({
            [key]: value,
            mode: ''
          });
        }
        if (value === 'transporter') {
          this.setState({
            [key]: value,
            peakFactor: ''
          });
        }
      } else {
        this.setState({
          [key]: value
        });
      }
    }
  }

  isValid() {
    const { isValid, errors } = validate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  async onSubmit() {
    if (this.isValid()) {
      this.onChange('activity', true);
      const copy = Object.assign({}, this.state);
      delete copy.activity;
      delete copy.errors;
      copy.customer = this.state.customer === 'customer' ? true : false;

      try {
        const result = await apiServices.addRates(copy);
        this.setState(INITIAL_STATE);
        const rates = [...this.props.rates];
        rates.push(result.data);
        this.props.setRates(rates);
      } catch (e) {
        this.onChange('activity', false);
      }
    }
  }

  render() {
    return (
      <RatesFormComponent
        heading="Add Rate"
        btnLabel="ADD"
        {...this.state}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        hideModal={this.props.hideModal}
      />
    );
  }
}
