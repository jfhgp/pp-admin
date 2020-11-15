import React, { Component } from 'react';

import apiServices from '../../../service/RequestHandler';
import PromotionsListComponent from './PromotionsListComponent';

export default class PromotionsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      isDialogVisible: false,
      dialogData: undefined,

      activity: true
    };
  }

  componentDidMount() {
    this.getAllPromotions();
  }

  async getAllPromotions() {
    try {
      const result = await apiServices.getAllPromotions();
      this.setState({ activity: false, promotions: result.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  change(key, value) {
    this.setState({ [key]: value });
  }

  handleDialogVisibility = (value, comp, data) => {
    this.setState({
      isDialogVisible: typeof value === 'boolean' ? value : false,
      dialogData: { comp: typeof comp === 'function' ? comp : () => null, data }
    });
  };

  handleSetPromotions = promotions => {
    this.setState({ promotions, isDialogVisible: false });
  };

  render() {
    return (
      <PromotionsListComponent
        {...this.state}
        handleDialogVisibility={this.handleDialogVisibility}
        handleSetPromotions={this.handleSetPromotions}
      />
    );
  }
}
