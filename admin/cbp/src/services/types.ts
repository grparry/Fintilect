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

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
