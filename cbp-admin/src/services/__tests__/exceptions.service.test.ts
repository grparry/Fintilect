import { exceptionsService } from '../exceptions.service';
import api from '../api';
import { ExceptionStatus, FISExceptionStatus } from '../../types/bill-pay.types';
import { ApiPaginatedResponse, ApiSuccessResponse } from '../../types/api.types';

// Mock the api module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('ExceptionsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchExceptions', () => {
    it('should fetch paginated exceptions with correct parameters', async () => {
      const mockResponse: ApiPaginatedResponse<Array<any>> = {
        success: true,
        data: [
          {
            id: '1',
            paymentId: 'pay_123',
            type: 'PAYMENT_FAILED',
            status: 'OPEN' as ExceptionStatus,
            message: 'Payment processing failed',
            details: {},
            createdAt: '2025-01-07T17:44:51-07:00',
            updatedAt: '2025-01-07T17:44:51-07:00',
          },
        ],
        meta: {
          totalCount: 1,
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: '2025-01-07T17:44:51-07:00',
          requestId: 'req_123',
        },
      };

      mockedApi.getPaginated.mockResolvedValueOnce(mockResponse);

      const result = await exceptionsService.fetchExceptions({
        page: 1,
        pageSize: 10,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      });

      expect(mockedApi.getPaginated).toHaveBeenCalledWith('/system/errors', {
        params: {
          page: 1,
          pageSize: 10,
          sortBy: 'createdAt',
          sortDirection: 'desc',
        },
      });

      expect(result).toEqual({
        exceptions: mockResponse.data,
        meta: {
          totalCount: mockResponse.meta.totalCount,
          currentPage: mockResponse.meta.currentPage,
          totalPages: mockResponse.meta.totalPages,
          pageSize: mockResponse.meta.pageSize,
          hasNextPage: mockResponse.meta.hasNextPage,
          hasPreviousPage: mockResponse.meta.hasPreviousPage,
        },
      });
    });
  });

  describe('resolveException', () => {
    it('should resolve an exception with retry enabled', async () => {
      const mockResponse: ApiSuccessResponse<any> = {
        success: true,
        data: {
          id: '1',
          paymentId: 'pay_123',
          type: 'PAYMENT_FAILED',
          status: 'RESOLVED' as ExceptionStatus,
          message: 'Payment processing failed',
          details: {},
          createdAt: '2025-01-07T17:44:51-07:00',
          updatedAt: '2025-01-07T17:44:51-07:00',
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const resolution = {
        action: 'MANUAL_RESOLVE',
        notes: 'Fixed payment issue',
      };

      const result = await exceptionsService.resolveException('1', resolution);

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/system/errors/1/resolve',
        resolution,
        {
          retry: true,
          retryDelay: 1000,
        }
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getExceptionStats', () => {
    it('should fetch exception statistics', async () => {
      const mockResponse: ApiSuccessResponse<any> = {
        success: true,
        data: {
          total: 100,
          byStatus: {
            OPEN: 50,
            RESOLVED: 30,
            IN_PROGRESS: 20,
          },
          byType: {
            PAYMENT_FAILED: 60,
            VALIDATION_ERROR: 40,
          },
          resolutionRate: 0.8,
          averageRetryCount: 2.5,
        },
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await exceptionsService.getExceptionStats();

      expect(mockedApi.get).toHaveBeenCalledWith('/system/errors/stats');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('exportExceptions', () => {
    it('should export exceptions with correct headers', async () => {
      const mockBlob = new Blob(['test data'], { type: 'application/octet-stream' });
      const mockResponse: ApiSuccessResponse<Blob> = {
        success: true,
        data: mockBlob,
      };

      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const filters = {
        status: ['OPEN' as FISExceptionStatus],
        startDate: '2025-01-01',
        endDate: '2025-01-07',
      };

      const result = await exceptionsService.exportExceptions(filters);

      expect(mockedApi.get).toHaveBeenCalledWith('/system/errors/export', {
        params: filters,
        responseType: 'blob',
        headers: {
          Accept: 'application/octet-stream',
        },
      });

      expect(result).toEqual(mockBlob);
    });
  });
});
