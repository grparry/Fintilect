import { User, UserPermissions } from './client.types';

export interface LoginFormData {
  username: string;
  password: string;
  clientId?: string;
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
  userPermissions: UserPermissions | null;
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
  userPermissions: UserPermissions | null;
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
  clientId?: string;
}
export interface AuthenticationResponse {
  user: User;
  tokens: TokenResponse;
  permissions?: string[];
}
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
export interface SessionInfo {
  user: User;
  permissions: string[];
  expiresAt: string;
}
export interface UserSession {
  id: string;
  userId: string;
  clientId: string;
  lastActivity: string;
  deviceInfo: {
    browser: string;
    os: string;
    ip: string;
  };
}