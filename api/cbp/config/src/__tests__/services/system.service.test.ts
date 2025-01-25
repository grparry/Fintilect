import { SystemService } from '../../services/system.service';
import { MockDatabase } from '../utils/testHelpers';
import { HttpError } from '../../utils/errors';

describe('SystemService', () => {
  let systemService: SystemService;
  let mockDb: MockDatabase;
  const testDate = new Date('2025-01-06T18:00:00-07:00');

  beforeEach(() => {
    mockDb = new MockDatabase();
    jest.spyOn(mockDb, 'executeProc');
    systemService = new SystemService(mockDb);
  });

  describe('getCalendarDates', () => {
    it('should return transformed calendar dates', async () => {
      const mockDates = [
        {
          Date: '2025-01-06',
          IsBusinessDay: true,
          NextBusinessDay: '2025-01-07',
          PreviousBusinessDay: '2025-01-03',
          DayType: 'BUSINESS'
        },
        {
          Date: '2025-01-07',
          IsBusinessDay: true,
          NextBusinessDay: '2025-01-08',
          PreviousBusinessDay: '2025-01-06',
          DayType: 'BUSINESS'
        }
      ];

      mockDb.executeProc.mockResolvedValue({ recordset: mockDates });

      const result = await systemService.getCalendarDates();
      expect(result).toEqual(mockDates.map(date => ({
        date: date.Date,
        isBusinessDay: date.IsBusinessDay,
        nextBusinessDay: date.NextBusinessDay,
        previousBusinessDay: date.PreviousBusinessDay,
        dayType: date.DayType
      })));
      expect(mockDb.executeProc).toHaveBeenCalledWith('CALENDAR');
    });

    it('should throw error if database call fails', async () => {
      mockDb.executeProc.mockRejectedValue(new Error('Database error'));

      await expect(systemService.getCalendarDates()).rejects.toThrow(
        new HttpError(500, 'Failed to get calendar dates')
      );
    });
  });

  describe('getHolidays', () => {
    it('should return transformed holidays', async () => {
      const mockHolidays = [
        {
          Date: '2025-01-01',
          Name: 'New Year\'s Day',
          Type: 'FEDERAL',
          AffectsProcessing: true
        },
        {
          Date: '2025-01-20',
          Name: 'Martin Luther King Jr. Day',
          Type: 'FEDERAL',
          AffectsProcessing: true
        }
      ];

      mockDb.executeProc.mockResolvedValue({ recordset: mockHolidays });

      const result = await systemService.getHolidays(2025);
      expect(result).toEqual(mockHolidays.map(holiday => ({
        date: holiday.Date,
        name: holiday.Name,
        type: holiday.Type,
        affectsProcessing: holiday.AffectsProcessing
      })));
      expect(mockDb.executeProc).toHaveBeenCalledWith('HOLIDAYS', { Year: 2025 });
    });

    it('should throw error if database call fails', async () => {
      mockDb.executeProc.mockRejectedValue(new Error('Database error'));

      await expect(systemService.getHolidays(2025)).rejects.toThrow(
        new HttpError(500, 'Failed to get holidays')
      );
    });
  });

  describe('getSystemStatus', () => {
    it('should return system status', async () => {
      const mockStatus = {
        uptime: 3600
      };

      mockDb.executeProc.mockResolvedValue({ recordset: [mockStatus] });

      const result = await systemService.getSystemStatus();
      expect(result).toEqual({
        status: 'OK',
        uptime: mockStatus.uptime,
        lastChecked: expect.any(String)
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith('SYSTEM_STATUS');
    });

    it('should handle missing uptime', async () => {
      mockDb.executeProc.mockResolvedValue({ recordset: [{}] });

      const result = await systemService.getSystemStatus();
      expect(result).toEqual({
        status: 'OK',
        uptime: 0,
        lastChecked: expect.any(String)
      });
    });

    it('should throw error if database call fails', async () => {
      mockDb.executeProc.mockRejectedValue(new Error('Database error'));

      await expect(systemService.getSystemStatus()).rejects.toThrow(
        new HttpError(500, 'Failed to get system status')
      );
    });
  });

  describe('getErrorSummary', () => {
    it('should return error summary', async () => {
      const mockSummary = [
        {
          errorCode: 'ERR001',
          count: 5,
          lastOccurrence: '2025-01-06T18:00:00Z'
        }
      ];

      mockDb.executeProc.mockResolvedValue({ recordset: mockSummary });

      const params = {
        startDate: '2025-01-01',
        endDate: '2025-01-06'
      };

      const result = await systemService.getErrorSummary(params);
      expect(result).toEqual(mockSummary);
      expect(mockDb.executeProc).toHaveBeenCalledWith('ERROR_SUMMARY', {
        StartDate: params.startDate,
        EndDate: params.endDate
      });
    });

    it('should throw error if database call fails', async () => {
      mockDb.executeProc.mockRejectedValue(new Error('Database error'));

      await expect(systemService.getErrorSummary({
        startDate: '2025-01-01',
        endDate: '2025-01-06'
      })).rejects.toThrow(
        new HttpError(500, 'Failed to get error summary')
      );
    });
  });

  describe('getGeneratorStatus', () => {
    it('should return transformed generator status', async () => {
      const mockStatus = {
        Status: 'RUNNING',
        LastRunTime: '2025-01-06T17:00:00Z',
        NextScheduledRun: '2025-01-06T18:00:00Z',
        CurrentQueueSize: 10,
        IsProcessing: true,
        ProcessingStartTime: '2025-01-06T17:30:00Z',
        EstimatedCompletionTime: '2025-01-06T18:30:00Z',
        CpuUsage: 45,
        MemoryUsage: 60,
        DiskSpace: 80
      };

      mockDb.executeProc.mockResolvedValue({ recordset: [mockStatus] });

      const result = await systemService.getGeneratorStatus();
      expect(result).toEqual({
        status: mockStatus.Status,
        lastRunTime: mockStatus.LastRunTime,
        nextScheduledRun: mockStatus.NextScheduledRun,
        currentQueueSize: mockStatus.CurrentQueueSize,
        isProcessing: mockStatus.IsProcessing,
        processingStartTime: mockStatus.ProcessingStartTime,
        estimatedCompletionTime: mockStatus.EstimatedCompletionTime,
        healthStatus: {
          cpu: mockStatus.CpuUsage,
          memory: mockStatus.MemoryUsage,
          diskSpace: mockStatus.DiskSpace
        }
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith('GENERATORSTATUS');
    });

    it('should throw error if database call fails', async () => {
      mockDb.executeProc.mockRejectedValue(new Error('Database error'));

      await expect(systemService.getGeneratorStatus()).rejects.toThrow(
        new HttpError(500, 'Failed to get generator status')
      );
    });
  });

  describe('getErrorRecap', () => {
    it('should return transformed error recap with default timeframe', async () => {
      const mockErrors = [
        {
          Timestamp: '2025-01-06T17:00:00Z',
          ErrorCode: 'ERR001',
          ErrorMessage: 'Test error',
          Severity: 'HIGH',
          Component: 'API',
          Count: 5,
          LastOccurrence: '2025-01-06T17:30:00Z',
          Status: 'OPEN'
        }
      ];

      mockDb.executeProc.mockResolvedValue({ recordset: mockErrors });

      const result = await systemService.getErrorRecap();
      expect(result).toEqual(mockErrors.map(error => ({
        timestamp: error.Timestamp,
        errorCode: error.ErrorCode,
        errorMessage: error.ErrorMessage,
        severity: error.Severity,
        component: error.Component,
        count: error.Count,
        lastOccurrence: error.LastOccurrence,
        status: error.Status
      })));
      expect(mockDb.executeProc).toHaveBeenCalledWith('ERRORRECAP', { Hours: 24 });
    });

    it('should handle custom timeframe in hours', async () => {
      mockDb.executeProc.mockResolvedValue({ recordset: [] });

      await systemService.getErrorRecap('48h');
      expect(mockDb.executeProc).toHaveBeenCalledWith('ERRORRECAP', { Hours: 48 });
    });

    it('should handle custom timeframe in days', async () => {
      mockDb.executeProc.mockResolvedValue({ recordset: [] });

      await systemService.getErrorRecap('7d');
      expect(mockDb.executeProc).toHaveBeenCalledWith('ERRORRECAP', { Hours: 168 });
    });

    it('should throw error for invalid timeframe format', async () => {
      await expect(systemService.getErrorRecap('invalid')).rejects.toThrow(
        new HttpError(400, 'Invalid timeframe format. Use format: 24h or 7d')
      );
    });

    it('should throw error for timeframe out of range', async () => {
      await expect(systemService.getErrorRecap('8d')).rejects.toThrow(
        new HttpError(400, 'Timeframe must be between 1 hour and 7 days')
      );
    });

    it('should throw error if database call fails', async () => {
      mockDb.executeProc.mockRejectedValue(new Error('Database error'));

      await expect(systemService.getErrorRecap()).rejects.toThrow(
        new HttpError(500, 'Failed to get error recap')
      );
    });
  });
});
