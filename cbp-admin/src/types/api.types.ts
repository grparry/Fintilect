// Extend RequestInit with our custom properties
export interface ApiHeaders {
  [key: string]: string;
}

export interface ApiRequestOptions {
  retry?: boolean;
  retryCount?: number;
  retryDelay?: number;
  headers?: ApiHeaders;
  params?: Record<string, string>;
  data?: any;
  timeout?: number;
  signal?: AbortSignal;
  responseType?: 'blob' | 'json';
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

export interface ApiErrorResponse {
  success: false;
  status: number;
  error: {
    code: string;
    message: string;
    timestamp: string;
  };
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

export interface ApiPaginatedResponse<T> extends ApiSuccessResponse<PaginatedResponse<T>> {
  meta: {
    timestamp: string;
    requestId: string;
    pagination: {
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    };
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
