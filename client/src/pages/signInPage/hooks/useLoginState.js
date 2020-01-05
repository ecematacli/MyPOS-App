import { useState, useContext } from 'react';

import api from '../../../api/api';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
import useInputState from '../../../common/hooks/useInputState';

export default () => {
  const { saveAuthToken } = useContext(AuthTokenSettingContext);
  const [isError, setIsError] = useState(false);
  const [email, setEmail, resetEmail] = useInputState('');
  const [password, setPassword, resetPassword] = useInputState('');

  const postSignInForm = async () => {
    const response = await api.post('/login', {
      email,
      password
    });

    try {
      if (response) {
        saveAuthToken(response.data);
      } else {
        saveAuthToken();
      }
    } catch (e) {
      setIsError(true);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    resetEmail,
    resetPassword,
    isError,
    postSignInForm
  };
};
