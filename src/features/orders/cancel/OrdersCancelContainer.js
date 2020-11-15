import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { Button } from 'primereact/button';

import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';
import FormInput from '../../../components/form/FormInput';

export default class OrdersCancelContainer extends Component {
  static propTypes = {
    handleChange: PropTypes.func,
    handleDetailsAfterAction: PropTypes.func,
    details: PropTypes.shape({
      _id: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = { activity: false, cancellationReason: '' };
  }

  handleSubmit = async () => {
    if (this.state.cancellationReason) {
      this.setState({ activity: true });
      try {
        const response = await apiServices.cancelOrder({
          _id: this.props.details._id,
          cancellationReason: this.state.cancellationReason
        });
        const data = response.data.data;
        const newDetails = { ...this.props.details };
        newDetails.status = data.status;
        newDetails.cancellationReason = data.cancellationReason;
        this.props.handleDetailsAfterAction(newDetails);
        this.setState({ activity: false });
      } catch (error) {
        this.setState({ activity: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleInputChange = e => {
    this.setState({ cancellationReason: e.target.value, error: false });
  };

  handleGoBack = () => {
    this.props.handleDetailsAfterAction(this.props.details);
  };

  render() {
    const { activity, cancellationReason, error } = this.state;

    return (
      <Page
        activity={activity}
        style={{ minHeight: 'unset' }}
        className="layout-page order-cancel"
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cancel order # {this.props.details._id} ?
          </DialogContentText>
          <div style={{ marginTop: 20 }}>
            <FormInput
              label="Cancellation Reason"
              value={cancellationReason}
              onChange={this.handleInputChange}
              textArea
              error={error}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            label="Go Back"
            disabled={activity}
            className="p-button-secondary"
            onClick={this.handleGoBack}
          />
          <Button
            label="Cancel Order"
            className="p-button-danger"
            disabled={activity}
            onClick={this.handleSubmit}
            style={{ marginLeft: 20 }}
          />
        </DialogActions>
      </Page>
    );
  }
}
