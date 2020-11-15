import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, DialogContent, TextField } from '@material-ui/core';

import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';

const INITIAL_STATE = { name: '', activity: false, error: false };

export default class CategoriesAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit = async () => {
    if (this.state.name) {
      this.setState({ activity: true });
      try {
        const response = await apiServices.addCategory({
          name: this.state.name
        });

        if (response.data.status === 200) {
          const categories = [...this.props.categories];
          categories.push(response.data.data);
          this.props.handleCategories(categories);
        } else {
          this.setState({ activity: false });
        }
      } catch (error) {
        this.setState({ activity: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleChange = e => this.setState({ name: e.target.value, error: false });

  render() {
    const { activity, name, error } = this.state;
    return (
      <Page activity={activity} style={{ minHeight: 'unset' }}>
        <DialogContent>
          <div className="p-grid" style={{ margin: 0 }}>
            <div className="p-col-12">
              <TextField
                label="Name"
                value={name}
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                error={error}
              />
            </div>
            <div className="p-col-12 text-right">
              <Button
                variant="contained"
                color="primary"
                disabled={activity}
                onClick={this.handleSubmit}
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Page>
    );
  }
}

CategoriesAddContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()),
  handleCategories: PropTypes.func
};
