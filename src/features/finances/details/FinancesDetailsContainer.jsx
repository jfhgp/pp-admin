import React, { Component } from 'react';
import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import FinancesDetailsComponent from './FinancesDetailsComponent';
import { deepClone } from '../../../utils/functions';

export default class FinancesDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      details: undefined
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    try {
      const response = await apiServices.getFinanceById(
        this.props.match.params.id
      );
      const details = response.data;
      this.setState({ activity: false, details });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handlePayClick = async () => {
    const { details } = this.state;
    this.setState({ activity: true });

    try {
      const response = await apiServices.updateFinanceStatus({
        lastPaidAmount: details.lastPaidAmount,
        bankAccount: details.transporter.bankInfo._id,
        _id: details._id
      });
      const newDetails = deepClone(details);
      newDetails.status = response.data.status;

      this.setState({ activity: false, details: newDetails });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    return (
      <FinancesDetailsComponent
        {...this.state}
        handlePayClick={this.handlePayClick}
      />
    );
  }
}

FinancesDetailsContainer.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
};
