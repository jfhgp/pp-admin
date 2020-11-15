import React, { Component } from 'react';

import apiServices from '../../../service/RequestHandler';
import CategoriesListComponent from './CategoriesListComponent';

export default class CategoriesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      showDialog: false,
      activity: true
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    try {
      const response = await apiServices.getAllCategories();
      if (response.data.status === 200) {
        this.handleCategories(response.data.data);
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleCategories = categories => {
    this.setState({ categories, activity: false, showDialog: false });
  };

  handleApproveCategory = async (category) => {
    debugger;
    const props = {
      _id: category._id,
      approved: true
    }
    try {
      const response = await apiServices.updateCategory(props);
      console.log("THis is all data", response.data)
      this.setState({ activity: false });
      this.getCategories();

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <CategoriesListComponent
        {...this.state}
        handleChange={this.handleChange}
        handleCategories={this.handleCategories}
        handleApproveCategory={this.handleApproveCategory}
      />
    );
  }
}
