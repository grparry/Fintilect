import { reportService } from '../report.service';
import api from '../api';
import { auditService } from '../audit.service';
import { exceptionService } from '../exception.service';
import { ReportFilters, ExportOptions } from '../../types/report.types';
import { ReportRunRequest } from '../../types/report-api.types';
import dayjs from 'dayjs';

// Mock the api, audit service, and exception service modules
jest.mock('../api');
jest.mock('../audit.service');
jest.mock('../exception.service');

const mockedApi = api as jest.Mocked<typeof api>;
const mockedAuditService = auditService as jest.Mocked<typeof auditService>;
const mockedExceptionService = exceptionService as jest.Mocked<typeof exceptionService>;

describe('ReportService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultFilters: ReportFilters = {
    startDate: dayjs('2025-01-01'),
    endDate: dayjs('2025-01-07'),
    reportType: 'system',
    searchTerm: 'test',
  };

  const defaultExportOptions: ExportOptions = {
    format: 'csv',
    includeHeaders: true,
    dateFormat: 'YYYY-MM-DD',
  };

  describe('getReportData', () => {
    it('should fetch report data with correct parameters', async () => {
      const mockData = {
        audit: [{ id: 1, event: 'LOGIN' }],
        transactions: [{ id: 1, amount: 100 }],
        users: [{ id: 1, name: 'Test User' }],
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: {
            data: mockData
          }
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await reportService.getReportData(defaultFilters);

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v1/report/run',
        expect.objectContaining<ReportRunRequest<any>>({
          name: 'GetReportData',
          arguments: {
            startDate: '2025-01-01',
            endDate: '2025-01-07',
            reportType: 'system',
            searchTerm: 'test',
          },
        })
      );

      expect(result).toEqual(mockData);
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(2);
    });

    it('should handle API errors and log them', async () => {
      const error = new Error('API Error');
      mockedApi.post.mockRejectedValueOnce(error);

      await expect(reportService.getReportData(defaultFilters)).rejects.toThrow('API Error');

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'REPORT_RUN',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: 'API Error',
          }),
        })
      );

      expect(mockedExceptionService.logSystemException).toHaveBeenCalledWith(
        'Failed to run report',
        'MEDIUM',
        expect.objectContaining({
          error: 'API Error',
        })
      );
    });
  });

  describe('getAuditReport', () => {
    it('should fetch audit report data', async () => {
      const mockData = {
        audit: [
          { id: 1, event: 'LOGIN' },
          { id: 2, event: 'LOGOUT' },
        ],
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: {
            data: mockData
          }
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await reportService.getAuditReport(defaultFilters);

      expect(result).toEqual(mockData.audit);
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(4);
    });
  });

  describe('getTransactionReport', () => {
    it('should fetch transaction report data', async () => {
      const mockData = {
        transactions: [
          { id: 1, amount: 100 },
          { id: 2, amount: 200 },
        ],
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: {
            data: mockData
          }
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await reportService.getTransactionReport(defaultFilters);

      expect(result).toEqual(mockData.transactions);
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(4);
    });
  });

  describe('getUserReport', () => {
    it('should fetch user report data', async () => {
      const mockData = {
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
        ],
      };

      const mockResponse = {
        success: true as const,
        data: {
          data: {
            data: mockData
          }
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await reportService.getUserReport(defaultFilters);

      expect(result).toEqual(mockData.users);
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(4);
    });
  });

  describe('exportReport', () => {
    it('should export report data with correct parameters', async () => {
      const mockBlob = new Blob(['test data'], { type: 'text/csv' });
      const mockResponse = { success: true as const, data: mockBlob };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const result = await reportService.exportReport(defaultFilters, defaultExportOptions);

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v1/report/export',
        expect.objectContaining<ReportRunRequest<any>>({
          name: 'ExportReport',
          arguments: {
            startDate: '2025-01-01',
            endDate: '2025-01-07',
            reportType: 'system',
            format: 'csv',
            includeHeaders: true,
            dateFormat: 'YYYY-MM-DD',
          },
        }),
        { responseType: 'blob' }
      );

      expect(result).toEqual(mockBlob);
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(2);
    });

    it('should handle export errors', async () => {
      const error = new Error('Export Error');
      mockedApi.post.mockRejectedValueOnce(error);

      await expect(
        reportService.exportReport(defaultFilters, defaultExportOptions)
      ).rejects.toThrow('Export Error');

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'REPORT_EXPORT',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: 'Export Error',
          }),
        })
      );

      expect(mockedExceptionService.logSystemException).toHaveBeenCalledWith(
        'Failed to export report',
        'LOW',
        expect.objectContaining({
          error: 'Export Error',
        })
      );
    });
  });

  describe('scheduleReport', () => {
    it('should schedule a report with correct parameters', async () => {
      const mockResponse = {
        success: true as const,
        data: {
          data: {
            scheduleId: 'schedule_123'
          }
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const schedule = '0 0 * * *'; // Daily at midnight
      const result = await reportService.scheduleReport(
        defaultFilters,
        schedule,
        defaultExportOptions
      );

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v1/report/schedule',
        expect.objectContaining<ReportRunRequest<any>>({
          name: 'ScheduleReport',
          arguments: {
            startDate: '2025-01-01',
            endDate: '2025-01-07',
            reportType: 'system',
            schedule,
            export: defaultExportOptions,
          },
        })
      );

      expect(result).toBe('schedule_123');
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(2);
    });

    it('should handle scheduling errors', async () => {
      const error = new Error('Scheduling Error');
      mockedApi.post.mockRejectedValueOnce(error);

      const schedule = '0 0 * * *';
      await expect(
        reportService.scheduleReport(defaultFilters, schedule, defaultExportOptions)
      ).rejects.toThrow('Scheduling Error');

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'REPORT_SCHEDULE',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: 'Scheduling Error',
          }),
        })
      );

      expect(mockedExceptionService.logSystemException).toHaveBeenCalledWith(
        'Failed to schedule report',
        'LOW',
        expect.objectContaining({
          error: 'Scheduling Error',
        })
      );
    });
  });

  describe('cancelScheduledReport', () => {
    it('should cancel a scheduled report', async () => {
      mockedApi.delete.mockResolvedValueOnce({ success: true as const, data: undefined });

      await reportService.cancelScheduledReport('schedule_123');

      expect(mockedApi.delete).toHaveBeenCalledWith(
        '/api/v1/report/schedule/schedule_123'
      );
      expect(mockedAuditService.logEvent).toHaveBeenCalledTimes(2);
    });

    it('should handle cancellation errors', async () => {
      const error = new Error('Cancellation Error');
      mockedApi.delete.mockRejectedValueOnce(error);

      await expect(
        reportService.cancelScheduledReport('schedule_123')
      ).rejects.toThrow('Cancellation Error');

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'REPORT_SCHEDULE_CANCEL',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: 'Cancellation Error',
          }),
        })
      );

      expect(mockedExceptionService.logSystemException).toHaveBeenCalledWith(
        'Failed to cancel scheduled report',
        'LOW',
        expect.objectContaining({
          error: 'Cancellation Error',
        })
      );
    });
  });
});
