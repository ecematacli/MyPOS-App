import { useState, useContext } from 'react';

import api from '../../../api/api';
import { AuthTokenChangeHandle } from '../../../contexts/AuthContext';
import useInputState from '../../../common/hooks/useInputState';

export default () => {
  const { handleAuthToken } = useContext(AuthTokenChangeHandle);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail, resetEmail] = useInputState('');
  const [password, setPassword, resetPassword] = useInputState('');

  const postSignInForm = async () => {
    console.log('fired');
    console.log(email, password);
    const response = await api.post('/login', {
      email,
      password
    });

    try {
      if (response) {
        handleAuthToken(response.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
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
    isLoggedIn,
    isError,
    postSignInForm
  };
};
