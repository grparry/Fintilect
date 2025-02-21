import type { PaginationOptions, PaginatedResponse } from './common.types';

// Common type definitions used across the application
// User related types
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  permissionGroup: UserRole;
  lastLogin: string | null;
  locked: boolean;
}
export type UserStatus = 'Active' | 'Inactive';
export type UserRole = 'Admin' | 'User';
export type CreateUserData = Omit<User, 'id' | 'lastLogin' | 'locked'>;
export type UpdateUserData = Partial<User> & { id: number };
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
export type UsersResponse = PaginatedResponse<User>;
// Dashboard related types
export enum TimeRange {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  transactionVolume: number;
}
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
}
export interface PendingPayment {
  id: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  userId: string;
}
export type PaymentStatus = 'pending' | 'completed' | 'failed';
// Common utility types
export type SortDirection = 'asc' | 'desc';
export interface SortOptions {
  field: string;
  direction: SortDirection;
}
export interface FilterOptions {
  [key: string]: any;
}
export type PaginationParams = PaginationOptions;
export interface QueryOptions {
  pagination?: PaginationOptions;
  sort?: SortOptions;
  filter?: FilterOptions;
}
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
// Form related types
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
// Date range type
export interface DateRange {
  startDate: string;
  endDate: string;
}
// Settings validation types

export type { PaginationOptions, PaginatedResponse } from './common.types';