import * as sql from 'mssql';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';
import { clearCache } from '../middleware/cache.middleware';

export class SystemService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async getCalendarDates() {
    try {
      const result = await this.repository.executeProc('CALENDAR');
      return this.transformCalendarDates(result.recordset);
    } catch (error) {
      logger.error('Error getting calendar dates:', error);
      throw new HttpError(500, 'Failed to get calendar dates');
    }
  }

  async getHolidays(year: number) {
    try {
      const result = await this.repository.executeProc('HOLIDAYS', {
        Year: year
      });
      return this.transformHolidays(result.recordset);
    } catch (error) {
      logger.error(`Error getting holidays for year ${year}:`, error);
      throw new HttpError(500, 'Failed to get holidays');
    }
  }

  async getGeneratorStatus() {
    try {
      const result = await this.repository.executeProc('GENERATORSTATUS');
      return this.transformGeneratorStatus(result.recordset[0]);
    } catch (error) {
      logger.error('Error getting generator status:', error);
      throw new HttpError(500, 'Failed to get generator status');
    }
  }

  async getErrorRecap(timeframe: string = '24h') {
    try {
      const hours = this.parseTimeframe(timeframe);
      const result = await this.repository.executeProc('ERRORRECAP', {
        Hours: hours
      });
      return this.transformErrorRecap(result.recordset);
    } catch (error) {
      logger.error(`Error getting error recap for timeframe ${timeframe}:`, error);
      throw new HttpError(500, 'Failed to get error recap');
    }
  }

  private transformCalendarDates(dates: any[]) {
    return dates.map(date => ({
      date: date.Date,
      isBusinessDay: date.IsBusinessDay,
      nextBusinessDay: date.NextBusinessDay,
      previousBusinessDay: date.PreviousBusinessDay,
      dayType: date.DayType
    }));
  }

  private transformHolidays(holidays: any[]) {
    return holidays.map(holiday => ({
      date: holiday.Date,
      name: holiday.Name,
      type: holiday.Type,
      affectsProcessing: holiday.AffectsProcessing
    }));
  }

  private transformGeneratorStatus(status: any) {
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

  private transformErrorRecap(errors: any[]) {
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
