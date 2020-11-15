import React from 'react';
import { Route, Switch } from 'react-router-dom';

/** Route Constants **/
import routeConstants from '../../constants/route-constants';

import UsersList from './list/UsersListContainer';
import UsersProfile from './profile/UsersProfileContainer';

const UsersRoutes = () => {
  return (
    <Switch>
      <Route path={routeConstants.users} exact component={UsersList} />
      <Route
        path={`${routeConstants.users}/:id`}
        exact
        component={UsersProfile}
      />
    </Switch>
  );
};

export default UsersRoutes;
