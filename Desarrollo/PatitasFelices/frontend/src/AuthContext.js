import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userType: null, id_adoptante: null });
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = (userType, id_adoptante) => {
    const newAuth = { isAuthenticated: true, userType, id_adoptante };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, userType: null, id_adoptante: null });
    localStorage.removeItem('auth');
    setRedirectPath(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, redirectPath, setRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
