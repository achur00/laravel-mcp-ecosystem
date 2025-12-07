import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8000/api';

  const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await response.json();
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall('/login', 'POST', { email, password });
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'user') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall('/register', 'POST', { name, email, password, role });
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      setError('Registration failed: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await apiCall('/logout', 'POST', null, token);
      }
    } catch (err) {
      console.log('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await apiCall('/me', 'GET', null, token);
        if (response.success) {
          setUser(response.user);
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};