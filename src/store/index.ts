import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from '../redux/middlewares';
import thunk from 'redux-thunk';

import reducers from '../redux';

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const configureStore = () => {
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk, apiMiddleware))
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../redux', () => store.replaceReducer(reducers));
  }
  return store;
};

export default configureStore;
