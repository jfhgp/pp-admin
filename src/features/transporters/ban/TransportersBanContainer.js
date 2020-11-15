import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { Button } from 'primereact/button';

import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';

export default class TransportersBanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activity: false };
  }

  handleSubmit = async () => {
    this.setState({ activity: true });
    try {
      const result = await apiServices.banTransporter({
        transporter: this.props.data._id,
        banned: !this.props.data.banned
      });
      if (result.status === 200) {
        this.props.handleDetailsAfterAction({ banned: result.data.banned });
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { activity } = this.state;
    const { data } = this.props;
    return (
      <Page activity={activity} style={{}} className=" ">
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            {data.banned
              ? 'Are you sure you want to approve transporter '
              : 'Are you sure you want to ban transporter '}
            <strong>
              {data.firstName} {data.lastName}
            </strong>{' '}
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            label="Go Back"
            disabled={activity}
            className="p-button-secondary"
            onClick={() =>
              this.props.handleChange('dialogData', {
                comp: TransportersBanContainer,
                show: false
              })
            }
          />
          <Button
            label={data.banned ? 'APPROVE' : 'BAN'}
            className={data.banned ? '' : 'p-button-danger'}
            disabled={activity}
            onClick={this.handleSubmit}
            style={{ marginLeft: '1rem' }}
          />
        </DialogActions>
      </Page>
    );
  }
}

TransportersBanContainer.propTypes = {
  handleChange: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  data: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    banned: PropTypes.bool
  })
};
