import { Middleware, Dispatch, AnyAction } from 'redux';

import api from '../../api';

import { ApiAction } from '../types';

export interface EnhancedAction {
  type: string;
  payload?: any;
  response?: string;
  requestPayload?: any;
  requestUrl?: string;
}

export const apiMiddleware: Middleware = () => (next: Dispatch) => async (
  action: ApiAction | AnyAction
) => {
  const callAPI = action.callApi;

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const actionWith = (dataObj: EnhancedAction) => {
    const { type } = action;
    const finalAction = { type, ...dataObj };
    return finalAction;
  };

  const { url, method, data, successMessage, errorMessage } = callAPI;
  const { type } = action;

  next(actionWith({ type: type + '_REQUEST' }));

  try {
    const response = await api({ method, url, data });
    next(
      actionWith({
        type: type + '_SUCCESS',
        payload: response.data,
        requestPayload: data,
        requestUrl: url,
      })
    );
    successMessage && successMessage();
  } catch (error) {
    const response = error.response;
    const {
      status,
      data: { message },
    } = response;
    const errStatus = status === 401 || status === 403;

    if (response && errStatus) {
      location.replace('/signin');
      localStorage.removeItem('token');
    }

    errorMessage && errorMessage(message, 'error');

    next(
      actionWith({
        type: type + '_FAILURE',
        response: response,
        requestPayload: data,
        requestUrl: url,
      })
    );
  }
};
