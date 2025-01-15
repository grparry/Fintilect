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

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
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

export interface AuthenticationResponse extends LoginResponse {
  expiresAt: number;
  sessionId: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface SessionInfo {
  id: string;
  user: User;
  startedAt: number;
  expiresAt: number;
  lastActivity: number;
  deviceInfo?: {
    browser: string;
    os: string;
    ip: string;
  };
}

export interface UserSession extends SessionInfo {
  isCurrent: boolean;
}
