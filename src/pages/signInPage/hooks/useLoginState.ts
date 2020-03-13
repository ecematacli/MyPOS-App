import { useContext } from 'react';

import api from '../../../api';
import { FormValues } from '../index';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
import { NotificationsContext } from '../../../contexts/NotificationsContext';
import useAsyncError from '../../../common/hooks/useAsyncError';

interface Field {
  label: string;
  name: string;
}

export type SigninFields = Field[];

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
        active && saveAuthToken();
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

  const SIGNIN_FIELDS: SigninFields = [
    {
      label: 'Email Address*',
      name: 'email'
    },
    {
      label: 'Password*',
      name: 'password'
    }
  ];

  return {
    postSignInForm,
    SIGNIN_FIELDS
  };
};
