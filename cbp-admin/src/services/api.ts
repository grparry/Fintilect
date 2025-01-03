import { ApiRequestOptions, ApiHeaders, ApiErrorResponse, ApiSuccessResponse } from '../types/api.types';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class Api {
  private async request<T>(endpoint: string, config: ApiRequestOptions = {}): Promise<ApiSuccessResponse<T>> {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    };

    const { responseType, params, ...fetchConfig } = config;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchConfig,
      headers,
    });

    if (!response.ok) {
      const error = await response.json() as ApiErrorResponse;
      if (error.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }

    // Handle blob responses differently
    if (responseType === 'blob') {
      const blob = await response.blob();
      return { data: blob } as ApiSuccessResponse<T>;
    }

    return response.json();
  }

  async get<T>(endpoint: string, config: Omit<ApiRequestOptions, 'method'> = {}): Promise<ApiSuccessResponse<T>> {
    const { params, ...restConfig } = config;
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    return this.request<T>(`${endpoint}${queryParams}`, {
      method: 'GET',
      ...restConfig,
    });
  }

  async post<T>(endpoint: string, data?: any, config: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<ApiSuccessResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
      ...config,
    });
  }

  async put<T>(endpoint: string, data: any, config: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<ApiSuccessResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  }

  async patch<T>(endpoint: string, data: any, config: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<ApiSuccessResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
    });
  }

  async delete<T>(endpoint: string, config: Omit<ApiRequestOptions, 'method'> = {}): Promise<ApiSuccessResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    });
  }
}

const api = new Api();
export default api;
