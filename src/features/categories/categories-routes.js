import React from 'react';
import { Route } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import Categories from './list/CategoriesListContainer';

const CategoriesRoutes = () => {
  return (
    <Route path={routeConstants.categories} exact component={Categories} />
  );
};

export default CategoriesRoutes;
