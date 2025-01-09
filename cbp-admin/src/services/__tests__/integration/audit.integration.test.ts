import { api } from '../../../utils/api';
import { auditService } from '../../audit.service';
import { AuditEvent } from '../../audit.service';
import { FISExceptionStatus } from '../../../types/bill-pay.types';

jest.mock('../../../utils/api');

const mockApi = api as jest.Mocked<typeof api>;

describe('Audit Service Integration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Payment Flow Audit Logging', () => {
    it('should log events during payment submission', async () => {
      // Mock API responses
      mockApi.post.mockResolvedValue({
        success: true,
        data: undefined
      });

      mockApi.get.mockResolvedValue({
        success: true,
        data: [
          {
            eventType: 'PAYMENT_SUBMIT',
            resourceId: 'payment-1',
            resourceType: 'payment',
            status: 'INITIATED',
            metadata: { amount: 100 },
            timestamp: '2025-01-09T12:00:00Z'
          },
          {
            eventType: 'PAYMENT_SUBMIT',
            resourceId: 'payment-1',
            resourceType: 'payment',
            status: 'COMPLETED',
            metadata: { amount: 100 },
            timestamp: '2025-01-09T12:00:01Z'
          }
        ]
      });

      // Log payment events
      await auditService.logEvent({
        eventType: 'PAYMENT_SUBMIT',
        resourceId: 'payment-1',
        resourceType: 'payment',
        status: 'INITIATED',
        metadata: { amount: 100 }
      });

      await auditService.logEvent({
        eventType: 'PAYMENT_SUBMIT',
        resourceId: 'payment-1',
        resourceType: 'payment',
        status: 'COMPLETED',
        metadata: { amount: 100 }
      });

      // Verify events were logged
      const events = await auditService.getEvents('payment-1');
      expect(events).toHaveLength(2);
      expect(events[0].eventType).toBe('PAYMENT_SUBMIT');
      expect(events[0].status).toBe('INITIATED');
      expect(events[1].status).toBe('COMPLETED');
    });
  });

  describe('Exception Flow Audit Logging', () => {
    it('should log events during exception resolution', async () => {
      // Mock API responses
      mockApi.post.mockResolvedValue({
        success: true,
        data: undefined
      });

      mockApi.get.mockResolvedValue({
        success: true,
        data: [
          {
            eventType: 'EXCEPTION_RESOLVE',
            resourceId: 'exc-1',
            resourceType: 'fis_exception',
            status: 'INITIATED',
            metadata: { resolution: 'Account updated' },
            timestamp: '2025-01-09T12:00:00Z'
          },
          {
            eventType: 'EXCEPTION_RESOLVE',
            resourceId: 'exc-1',
            resourceType: 'fis_exception',
            status: 'COMPLETED',
            metadata: { 
              resolution: 'Account updated',
              before: { status: FISExceptionStatus.PENDING },
              after: { status: FISExceptionStatus.RESOLVED }
            },
            timestamp: '2025-01-09T12:00:01Z'
          }
        ]
      });

      // Log exception events
      await auditService.logEvent({
        eventType: 'EXCEPTION_RESOLVE',
        resourceId: 'exc-1',
        resourceType: 'fis_exception',
        status: 'INITIATED',
        metadata: { resolution: 'Account updated' }
      });

      await auditService.logEvent({
        eventType: 'EXCEPTION_RESOLVE',
        resourceId: 'exc-1',
        resourceType: 'fis_exception',
        status: 'COMPLETED',
        metadata: {
          resolution: 'Account updated',
          before: { status: FISExceptionStatus.PENDING },
          after: { status: FISExceptionStatus.RESOLVED }
        }
      });

      // Verify events were logged
      const events = await auditService.getEvents('exc-1');
      expect(events).toHaveLength(2);
      expect(events[0].eventType).toBe('EXCEPTION_RESOLVE');
      expect(events[0].status).toBe('INITIATED');
      expect(events[1].status).toBe('COMPLETED');
      expect(events[1].metadata?.before.status).toBe(FISExceptionStatus.PENDING);
      expect(events[1].metadata?.after.status).toBe(FISExceptionStatus.RESOLVED);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors when logging events', async () => {
      // Mock API error
      mockApi.post.mockResolvedValue({
        success: false,
        error: {
          code: '500',
          message: 'API Error'
        }
      });

      // Attempt to log event
      await expect(auditService.logEvent({
        eventType: 'TEST_EVENT',
        resourceId: 'test-1',
        resourceType: 'test',
        status: 'INITIATED'
      })).rejects.toThrow('API Error');

      expect(mockApi.post).toHaveBeenCalledWith('/api/v1/audit/events', expect.any(Object));
    });

    it('should handle API errors when retrieving events', async () => {
      // Mock API error
      mockApi.get.mockResolvedValue({
        success: false,
        error: {
          code: '500',
          message: 'API Error'
        }
      });

      // Attempt to get events
      await expect(auditService.getEvents('test-1')).rejects.toThrow('API Error');

      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/audit/events/test-1');
    });
  });
});
