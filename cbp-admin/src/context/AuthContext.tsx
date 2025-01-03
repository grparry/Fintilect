import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoginFormData } from '../types/auth.types';
import GlobalProfiler from '../components/common/GlobalProfiler';
import { mockUsers } from '../mocks/client-management/mockClientData';
import { User } from '../types/client.types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const login = useCallback(async (username: string, password: string, rememberMe = false) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        setIsAuthenticated(true);
        setUser(foundUser);
        if (rememberMe) {
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
