import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { LoginCredentials, AuthState, SessionInfo, AuthContextType } from '../types/auth.types';
import { User, Role } from '../types/client.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authService = ServiceFactory.getInstance().getAuthService();

  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    userPermissions: null
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await authService.login(credentials);
      
      console.log('AuthContext: Processing roles from login response:', {
        rawRoles: response.roles,
        transformedRoles: (response.roles || []).map(roleName => ({
          id: 0,
          name: roleName
        }))
      });
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null,
        userPermissions: {
          roles: (response.roles || []).map(roleName => ({
            id: 0, // Since we only have the role name
            name: roleName
          }))
        }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
        userPermissions: null
      }));
      throw error;
    }
  }, [authService]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        userPermissions: null
      });
    }
  }, [authService]);

  const refreshToken = useCallback(async () => {
    try {
      const tokens = await authService.refreshToken();
      // Token refresh successful, maintain current state
      setState(prev => ({ ...prev, error: null }));
    } catch (error) {
      // Token refresh failed, log out user
      await logout();
      throw error;
    }
  }, [authService, logout]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Check initial auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authService.getCurrentSession();
        if (session) {
          setState({
            isAuthenticated: true,
            user: session.user,
            loading: false,
            error: null,
            userPermissions: {
              roles: (session.permissions || []).map(roleName => ({
                id: 0, // Since we only have the role name
                name: roleName
              }))
            }
          });
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
            userPermissions: null
          });
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to check authentication',
          userPermissions: null
        });
      }
    };
    checkAuth();
  }, [authService]);

  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    error: state.error,
    userPermissions: state.userPermissions,
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