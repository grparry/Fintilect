import { exceptionHistoryService } from '../../exception-history.service';
import { fisExceptionsService } from '../../fis-exceptions.service';
import api from '../../api';
import { auditService } from '../../audit.service';
import { FISExceptionStatus, AuditEventStatus } from '../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../types/api.types';

// Mock the API and audit service
jest.mock('../../api');
jest.mock('../../audit.service');

describe('Exception History Integration', () => {
  const mockApi = api as jest.Mocked<typeof api>;
  const mockAuditService = auditService as jest.Mocked<typeof auditService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Exception Resolution Flow', () => {
    const mockException = {
      id: 'exc-1',
      status: FISExceptionStatus.PENDING,
      errorCode: 'INVALID_ACCOUNT',
      errorMessage: 'Account not found',
      requestId: 'req-1',
      retryCount: 0,
      metadata: {},
      createdAt: '2025-01-09T12:00:00Z',
      updatedAt: '2025-01-09T12:00:00Z',
    };

    const mockHistoryEntry = {
      id: 'hist-1',
      exceptionId: 'exc-1',
      type: 'RESOLVE',
      details: {
        before: { status: FISExceptionStatus.PENDING },
        after: { status: FISExceptionStatus.RESOLVED },
        metadata: { resolution: 'Account updated' },
      },
      userId: 'user-1',
      userName: 'Test User',
      timestamp: '2025-01-09T12:01:00Z',
    };

    const resolutionHistoryEntry = {
      id: 'hist-1',
      exceptionId: 'exc-1',
      type: 'RESOLVE',
      details: {
        before: { status: FISExceptionStatus.PENDING },
        after: { status: FISExceptionStatus.RESOLVED },
        metadata: { resolution: 'Account updated' },
      },
      userId: 'user-1',
      userName: 'Test User',
      timestamp: '2025-01-09T12:01:00Z',
    };

    it('should create history entries during exception resolution', async () => {
      // Mock API responses
      mockApi.get
        .mockImplementation((url: string, config?: any) => {
          if (url === '/exceptions/exc-1') {
            return Promise.resolve({ 
              success: true as const, 
              data: { 
                data: { 
                  ...mockException, 
                  status: FISExceptionStatus.PENDING 
                } 
              } 
            });
          } else if (url === '/exception-history/exceptions/exc-1') {
            return Promise.resolve({
              success: true as const,
              data: {
                data: [
                  {
                    id: 'hist-1',
                    exceptionId: 'exc-1',
                    type: 'RESOLVE',
                    timestamp: '2025-01-09T12:01:00Z',
                    userId: 'user-1',
                    userName: 'Test User',
                    details: {
                      before: { status: FISExceptionStatus.PENDING },
                      after: { status: FISExceptionStatus.RESOLVED },
                      metadata: { resolution: 'Account updated' }
                    }
                  }
                ],
                pagination: {
                  total: 1,
                  page: 1,
                  pageSize: 10,
                  pages: 1,
                }
              }
            });
          }
          return Promise.reject(new Error(`Unexpected URL: ${url}`));
        });

      mockApi.post
        .mockResolvedValueOnce({ 
          success: true as const, 
          data: { 
            data: { 
              ...mockException, 
              status: FISExceptionStatus.RESOLVED 
            } 
          } 
        })
        .mockResolvedValueOnce({ 
          success: true as const, 
          data: { 
            data: resolutionHistoryEntry 
          } 
        });

      // Resolve exception and create history entry
      const resolvedException = await fisExceptionsService.resolveException('exc-1', { resolution: 'Account updated' });
      await fisExceptionsService.addHistoryEntry('exc-1', 'RESOLVE', {
        before: { status: FISExceptionStatus.PENDING },
        after: { status: resolvedException.status },
        metadata: { resolution: 'Account updated' }
      });

      // Verify history entry was created
      const resolutionHistoryEntries = await exceptionHistoryService.getHistoryForException('exc-1');
      expect(resolutionHistoryEntries).toEqual({
        success: true,
        data: {
          data: [
            {
              id: 'hist-1',
              exceptionId: 'exc-1',
              type: 'RESOLVE',
              timestamp: '2025-01-09T12:01:00Z',
              userId: 'user-1',
              userName: 'Test User',
              details: {
                before: { status: FISExceptionStatus.PENDING },
                after: { status: FISExceptionStatus.RESOLVED },
                metadata: { resolution: 'Account updated' }
              }
            }
          ],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pages: 1,
          },
        },
      });

      // Verify audit logs were created
      expect(mockAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'EXCEPTION_RESOLVE',
        resourceId: 'exc-1',
        resourceType: 'fis_exception',
        status: AuditEventStatus.INITIATED,
        metadata: { resolution: 'Account updated' },
      });
    });
  });

  describe('Exception Reprocessing Flow', () => {
    const mockException = {
      id: 'exc-1',
      status: FISExceptionStatus.FAILED,
      errorCode: 'TECHNICAL_ERROR',
      errorMessage: 'Processing failed',
      requestId: 'req-1',
      retryCount: 1,
      metadata: {},
      createdAt: '2025-01-09T12:00:00Z',
      updatedAt: '2025-01-09T12:00:00Z',
    };

    const reprocessHistoryEntry = {
      id: 'hist-2',
      exceptionId: 'exc-1',
      type: 'REPROCESS',
      details: {
        before: { status: FISExceptionStatus.FAILED },
        after: { status: FISExceptionStatus.IN_PROGRESS },
        metadata: { notes: 'Retrying after system update' },
      },
      userId: 'user-1',
      userName: 'Test User',
      timestamp: '2025-01-09T12:02:00Z',
    };

    it('should create history entries during exception reprocessing', async () => {
      // Mock API responses
      mockApi.get
        .mockImplementation((url: string, config?: any) => {
          if (url === '/exceptions/exc-1') {
            return Promise.resolve({ 
              success: true as const, 
              data: { 
                data: { 
                  ...mockException, 
                  status: FISExceptionStatus.FAILED 
                } 
              } 
            });
          } else if (url === '/exception-history/exceptions/exc-1') {
            return Promise.resolve({
              success: true as const,
              data: {
                data: [
                  {
                    id: 'hist-2',
                    exceptionId: 'exc-1',
                    type: 'REPROCESS',
                    timestamp: '2025-01-09T12:02:00Z',
                    userId: 'user-1',
                    userName: 'Test User',
                    details: {
                      before: { status: FISExceptionStatus.FAILED },
                      after: { status: FISExceptionStatus.IN_PROGRESS },
                      metadata: { notes: 'Retrying after system update' }
                    }
                  }
                ],
                pagination: {
                  total: 1,
                  page: 1,
                  pageSize: 10,
                  pages: 1,
                }
              }
            });
          }
          return Promise.reject(new Error(`Unexpected URL: ${url}`));
        });

      mockApi.post
        .mockResolvedValueOnce({ 
          success: true as const, 
          data: { 
            data: { 
              ...mockException, 
              status: FISExceptionStatus.IN_PROGRESS 
            } 
          } 
        })
        .mockResolvedValueOnce({ 
          success: true as const, 
          data: { 
            data: reprocessHistoryEntry 
          } 
        });

      // Reprocess exception and create history entry
      const reprocessedException = await fisExceptionsService.reprocessException('exc-1', { notes: 'Retrying after system update' });
      await fisExceptionsService.addHistoryEntry('exc-1', 'REPROCESS', {
        before: { status: FISExceptionStatus.FAILED },
        after: { status: reprocessedException.status },
        metadata: { notes: 'Retrying after system update' }
      });

      // Verify history entry was created
      const reprocessHistoryEntries = await exceptionHistoryService.getHistoryForException('exc-1');
      expect(reprocessHistoryEntries).toEqual({
        success: true,
        data: {
          data: [
            {
              id: 'hist-2',
              exceptionId: 'exc-1',
              type: 'REPROCESS',
              timestamp: '2025-01-09T12:02:00Z',
              userId: 'user-1',
              userName: 'Test User',
              details: {
                before: { status: FISExceptionStatus.FAILED },
                after: { status: FISExceptionStatus.IN_PROGRESS },
                metadata: { notes: 'Retrying after system update' }
              }
            }
          ],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pages: 1,
          },
        },
      });

      // Verify audit logs were created
      expect(mockAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'EXCEPTION_REPROCESS',
        resourceId: 'exc-1',
        resourceType: 'fis_exception',
        status: AuditEventStatus.INITIATED,
        metadata: { notes: 'Retrying after system update' },
      });
    });
  });

  describe('Exception Refund Flow', () => {
    const mockException = {
      id: 'exc-1',
      status: FISExceptionStatus.FAILED,
      errorCode: 'INSUFFICIENT_FUNDS',
      errorMessage: 'Insufficient funds',
      requestId: 'req-1',
      retryCount: 0,
      metadata: { amount: 100 },
      createdAt: '2025-01-09T12:00:00Z',
      updatedAt: '2025-01-09T12:00:00Z',
    };

    const refundHistoryEntry = {
      id: 'hist-3',
      exceptionId: 'exc-1',
      type: 'REFUND',
      details: {
        before: { status: FISExceptionStatus.PENDING },
        after: { status: FISExceptionStatus.REFUNDED },
        metadata: { amount: 100, reason: 'Customer request' },
      },
      userId: 'user-1',
      userName: 'Test User',
      timestamp: '2025-01-09T12:03:00Z',
    };

    it('should create history entries during exception refund', async () => {
      // Mock API responses
      mockApi.get
        .mockImplementation((url: string, config?: any) => {
          if (url === '/exceptions/exc-1') {
            return Promise.resolve({ 
              success: true as const, 
              data: { 
                data: { 
                  ...mockException, 
                  status: FISExceptionStatus.PENDING 
                } 
              } 
            });
          } else if (url === '/exception-history/exceptions/exc-1') {
            return Promise.resolve({
              success: true as const,
              data: {
                data: [
                  {
                    id: 'hist-3',
                    exceptionId: 'exc-1',
                    type: 'REFUND',
                    timestamp: '2025-01-09T12:03:00Z',
                    userId: 'user-1',
                    userName: 'Test User',
                    details: {
                      before: { status: FISExceptionStatus.PENDING },
                      after: { status: FISExceptionStatus.REFUNDED },
                      metadata: { amount: 100, reason: 'Customer request' }
                    }
                  }
                ],
                pagination: {
                  total: 1,
                  page: 1,
                  pageSize: 10,
                  pages: 1,
                }
              }
            });
          }
          return Promise.reject(new Error(`Unexpected URL: ${url}`));
        });

      mockApi.post
        .mockResolvedValueOnce({ 
          success: true as const, 
          data: { 
            data: { 
              ...mockException, 
              status: FISExceptionStatus.REFUNDED 
            } 
          } 
        })
        .mockResolvedValueOnce({ 
          success: true as const, 
          data: { 
            data: refundHistoryEntry 
          } 
        });

      // Refund exception and create history entry
      const refundedException = await fisExceptionsService.refundException('exc-1', { amount: 100, reason: 'Customer request' });
      await fisExceptionsService.addHistoryEntry('exc-1', 'REFUND', {
        before: { status: FISExceptionStatus.PENDING },
        after: { status: refundedException.status },
        metadata: { amount: 100, reason: 'Customer request' }
      });

      // Verify history entry was created
      const refundHistoryEntries = await exceptionHistoryService.getHistoryForException('exc-1');
      expect(refundHistoryEntries).toEqual({
        success: true,
        data: {
          data: [
            {
              id: 'hist-3',
              exceptionId: 'exc-1',
              type: 'REFUND',
              timestamp: '2025-01-09T12:03:00Z',
              userId: 'user-1',
              userName: 'Test User',
              details: {
                before: { status: FISExceptionStatus.PENDING },
                after: { status: FISExceptionStatus.REFUNDED },
                metadata: { amount: 100, reason: 'Customer request' }
              }
            }
          ],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pages: 1,
          },
        },
      });

      // Verify audit logs were created
      expect(mockAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'EXCEPTION_REFUND',
        resourceId: 'exc-1',
        resourceType: 'fis_exception',
        status: AuditEventStatus.INITIATED,
        metadata: { amount: 100, reason: 'Customer request' },
      });
    });
  });
});
