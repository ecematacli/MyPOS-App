// import axios from 'axios';
import api from '../../api';
import history from '../../history/history';

export const CALL_API = 'CALL_API';

export default store => next => async action => {
  const callAPI = action[CALL_API];

  console.log(action);

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
    console.log('ERROR CASE>>>>', error);
    console.log('errorMessage', errorMessage());
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
