import { reportService } from '../../report.service';
import { exceptionService } from '../../exception.service';
import { auditService } from '../../audit.service';
import api from '../../api';
import dayjs from 'dayjs';
import { ReportFilters } from '../../../types/report.types';

// Mock the API and audit service
jest.mock('../../api');
jest.mock('../../audit.service');

const mockedApi = api as jest.Mocked<typeof api>;
const mockedAuditService = auditService as jest.Mocked<typeof auditService>;

describe('Report and Exception Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultFilters: ReportFilters = {
    startDate: dayjs('2025-01-01'),
    endDate: dayjs('2025-01-07'),
    reportType: 'system',
    searchTerm: 'test',
  };

  describe('Error Handling and Logging', () => {
    it('should properly log exceptions when report generation fails', async () => {
      // Mock API to throw an error
      const error = new Error('API Error');
      const mockException = {
        id: 'test_exception_1',
        message: 'Failed to run report',
        category: 'SYSTEM',
        severity: 'MEDIUM',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
      };

      // First call will fail (report), second call will succeed (exception creation)
      mockedApi.post
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({
          success: true,
          data: {
            data: mockException,
          },
        });

      // Mock audit logging
      mockedAuditService.logEvent.mockResolvedValue();

      // Attempt to get report data
      await expect(reportService.getReportData(defaultFilters)).rejects.toThrow('API Error');

      // Verify audit logging for report failure
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'REPORT_RUN',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: 'API Error',
            filters: defaultFilters,
          }),
        })
      );

      // Verify exception creation audit logs
      const exceptionCalls = mockedAuditService.logEvent.mock.calls.filter(
        call => call[0].eventType === 'EXCEPTION_CREATE'
      );

      expect(exceptionCalls).toHaveLength(2); // INITIATED and COMPLETED
      expect(exceptionCalls[0][0].status).toBe('INITIATED');
      expect(exceptionCalls[1][0].status).toBe('COMPLETED');
    });

    it('should handle multiple report failures gracefully', async () => {
      // Mock API to throw errors for report requests but succeed for exception creation
      const mockException = {
        id: 'test_exception',
        message: 'Failed to run report',
        category: 'SYSTEM',
        severity: 'MEDIUM',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
      };

      mockedApi.post.mockImplementation((url) => {
        if (url.includes('/report')) {
          return Promise.reject(new Error('API Error'));
        }
        return Promise.resolve({
          success: true,
          data: {
            data: mockException,
          },
        });
      });

      // Mock audit logging
      mockedAuditService.logEvent.mockResolvedValue();

      // Attempt multiple report operations
      await expect(reportService.getAuditReport(defaultFilters)).rejects.toThrow('API Error');
      await expect(reportService.getTransactionReport(defaultFilters)).rejects.toThrow('API Error');
      await expect(reportService.getUserReport(defaultFilters)).rejects.toThrow('API Error');

      // Verify exceptions were created for each failure (INITIATED and COMPLETED for each)
      const exceptionCalls = mockedAuditService.logEvent.mock.calls.filter(
        call => call[0].eventType === 'EXCEPTION_CREATE'
      );
      expect(exceptionCalls).toHaveLength(6); // 2 calls per exception (3 failures)

      // Verify all exceptions were properly categorized
      const completedExceptions = exceptionCalls.filter(call => call[0].status === 'COMPLETED');
      expect(completedExceptions).toHaveLength(3);
      
      completedExceptions.forEach(call => {
        expect(call[0].metadata).toMatchObject({
          category: 'SYSTEM',
          severity: 'MEDIUM',
        });
      });
    });
  });

  describe('Audit Trail', () => {
    it('should maintain a complete audit trail across services', async () => {
      // Mock successful report generation
      const mockData = {
        audit: [{ id: 1, event: 'TEST' }],
        transactions: [],
        users: [],
      };

      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          data: {
            data: mockData,
          },
        },
      });

      // Get report data
      await reportService.getReportData(defaultFilters);

      // Verify audit trail
      const auditCalls = mockedAuditService.logEvent.mock.calls;
      
      // Should have INITIATED and COMPLETED events
      expect(auditCalls[0][0]).toMatchObject({
        eventType: 'REPORT_RUN',
        status: 'INITIATED',
      });

      expect(auditCalls[1][0]).toMatchObject({
        eventType: 'REPORT_RUN',
        status: 'COMPLETED',
        metadata: expect.objectContaining({
          recordCount: expect.any(Object),
        }),
      });

      // Verify audit trail contains all necessary information
      auditCalls.forEach(call => {
        expect(call[0]).toMatchObject({
          resourceId: expect.any(String),
          resourceType: expect.any(String),
          metadata: expect.any(Object),
        });
      });
    });
  });
});
