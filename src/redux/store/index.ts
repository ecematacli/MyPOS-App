import { createStore, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from '../middlewares'
import thunk from 'redux-thunk'

import { appReducer } from '../reducers'

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose

const configureStore = () => {
  const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk, apiMiddleware))
  )

  return store
}

export default configureStore
