import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Divider, Button } from '@material-ui/core';

import routeConstants from '../constants/route-constants';
import { getNewColors } from '../utils/functions';
import { RestrictedLink } from '../utils/permissions.utils';
import features from '../constants/feature-constants';
import actions from '../constants/actions-constants';

const OrderCard = props => {
  const { item } = props;
  const user = item.user || {};

  return (
    <div className="order-card">
      <p>#{item.orderNumber}</p>
      <p>
        Customer:{' '}
        <span>
          {user.firstName} {user.lastName}
        </span>
      </p>
      <p>{moment(item.pickupDate).format('DD MMM, YYYY')}</p>
      <p>{item.deliveryType.toUpperCase()}</p>
      <p style={{ color: getNewColors(item.status) }}>
        {item.status.toUpperCase()}
      </p>
      <Divider style={{ marginTop: 7 }} />
      <div>
        <RestrictedLink
          to={`${routeConstants.orders}/details/${item._id}`}
          featureAndAction={{ feature: features.orders, action: actions.read }}
        >
          <Button style={{ color: getNewColors('secondary') }}>
            + View Details
          </Button>
        </RestrictedLink>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    pickupDate: PropTypes.string,
    deliveryType: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.shape()
  })
};

export default OrderCard;
