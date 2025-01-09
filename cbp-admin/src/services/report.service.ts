import { ApiSuccessResponse } from '../types/api.types';
import { ReportData, ReportFilters, ExportOptions } from '../types/report.types';
import { 
  ReportRunRequest, 
  ReportResponse, 
  BaseReportArguments,
  ExportReportArguments,
  ScheduleReportArguments
} from '../types/report-api.types';
import api from './api';
import { auditService } from './audit.service';
import { exceptionService } from './exception.service';

class ReportService {
  private readonly baseUrl = '/api/v1/report';

  /**
   * Get report data using new API endpoint
   */
  async getReportData(filters: ReportFilters): Promise<ReportData> {
    const reportId = `${filters.reportType}-${filters.startDate.format('YYYYMMDD')}-${filters.endDate.format('YYYYMMDD')}`;
    
    await auditService.logEvent({
      eventType: 'REPORT_RUN',
      resourceId: reportId,
      resourceType: 'report',
      status: 'INITIATED',
      metadata: { filters },
    });

    try {
      const request: ReportRunRequest<BaseReportArguments> = {
        name: 'GetReportData',
        arguments: {
          startDate: filters.startDate.format('YYYY-MM-DD'),
          endDate: filters.endDate.format('YYYY-MM-DD'),
          reportType: filters.reportType,
          searchTerm: filters.searchTerm
        }
      };

      const response = await api.post<ApiSuccessResponse<ReportResponse<ReportData>>>(
        `${this.baseUrl}/run`,
        request
      );

      await auditService.logEvent({
        eventType: 'REPORT_RUN',
        resourceId: reportId,
        resourceType: 'report',
        status: 'COMPLETED',
        metadata: {
          filters,
          recordCount: {
            audit: response.data.data.data.audit?.length || 0,
            transactions: response.data.data.data.transactions?.length || 0,
            users: response.data.data.data.users?.length || 0,
          },
        },
      });

      return response.data.data.data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'REPORT_RUN',
        resourceId: reportId,
        resourceType: 'report',
        status: 'ERROR',
        metadata: { error, filters },
      });

      await exceptionService.logSystemException(
        'Failed to run report',
        'MEDIUM',
        { error, filters }
      );

      throw err;
    }
  }

  /**
   * Get audit report data
   */
  async getAuditReport(filters: ReportFilters): Promise<ReportData['audit']> {
    try {
      const data = await this.getReportData({ ...filters, reportType: 'login' });
      return data.audit;
    } catch (err) {
      // Don't create a new exception since getReportData already did
      throw err;
    }
  }

  /**
   * Get transaction report data
   */
  async getTransactionReport(filters: ReportFilters): Promise<ReportData['transactions']> {
    try {
      const data = await this.getReportData({ ...filters, reportType: 'payments' });
      return data.transactions;
    } catch (err) {
      // Don't create a new exception since getReportData already did
      throw err;
    }
  }

  /**
   * Get user report data
   */
  async getUserReport(filters: ReportFilters): Promise<ReportData['users']> {
    try {
      const data = await this.getReportData({ ...filters, reportType: 'system' });
      return data.users;
    } catch (err) {
      // Don't create a new exception since getReportData already did
      throw err;
    }
  }

  /**
   * Export report data
   */
  async exportReport(filters: ReportFilters, options: ExportOptions): Promise<Blob> {
    const exportId = `${filters.reportType}-export-${filters.startDate.format('YYYYMMDD')}-${filters.endDate.format('YYYYMMDD')}`;
    
    await auditService.logEvent({
      eventType: 'REPORT_EXPORT',
      resourceId: exportId,
      resourceType: 'report',
      status: 'INITIATED',
      metadata: { filters, options },
    });

    try {
      const request: ReportRunRequest<ExportReportArguments> = {
        name: 'ExportReport',
        arguments: {
          startDate: filters.startDate.format('YYYY-MM-DD'),
          endDate: filters.endDate.format('YYYY-MM-DD'),
          reportType: filters.reportType,
          format: options.format,
          includeHeaders: options.includeHeaders,
          dateFormat: options.dateFormat
        }
      };

      const response = await api.post<Blob>(
        `${this.baseUrl}/export`,
        request,
        {
          responseType: 'blob'
        }
      );

      await auditService.logEvent({
        eventType: 'REPORT_EXPORT',
        resourceId: exportId,
        resourceType: 'report',
        status: 'COMPLETED',
        metadata: { filters, options },
      });

      return response.data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'REPORT_EXPORT',
        resourceId: exportId,
        resourceType: 'report',
        status: 'ERROR',
        metadata: { error, filters, options },
      });

      await exceptionService.logSystemException(
        'Failed to export report',
        'LOW',
        { error, filters, options }
      );

      throw err;
    }
  }

  /**
   * Schedule a report to run periodically
   */
  async scheduleReport(
    filters: ReportFilters,
    schedule: string,
    options?: ExportOptions
  ): Promise<string> {
    const scheduleId = `${filters.reportType}-schedule-${filters.startDate.format('YYYYMMDD')}-${Date.now()}`;
    
    await auditService.logEvent({
      eventType: 'REPORT_SCHEDULE',
      resourceId: scheduleId,
      resourceType: 'report',
      status: 'INITIATED',
      metadata: { filters, schedule, options },
    });

    try {
      const request: ReportRunRequest<ScheduleReportArguments> = {
        name: 'ScheduleReport',
        arguments: {
          startDate: filters.startDate.format('YYYY-MM-DD'),
          endDate: filters.endDate.format('YYYY-MM-DD'),
          reportType: filters.reportType,
          schedule,
          export: options,
        },
      };

      const response = await api.post<ApiSuccessResponse<{ scheduleId: string }>>(
        `${this.baseUrl}/schedule`,
        request
      );

      const finalScheduleId = response.data.data.scheduleId;
      await auditService.logEvent({
        eventType: 'REPORT_SCHEDULE',
        resourceId: finalScheduleId,
        resourceType: 'report',
        status: 'COMPLETED',
        metadata: {
          filters,
          schedule,
          options,
          scheduleId: finalScheduleId,
        },
      });

      return finalScheduleId;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'REPORT_SCHEDULE',
        resourceId: scheduleId,
        resourceType: 'report',
        status: 'ERROR',
        metadata: { error, filters, schedule, options },
      });

      await exceptionService.logSystemException(
        'Failed to schedule report',
        'LOW',
        { error, filters, schedule, options }
      );

      throw err;
    }
  }

  /**
   * Cancel a scheduled report
   */
  async cancelScheduledReport(scheduleId: string): Promise<void> {
    await auditService.logEvent({
      eventType: 'REPORT_SCHEDULE_CANCEL',
      resourceId: scheduleId,
      resourceType: 'report',
      status: 'INITIATED',
    });

    try {
      await api.delete(`${this.baseUrl}/schedule/${scheduleId}`);

      await auditService.logEvent({
        eventType: 'REPORT_SCHEDULE_CANCEL',
        resourceId: scheduleId,
        resourceType: 'report',
        status: 'COMPLETED',
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'REPORT_SCHEDULE_CANCEL',
        resourceId: scheduleId,
        resourceType: 'report',
        status: 'ERROR',
        metadata: { error },
      });

      await exceptionService.logSystemException(
        'Failed to cancel scheduled report',
        'LOW',
        { error, scheduleId }
      );

      throw err;
    }
  }
}

export const reportService = new ReportService();
