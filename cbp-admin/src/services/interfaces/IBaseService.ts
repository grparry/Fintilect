import { ApiResponse } from '../../utils/api';
import { PaginatedResponse } from '../../types/client.types';

/**
 * Base interface for all services
 */
export interface IBaseService {
  /**
   * Get the base path for API requests
   */
  readonly basePath: string;
}
