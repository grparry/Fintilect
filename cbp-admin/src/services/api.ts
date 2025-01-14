import { ApiRequestOptions, ApiHeaders, ApiErrorResponse, ApiSuccessResponse, ApiPaginatedResponse } from '../types/api.types';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

class Api {
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        const error = data as ApiErrorResponse;
        if (error.status === 401) {
          await this.handleAuthError();
        }
        throw error;
      }
      return data;
    } else if (response.headers.get('content-type')?.includes('application/octet-stream')) {
      return response.blob() as Promise<T>;
    }
    throw new Error(`Unsupported content type: ${contentType}`);
  }

  private async handleAuthError(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const response = await this.post<{ accessToken: string }>('/v1/auth/refresh', { refreshToken });
        localStorage.setItem('token', response.data.accessToken);
        return;
      } catch (error) {
        // If refresh fails, logout
        this.logout();
      }
    }
    this.logout();
  }

  private logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  private async request<T>(endpoint: string, config: ApiRequestOptions = {}): Promise<T> {
    const { retry = true, retryCount = 0, retryDelay = RETRY_DELAY, ...restConfig } = config;
    
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...restConfig,
        headers,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (retry && retryCount < MAX_RETRIES && this.shouldRetry(error)) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.request<T>(endpoint, {
          ...config,
          retryCount: retryCount + 1,
          retryDelay: retryDelay * 2,
        });
      }
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    return error?.status >= 500 || error?.message?.includes('network error');
  }

  async get<T>(
    endpoint: string,
    config: Omit<ApiRequestOptions, 'method'> = {}
  ): Promise<ApiSuccessResponse<T>> {
    const { params, ...restConfig } = config;
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    return this.request<ApiSuccessResponse<T>>(`${endpoint}${queryParams}`, {
      method: 'GET',
      ...restConfig,
    });
  }

  async getPaginated<T>(
    endpoint: string,
    config: Omit<ApiRequestOptions, 'method'> = {}
  ): Promise<ApiPaginatedResponse<T[]>> {
    const response = await this.request<ApiPaginatedResponse<T[]>>(endpoint, {
      method: 'GET',
      ...config,
    });
    return response;
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config: Omit<ApiRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiSuccessResponse<T>> {
    return this.request<ApiSuccessResponse<T>>(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
      ...config,
    });
  }

  async put<T>(
    endpoint: string,
    data: any,
    config: Omit<ApiRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiSuccessResponse<T>> {
    return this.request<ApiSuccessResponse<T>>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  }

  async patch<T>(
    endpoint: string,
    data: any,
    config: Omit<ApiRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiSuccessResponse<T>> {
    return this.request<ApiSuccessResponse<T>>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
    });
  }

  async delete<T>(
    endpoint: string,
    config: Omit<ApiRequestOptions, 'method'> = {}
  ): Promise<ApiSuccessResponse<T>> {
    return this.request<ApiSuccessResponse<T>>(endpoint, {
      method: 'DELETE',
      ...config,
    });
  }
}

const api = new Api();
export default api;
