import React, { Component } from 'react';

import apiServices from '../../../service/RequestHandler';
import UsersListComponent from './UsersListComponent';

export default class UsersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      current: [],
      categories: [],
      categoriesId: null,
      filter: 'all',
      search: '',
      activity: true
    };

    this.searchTimeout = null;
  }

  componentDidMount() {
    this.getAllUsers();
    this.getCategories();
  }

  async getAllUsers() {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }
    try {
      const response = await apiServices.getUsers();
      this.setState({
        users: response.data,
        current: response.data,
        activity: false
      });
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
    }, () => { this.getAllUsers() })
  }

  getfilterUser = async () => {
    if (!this.state.activity) {
      this.setState({ activity: true });
    }
    const props = {
      itemType: this.state.categoriesId
    }
    try {
      const response = await apiServices.filterUser(props);
      this.setState({
        users: response.data.data,
        current: response.data.data,
        filter: 'all',
        activity: false
      });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleFilterChange = e => {
    debugger;
    const filter = e.target.value;

    if (filter === 'all') {
      this.setState({ current: this.state.users, filter });
    } else {
      const current = this.state.users.reduce((prev, item) => {
        if (item[filter]) {
          prev.push(item);
        }
        return prev;
      }, []);

      this.setState({ current, filter });
    }
  };

  handleSearchChange = e => {
    clearTimeout(this.searchTimeout);
    const { value } = e.target;
    this.setState({ search: value });

    this.searchTimeout = setTimeout(async () => {
      if (value) {
        this.setState({ activity: true });

        try {
          const response = await apiServices.searchUser({ value });
          this.setState({
            users: response.data,
            current: response.data,
            filter: 'all',
            activity: false
          });
        } catch (error) {
          this.setState({ activity: false });
        }
      } else {
        this.getAllUsers();
      }
    }, 1000);
  };

  handleRangeChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => { this.getfilterUser(); });
  }

  render() {
    return (
      <UsersListComponent
        {...this.state}
        handleSearchChange={this.handleSearchChange}
        handleFilterChange={this.handleFilterChange}
        handleRangeChange={this.handleRangeChange}
        handleClearFilters={this.handleClearFilters}
      />
    );
  }
}
