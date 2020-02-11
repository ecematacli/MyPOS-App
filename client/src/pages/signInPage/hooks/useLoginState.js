import { useContext } from 'react';

import api from '../../../api';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
import { NotificationsContext } from '../../../contexts/NotificationsContext';

export default () => {
  const { saveAuthToken } = useContext(AuthTokenSettingContext);
  const { addNotification } = useContext(NotificationsContext);

  const postSignInForm = async userCredentials => {
    let active = true;

    try {
      const response = await api.post('/login', userCredentials);
      if (response) {
        active && saveAuthToken(response.data);
      } else {
        active && saveAuthToken();
      }
    } catch (e) {
      addNotification(
        'There was a problem logging in. Check your email and password!',
        'error'
      );
    }
    return () => {
      active = false;
    };
  };

  const SIGNIN_FIELDS = [
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
