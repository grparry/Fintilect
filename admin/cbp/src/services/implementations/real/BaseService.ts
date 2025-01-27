import { IBaseService } from '../../interfaces/IBaseService';
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse, ApiRequestOptions } from '../../../types/api.types';
import api from '../../api';

/**
 * Base service implementation with common HTTP methods
 */
export class BaseService implements IBaseService {
  constructor(public readonly basePath: string) {}
  /**
   * Extract data from API response
   */
  protected extractData<T>(response: ApiResponse<T>): T {
    if ((response as ApiSuccessResponse<T>).success) {
      return (response as ApiSuccessResponse<T>).data;
    }
    throw new Error((response as ApiErrorResponse).error.message);
  }
  /**
   * Make a GET request
   */
  protected async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await api.get<T>(url, { params });
    return this.extractData(response);
  }
  /**
   * Make a POST request
   */
  protected async post<T>(path: string, data?: any): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await api.post<T>(url, data);
    return this.extractData(response);
  }
  /**
   * Make a PUT request
   */
  protected async put<T>(path: string, data?: any): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await api.put<T>(url, data);
    return this.extractData(response);
  }
  /**
   * Make a PATCH request
   */
  protected async patch<T>(path: string, data?: any): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await api.patch<T>(url, data);
    return this.extractData(response);
  }
  /**
   * Make a DELETE request
   */
  protected async delete<T>(path: string): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await api.delete<T>(url);
    return this.extractData(response);
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