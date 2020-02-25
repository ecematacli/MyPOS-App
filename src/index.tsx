import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './redux';
import ErrorBoundary from './common/components/errorBoundary/ErrorBoundary';
import { apiMiddleware } from './redux/middlewares';
import { AuthContextProvider } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { GlobalStyles } from './GlobalStyles';

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, apiMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <NotificationsProvider>
        <GlobalStyles />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </NotificationsProvider>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
