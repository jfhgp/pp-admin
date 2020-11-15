import React from 'react';
import { Route } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import Rates from './list/RatesListContainer';

const RatesRoutes = () => {
  return <Route path={routeConstants.rates} exact component={Rates} />;
};

export default RatesRoutes;
