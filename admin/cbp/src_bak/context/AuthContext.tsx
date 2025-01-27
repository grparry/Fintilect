import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ServiceFactory } from './services/factory/ServiceFactory';
import { LoginCredentials, AuthState, SessionInfo, AuthContextType } from './types/auth.types';
import { User } from './types/client.types';

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
    permissions: [],
  });

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('=== AuthContext Initialization ===');
      console.log('Starting auth initialization');
      try {
        const session = await authService.getCurrentSession();
        console.log('Session retrieved:', { hasSession: !!session, user: session?.user });
        setState({
          isAuthenticated: !!session,
          user: session?.user || null,
          permissions: session?.permissions || [],
          loading: false,
          error: null,
        });
        console.log('Auth state updated:', {
          isAuthenticated: !!session,
          hasUser: !!session?.user,
          permissions: session?.permissions || [],
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState({
          isAuthenticated: false,
          user: null,
          permissions: [],
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    initializeAuth();
  }, [authService]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    console.log('=== Login Attempt ===');
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authService.login(credentials);
      console.log('Login successful:', { hasUser: !!response.user });
      setState({
        isAuthenticated: true,
        user: response.user,
        permissions: response.permissions,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,







        ...prev,

        ...prev,

          ...prev,
        ...prev,


    ...state,


