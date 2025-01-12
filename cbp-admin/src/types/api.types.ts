// Extend RequestInit with our custom properties
export interface ApiRequestOptions extends Omit<RequestInit, 'headers'> {
  retry?: boolean;
  retryCount?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  responseType?: 'blob' | 'json';
  params?: Record<string, any>;
}

export interface ApiHeaders {
  'Content-Type'?: string;
  Authorization?: string;
  'X-Request-ID'?: string;
  Accept?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  status: number;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
  };
}

export interface ApiPaginatedResponse<T> extends ApiSuccessResponse<PaginatedResponse<T>> {
  meta: {
    timestamp: string;
    requestId: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Authentication related types
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export type PaymentApiResponse<T> = ApiSuccessResponse<T>;
