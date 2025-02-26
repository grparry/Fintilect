import { Dayjs } from 'dayjs';

/**
 * Report request interface matching C# API
 */
export interface ReportRunRequest {
    name: string;
    arguments: string;  // JSON string of report arguments
}

/**
 * Report response interface matching C# API
 */
export interface ReportResponse {
    jsonResponse: string;  // JSON string of report data
}

/**
 * UI-specific filter state
 */
export interface ReportFilters {
    startDate: Dayjs;
    endDate: Dayjs;
    searchTerm: string;
}