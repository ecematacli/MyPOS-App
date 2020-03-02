import api from '../../api';
import history from '../../history';
import { Middleware, Dispatch, AnyAction } from 'redux';

export const CALL_API = 'CALL_API';

export interface CallApiAction {
  type: string;
  method: string;
  url: string;
  data?: any;
  successMessage?: (message: string, messageType: string) => void;
  errorMessage?: (message: string, messageType: string) => void;
}

interface Data {
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

  const actionWith = (dataObj: Data) => {
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

    if ((response && response.status === 400) || response.status === 401) {
      history.push('/signin');
      localStorage.removeItem('token');
    }

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
