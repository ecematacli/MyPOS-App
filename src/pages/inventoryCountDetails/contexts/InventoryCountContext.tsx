import React, { useState, createContext } from 'react';

type AuthContext = string;

type SaveAuthToken = (data: string | null) => void;
type ClearAuthToken = () => void;

interface AuthTokenSettingContext {
  saveAuthToken?: SaveAuthToken;
  clearAuthToken?: ClearAuthToken;
}

export const AuthContext = createContext<AuthContext>(null);
export const AuthTokenSettingContext = createContext<AuthTokenSettingContext>(
  {}
);

const initialVal = JSON.parse(localStorage.getItem('token'));

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState(initialVal);

  const saveAuthToken: SaveAuthToken = (data = null) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthToken(data);
  };

  const clearAuthToken: ClearAuthToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={authToken}>
      <AuthTokenSettingContext.Provider
        value={{ saveAuthToken, clearAuthToken }}>
        {children}
      </AuthTokenSettingContext.Provider>
    </AuthContext.Provider>
  );
};
