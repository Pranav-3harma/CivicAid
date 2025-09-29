import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, register, logout, getCurrentUser } from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error('Failed to get current user:', err);
        // Not setting error here as this is just initialization
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials) => {
    setError(null);
    try {
      const user = await login(credentials);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err;
    }
  };

  const handleRegister = async (userData) => {
    setError(null);
    try {
      const user = await register(userData);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Failed to register');
      throw err;
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
      setCurrentUser(null);
    } catch (err) {
      setError(err.message || 'Failed to logout');
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;