import React, { Component } from 'react';
import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import OrdersListComponent from './OrdersListComponent';
import routes from '../../../constants/route-constants';

class OrdersListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      current: [],
      filter: props.match.params.status || 'all',
      activity: true,
      search: ''
    };
    this.timeout = null;
  }

  componentDidMount() {
    this.getOrders();

    this.props.history.push(routes.orders);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  async getOrders() {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }

    try {
      const result = await apiServices.getOrders();
      let current = result.data.data;

      if (this.state.filter !== 'all') {
        current = result.data.data.reduce((prev, item) => {
          if (item.status.indexOf(this.state.filter) !== -1) {
            prev.push(item);
          }
          return prev;
        }, []);
      }

      this.setState({
        orders: result.data.data,
        current: current,
        activity: false
      });
    } catch (e) {
      this.setState({ activity: false });
    }
  }

  async handleSearchForOrders(number) {
    this.setState({ activity: true });
    try {
      const result = await apiServices.getOrderByNumber(number);
      this.setState({
        activity: false,
        orders: result.data.data ? [result.data.data] : []
      });
    } catch (e) {
      this.setState({ activity: false });
    }
  }

  handleChange = e => {
    clearTimeout(this.timeout);
    const { value } = e.target;
    this.setState({ [e.target.name]: value });

    this.timeout = setTimeout(() => {
      if (value) {
        this.handleSearchForOrders(value);
      } else {
        this.getOrders();
      }
    }, 1000);
  };

  handleFilterChange = e => {
    const filter = e.target.value;

    if (filter === 'all') {
      this.setState({ current: this.state.orders, filter });
    } else {
      const current = this.state.orders.reduce((prev, item) => {
        if (item.status.indexOf(filter) !== -1) {
          prev.push(item);
        }
        return prev;
      }, []);

      this.setState({ current, filter });
    }
  };

  render() {
    return (
      <OrdersListComponent
        {...this.state}
        handleChange={this.handleChange}
        handleFilterChange={this.handleFilterChange}
      />
    );
  }
}

OrdersListContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ status: PropTypes.string })
  })
};

export default OrdersListContainer;
