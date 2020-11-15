import React, { Component } from 'react';

import apiServices from '../../../service/RequestHandler';
import TransportersListComponent from './TransportersListComponent';

export default class TransportersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transporters: [],
      categories: [],
      categoriesId: null,
      activity: true,
      current: [],
      filter: 'all',
      search: '',
      ageValue: { min: null, max: null },
      completedRequestValue: { min: null, max: null }
    };

    this.searchTimeout = null;
  }

  componentDidMount() {
    this.getAllTransporters();
    this.getCategories();
  }

  async getAllTransporters() {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }
    try {
      const response = await apiServices.getAllTransporters();
      if (response.data.status === 200) {
        this.setState({
          transporters: response.data.data,
          current: response.data.data,
          activity: false
        });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  getCategories = async () => {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }
    try {
      const response = await apiServices.getAllCategories();
      this.setState({ activity: false, categories: response.data.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleClearFilters = () => {
    this.setState({
      categoriesId: null,
      activity: true,
      current: [],
      filter: 'all',
      search: '',
      ageValue: { min: null, max: null },
      completedRequestValue: { min: null, max: null }
    }, () => { this.getAllTransporters() })
  }

  getfilterTransporter = async () => {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }
    const props = {
      minAge: this.state.ageValue.min,
      maxAge: this.state.ageValue.max,
      minRequests: this.state.completedRequestValue.min,
      maxRequests: this.state.completedRequestValue.max,
      itemType: this.state.categoriesId
    }
    try {
      const response = await apiServices.transporterFilter(props);
      console.log("This is the filter transporter request", response.data)
      this.setState({ activity: false, transporters: response.data.data, current: response.data.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleFilterChange = e => {
    const filter = e.target.value;

    if (filter === 'all') {
      this.setState({ current: this.state.transporters, filter });
    } else {
      const current = this.state.transporters.reduce((prev, item) => {
        if (item[filter]) {
          prev.push(item);
        }
        return prev;
      }, []);

      this.setState({ current, filter });
    }
  };

  handleRangeChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleRangeChangeComplete = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => { this.getfilterTransporter(); });

  }

  handleSearchChange = e => {
    debugger;
    clearTimeout(this.searchTimeout);
    const { value } = e.target;
    this.setState({ search: value });

    this.searchTimeout = setTimeout(async () => {
      if (value) {
        this.setState({ activity: true });

        try {
          const response = await apiServices.searchTransporter({ value });
          this.setState({
            transporters: response.data,
            current: response.data,
            filter: 'all',
            activity: false
          });
        } catch (error) {
          this.setState({ activity: false });
        }
      } else {
        this.getAllTransporters();
      }
    }, 1000);
  };

  render() {
    return (
      <TransportersListComponent
        {...this.state}
        handleSearchChange={this.handleSearchChange}
        handleFilterChange={this.handleFilterChange}
        handleRangeChange={this.handleRangeChange}
        handleRangeChangeComplete={this.handleRangeChangeComplete}
        handleOnChange={this.handleOnChange}
        handleClearFilters={this.handleClearFilters}
      />
    );
  }
}
