import { PaginatedResponse, PaginationParams } from './index';

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface UserSession {
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface UserFilters extends PaginationParams {
  status?: string;
  role?: string;
  search?: string;
}

export interface UserStats {
  totalLogins: number;
  lastActiveDate: string;
  failedLoginAttempts: number;
  accountCreatedAt: string;
}

export type UsersResponse = PaginatedResponse<import('./index').User>;
