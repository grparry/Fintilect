import { IBaseService } from './IBaseService';
import {
    ReportResponse,
    ReportFilters,
    ErrorRecapRequest,
    ErrorRecapItemPagedResponse,
    PaymentActivityRequest,
    PaymentActivityItemPagedResponse
} from '../../types/report.types';

/**
 * Interface for report management
 * Handles report generation, scheduling, and export
 */
export interface IReportService extends IBaseService {
    /**
     * Run a report with specified arguments
     * @param name Name of the report to run
     * @param args Arguments for the report in comma-separated string format (param1=value1,param2=value2)
     * @returns Report response containing JSON data
     */
    runReport(name: string | null, args: string | null): Promise<ReportResponse>;

    /**
     * Run a report with parameters as an object
     * @param name Name of the report to run (must start with "rpt" and end with "JSON")
     * @param params Object containing parameter key-value pairs
     * @returns Report response containing JSON data
     */
    runReportWithParams(name: string, params: Record<string, string | number | Date>): Promise<ReportResponse>;

    /**
     * Format parameters object into the required comma-separated string format
     * @param params Object containing parameter key-value pairs
     * @returns Formatted string in the format "param1=value1,param2=value2"
     */
    formatReportParams(params: Record<string, string | number | Date>): string;

    /**
     * Get report by ID
     * @param reportId Report identifier
     * @returns Report data
     */

    /**
     * Get error recap data using the dedicated endpoint
     * @param params Error recap search parameters
     * @returns Paginated error recap data
     */
    getErrorRecap(params: ErrorRecapRequest): Promise<ErrorRecapItemPagedResponse>;

    /**
     * Get payment activity data using the dedicated endpoint
     * @param params Payment activity search parameters
     * @returns Paginated payment activity data
     */
    getPaymentActivity(params: PaymentActivityRequest): Promise<PaymentActivityItemPagedResponse>;

    /**
     * Format a single parameter into a string
     * @param key Parameter key
     * @param value Parameter value
     * @returns Formatted string in the format "key=value"
     */
    formatReportParam(key: string, value: string | number | Date): string;

    /**
     * Parse a comma-separated string of parameters into an object
     * @param params Comma-separated string of parameters (e.g. "param1=value1,param2=value2")
     * @returns Object containing parameter key-value pairs
     */
    parseReportParams(params: string): Record<string, string | number | Date>;
}