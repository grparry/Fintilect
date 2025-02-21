import { ApiResponse } from '../types';
/**
 * Base interface for all services
 */
export interface IBaseService {
  /**
   * Get the base path for API requests
   */
  readonly basePath: string;
}