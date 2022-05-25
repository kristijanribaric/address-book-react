import React, { useState, useEffect, useCallback } from 'react';
import { AuthContextInterface, Props } from '../models/models.js'

let logoutTimer:number;

const AuthContext = React.createContext<AuthContextInterface>({
  token: '',
  email: '',
  id: '',
  isLoggedIn: false,
  login: (token: string, email:string, id: string,expirationTime:string) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime:any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredData = () => {
  const storedId = localStorage.getItem('id');
  const storedEmail = localStorage.getItem('email');
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    id: storedId,
    email: storedEmail,
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props:any) => {
  const storedData = retrieveStoredData();
  
  let initialToken, initialEmail, initialId;
  if (storedData) {
    initialId = storedData.id;
    initialEmail = storedData.email;
    initialToken = storedData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [id, setId] = useState(initialId);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setEmail(null);
    setId(null);
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, email:string, id:string, expirationTime:string) => {
    setToken(token);
    setEmail(email);
    setId(id);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = window.setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (storedData) {
      logoutTimer = window.setTimeout(logoutHandler, storedData.duration);
    }
  }, [storedData, logoutHandler]);

  const contextValue = {
    token: token,
    email: email,
    id: id,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;