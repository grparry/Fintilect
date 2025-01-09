import { exceptionHistoryService } from '../exception-history.service';
import api from '../api';
import { auditService } from '../audit.service';
import { AuditEventStatus } from '../../types/bill-pay.types';

jest.mock('../api');
jest.mock('../audit.service');

describe('ExceptionHistoryService', () => {
  const mockApi = api as jest.Mocked<typeof api>;
  const mockAuditService = auditService as jest.Mocked<typeof auditService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchHistory', () => {
    it('should fetch history entries with filters', async () => {
      const params = {
        page: 1,
        pageSize: 10,
        startDate: '2025-01-01',
        type: ['UPDATE'],
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: [
            {
              id: '1',
              exceptionId: 'exc-1',
              type: 'UPDATE',
              details: {
                before: {},
                after: {},
              },
              userId: 'user-1',
              userName: 'Test User',
              timestamp: '2025-01-09T12:00:00Z',
            },
          ],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pages: 1,
          },
        },
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await exceptionHistoryService.searchHistory(params);

      expect(mockApi.get).toHaveBeenCalledWith('/exception-history/search', { params });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getHistoryForException', () => {
    it('should fetch history for a specific exception', async () => {
      const exceptionId = 'exc-1';
      const params = {
        page: 1,
        pageSize: 10,
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: [
            {
              id: 'hist-1',
              exceptionId: 'exc-1',
              type: 'RESOLVE',
              timestamp: '2025-01-09T12:00:00Z',
              userId: 'user-1',
              userName: 'Test User',
              details: {
                before: {},
                after: {},
                metadata: {}
              }
            }
          ],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pages: 1
          }
        }
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await exceptionHistoryService.getHistoryForException(exceptionId, params);

      expect(mockApi.get).toHaveBeenCalledWith(
        `/exception-history/exceptions/${exceptionId}`,
        { params }
      );
      expect(result).toEqual({
        success: true,
        data: mockResponse.data
      });
    });
  });

  describe('createHistoryEntry', () => {
    const exceptionId = 'exc-1';
    const type = 'UPDATE';
    const details = {
      before: { status: 'PENDING' },
      after: { status: 'RESOLVED' },
      metadata: { reason: 'Fixed' },
    };

    it('should create a history entry with audit logging', async () => {
      const mockHistoryEntry = {
        id: '1',
        exceptionId: 'exc-1',
        type: 'UPDATE',
        details: {
          before: { status: 'PENDING' },
          after: { status: 'RESOLVED' },
          metadata: { reason: 'Fixed' },
        },
        userId: 'user-1',
        userName: 'Test User',
        timestamp: '2025-01-09T12:00:00Z',
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: mockHistoryEntry,
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);
      mockAuditService.logEvent.mockResolvedValue(undefined);

      const result = await exceptionHistoryService.createHistoryEntry(
        exceptionId,
        type,
        details
      );

      expect(mockAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'EXCEPTION_HISTORY_CREATE',
        resourceId: exceptionId,
        resourceType: 'fis_exception_history',
        status: AuditEventStatus.INITIATED,
        metadata: { type, details },
      });

      expect(mockApi.post).toHaveBeenCalledWith(
        `/exception-history/exceptions/${exceptionId}/entries`,
        { type, details }
      );

      expect(result).toEqual(mockResponse.data.data);

      expect(mockAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'EXCEPTION_HISTORY_CREATE',
        resourceId: exceptionId,
        resourceType: 'fis_exception_history',
        status: AuditEventStatus.COMPLETED,
        metadata: {
          ...mockHistoryEntry,
          historyId: mockHistoryEntry.id,
        },
      });
    });

    it('should handle errors and log them', async () => {
      const error = new Error('API Error');
      mockApi.post.mockRejectedValue(error);
      mockAuditService.logEvent.mockResolvedValue(undefined);

      await expect(
        exceptionHistoryService.createHistoryEntry(exceptionId, type, details)
      ).rejects.toThrow('API Error');

      expect(mockAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'EXCEPTION_HISTORY_CREATE',
        resourceId: exceptionId,
        resourceType: 'fis_exception_history',
        status: AuditEventStatus.ERROR,
        metadata: { type, details, error },
      });
    });
  });

  describe('getHistoryStats', () => {
    it('should fetch history statistics for an exception', async () => {
      const exceptionId = 'exc-1';
      const mockResponse = {
        success: true as const,
        data: {
          data: {
            totalEntries: 10,
            byType: {
              RESOLVE: 3,
              REFUND: 2,
              UPDATE: 5,
            },
            byUser: {
              'user-1': 6,
              'user-2': 4,
            },
            firstEntry: '2025-01-01T00:00:00Z',
            lastEntry: '2025-01-09T12:00:00Z',
          },
        },
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await exceptionHistoryService.getHistoryStats(exceptionId);

      expect(mockApi.get).toHaveBeenCalledWith(
        `/exception-history/exceptions/${exceptionId}/stats`
      );
      expect(result).toEqual(mockResponse.data.data);
    });
  });
});
