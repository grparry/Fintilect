import { API_BASE_URL } from './config/api.config';
import { ApiRequestOptions, ApiSuccessResponse, ApiErrorResponse } from '../types/api.types';
import logger from './utils/logger';

const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
class ApiClient {
  private static instance: ApiClient;
  private baseUrl: string;
  private constructor() {
    this.baseUrl = API_BASE_URL;
  }
  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
  private async handleResponse<T>(response: Response): Promise<ApiSuccessResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();
    if (!response.ok) {
      const error: ApiErrorResponse = {
        success: false,
        status: response.status,
        error: {
          code: response.status.toString(),
          message: data.message || response.statusText,
          timestamp: new Date().toISOString()
        }
      };
      throw error;
    }
    return {
      success: true,
      data: isJson ? data : { content: data },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: response.headers.get('x-request-id') || Math.random().toString(36).substring(7)
      }
    };
  }
  private createUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }
    return url.toString();
  }
  private async request<T>(method: string, path: string, options: ApiRequestOptions = {}): Promise<ApiSuccessResponse<T>> {
    const { headers = {}, params, data, timeout = DEFAULT_TIMEOUT, signal } = options;
    const url = this.createUrl(path, params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: signal || controller.signal
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      if ((error as ApiErrorResponse).success === false) {
        throw error;
      }
      // Convert other errors to ApiErrorResponse
      const apiError: ApiErrorResponse = {
        success: false,
        status: error instanceof Error && error.name === 'AbortError' ? 408 : 500,
        error: {
          code: error instanceof Error && error.name === 'AbortError' ? 'TIMEOUT' : 'UNKNOWN',
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          timestamp: new Date().toISOString()
        }
      };
      throw apiError;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  async get<T>(path: string, options?: ApiRequestOptions): Promise<ApiSuccessResponse<T>> {
    return this.request<T>('GET', path, options);
  }
  async post<T>(path: string, data?: any, options?: ApiRequestOptions): Promise<ApiSuccessResponse<T>> {
    return this.request<T>('POST', path, { ...options, data });
  }
  async put<T>(path: string, data?: any, options?: ApiRequestOptions): Promise<ApiSuccessResponse<T>> {
    return this.request<T>('PUT', path, { ...options, data });
  }
  async delete<T>(path: string, options?: ApiRequestOptions): Promise<ApiSuccessResponse<T>> {
    return this.request<T>('DELETE', path, options);
  }
  async patch<T>(path: string, data?: any, options?: ApiRequestOptions): Promise<ApiSuccessResponse<T>> {
    return this.request<T>('PATCH', path, { ...options, data });
  }
}
const api = ApiClient.getInstance();
export default api;