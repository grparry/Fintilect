import { User } from './client.types';

export interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export interface ProtectedRouteProps {
  requiredRoles?: string[];
  redirectPath?: string;
  children: React.ReactNode;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}
