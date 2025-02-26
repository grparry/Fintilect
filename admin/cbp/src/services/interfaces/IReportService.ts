import { IBaseService } from './IBaseService';
import {
    ReportResponse,
    ReportFilters,
} from '../../types/report.types';

/**
 * Interface for report management
 * Handles report generation, scheduling, and export
 */
export interface IReportService extends IBaseService {
    /**
     * Run a report with specified arguments
     * @param name Name of the report to run
     * @param args Arguments for the report in JSON string format
     * @returns Report response containing JSON data
     */
    runReport(name: string, args: string): Promise<ReportResponse>;
    /**
     * Get report by ID
     * @param reportId Report identifier
     * @returns Report data
     */

}