import { Middleware, Dispatch, AnyAction } from 'redux';

import api from '../../api';

export const CALL_API = 'CALL_API';
export interface CallApiAction {
  type: string;
  method: string;
  url: string;
  data?: any;
  successMessage?: (message: string, messageType: string) => void;
  errorMessage?: (message: string, messageType: string) => void;
}

export interface EnhancedAction {
  type: string;
  payload?: any;
  response?: string;
  requestPayload?: any;
  requestUrl?: string;
}

export const apiMiddleware: Middleware = () => (next: Dispatch) => async (
  action: CallApiAction | AnyAction
) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  const { url, type, method, data, successMessage, errorMessage } = callAPI;

  const actionWith = (dataObj: EnhancedAction) => {
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
    const { status } = response;

    const errStatus = status === 401 || status === 403;

    if (response && errStatus) {
      location.replace('/signin');
      localStorage.removeItem('token');
    }

    errorMessage && errorMessage();

    next(
      actionWith({
        type: type + '_FAILURE',
        response: response,
        requestPayload: data,
        requestUrl: url
      })
    );
  }
};
