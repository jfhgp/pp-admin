import React from 'react';
import { Route } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import PromotionsList from './list/PromotionsListContainer';

const PromotionsRoutes = () => {
  return (
    <Route path={routeConstants.promotions} exact component={PromotionsList} />
  );
};

export default PromotionsRoutes;
