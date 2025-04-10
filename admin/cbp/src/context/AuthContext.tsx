import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { LoginCredentials, AuthState, SessionInfo, AuthContextType } from '../types/auth.types';
import { User, Role } from '../types/client.types';
import logger from '../utils/logger';

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
      
      logger.log('AuthContext: Processing roles from login response:', {
        rawRoles: response.roles,
        transformedRoles: (response.roles || []).map(roleName => ({
          id: 0,
          name: roleName
        }))
      });
      const forcePasswordChange = response.user?.forcePasswordChange === true;
      logger.log('AuthContext: Setting forcePasswordChange flag:', forcePasswordChange);
      
      // Transform roles for state
      const roles = (response.roles || []).map(roleName => ({
        id: 0, // Since we only have the role name
        name: roleName
      }));
      
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null,
        forcePasswordChange: forcePasswordChange,
        userPermissions: {
          roles: roles
        }
      }));
      
      // Log user login and permissions information
      logger.info('User authentication successful', JSON.stringify({
        username: response.user?.username || 'unknown',
        userID: response.user?.id || 'unknown',
        clientId: response.user?.clientId || 'unknown'
      }));
      
      // Log detailed role information
      logger.info('User roles and permissions', JSON.stringify({
        rawRoles: response.roles || [],
        mappedRoles: roles.map(r => r.name),
        isSuperuser: (response.roles || []).includes('ClientSuperuser'),
        isAdmin: (response.roles || []).includes('ClientAdmin'),
        isOperator: (response.roles || []).includes('ClientOperator'),
        isReadOnly: (response.roles || []).includes('ClientReadOnly')
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

  const logout = useCallback(() => {
    try {
      logger.info('AuthContext: Performing logout');
      
      // Clear JWT token from localStorage
      localStorage.removeItem('jwt_token');
      
      // Clear auth session from sessionStorage
      sessionStorage.removeItem('auth_session');
      
      // Reset auth state
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        userPermissions: null,
        forcePasswordChange: false
      });
      
      logger.info('AuthContext: Logout completed successfully');
    } catch (error) {
      logger.error(`AuthContext: Error during logout: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Even if there's an error, we still want to reset the local state
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        userPermissions: null,
        forcePasswordChange: false
      });
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const tokens = await authService.refreshToken();
      // Token refresh successful, maintain current state
      setState(prev => ({ ...prev, error: null }));
    } catch (error) {
      // Token refresh failed, log out user
      logout();
      throw error;
    }
  }, [authService, logout]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const updateForcePasswordChange = useCallback((value: boolean) => {
    logger.log('AuthContext: Updating forcePasswordChange flag to:', value);
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