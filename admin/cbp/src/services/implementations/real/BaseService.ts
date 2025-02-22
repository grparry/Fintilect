import { IBaseService } from '../../interfaces/IBaseService';
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../../types';
import api, { AxiosError, AxiosResponse } from '../../api';
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
    if ((apiResponse as ApiSuccessResponse<T>).success) {
      return (apiResponse as ApiSuccessResponse<T>).data;
    }
    throw this.handleError(apiResponse as ApiErrorResponse);
  }

  /**
   * Handle API errors consistently
   */
  protected handleError(error: AxiosError | ApiErrorResponse): Error {
    // If it's an Axios error
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      logger.error({
        message: 'API Error',
        url: axiosError.config?.url,
        method: axiosError.config?.method,
        status: axiosError.response?.status,
        error: axiosError.response?.data
      });
      
      if (axiosError.response?.data) {
        return new Error(axiosError.response.data.error.message);
      }
      return new Error(axiosError.message);
    }
    
    // If it's our ApiErrorResponse
    const apiError = error as ApiErrorResponse;
    return new Error(apiError.error.message);
  }

  /**
   * Make a GET request
   */
  protected async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.instance.get<ApiResponse<T>>(url, { params });
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a POST request
   */
  protected async post<T>(path: string, data?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.instance.post<ApiResponse<T>>(url, data);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a PUT request
   */
  protected async put<T>(path: string, data?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.instance.put<ApiResponse<T>>(url, data);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a PATCH request
   */
  protected async patch<T>(path: string, data?: any): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.instance.patch<ApiResponse<T>>(url, data);
      return this.extractData(response);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a DELETE request
   */
  protected async delete<T>(path: string, config?: { data?: any; params?: Record<string, any> }): Promise<T> {
    try {
      const url = `${this.basePath}${path}`;
      const response = await api.instance.delete<ApiResponse<T>>(url, config);
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