import { IBaseService } from '../../interfaces/IBaseService';
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../../../types/api.types';
import { getConfig } from '../../../config/api.config';

/**
 * Base class for mock service implementations
 */
export class BaseMockService implements IBaseService {
  constructor(public readonly basePath: string) {}

  /**
   * Simulate API delay
   */
  protected async delay(): Promise<void> {
    const mockDelay = getConfig().mockDelay;
    if (mockDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, mockDelay));
    }
  }

  /**
   * Create success response
   */
  protected createResponse<T>(data: T): T {
    const response: ApiSuccessResponse<T> = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: Math.random().toString(36).substr(2, 9)
      }
    };
    return response.data;
  }

  /**
   * Create error response
   */
  protected createError(message: string, code: number = 400): never {
    const error: ApiErrorResponse = {
      success: false,
      status: code,
      error: {
        code: code.toString(),
        message,
        timestamp: new Date().toISOString()
      }
    };
    throw error;
  }

  /**
   * Validate required parameters
   */
  protected validateRequired(params: Record<string, any>, required: string[]): void {
    const missing = required.filter(param => params[param] == null);
    if (missing.length > 0) {
      this.createError(`Missing required parameters: ${missing.join(', ')}`);
    }
  }
}
