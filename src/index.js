import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';

// font-awesome
import '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ScrollToTop>
  </HashRouter>,
  document.getElementById('root')
);

//registerServiceWorker();
