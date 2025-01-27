import * as sql from 'mssql';
import { Database } from '@/config/db';
import { HttpError } from '@/utils/errors';
import { logger } from '@/config/logger';
import { BaseRepository } from '@/repositories/base.repository';
import { clearCache } from '@/middleware/cache.middleware';

interface CalendarDate {
  Date: string;
  IsBusinessDay: boolean;
  NextBusinessDay: string;
  PreviousBusinessDay: string;
  DayType: string;
}

interface Holiday {
  Date: string;
  Name: string;
  Type: string;
  AffectsProcessing: boolean;
}

interface SystemStatus {
  uptime: number;
}

interface GeneratorStatus {
  Status: string;
  LastRunTime: string;
  NextScheduledRun: string;
  CurrentQueueSize: number;
  IsProcessing: boolean;
  ProcessingStartTime: string;
  EstimatedCompletionTime: string;
  CpuUsage: number;
  MemoryUsage: number;
  DiskSpace: number;
}

interface ErrorRecord {
  Timestamp: string;
  ErrorCode: string;
  ErrorMessage: string;
  Severity: string;
  Component: string;
  Count: number;
  LastOccurrence: string;
  Status: string;
}

export class SystemService extends BaseRepository {
  constructor(db: Database) {
    super('system', db);
  }

  async getCalendarDates() {
    try {
      const result = await this.db.executeProc<CalendarDate>('CALENDAR');
      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }
      return this.transformCalendarDates(result.recordset);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error getting calendar dates:', error);
      throw new HttpError(500, 'Failed to get calendar dates');
    }
  }

  async getHolidays(year: number) {
    try {
      const result = await this.db.executeProc<Holiday>('HOLIDAYS', {
        Year: year
      });
      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }
      return this.transformHolidays(result.recordset);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error getting holidays for year ${year}:`, error);
      throw new HttpError(500, 'Failed to get holidays');
    }
  }

  async getSystemStatus() {
    try {
      const result = await this.db.executeProc<SystemStatus>('SYSTEM_STATUS');
      const record = result.recordset?.[0];
      return {
        status: 'OK',
        uptime: record?.uptime || 0,
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error getting system status:', error);
      throw new HttpError(500, 'Failed to get system status');
    }
  }

  async getErrorSummary(params: { startDate: string; endDate: string }) {
    try {
      const result = await this.db.executeProc('ERROR_SUMMARY', {
        StartDate: params.startDate,
        EndDate: params.endDate
      });
      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }
      return result.recordset;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error getting error summary:', error);
      throw new HttpError(500, 'Failed to get error summary');
    }
  }

  async getGeneratorStatus() {
    try {
      const result = await this.db.executeProc<GeneratorStatus>('GENERATORSTATUS');
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(500, 'Invalid response from database');
      }
      return this.transformGeneratorStatus(result.recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error getting generator status:', error);
      throw new HttpError(500, 'Failed to get generator status');
    }
  }

  async getErrorRecap(timeframe: string = '24h') {
    try {
      const hours = this.parseTimeframe(timeframe);
      const result = await this.db.executeProc<ErrorRecord>('ERRORRECAP', {
        Hours: hours
      });
      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }
      return this.transformErrorRecap(result.recordset);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error getting error recap for timeframe ${timeframe}:`, error);
      throw new HttpError(500, 'Failed to get error recap');
    }
  }

  private transformCalendarDates(dates: CalendarDate[]) {
    return dates.map(date => ({
      date: date.Date,
      isBusinessDay: date.IsBusinessDay,
      nextBusinessDay: date.NextBusinessDay,
      previousBusinessDay: date.PreviousBusinessDay,
      dayType: date.DayType
    }));
  }

  private transformHolidays(holidays: Holiday[]) {
    return holidays.map(holiday => ({
      date: holiday.Date,
      name: holiday.Name,
      type: holiday.Type,
      affectsProcessing: holiday.AffectsProcessing
    }));
  }

  private transformGeneratorStatus(status: GeneratorStatus) {
    return {
      status: status.Status,
      lastRunTime: status.LastRunTime,
      nextScheduledRun: status.NextScheduledRun,
      currentQueueSize: status.CurrentQueueSize,
      isProcessing: status.IsProcessing,
      processingStartTime: status.ProcessingStartTime,
      estimatedCompletionTime: status.EstimatedCompletionTime,
      healthStatus: {
        cpu: status.CpuUsage,
        memory: status.MemoryUsage,
        diskSpace: status.DiskSpace
      }
    };
  }

  private transformErrorRecap(errors: ErrorRecord[]) {
    return errors.map(error => ({
      timestamp: error.Timestamp,
      errorCode: error.ErrorCode,
      errorMessage: error.ErrorMessage,
      severity: error.Severity,
      component: error.Component,
      count: error.Count,
      lastOccurrence: error.LastOccurrence,
      status: error.Status
    }));
  }

  private parseTimeframe(timeframe: string): number {
    const match = timeframe.match(/^(\d+)([hd])$/);
    if (!match) {
      throw new HttpError(400, 'Invalid timeframe format. Use format: 24h or 7d');
    }

    const [, value, unit] = match;
    const hours = unit === 'h' ? parseInt(value) : parseInt(value) * 24;

    if (hours <= 0 || hours > 168) { // Max 7 days
      throw new HttpError(400, 'Timeframe must be between 1 hour and 7 days');
    }

    return hours;
  }
}
