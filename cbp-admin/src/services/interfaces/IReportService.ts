import { IBaseService } from './IBaseService';
import {
    ReportType,
    ReportData,
    ReportFilters,
    ExportOptions,
    AuditRecord,
    TransactionRecord,
    UserRecord
} from '../../types/report.types';
import {
    BaseReportArguments,
    ExportReportArguments,
    ScheduleReportArguments,
    ReportRunRequest,
    ReportResponse
} from '../../types/report-api.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for report management
 * Handles report generation, scheduling, and export
 */
export interface IReportService extends IBaseService {
    /**
     * Run a report with specified arguments
     * @param request Report request parameters
     * @returns Report data
     */
    runReport(request: ReportRunRequest): Promise<ReportResponse<ReportData>>;

    /**
     * Get report by ID
     * @param reportId Report identifier
     * @returns Report data
     */
    getReport(reportId: string): Promise<ReportData>;

    /**
     * Search reports with filtering
     * @param filters Report filters
     * @returns Paginated list of report data
     */
    searchReports(filters: ReportFilters): Promise<PaginatedResponse<ReportData>>;

    /**
     * Schedule a report
     * @param request Schedule report request
     * @returns Report run request ID
     */
    scheduleReport(request: ReportRunRequest<ScheduleReportArguments>): Promise<string>;

    /**
     * Cancel scheduled report
     * @param reportId Report identifier
     */
    cancelScheduledReport(reportId: string): Promise<void>;

    /**
     * Export report in specified format
     * @param request Export report request
     * @returns Export URL
     */
    exportReport(request: ReportRunRequest<ExportReportArguments>): Promise<string>;

    /**
     * Get audit records
     * @param filters Report filters
     * @returns Paginated list of audit records
     */
    getAuditRecords(filters: ReportFilters): Promise<PaginatedResponse<AuditRecord>>;

    /**
     * Get transaction records
     * @param filters Report filters
     * @returns Paginated list of transaction records
     */
    getTransactionRecords(filters: ReportFilters): Promise<PaginatedResponse<TransactionRecord>>;

    /**
     * Get user records
     * @param filters Report filters
     * @returns Paginated list of user records
     */
    getUserRecords(filters: ReportFilters): Promise<PaginatedResponse<UserRecord>>;

    /**
     * Get available report types
     * @returns List of report types
     */
    getReportTypes(): Promise<ReportType[]>;

    /**
     * Get export options
     * @returns Available export options
     */
    getExportOptions(): Promise<ExportOptions>;

    /**
     * Validate report arguments
     * @param args Report arguments to validate
     * @returns Validation result
     */
    validateReportArgs(args: BaseReportArguments): Promise<boolean>;

    /**
     * Get report errors
     * @param reportId Report identifier
     * @returns List of error messages
     */
    getReportErrors(reportId: string): Promise<string[]>;
}
