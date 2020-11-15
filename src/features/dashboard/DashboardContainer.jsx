import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import apiServices from '../../service/RequestHandler';
import DashboardComponent from './DashboardComponent';
import { canPerformAction } from '../../utils/permissions.utils';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      details: undefined,
      from: undefined,
      to: undefined,
      orders: true,
      newTransporters: false,
      newUsers: false,
      // earnings: false,
      chartStats: {},
      chartData: undefined
    };

    this.dashboardInterval = null;
  }

  componentDidMount() {
    this.getData();

    this.dashboardInterval = setInterval(this.getData, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.dashboardInterval);
  }

  getData = async () => {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }
    try {
      const response = await apiServices.dashboard();
      this.setState({
        details: response.data.data,
        activity: false
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleRowClick = (route, featureAndAction) => {
    try {
      if (canPerformAction(featureAndAction)) {
        this.props.history.push(route);
      }
    } catch (error) {
      return null;
    }
  };

  handleChange = e => {
    const { name, value, checked } = e.target;

    if (name === 'from' || name === 'to') {
      this.setState({ [name]: checked ? checked : value }, () =>
        this.getAdminStats()
      );
    } else {
      this.setState({ [name]: checked ? checked : value });
    }
  };

  async getAdminStats() {
    const { from, to } = this.state;
    if (from && to) {
      this.setState({ activity: true });

      try {
        const response = await apiServices.getAdminStats({
          from: 1546354380000, //  moment(from).valueOf(),
          to: 1565189580000 // moment(to).valueOf()
        });

        this.buildChartData(response.data);
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  }

  buildChartData(data) {
    const chartData = {
      datasets: []
    };

    chartData.labels = [
      moment(this.state.from).format('D MMMM YYYY'),
      moment(this.state.to).format('D MMMM YYYY')
    ];

    Object.keys(data).forEach(key => {
      if (this.state[key]) {
        chartData.datasets.push({
          label: key,
          data: [0, data[key]],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 3,
          fill: false
        });
      }
    });

    this.setState({ chartData, chartStats: data, activity: false });
  }

  render() {
    return (
      <DashboardComponent
        {...this.state}
        handleRowClick={this.handleRowClick}
        handleChange={this.handleChange}
      />
    );
  }
}

DashboardContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};

// {
//   labels: [
//     'Red',
//     'Blue',
//     'Yellow',
//     'Green',
//     'Purple',
//     'Orange'
//   ],
//   datasets: [
// {
//   label: '# of Votes',
//   data: [12, 19, 3, 5, 2, 3],
//   backgroundColor: 'rgba(255, 206, 86, 0.2)',
//   borderColor: 'rgba(153, 102, 255, 1)',
//   borderWidth: 3,
//   fill: false
// }
//     // {
//     //   label: 'Votes',
//     //   data: [2, 21, 6, 5, 1, 3],
//     //   // backgroundColor: [
//     //   //   'rgba(255, 99, 132, 0.2)',
//     //   //   'rgba(54, 162, 235, 0.2)',
//     //   //   'rgba(255, 206, 86, 0.2)',
//     //   //   'rgba(75, 192, 192, 0.2)',
//     //   //   'rgba(153, 102, 255, 0.2)',
//     //   //   'rgba(255, 159, 64, 0.2)'
//     //   // ],
//     //   borderColor: [
//     //     'rgba(255, 99, 132, 1)',
//     //     'rgba(54, 162, 235, 1)',
//     //     'rgba(255, 206, 86, 1)',
//     //     'rgba(75, 192, 192, 1)',
//     //     'rgba(153, 102, 255, 1)',
//     //     'rgba(255, 159, 64, 1)'
//     //   ],
//     //   borderWidth: 1
//     // }
//   ]
// }
