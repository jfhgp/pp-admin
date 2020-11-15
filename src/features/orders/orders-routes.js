import React from 'react';
import { Route, Switch } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import OrdersList from './list/OrdersListContainer';
import OrderDetails from './details/OrdersDetailsContainer';

const OrdersRoutes = () => {
  return (
    <Switch>
      <Route
        path={`${routeConstants.orders}/:status?`}
        exact
        component={OrdersList}
      />
      <Route
        path={`${routeConstants.orders}/details/:id`}
        exact
        component={OrderDetails}
      />
    </Switch>
  );
};

export default OrdersRoutes;
