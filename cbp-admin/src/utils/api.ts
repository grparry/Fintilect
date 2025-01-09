import axios from 'axios';

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

interface ApiClientOptions extends RequestInit {
  isBlob?: boolean;
  params?: Record<string, any>;
  responseType?: 'json' | 'blob';
}

class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async request<T>(
    method: string,
    path: string,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, responseType, ...fetchOptions } = options;
    const url = this.buildUrl(path, params);
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      method,
      headers,
      ...fetchOptions,
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status.toString(),
            message: errorData.message || 'An error occurred',
            details: errorData.details,
          },
        };
      } catch {
        return {
          success: false,
          error: {
            code: response.status.toString(),
            message: 'An error occurred',
          },
        };
      }
    }

    let data: T;
    if (responseType === 'blob' || options.isBlob) {
      data = await response.blob() as T;
    } else {
      data = await response.json();
    }

    return {
      success: true,
      data,
    };
  }

  async get<T>(path: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('GET', path, options);
  }

  async post<T>(path: string, body: any, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    const isFormData = body instanceof FormData;
    return this.request<T>('POST', path, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async put<T>(path: string, body: any, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', path, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  async patch<T>(path: string, body: any, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', path, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  async delete<T>(path: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', path, options);
  }
}

export const api = new ApiClient();
