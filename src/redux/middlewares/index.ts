// import axios from 'axios';
import api from '../../api';
import history from '../../history/history';
import {
  Middleware,
  MiddlewareAPI,
  applyMiddleware,
  createStore,
  Dispatch,
  Reducer,
  Action,
  AnyAction
} from 'redux';

export const CALL_API = 'CALL_API';

interface CallApiAction {
  type: string;
  method: string;
  url: string;
  data?: any;
  successMessage: (message: string, messageType: string) => void;
  errorMessage: (message: string, messageType: string) => void;
}

export const apiMiddleware: Middleware<Dispatch> = () => (
  next: Dispatch
) => async (action: AnyAction | CallApiAction) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  const { url, type, method, data, successMessage, errorMessage } = callAPI;

  const actionWith = dataObj => {
    const finalAction = { ...action, ...dataObj };
    delete finalAction[CALL_API];
    return finalAction;
  };

  next(actionWith({ type: type + '_REQUEST' }));

  try {
    const response = await api({ method, url, data });
    next(
      actionWith({
        type: type + '_SUCCESS',
        payload: response.data,
        requestPayload: data,
        requestUrl: url
      })
    );

    successMessage && successMessage();
  } catch (error) {
    const response = error.response;

    if (response && response.status === 401) {
      history.push('/signin');
      localStorage.removeItem('token');
    }

    console.log(errorMessage);

    errorMessage && errorMessage();

    next(
      actionWith({
        type: type + '_FAILURE',
        response: error.response,
        requestPayload: data,
        requestUrl: url
      })
    );
  }
};
