import { useContext } from 'react';

import api from '../../../api';
import { FormValues } from '../index';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
import { NotificationsContext } from '../../../contexts/NotificationsContext';
import useAsyncError from '../../../common/hooks/useAsyncError';

export default () => {
  const throwError = useAsyncError();
  const { saveAuthToken } = useContext(AuthTokenSettingContext);
  const { addNotification } = useContext(NotificationsContext);

  const postSignInForm = async (userCredentials: FormValues) => {
    let active = true;

    try {
      const response = await api.post<string>('/login', userCredentials);
      if (response) {
        active && saveAuthToken(response.data);
      } else {
        active && saveAuthToken(null);
      }
    } catch (e) {
      const { status } = e.response;
      if (status === 400 || status === 401 || status === 403) {
        const errorMessage =
          'There was a problem logging in. Check your email and password!';
        addNotification(errorMessage, 'error');
      } else {
        throwError(new Error(e));
      }
    }
    return () => {
      active = false;
    };
  };

  return { postSignInForm };
};
