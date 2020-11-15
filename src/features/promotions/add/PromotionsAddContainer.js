import React, { Component } from 'react';
import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import PromotionsAddComponent from './PromotionsAddComponent';
import { validateAdd } from '../promotions-validator';
import { deepClone } from '../../../utils/functions';

const INITIAL_STATE = {
  code: '',
  discount: '',
  validFrom: '',
  validTill: '',
  maxDiscount: '',
  text: '',
  userType: 'user',

  activity: false,
  errors: {}
};

export default class PromotionsAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit = async () => {
    if (this.isValid()) {
      const { validFrom, validTill } = this.state;
      this.setState({ activity: true });
      const copy = deepClone(this.state);
      delete copy.activity;
      delete copy.errors;

      copy.validFrom = validFrom.format('MM/DD/YYYY');
      copy.validTill = validTill.format('MM/DD/YYYY');

      try {
        const result = await apiServices.addPromotions(copy);
        if (result.data.status === 200) {
          const promotions = [...this.props.promotions];
          promotions.push(result.data.data);
          this.props.setPromosFunc(promotions);
        } else {
          this.setState({ activity: false });
        }
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleChange = (key, value) => {
    const errors = this.state.errors;
    if (errors[key]) {
      this.setState({
        [key]: value,
        errors: Object.assign({}, errors, { [key]: false })
      });
    } else {
      this.setState({ [key]: value });
    }
  };

  isValid() {
    const { isValid, errors } = validateAdd(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleCloseDialog = () => {
    this.props.closeDialog();
  };

  render() {
    return (
      <PromotionsAddComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCloseDialog={this.handleCloseDialog}
      />
    );
  }
}

PromotionsAddContainer.propTypes = {
  closeDialog: PropTypes.func,
  setPromosFunc: PropTypes.func,
  promotions: PropTypes.arrayOf(PropTypes.object)
};
