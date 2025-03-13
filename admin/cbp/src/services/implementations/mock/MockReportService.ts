import { ReportResponse, ErrorRecapRequest, ErrorRecapItemPagedResponse, ErrorRecapItem, PaymentActivityRequest, PaymentActivityItemPagedResponse, PaymentActivityItem, SearchType } from '../../../types/report.types';
import { IReportService } from '../../interfaces/IReportService';
import { BaseMockService } from './BaseMockService';
import logger from '../../../utils/logger';

export class MockReportService extends BaseMockService implements IReportService {
    constructor(basePath: string = '/api/v1/Report') {
        super(basePath);
    }

    async runReport(name: string | null, args: string | null): Promise<ReportResponse> {
        await this.delay();
        // Return an object with jsonResponse property to match the API specification
        return {
            jsonResponse: JSON.stringify({
                message: 'Mock report response',
                name,
                args: args ? this.parseReportParams(args) : null
            })
        };
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
        await this.delay();
        
        if (!params.searchType || !params.searchValue) {
            throw new Error('SearchType and SearchValue are required parameters');
        }
        
        // Log the parameters being sent for debugging
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType);
        searchParams.append('SearchValue', params.searchValue);
        searchParams.append('PageNumber', (params.pageNumber || 1).toString());
        searchParams.append('PageSize', (params.pageSize || 20).toString());
        
        const queryString = searchParams.toString();
        logger.info(`Mock ErrorRecap request with query string: ${queryString}`);
        
        // Create mock data based on search parameters
        const mockItems: ErrorRecapItem[] = Array(10).fill(null).map((_, index) => ({
            failedDate: new Date(Date.now() - index * 86400000).toISOString(),
            memberId: `M${100000 + index}`,
            paymentId: `P${200000 + index}`,
            amount: 100 + (index * 10),
            userPayeeListId: `UPL${300000 + index}`,
            payeeId: `PY${400000 + index}`,
            payeeName: `Mock Payee ${index + 1}`,
            usersAccountAtPayee: `ACCT-${500000 + index}`,
            nameOnAccount: `Mock User ${index + 1}`,
            status: index % 2 === 0 ? 'Failed' : 'Error',
            hostCode: `HC-${index}`,
            error: `Mock error message for ${params.searchType}=${params.searchValue} (${index + 1})`
        }));
        
        // Filter mock data based on search parameters if needed
        let filteredItems = [...mockItems];
        if (params.searchType && params.searchValue) {
            const searchValue = params.searchValue.toLowerCase();
            
            switch(params.searchType) {
                case 'MemberID':
                    filteredItems = mockItems.filter(item => 
                        item.memberId?.toLowerCase().includes(searchValue));
                    break;
                case 'PaymentID':
                    filteredItems = mockItems.filter(item => 
                        item.paymentId?.toLowerCase().includes(searchValue));
                    break;
                case 'UserPayeeListID':
                    filteredItems = mockItems.filter(item => 
                        item.userPayeeListId?.toLowerCase().includes(searchValue));
                    break;
                case 'StatusCode':
                    filteredItems = mockItems.filter(item => 
                        item.hostCode?.toLowerCase().includes(searchValue));
                    break;
            }
        }
        
        // Handle pagination
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);
        
        return {
            items: paginatedItems,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalCount: filteredItems.length,
            totalPages: Math.ceil(filteredItems.length / pageSize),
            hasNext: endIndex < filteredItems.length
        };
    }

    async getPaymentActivity(params: PaymentActivityRequest): Promise<PaymentActivityItemPagedResponse> {
        await this.delay();
        
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        // Log the parameters being sent for debugging
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType);
        
        // Add parameters based on search type
        if (params.searchValue) {
            // Map searchValue to the appropriate parameter based on search type
            if (params.searchType.includes('MemberID')) {
                searchParams.append('MemberID', params.searchValue);
            } else if (params.searchType.includes('PaymentID')) {
                searchParams.append('PaymentID', params.searchValue);
            } else if (params.searchType.includes('PayeeID')) {
                searchParams.append('PayeeID', params.searchValue);
            }
            // SearchValue is not a valid parameter for the API
        }
        
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
        logger.info(`Mock PaymentActivity request with query string: ${queryString}`);
        
        // Create mock payment activity data
        const mockItems: PaymentActivityItem[] = Array(15).fill(null).map((_, index) => ({
            memberID: `M${100000 + index}`,
            paymentID: `P${200000 + index}`,
            payeeID: `PY${400000 + index}`,
            payeeName: `Mock Payee ${index + 1}`,
            dateProcessed: new Date(Date.now() - index * 86400000).toISOString(),
            dueDate: new Date(Date.now() + (7 - index) * 86400000).toISOString(),
            status: index % 3 === 0 ? 'Processed' : (index % 3 === 1 ? 'Pending' : 'Canceled'),
            paymentMethod: index % 2 === 0 ? 'Check' : 'Electronic',
            amount: 100 + (index * 25)
        }));
        
        // Filter mock data based on search parameters
        let filteredItems = [...mockItems];
        
        switch(params.searchType) {
            case 'MemberID':
                if (params.searchValue) {
                    filteredItems = mockItems.filter(item => 
                        item.memberID?.includes(params.searchValue));
                }
                break;
            case 'PaymentID':
                if (params.searchValue) {
                    filteredItems = mockItems.filter(item => 
                        item.paymentID?.includes(params.searchValue));
                }
                break;
            case 'PayeeID':
                if (params.searchValue) {
                    filteredItems = mockItems.filter(item => 
                        item.payeeID?.includes(params.searchValue));
                }
                break;
            case 'PayeeName':
                if (params.payeeName) {
                    filteredItems = mockItems.filter(item => 
                        item.payeeName?.toLowerCase().includes(params.payeeName.toLowerCase()));
                }
                break;
            case 'DateRange':
                // Filter by date range if provided
                if (params.startDate && params.endDate) {
                    const startDate = new Date(params.startDate).getTime();
                    const endDate = new Date(params.endDate).getTime();
                    
                    filteredItems = mockItems.filter(item => {
                        const processedDate = new Date(item.dateProcessed || '').getTime();
                        return processedDate >= startDate && processedDate <= endDate;
                    });
                }
                break;
        }
        
        // Additional filter by payee name if provided and not already filtered
        if (params.payeeName && params.searchType !== 'PayeeName') {
            filteredItems = filteredItems.filter(item => 
                item.payeeName?.toLowerCase().includes(params.payeeName!.toLowerCase()));
        }
        
        // Handle pagination
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);
        
        return {
            items: paginatedItems,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalCount: filteredItems.length,
            totalPages: Math.ceil(filteredItems.length / pageSize),
            hasNext: endIndex < filteredItems.length,
            hasPrevious: pageNumber > 1
        };
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