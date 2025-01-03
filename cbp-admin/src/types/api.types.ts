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

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaymentApiResponse<T> extends ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    timestamp: string;
    requestId: string;
    totalCount?: number;
    processedCount?: number;
  };
}

export interface ApiPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiPaginatedResponse<T> extends ApiSuccessResponse<T[]> {
  meta: ApiPaginationMeta & {
    timestamp: string;
    requestId: string;
  };
}

// Authentication related types
export type LoginRequest = {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
