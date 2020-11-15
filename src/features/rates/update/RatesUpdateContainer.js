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

export default class RatesUpdateContainer extends Component {
  static propTypes = {
    rates: PropTypes.arrayOf(PropTypes.object),
    setRates: PropTypes.func,
    hideModal: PropTypes.func,
    data: PropTypes.shape({ _id: PropTypes.string, customer: PropTypes.bool })
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleChange = (key, value) => this.onChange(key, value);
    this.handleSubmit = () => this.onSubmit();
  }

  componentDidMount() {
    this.setState(
      Object.assign({ activity: false }, this.props.data, {
        customer: this.props.data.customer ? 'customer' : 'transporter'
      })
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data._id !== this.props.data._id) {
      this.setState({
        activity: false,
        ...this.props.data,
        customer: this.props.data.customer ? 'customer' : 'transporter',
        errors: {}
      });
    }
  }

  async onSubmit() {
    if (this.isValid()) {
      this.onChange('activity', true);
      const copy = Object.assign({}, this.state);
      delete copy.activity;
      delete copy.errors;
      copy.customer = this.state.customer === 'customer' ? true : false;

      try {
        const result = await apiServices.updateRates(copy);
        const rates = [...this.props.rates];
        for (let i = 0; i < rates.length; i++) {
          if (rates[i]._id === this.state._id) {
            rates[i] = result.data;
            break;
          }
        }
        this.onChange('activity', false);
        this.props.setRates(rates);
      } catch (e) {
        this.onChange('activity', false);
      }
    }
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

  render() {
    return (
      <RatesFormComponent
        heading="Update Rate"
        btnLabel="UPDATE"
        {...this.state}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        hideModal={this.props.hideModal}
      />
    );
  }
}
