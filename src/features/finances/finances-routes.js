import React from 'react';
import { Route, Switch } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import FinancesList from './list/FinancesListContainer';
import FinancesDetails from './details/FinancesDetailsContainer';

const OrdersRoutes = () => {
  return (
    <Switch>
      <Route path={routeConstants.finance} exact component={FinancesList} />
      <Route
        path={`${routeConstants.finance}/:id`}
        exact
        component={FinancesDetails}
      />
    </Switch>
  );
};

export default OrdersRoutes;
