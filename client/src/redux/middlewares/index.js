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
  const { url, type, method, data } = callAPI;

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
  } catch (error) {
    const response = error.response;
    if (response && response.status === 401) {
      history.push('/signin');
      localStorage.removeItem('token');
    }
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

//

// export const detachSourceFromOperator = (
//   feedOperatorId: string
// ): CallApiAction => ({
//   [CALL_API]: {
//     type: ActionType.detachSourceFromOperator,
//     method: RequestMethod.post,
//     url: `${ADMIN_URL}/feed-operators/${feedOperatorId}/detach-from-operator`,
//     notification: {
//       notification: 'Source successfully detached from operator',
//       type: NotificationType.success
//     }
//   }
// });

// import axios from 'axios';
// import { CallApiActionBody, ApiAction, ActionType } from '../actions/types';
// import {
//   removeTokens,
//   setRedirectUrl,
//   getAccessToken,
//   getAuthHeader,
//   getUserIdHeader
// } from '../../utils/auth';
// import { history } from '../../common/history';
// import { Store } from 'redux';

// export const CALL_API = 'CALL_API';

// export default (store: Store) => next => async (action: ApiAction) => {
//   const callAPI: CallApiActionBody = action[CALL_API];
//   if (typeof callAPI === 'undefined') {
//     return next(action);
//   }

//   const { url, type, method, data, notification } = callAPI;

//   const actionWith = data => {
//     const finalAction = Object.assign({}, action, data);
//     delete finalAction[CALL_API];
//     return finalAction;
//   };

//   next(actionWith({ type: type + '_REQUEST' }));

//   try {
//     const res = await axios({ method, url, data, headers: getUserIdHeader() });
//     next(
//       actionWith({
//         type: type + '_SUCCESS',
//         payload: res.data,
//         requestPayload: data,
//         requestUrl: url,
//         notification
//       })
//     );
//   } catch (error) {
//     const res = error.response;
//     if (res && res.status === 401) {
//       setRedirectUrl(history.location.pathname);
//       axios
//         .post('/api/logout', null, { headers: getUserIdHeader() })
//         .then(res => {
//           localStorage.removeItem('user_id');
//           history.push('/login');
//           next({
//             type: ActionType.logout + '_SUCCESS',
//             notification: {
//               notification: 'Your session has expired. Please sign in again.'
//             }
//           });
//         });
//     }
//     next(
//       actionWith({
//         type: type + '_FAILURE',
//         response: error.response,
//         requestPayload: data,
//         requestUrl: url
//       })
//     );
//   }
// };
