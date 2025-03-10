import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { LoginCredentials, AuthState, SessionInfo, AuthContextType } from '../types/auth.types';
import { User, Role } from '../types/client.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Path for the password change page
export const PASSWORD_CHANGE_PATH = '/admin/change-password';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authService = ServiceFactory.getInstance().getAuthService();

  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    userPermissions: null,
    forcePasswordChange: false
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await authService.login(credentials);
      
      // Store auth session in session storage
      sessionStorage.setItem('auth_session', JSON.stringify({
        token: response.token,
        expiresIn: response.expiresIn
      }));
      
      console.log('AuthContext: Processing roles from login response:', {
        rawRoles: response.roles,
        transformedRoles: (response.roles || []).map(roleName => ({
          id: 0,
          name: roleName
        }))
      });
      const forcePasswordChange = response.user?.forcePasswordChange === true;
      console.log('AuthContext: Setting forcePasswordChange flag:', forcePasswordChange);
      
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null,
        forcePasswordChange: forcePasswordChange,
        userPermissions: {
          roles: (response.roles || []).map(roleName => ({
            id: 0, // Since we only have the role name
            name: roleName
          }))
        }
      }));
      
      return { forcePasswordChange };
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
      // Clear auth session and state on logout
      sessionStorage.removeItem('auth_session');
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        userPermissions: null,
        forcePasswordChange: false
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

  const updateForcePasswordChange = useCallback((value: boolean) => {
    console.log('AuthContext: Updating forcePasswordChange flag to:', value);
    setState(prev => {
      if (prev.user) {
        return {
          ...prev,
          forcePasswordChange: value,
          user: { ...prev.user, forcePasswordChange: value }
        };
      }
      return { ...prev, forcePasswordChange: value };
    });
  }, []);

  // Initialize auth state without checking for existing sessions
  useEffect(() => {
    // Set initial state to not authenticated and not loading
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
      userPermissions: null,
      forcePasswordChange: false
    });
  }, []);

  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    error: state.error,
    userPermissions: state.userPermissions,
    forcePasswordChange: state.forcePasswordChange,
    login,
    logout,
    refreshToken,
    clearError,
    updateForcePasswordChange
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