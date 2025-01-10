import { jest } from '@jest/globals';
import { fisExceptionsService } from '../fis-exceptions.service';
import { FISException, FISExceptionStatus, FISExceptionHistory, FISErrorCode } from '../../types/bill-pay.types';
import { ApiSuccessResponse, ApiPaginationMeta, ApiRequestOptions } from '../../types/api.types';

// Define API method types
type ApiGetConfig = Omit<ApiRequestOptions, 'method'>;
type BlobConfig = ApiGetConfig & { responseType: 'blob' };
type ApiGetResponse<T, C extends ApiGetConfig = ApiGetConfig> = C extends BlobConfig
  ? Promise<{ data: Blob }>
  : Promise<{ data: ApiSuccessResponse<T> }>;

type ApiGetMethod = <T, C extends ApiGetConfig = ApiGetConfig>(endpoint: string, config?: C) => ApiGetResponse<T, C>;
type ApiPostMethod = <T>(endpoint: string, data?: any, config?: any) => Promise<{ data: ApiSuccessResponse<T> }>;

// Create properly typed mock functions
const mockGet = jest.fn() as jest.MockedFunction<ApiGetMethod>;
const mockPost = jest.fn() as jest.MockedFunction<ApiPostMethod>;

// Mock the API module
jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: function <T, C extends ApiGetConfig = ApiGetConfig>(endpoint: string, config?: C) {
      return mockGet<T, C>(endpoint, config);
    },
    post: function <T>(endpoint: string, data?: any, config?: any) {
      return mockPost<T>(endpoint, data, config);
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
    errorCode: FISErrorCode.TECHNICAL_ERROR,
    errorMessage: 'Test error message',
    createdAt: '2025-01-08T19:02:19-07:00',
    updatedAt: '2025-01-08T19:02:19-07:00',
    retryCount: 0
  };

  describe('fetchExceptions', () => {
    it('should fetch exceptions with params', async () => {
      const mockResponse: ApiSuccessResponse<{
        data: FISException[];
        pagination: {
          total: number;
          page: number;
          pageSize: number;
          pages: number;
        };
      }> = {
        success: true,
        data: {
          data: [mockException],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pages: 1
          }
        },
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockGet.mockResolvedValueOnce({ data: mockResponse });

      const params = { page: 1, pageSize: 10 };
      const result = await fisExceptionsService.fetchExceptions(params);

      expect(mockGet).toHaveBeenCalledWith('/exceptions/search', { params });
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

      expect(mockGet).toHaveBeenCalledWith('/exceptions/123', undefined);
      expect(result).toEqual(mockException);
    });
  });

  describe('resolveException', () => {
    it('should resolve exception', async () => {
      const resolvedException = { ...mockException, status: FISExceptionStatus.RESOLVED };
      const mockResponse: ApiSuccessResponse<FISException> = {
        success: true,
        data: resolvedException,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const resolution = 'Issue resolved';
      const result = await fisExceptionsService.resolveException('123', { resolution });

      expect(mockPost).toHaveBeenCalledWith('/exceptions/123/resolve', { resolution });
      expect(result).toEqual(resolvedException);
    });
  });

  describe('reprocessException', () => {
    it('should reprocess exception', async () => {
      const reprocessedException = { ...mockException, status: FISExceptionStatus.RETRYING };
      const mockResponse: ApiSuccessResponse<FISException> = {
        success: true,
        data: reprocessedException,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const notes = 'Retrying with updated data';
      const result = await fisExceptionsService.reprocessException('123', { notes });

      expect(mockPost).toHaveBeenCalledWith('/exceptions/123/reprocess', { notes });
      expect(result).toEqual(reprocessedException);
    });
  });

  describe('refundException', () => {
    it('should process refund for exception', async () => {
      const refundedException = { ...mockException, status: FISExceptionStatus.REFUNDED };
      const mockResponse: ApiSuccessResponse<FISException> = {
        success: true,
        data: refundedException,
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const request = { amount: 100, reason: 'Customer request' };
      const result = await fisExceptionsService.refundException('123', request);

      expect(mockPost).toHaveBeenCalledWith('/exceptions/123/refund', request);
      expect(result).toEqual(refundedException);
    });
  });

  describe('getExceptionHistory', () => {
    it('should get exception history', async () => {
      const mockHistoryEntry: FISExceptionHistory = {
        id: '789',
        exceptionId: '123',
        type: 'RESOLVE',
        details: {
          before: { status: FISExceptionStatus.PENDING },
          after: { status: FISExceptionStatus.RESOLVED }
        },
        userId: 'user123',
        userName: 'John Doe',
        timestamp: '2025-01-08T19:02:19-07:00'
      };

      const mockResponse: ApiSuccessResponse<{
        data: FISExceptionHistory[];
        meta: ApiPaginationMeta;
      }> = {
        success: true,
        data: {
          data: [mockHistoryEntry],
          meta: {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalCount: 1,
            hasNextPage: false,
            hasPreviousPage: false
          }
        },
        meta: {
          timestamp: '2025-01-08T19:02:19-07:00',
          requestId: '789'
        }
      };

      mockGet.mockResolvedValueOnce({ data: mockResponse });

      const params = { page: 1, pageSize: 10 };
      const result = await fisExceptionsService.getExceptionHistory('123', params);

      expect(mockGet).toHaveBeenCalledWith('/exception-history', {
        params: { ...params, exceptionId: '123' }
      });
      expect(result).toEqual(mockResponse.data);
    });
  });
});
