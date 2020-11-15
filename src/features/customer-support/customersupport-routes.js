import React from 'react';
import { Route } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import CustomerSupportListContainer from './list/CustomerSupportListContainer';

const CustomerSupportRoutes = () => {
  return (
    <Route path={routeConstants.customerSupport} exact component={CustomerSupportListContainer} />
  );
};

export default CustomerSupportRoutes;
