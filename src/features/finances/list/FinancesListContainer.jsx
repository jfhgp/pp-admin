import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FinancesListComponent from './FinancesListComponent';
import apiServices from '../../../service/RequestHandler';
import routes from '../../../constants/route-constants';

export default class FinancesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      finances: undefined
    };
  }

  componentDidMount = () => {
    this.getFinances();
  };

  getFinances = async () => {
    try {
      const response = await apiServices.getAllFinances();
      this.setState({ activity: false, finances: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleClick = _id => {
    this.props.history.push(`${routes.finance}/${_id}`);
  };

  render() {
    return (
      <FinancesListComponent {...this.state} handleClick={this.handleClick} />
    );
  }
}

FinancesListContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};
