import { User, UserPermissions } from './client.types';

export interface LoginFormData {
  username: string;
  password: string;
  tenantId?: number;
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
  forcePasswordChange: boolean;
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
  forcePasswordChange: boolean;
  login: (credentials: LoginCredentials) => Promise<{ forcePasswordChange: boolean }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  updateForcePasswordChange: (value: boolean) => void;
}

export interface ProtectedRouteProps {
  requiredRoles?: string[];
  redirectPath?: string;
  children: React.ReactNode;
}

export interface LoginCredentials {
  username: string;
  password: string;
  tenantId: number;
}

export interface AuthenticationResponse {
  token: string;
  expiresIn: number;
  user: User;
  roles: string[] | null;
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