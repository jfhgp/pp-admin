import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';

export default class PromotionsExpireContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activity: false };
  }

  handleSubmit = async () => {
    this.setState({ activity: true });
    try {
      const result = await apiServices.expirePromotions({
        _id: this.props.data._id
      });

      if (result.status === 200) {
        const promotions = [...this.props.promotions];
        for (let index = 0; index < promotions.length; index++) {
          if (promotions[index]._id === this.props.data._id) {
            promotions[index].expired = true;
            break;
          }
        }

        this.props.setPromosFunc(promotions);
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { activity } = this.state;
    return (
      <Page activity={activity} style={{ minHeight: 'unset' }}>
        <DialogContent>
          <div>
            <Typography variant="h6">Confirm</Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              Are you sure you want to force expire promotion code{' '}
              <span style={{ fontWeight: 'bold' }}>
                {this.props.data.code.toUpperCase()}
              </span>{' '}
              ?
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={activity} onClick={this.props.closeDialog}>
            Back
          </Button>
          <Button
            color="secondary"
            disabled={activity}
            onClick={this.handleSubmit}
          >
            Expire
          </Button>
        </DialogActions>
      </Page>
    );
  }
}

PromotionsExpireContainer.propTypes = {
  closeDialog: PropTypes.func,
  setPromosFunc: PropTypes.func,
  promotions: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.shape({ code: PropTypes.string, _id: PropTypes.string })
};
