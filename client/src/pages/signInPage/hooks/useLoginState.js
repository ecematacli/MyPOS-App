import { useContext } from 'react';

import api from '../../../api/api';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';

export default () => {
  const { saveAuthToken } = useContext(AuthTokenSettingContext);
  // const [isError, setIsError] = useState(false);

  const postSignInForm = async userCredentials => {
    console.log('fired!');
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
    postSignInForm
  };
};
