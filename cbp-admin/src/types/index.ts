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

// Dashboard related types
export type TimeRange = 'day' | 'week' | 'month' | 'year';

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

// API related types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Common utility types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
