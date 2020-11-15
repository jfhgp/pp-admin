import React from 'react';
import { Route, Switch } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import TransportersList from './list/TransportersListContainer';
import TransportersProfile from './profile/TrasportersProfileContainer';

const OrdersRoutes = () => {
  return (
    <Switch>
      <Route
        path={routeConstants.transporters}
        exact
        component={TransportersList}
      />
      <Route
        path={`${routeConstants.transporters}/:id`}
        exact
        component={TransportersProfile}
      />
    </Switch>
  );
};

OrdersRoutes.propTypes = {};

export default OrdersRoutes;
