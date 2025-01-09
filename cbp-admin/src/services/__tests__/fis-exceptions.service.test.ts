import { jest } from '@jest/globals';
import { fisExceptionsService } from '../fis-exceptions.service';
import { FISException, FISExceptionStatus, FISRetryResult, FISExceptionFilters, FISErrorCode } from '../../types/bill-pay.types';
import { ApiSuccessResponse, ApiRequestOptions } from '../../types/api.types';

// Define API method types
type ApiGetConfig = Omit<ApiRequestOptions, 'method'>;
type BlobConfig = ApiGetConfig & { responseType: 'blob' };
type ApiGetResponse<T, C extends ApiGetConfig = ApiGetConfig> = C extends BlobConfig
  ? Promise<{ data: Blob }>
  : Promise<{ data: ApiSuccessResponse<T> }>;

type ApiGetMethod = <T, C extends ApiGetConfig = ApiGetConfig>(endpoint: string, config?: C) => ApiGetResponse<T, C>;
type ApiPatchMethod = <T>(endpoint: string, data?: any, config?: any) => Promise<{ data: ApiSuccessResponse<T> }>;
type ApiPostMethod = <T>(endpoint: string, data?: any, config?: any) => Promise<{ data: ApiSuccessResponse<T> }>;
type ApiDeleteMethod = <T>(endpoint: string, config?: any) => Promise<{ data: ApiSuccessResponse<T> }>;

// Create properly typed mock functions
const mockGet = jest.fn() as jest.MockedFunction<ApiGetMethod>;
const mockPatch = jest.fn() as jest.MockedFunction<ApiPatchMethod>;
const mockPost = jest.fn() as jest.MockedFunction<ApiPostMethod>;
const mockDelete = jest.fn() as jest.MockedFunction<ApiDeleteMethod>;

// Mock the API module
jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: function <T, C extends ApiGetConfig = ApiGetConfig>(endpoint: string, config?: C) {
      return mockGet<T, C>(endpoint, config);
    },
    patch: function <T>(endpoint: string, data?: any, config?: any) {
      return mockPatch<T>(endpoint, data, config);
    },
    post: function <T>(endpoint: string, data?: any, config?: any) {
      return mockPost<T>(endpoint, data, config);
    },
    delete: function <T>(endpoint: string, config?: any) {
      return mockDelete<T>(endpoint, config);
    }
  }
}));

describe('FISExceptionsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockException: FISException = {
    id: '123',
    requestId: '456',
    status: FISExceptionStatus.PENDING,
    errorCode: FISErrorCode.SYSTEM_ERROR,
    errorMessage: 'Test error message',
    createdAt: '2025-01-08T19:02:19-07:00',
    updatedAt: '2025-01-08T19:02:19-07:00',
    retryCount: 0
  };

  describe('fetchExceptions', () => {
    it('should fetch exceptions with params', async () => {
      type FetchResponse = {
        exceptions: FISException[];
        total: number;
        page: number;
        totalPages: number;
      };

      const mockResponse: ApiSuccessResponse<FetchResponse> = {
        success: true,
        data: {
          exceptions: [mockException],
          total: 1,
          page: 1,
          totalPages: 1
        },
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockGet.mockResolvedValueOnce({ data: mockResponse });

      const params = { page: 1, pageSize: 10 };
      const result = await fisExceptionsService.fetchExceptions(params);

      expect(mockGet).toHaveBeenCalledWith('/api/fis/exceptions', { params });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getExceptionById', () => {
    it('should get exception by id', async () => {
      const mockResponse: ApiSuccessResponse<FISException> = {
        success: true,
        data: mockException,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockGet.mockResolvedValueOnce({ data: mockResponse });

      const result = await fisExceptionsService.getExceptionById('123');

      expect(mockGet).toHaveBeenCalledWith('/api/fis/exceptions/123', undefined);
      expect(result).toEqual(mockException);
    });
  });

  describe('updateExceptionStatus', () => {
    it('should update exception status', async () => {
      const updatedException = { ...mockException, status: FISExceptionStatus.RESOLVED };
      const mockResponse: ApiSuccessResponse<FISException> = {
        success: true,
        data: updatedException,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockPatch.mockResolvedValueOnce({ data: mockResponse });

      const newStatus = FISExceptionStatus.RESOLVED;
      const resolution = 'Issue resolved';
      const result = await fisExceptionsService.updateExceptionStatus('123', newStatus, resolution);

      expect(mockPatch).toHaveBeenCalledWith('/api/fis/exceptions/123/status', {
        status: newStatus,
        resolution,
      }, undefined);
      expect(result).toEqual(updatedException);
    });
  });

  describe('retryException', () => {
    it('should retry exception', async () => {
      const mockRetryResult: FISRetryResult = {
        success: true,
        message: 'Successfully retried',
        newStatus: FISExceptionStatus.RETRYING,
        retryCount: 1,
        lastRetryAt: '2025-01-08T19:02:19-07:00'
      };

      const mockResponse: ApiSuccessResponse<FISRetryResult> = {
        success: true,
        data: mockRetryResult,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const result = await fisExceptionsService.retryException('123');

      expect(mockPost).toHaveBeenCalledWith('/api/fis/exceptions/123/retry', undefined, undefined);
      expect(result).toEqual(mockRetryResult);
    });
  });

  describe('deleteException', () => {
    it('should delete exception', async () => {
      const mockResponse: ApiSuccessResponse<void> = {
        success: true,
        data: undefined,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockDelete.mockResolvedValueOnce({ data: mockResponse });

      await fisExceptionsService.deleteException('123');

      expect(mockDelete).toHaveBeenCalledWith('/api/fis/exceptions/123', undefined);
    });
  });

  describe('exportExceptions', () => {
    it('should export exceptions with filters', async () => {
      const mockBlob = new Blob(['test data'], { type: 'text/csv' });
      const config = { params: { requestId: '123' }, responseType: 'blob' as const };
      mockGet.mockResolvedValueOnce({ data: mockBlob });

      const filters: FISExceptionFilters = { requestId: '123' };
      const result = await fisExceptionsService.exportExceptions(filters);

      expect(mockGet).toHaveBeenCalledWith('/api/fis/exceptions/export', config);
      expect(result).toEqual(mockBlob);
    });
  });
});
