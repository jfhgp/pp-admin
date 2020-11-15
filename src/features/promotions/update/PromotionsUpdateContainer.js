import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import apiServices from '../../../service/RequestHandler';
import PromotionsUpdateComponent from './PromotionsUpdateComponent';
import { validateUpdate } from '../promotions-validator';

export default class PromotionsUpdateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.data._id,
      validTill: moment(props.data.validTill),

      activity: false,
      errors: {}
    };
  }

  handleSubmit = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });
      const { validTill, _id } = this.state;
      const formattedValidTill = moment(validTill).format('MM/DD/YYYY');
      const data = {
        _id,
        validTill: formattedValidTill
      };

      try {
        const result = await apiServices.updatePromotions(data);
        if (result.status === 200) {
          const promotions = [...this.props.promotions];

          for (let index = 0; index < promotions.length; index++) {
            if (promotions[index]._id === this.props.data._id) {
              promotions[index].validTill = validTill;
              break;
            }
          }
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
    const { isValid, errors } = validateUpdate(this.state);
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
      <PromotionsUpdateComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCloseDialog={this.handleCloseDialog}
      />
    );
  }
}

PromotionsUpdateContainer.propTypes = {
  closeDialog: PropTypes.func,
  setPromosFunc: PropTypes.func,
  promotions: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.shape({
    _id: PropTypes.string,
    validTill: PropTypes.oneOfType([
      PropTypes.instanceOf(moment),
      PropTypes.string
    ])
  })
};
