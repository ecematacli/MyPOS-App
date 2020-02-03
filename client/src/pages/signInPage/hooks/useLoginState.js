import { useContext } from 'react';

import api from '../../../api';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
import { NotificationsContext } from '../../../contexts/NotificationsContext';

export default () => {
  const { saveAuthToken } = useContext(AuthTokenSettingContext);
  const { addNotification } = useContext(NotificationsContext);

  const postSignInForm = async userCredentials => {
    let active = true;
    const response = await api.post('/login', userCredentials);

    try {
      if (response) {
        active && saveAuthToken(response.data);
      } else {
        active && saveAuthToken();
      }
    } catch (e) {
      addNotification(
        'There was a problem logging in. Check your email and password',
        'error'
      );
    }
    return () => {
      active = false;
    };
  };

  return {
    postSignInForm
  };
};
