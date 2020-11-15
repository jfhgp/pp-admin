import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';

import { authClass } from './utils/auth.util';

/** Store **/
import { StoreProvider } from './utils/store.util';

/** Route Constants **/
import routeConstants from './constants/route-constants';

/** components **/
// Layout
import AppLayout from './components/layout/AppLayout';
// Not Found
import NotFound from './components/layout/NotFound';
// Login
import Login from './features/auth/Login';
// Growl
import GrowlComponent from './components/ui/GrowlComponent';

import './layout/layout.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { shouldRender: false };
  }

  async componentDidMount() {
    await authClass.setUserFromLocal();
    this.setState({ shouldRender: true });
  }

  render() {
    return this.state.shouldRender ? (
      <StoreProvider>
        <div>
          <GrowlComponent />
          <Switch>
            {/** Login */}
            <Route path={routeConstants.login} exact component={Login} />
            {/** Not found */}
            <Route path={routeConstants.notFound} component={NotFound} />
            {/** Layout */}
            <Route component={AppLayout} />
          </Switch>
        </div>
      </StoreProvider>
    ) : null;
  }
}

export default App;
