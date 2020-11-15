import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography, DialogContent, DialogActions } from '@material-ui/core';
import { Button } from 'primereact/button';

import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';

export default class UsersBanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activity: false };
  }

  handleSubmit = async () => {
    this.setState({ activity: true });

    try {
      const response = await apiServices.banUser({
        _id: this.props.data._id,
        banned: !this.props.data.banned
      });

      this.props.handleDetailsAfterAction({ banned: response.data.banned });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { activity } = this.state;
    const { data } = this.props;
    return (
      <Page activity={activity} style={{ minHeight: 'unset' }}>
        <DialogContent>
          <div>
            <div>
              <Typography variant="h6">Confirm</Typography>
            </div>
            <div>
              <Typography variant="subtitle1">
                {data.banned
                  ? 'Are you sure you want to approve user '
                  : 'Are you sure you want to ban user '}
                <span style={{ fontWeight: 'bold' }}>
                  {data.name ||
                    `${data.firstName} ${data.lastName}` ||
                    'Full Name'}
                </span>{' '}
                ?
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            label="Back"
            className="p-button-secondary"
            disabled={activity}
            onClick={() => this.props.handleDetailsAfterAction({})}
          />
          <Button
            label={!data.banned ? 'BAN' : 'APPROVE'}
            className={!data.banned ? 'p-button-danger' : ''}
            disabled={activity}
            onClick={this.handleSubmit}
            style={{
              marginLeft: '1rem'
            }}
          />
        </DialogActions>
      </Page>
    );
  }
}

UsersBanContainer.propTypes = {
  handleDetailsAfterAction: PropTypes.func,
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    banned: PropTypes.bool
  })
};
