import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { GlobalStyles } from './GlobalStyles';
import configureStore from './store';
import { AuthContextProvider } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import App from './App';

const store = configureStore();

const renderApp = () =>
  ReactDOM.render(
    <Provider store={store}>
      <AuthContextProvider>
        <NotificationsProvider>
          <GlobalStyles />
          <App />
        </NotificationsProvider>
      </AuthContextProvider>
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp);
}

renderApp();
