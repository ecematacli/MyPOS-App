import React, { useState, createContext } from 'react';

import history from '../history/history';

export const AuthContext = createContext();
export const AuthTokenSettingContext = createContext();

const initialVal = JSON.parse(localStorage.getItem('token'));

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(initialVal);

  const saveAuthToken = (data = null) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthToken(data);
  };

  const clearAuthToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    history.push('/signin');
  };

  return (
    <AuthContext.Provider value={authToken}>
      <AuthTokenSettingContext.Provider
        value={{ saveAuthToken, clearAuthToken }}
      >
        {children}
      </AuthTokenSettingContext.Provider>
    </AuthContext.Provider>
  );
};
