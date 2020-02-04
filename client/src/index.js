import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './redux';
import { AuthContextProvider } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { GlobalStyles } from './globalStyles';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <NotificationsProvider>
        <App />
        <GlobalStyles />
      </NotificationsProvider>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
