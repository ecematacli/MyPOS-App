import React, { useState, createContext } from 'react';

export const AuthContext = createContext();
export const AuthTokenChangeHandle = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const handleAuthToken = data => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={authToken}>
      <AuthTokenChangeHandle.Provider value={handleAuthToken}>
        {children}
      </AuthTokenChangeHandle.Provider>
    </AuthContext.Provider>
  );
};
