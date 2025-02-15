import React, { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/factory/ServiceFactory';
import { LoginCredentials, AuthState } from '../types/auth.types';
import { User } from '../types/user.types';

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    permissions: []
  });
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authService.login(credentials);
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.user,
        loading: false,
        permissions: []
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false
      }));
    }
  }, []);
  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await authService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        permissions: []
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false
      }));
    }
  }, []);
  const refreshToken = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const tokens = await authService.refreshToken();
      setState({
        isAuthenticated: true,
        user: state.user,
        permissions: state.permissions,
        loading: false,
        error: null
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to refresh token',
        isAuthenticated: false,
      }));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};