import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { LoginCredentials, AuthState, SessionInfo } from '../types/auth.types';
import { User } from '../types/client.types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshToken: async () => {},
  clearError: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authService = ServiceFactory.getInstance().getAuthService();
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await authService.getCurrentSession();
        setState({
          isAuthenticated: !!session,
          user: session?.user || null,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        });
      }
    };

    initializeAuth();
  }, [authService]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setState({
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  }, [authService]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Logout failed'
      }));
    }
  }, [authService]);

  const refreshToken = useCallback(async () => {
    try {
      await authService.refreshToken();
      const session = await authService.getCurrentSession();
      if (session) {
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          user: session.user
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Token refresh failed'
      }));
    }
  }, [authService]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.loading,
      error: state.error,
      login,
      logout,
      refreshToken,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};
