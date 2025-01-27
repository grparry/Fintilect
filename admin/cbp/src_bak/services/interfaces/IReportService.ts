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


/**
 * Interface for report management
 * Handles report generation, scheduling, and export
 */
    /**
     * Run a report with specified arguments
     * @param request Report request parameters
     * @returns Report data
     */

    /**
     * Get report by ID
     * @param reportId Report identifier
     * @returns Report data
     */

    /**
     * Search reports with filtering
     * @param filters Report filters
     * @returns Paginated list of report data
     */

    /**
     * Schedule a report
     * @param request Schedule report request
     * @returns Report run request ID
     */

    /**
     * Cancel scheduled report
     * @param reportId Report identifier
     */

    /**
     * Export report in specified format
     * @param request Export report request
     * @returns Export URL
     */

    /**
     * Get audit records
     * @param filters Report filters
     * @returns Paginated list of audit records
     */

    /**
     * Get transaction records
     * @param filters Report filters
     * @returns Paginated list of transaction records
     */

    /**
     * Get user records
     * @param filters Report filters
     * @returns Paginated list of user records
     */

    /**
     * Get available report types
     * @returns List of report types
     */

    /**
     * Get export options
     * @returns Available export options
     */

    /**
     * Validate report arguments
     * @param args Report arguments to validate
     * @returns Validation result
     */

    /**
     * Get report errors
     * @param reportId Report identifier
     * @returns List of error messages
     */
