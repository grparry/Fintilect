import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoginCredentials } from '../types/auth.types';
import GlobalProfiler from '../components/common/GlobalProfiler';
import { mockUsers } from '../mocks/client-management/mockClientData';
import { User } from '../types/client.types';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePerformanceMeasurement = useCallback((measurement: {
    componentName: string;
    phase: 'mount' | 'update';
    duration: number;
    timestamp: number;
  }) => {
    console.log(`Auth Performance Measurement:`, measurement);
    // TODO: You could send this data to your monitoring service
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      );
      
      if (foundUser) {
        setIsAuthenticated(true);
        setUser(foundUser);
        if (credentials.rememberMe) {
          localStorage.setItem('auth', JSON.stringify({
            id: foundUser.id,
            username: foundUser.username,
            role: foundUser.role
          }));
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('auth');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    // TODO: Implement token refresh logic
    throw new Error('Not implemented');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <GlobalProfiler id="auth-context" onMeasurement={handlePerformanceMeasurement}>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          loading,
          error,
          login,
          logout,
          refreshToken,
          clearError
        }}
      >
        {children}
      </AuthContext.Provider>
    </GlobalProfiler>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
