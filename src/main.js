var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
import { Router } from 'react-router';
import routes from 'routes';
import { createHashHistory, useBasename } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import { routeReducer } from 'redux-simple-router';
var configureStore = require('./stores/configureStore');

// Run our app under the /base URL.
const history = useBasename(createHashHistory)({
  basename: '/',
});
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store);

ReactDOM.render
(
  <Provider store={store}>
  	<Router history={history}>
      {routes}
    </Router>
  </Provider>,
   document.getElementById('root')
);
