import { ApiSuccessResponse } from '../types/api.types';
import { ReportData, ReportFilters, ExportOptions } from '../types/report.types';
import { 
  ReportRunRequest, 
  ReportResponse, 
  BaseReportArguments,
  ExportReportArguments 
} from '../types/report-api.types';
import api from './api';

class ReportService {
  private readonly baseUrl = '/api/v1/report';

  /**
   * Get report data using new API endpoint
   */
  async getReportData(filters: ReportFilters): Promise<ReportData> {
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

    return response.data.data.data;
  }

  /**
   * Get audit report data
   */
  async getAuditReport(filters: ReportFilters): Promise<ReportData['audit']> {
    const data = await this.getReportData(filters);
    return data.audit;
  }

  /**
   * Get transaction report data
   */
  async getTransactionReport(filters: ReportFilters): Promise<ReportData['transactions']> {
    const data = await this.getReportData(filters);
    return data.transactions;
  }

  /**
   * Get user report data
   */
  async getUserReport(filters: ReportFilters): Promise<ReportData['users']> {
    const data = await this.getReportData(filters);
    return data.users;
  }

  /**
   * Export report data
   */
  async exportReport(filters: ReportFilters, options: ExportOptions): Promise<Blob> {
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

    return response.data;
  }
}

export const reportService = new ReportService();
