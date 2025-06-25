import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    // Validate stored user before parsing
    if (token && savedUser && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user'); // Remove corrupted data
      }
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await authApi.signup({ name, email, password });
      console.log(response.data)
      // const { token, user } = response.data;

      if (response.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
      }

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
  };

  const login = async (email1, password) => {
    try {
      const response = await authApi.login({ email:email1, password });
     
       if (response.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
      }

      return { success: true };
    } 
    catch (error) {
      console.log('Login error:', error );
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);