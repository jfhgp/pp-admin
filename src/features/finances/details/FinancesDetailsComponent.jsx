import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Divider, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

import Page from '../../../components/layout/Page';
import OrderCard from '../../../components/OrderCard';
import { getNewColors, getFinancesColors } from '../../../utils/functions';

const FinancesDetailsComponent = props => {
  const { details, activity } = props;
  const transporter = details.transporter;
  const orders = details.orders || {};

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: '0 1rem' }}
      style={{}}
    >
      <div className="p-grid finances-details-container">
        <div className="p-col-12">
          <Typography variant="h5">Finance Details</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div>Finances</div>
            <div style={{ color: getNewColors('secondary') }}>Details</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12">
          <div>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <p>#{details._id}</p>
                <span
                  style={{ backgroundColor: getFinancesColors(details.status) }}
                >
                  {details.status}
                </span>
              </div>
              <div
                style={{
                  marginBottom: '1rem'
                }}
              >
                <p style={{ margin: 0 }}>
                  {transporter.config.currency}{' '}
                  <strong>{details.amount}</strong>
                </p>
                {details.status === 'pending' ? (
                  <Button disabled={activity} onClick={props.handlePayClick}>
                    PAY
                  </Button>
                ) : null}
              </div>
            </div>
            <Divider style={{ marginBottom: '1rem' }} />
            <div>
              <Typography variant="subtitle2">
                {transporter.firstName} {transporter.lastName}
              </Typography>
              <Typography variant="body1">{transporter.email}</Typography>
              <Typography variant="body1">{transporter.mobile}</Typography>
            </div>
          </div>
        </div>
        {orders.length
          ? orders.map(order => {
              return (
                <div key={order._id} className="p-col-12 p-md-6 p-lg-4">
                  <OrderCard item={order} activity={props.activity} />
                </div>
              );
            })
          : null}
      </div>
    </Page>
  );
};

FinancesDetailsComponent.defaultProps = {
  details: {
    _id: '',
    status: 'pending',
    amount: 0,
    transporter: {
      firstName: '-',
      lastName: '',
      email: '-',
      mobile: '-',
      config: {}
    },
    orders: []
  }
};

FinancesDetailsComponent.propTypes = {
  activity: PropTypes.bool,
  handlePayClick: PropTypes.func,
  details: PropTypes.shape()
};

export default FinancesDetailsComponent;
