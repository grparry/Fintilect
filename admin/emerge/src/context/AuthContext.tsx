import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { LoginCredentials, AuthState, SessionInfo, AuthContextType } from '../types/auth.types';
import { User } from '../types/user.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);
const authService = ServiceFactory.getInstance().getAuthService();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    permissions: []
  });

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('=== AuthContext Initialization ===');
      console.log('Starting auth initialization');
      try {
        const session = await authService.getCurrentSession();
        console.log('Session retrieved:', { hasSession: !!session });
        setState({
          isAuthenticated: !!session?.user,
          user: session?.user || null,
          permissions: session?.permissions || [],
          loading: false,
          error: null
        });
        console.log('Auth state updated:', {
          isAuthenticated: !!session?.user,
          hasUser: !!session?.user
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState({
          isAuthenticated: false,
          user: null,
          permissions: [],
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred during authentication'
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setState({
        isAuthenticated: true,
        user: response.user,
        permissions: response.permissions || [],
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred during login'
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        permissions: [],
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred during logout'
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await authService.refreshToken();
      const session = await authService.getCurrentSession();
      setState({
        isAuthenticated: true,
        user: session?.user || null,
        permissions: session?.permissions || [],
        loading: false,
        error: null
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to refresh token',
        isAuthenticated: false,
        loading: false
      }));
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
