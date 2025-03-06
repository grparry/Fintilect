import { IBaseService } from '../../interfaces/IBaseService';
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../../types';
import api from '../../api';
import { AxiosError, AxiosResponse } from 'axios';
import logger from '../../../utils/logger';

/**
 * Base service implementation with common HTTP methods
 */
export class BaseService implements IBaseService {
  constructor(public readonly basePath: string) {}

  /**
   * Extract data from API response and handle case transformation
   */
  protected extractData<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const apiResponse = response.data;
    // If it's a wrapped success response
    if ((apiResponse as ApiSuccessResponse<T>).success === true) {
      return (apiResponse as ApiSuccessResponse<T>).data;
    }
    // If it's a wrapped error response
    if ((apiResponse as ApiErrorResponse).success === false) {
      throw this.handleError(apiResponse as ApiErrorResponse);
    }
    // If it's a direct response
    return apiResponse as T;
  }

  /**
   * Handle API errors consistently
   */
  protected handleError(error: AxiosError | ApiErrorResponse): Error {
    // If it's an Axios error
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      logger.error('Raw API Error Response', JSON.stringify({
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          headers: axiosError.config?.headers,
          data: axiosError.config?.data
        },
        response: axiosError.response ? {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          headers: axiosError.response.headers,
          data: axiosError.response.data
        } : undefined
      }));
      
      // For 401 responses, always show 'Invalid username or password'
      if (axiosError.response?.status === 401) {
        return new Error('Invalid username or password');
      }
      
      const responseData = axiosError.response?.data;
      if (responseData) {
        // Handle plain text responses
        if (typeof responseData === 'string') {
          return new Error(responseData);
        }
        // Handle structured error responses
        if (responseData.error?.message) {
          return new Error(responseData.error.message);
        }
      }
      
      return new Error(axiosError.message || 'An error occurred');
    }
    
    // If it's our ApiErrorResponse
    const apiError = error as ApiErrorResponse;
    return new Error(apiError.error?.message || 'An error occurred');
  }

  /**
   * Make a GET request
   */
  protected async get<T>(path: string, config?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.get<ApiResponse<T>>(url, config);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a POST request
   */
  protected async post<T>(path: string, data?: any, config?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.post<ApiResponse<T>>(url, data, config);
      logger.info('Raw API Response', JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      }));
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a PUT request
   */
  protected async put<T>(path: string, data?: any, config?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.put<ApiResponse<T>>(url, data, config);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a PATCH request
   */
  protected async patch<T>(path: string, data?: any, config?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.patch<ApiResponse<T>>(url, data, config);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a DELETE request
   */
  protected async delete<T>(path: string, config?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.delete<ApiResponse<T>>(url, config);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Validate required parameters
   */
  protected validateRequired(params: Record<string, any>, required: string[]): void {
    const missing = required.filter(param => params[param] == null);
    if (missing.length > 0) {
      throw new Error(`Missing required parameters: ${missing.join(', ')}`);
    }
  }
}