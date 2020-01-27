import { useState, useContext } from 'react';

import api from '../../../api/api';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
import useInputState from '../../../common/hooks/useInputState';

export default () => {
  const { saveAuthToken } = useContext(AuthTokenSettingContext);
  // const [isError, setIsError] = useState(false);
  // const [email, setEmail, resetEmail] = useInputState('');
  // const [password, setPassword, resetPassword] = useInputState('');

  const postSignInForm = async userCredentials => {
    console.log(userCredentials);
    let active = true;
    const response = await api.post('/login', userCredentials);

    try {
      if (response) {
        active && saveAuthToken(response.data);
      } else {
        active && saveAuthToken();
      }
    } catch (e) {
      // active && setIsError(true);
    }
    return () => {
      active = false;
    };
  };

  return {
    // email,
    // password,
    // setEmail,
    // setPassword,
    // resetEmail,
    // resetPassword,
    // isError,
    postSignInForm
  };
};
