import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ThemeProvider } from '@material-ui/styles';
import thunk from 'redux-thunk';

import rootReducer from '../redux/index';
import { apiMiddleware } from '../redux/middlewares';
import { NotificationsContext } from '../contexts/NotificationsContext';
import theme from '../theme';

export const render = (ui: any, initialStore = {}, options = {}) => {
  const store = createStore(
    rootReducer,
    initialStore,
    applyMiddleware(thunk, apiMiddleware)
  );
  const Providers = ({ children }: any) => (
    <NotificationsContext.Provider
      value={{
        notifications: null,
        removeNotification: null,
        addNotification: jest.fn(),
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </NotificationsContext.Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};
