import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider, Menu, MenuItem, Button } from '@material-ui/core';
import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';
import TransporterCardComponent from '../components/TransporterCardComponent';

export default class AssignTransporterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearby: [],
      activity: false,
      anchorEl: null,
      transporterId: false
    };
    this.nearbyRequestCount = 0;
  }

  handleGetNearbyTransporters = async () => {
    this.setState({ activity: true });
    this.nearbyRequestCount = 1;
    try {
      const result = await apiServices.getNearbyTransporters({
        location: this.props.details.pickup.location
      });
      if (result.data.status === 200) {
        const activeTransporters = result.data.data.reduce((prev, item) => {
          if (item.active) {
            prev.push(item);
          }
          return prev;
        }, []);

        this.setState({ nearby: activeTransporters, activity: false });
      } else {
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  assignTransporter = async () => {
    if (this.state.transporterId && !this.state.activity) {
      this.setState({ activity: true });
      try {
        const result = await apiServices.assignOrder({
          _id: this.props.details._id,
          status: 'accepted',
          transporter: this.state.transporterId
        });

        if (result.data.status === 200) {
          this.setState({ anchorEl: null, transporterId: false });
          this.props.handleGetDetails();
        } else {
          this.setState({ activity: false });
        }
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleClick = (event, _id) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget, transporterId: _id });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, transporterId: false });
  };

  handleGoBack = () => {
    this.props.handleDetailsAfterAction(this.props.details);
  };

  render() {
    const { nearby, activity } = this.state;
    return (
      <Page
        activity={activity}
        style={{ minHeight: 'unset' }}
        className="layout-page assign-transporter-page"
      >
        <div>
          <p>#{this.props.details.orderNumber}</p>
          <button onClick={this.handleGoBack}>
            <i className="fas fa-times" />
          </button>
        </div>
        <Divider style={{ margin: '0 1rem' }} />
        <div className="p-grid" style={{ padding: '1rem', margin: 0 }}>
          <div
            className="p-col-12 text-right"
            style={{ padding: '0 0 1rem 0' }}
          >
            <Button
              disabled={activity}
              onClick={this.handleGetNearbyTransporters}
            >
              Nearby Transporters
            </Button>
          </div>
          <div className="p-col-12" style={{ padding: '0 0 1rem 0' }}>
            <Divider style={{ margin: 0 }} />
          </div>
          {nearby.length
            ? nearby.map(item => {
                return (
                  <div
                    key={item._id}
                    className="p-col-12 p-lg-4"
                    style={{ cursor: 'pointer', padding: 0 }}
                  >
                    <TransporterCardComponent
                      item={item}
                      onClick={e => this.handleClick(e, item._id)}
                    />
                  </div>
                );
              })
            : null}
        </div>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MenuItem onClick={this.assignTransporter}>
            Assign Transporter
          </MenuItem>
        </Menu>
      </Page>
    );
  }
}

AssignTransporterComponent.propTypes = {
  handleChange: PropTypes.func,
  handleGetDetails: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    orderNumber: PropTypes.number,
    pickup: PropTypes.shape({ location: PropTypes.array })
  })
};
