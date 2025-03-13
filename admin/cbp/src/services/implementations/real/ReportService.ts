import { IReportService } from '../../interfaces/IReportService';
import { ReportResponse, ErrorRecapRequest, ErrorRecapItemPagedResponse, PaymentActivityRequest, PaymentActivityItemPagedResponse } from '../../../types/report.types';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';

export class ReportService extends BaseService implements IReportService {
    constructor(basePath: string = '/api/v1/Report') {
        super(basePath);
    }

    async runReport(name: string | null, args: string | null): Promise<ReportResponse> {
        // Clean up empty parameter values in the arguments string to avoid double-escaping
        let cleanedArgs = args;
        if (args) {
            // Replace empty parameters (param=) with param="" to ensure proper formatting
            cleanedArgs = args.replace(/([^=,]+)=(?=,|$)/g, '$1=""');
        }
        
        return this.post<ReportResponse>('/run', { name, arguments: cleanedArgs });
    }

    async runReportWithParams(name: string, params: Record<string, string | number | Date>): Promise<ReportResponse> {
        // Validate report name follows convention (starts with "rpt" and ends with "JSON")
        if (!name.startsWith('rpt') || !name.endsWith('JSON')) {
            throw new Error(`Invalid report name: ${name}. Report names must start with "rpt" and end with "JSON"`);
        }

        const formattedArgs = this.formatReportParams(params);
        return this.runReport(name, formattedArgs);
    }

    async getErrorRecap(params: ErrorRecapRequest): Promise<ErrorRecapItemPagedResponse> {
        if (!params.searchType || !params.searchValue) {
            throw new Error('SearchType and SearchValue are required parameters');
        }

        // Build the query string directly with PascalCase parameter names
        // This ensures the parameters are included in the URL as expected by the API
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType);
        searchParams.append('SearchValue', params.searchValue);
        searchParams.append('PageNumber', (params.pageNumber || 1).toString());
        searchParams.append('PageSize', (params.pageSize || 20).toString());
        
        const queryString = searchParams.toString();
        logger.info(`ErrorRecap request with query string: ${queryString}`);
        
        // Append the query string directly to the URL
        return this.get<ErrorRecapItemPagedResponse>(`/ErrorRecap?${queryString}`);
    }

    async getPaymentActivity(params: PaymentActivityRequest): Promise<PaymentActivityItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Build the query string with PascalCase parameter names to match API expectations
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType);
        
        // Add parameters based on search type
        if (params.searchValue) {
            // Map searchValue to the appropriate parameter based on search type
            if (params.searchType.includes('MemberID')) {
                searchParams.append('MemberID', params.searchValue);
            } else if (params.searchType.includes('PaymentID')) {
                searchParams.append('PaymentID', params.searchValue);
            }
            // SearchValue is not a valid parameter for the API
        }
        
        // Add optional parameters only if they have values
        if (params.startDate) {
            searchParams.append('StartDate', params.startDate);
        }
        
        if (params.endDate) {
            searchParams.append('EndDate', params.endDate);
        }
        
        if (params.payeeName) {
            searchParams.append('PayeeName', params.payeeName);
        }
        
        searchParams.append('PageNumber', (params.pageNumber || 1).toString());
        searchParams.append('PageSize', (params.pageSize || 20).toString());
        
        const queryString = searchParams.toString();
        logger.info(`PaymentActivity request with query string: ${queryString}`);
        
        // Call the new endpoint with the query string
        return this.get<PaymentActivityItemPagedResponse>(`/PaymentActivity?${queryString}`);
    }

    formatReportParams(params: Record<string, string | number | Date>): string {
        return Object.entries(params)
            .map(([key, value]) => this.formatReportParam(key, value))
            .join(',');
    }

    formatReportParam(key: string, value: string | number | Date): string {
        // Format Date objects as YYYY-MM-DD
        if (value instanceof Date) {
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, '0');
            const day = String(value.getDate()).padStart(2, '0');
            return `${key}=${year}-${month}-${day}`;
        }
        
        return `${key}=${value}`;
    }

    parseReportParams(params: string): Record<string, string> {
        if (!params) return {};
        
        return params.split(',').reduce((acc, param) => {
            const [key, value] = param.split('=');
            if (key) {
                acc[key] = value || '';
            }
            return acc;
        }, {} as Record<string, string>);
    }
}