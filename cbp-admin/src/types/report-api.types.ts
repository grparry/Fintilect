import { ReportType } from './report.types';

/**
 * Common report arguments
 */
export interface BaseReportArguments {
  startDate: string;
  endDate: string;
  reportType: ReportType;
  searchTerm?: string;
}

/**
 * Export report arguments
 */
export interface ExportReportArguments extends BaseReportArguments {
  format: 'csv' | 'pdf' | 'excel';
  includeHeaders: boolean;
  dateFormat: string;
}

/**
 * Base interface for report requests
 */
export interface ReportRunRequest<T = BaseReportArguments> {
  name: string;
  arguments: T;
}

/**
 * Report response interface
 */
export interface ReportResponse<T = unknown> {
  data: T;
}
