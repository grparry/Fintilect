import { PaymentActivityRequest, PaymentActivityItemPagedResponse, PaymentActivityItem, PaymentActivitySearchType } from '../../../utils/reports/paymentActivity';
import { ErrorRecapRequest, ErrorRecapItemPagedResponse, ErrorRecapItem, ErrorRecapSearchType } from '../../../utils/reports/errorRecap';
import { IReportService } from '../../interfaces/IReportService';
import { BaseMockService } from './BaseMockService';
import logger from '../../../utils/logger';

export class MockReportService extends BaseMockService implements IReportService {
    constructor(basePath: string = '/api/v1/Report') {
        super(basePath);
    }

    async getErrorRecap(params: ErrorRecapRequest): Promise<ErrorRecapItemPagedResponse> {
        await this.delay();
        
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        // Validate required parameters based on search type
        switch (params.searchType) {
            case ErrorRecapSearchType.PaymentID:
                if (!params.paymentId) throw new Error('PaymentID is required for this search type');
                break;
            case ErrorRecapSearchType.MemberID:
                if (!params.memberId) throw new Error('MemberID is required for this search type');
                break;
            case ErrorRecapSearchType.UserPayeeListID:
                if (!params.userPayeeListId) throw new Error('UserPayeeListID is required for this search type');
                break;
            case ErrorRecapSearchType.StatusCode:
                if (!params.statusCode) throw new Error('StatusCode is required for this search type');
                break;
            case ErrorRecapSearchType.DateRange:
                if (!params.startDate || !params.endDate) throw new Error('StartDate and EndDate are required for this search type');
                break;
            case ErrorRecapSearchType.PayeeID:
                if (!params.payeeId) throw new Error('PayeeID is required for this search type');
                break;
            case ErrorRecapSearchType.PayeeName:
                if (!params.payeeName) throw new Error('PayeeName is required for this search type');
                break;
            default:
                throw new Error(`Unsupported search type: ${params.searchType}`);
        }
        
        // Log the parameters being sent for debugging
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        // Add specific parameters based on search type
        switch (params.searchType) {
            case ErrorRecapSearchType.PaymentID:
                searchParams.append('PaymentID', params.paymentId!);
                break;
            case ErrorRecapSearchType.MemberID:
                searchParams.append('MemberID', params.memberId!);
                break;
            case ErrorRecapSearchType.UserPayeeListID:
                searchParams.append('UserPayeeListID', params.userPayeeListId!);
                break;
            case ErrorRecapSearchType.StatusCode:
                searchParams.append('StatusCode', params.statusCode!);
                break;
            case ErrorRecapSearchType.DateRange:
                searchParams.append('StartDate', params.startDate!);
                searchParams.append('EndDate', params.endDate!);
                break;
            case ErrorRecapSearchType.PayeeID:
                searchParams.append('PayeeID', params.payeeId!);
                break;
            case ErrorRecapSearchType.PayeeName:
                searchParams.append('PayeeName', params.payeeName!);
                break;
        }
        
        searchParams.append('PageNumber', (params.pageNumber || 1).toString());
        searchParams.append('PageSize', (params.pageSize || 20).toString());
        
        // Add sorting parameters if provided
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
        }
        if (params.sortDirection) {
            searchParams.append('SortDirection', params.sortDirection);
        }
        
        const queryString = searchParams.toString();
        logger.info(`Mock ErrorRecap request with query string: ${queryString}`);
        
        // Generate mock data based on search parameters
        const totalItems = 100;
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Generate items for the current page
        const items: ErrorRecapItem[] = [];
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
            const item: ErrorRecapItem = {
                failedDate: new Date(Date.now() - i * 86400000).toISOString(),
                memberId: `M${100000 + i}`,
                paymentId: `P${200000 + i}`,
                amount: 100 + (i * 10),
                userPayeeListId: `UPL${300000 + i}`,
                payeeId: `PY${400000 + i}`,
                payeeName: `Mock Payee ${i + 1}`,
                usersAccountAtPayee: `ACCT-${500000 + i}`,
                nameOnAccount: `Mock User ${i + 1}`,
                status: 'Failed',
                hostCode: `ERR-${i % 5}`,
                error: `Mock error message ${i + 1}`
            };
            items.push(item);
        }
        
        // Return the paged response
        return {
            items,
            pageNumber,
            pageSize,
            totalCount: totalItems,
            totalPages,
            hasNext: pageNumber < totalPages,
            hasPrevious: pageNumber > 1
        };
    }

    async getPaymentActivity(params: PaymentActivityRequest): Promise<PaymentActivityItemPagedResponse> {
        await this.delay();
        
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        // Log the parameters being sent for debugging
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        if (params.memberId) {
            searchParams.append('MemberId', params.memberId);
        }
        
        if (params.paymentId) {
            searchParams.append('PaymentId', params.paymentId);
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
        
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
            searchParams.append('SortDirection', params.sortDirection || 'ASC');
        }
        
        const queryString = searchParams.toString();
        logger.info(`Mock PaymentActivity request with query string: ${queryString}`);
        
        // Generate mock data based on search parameters
        const totalItems = 100;
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Generate items for the current page
        const items: PaymentActivityItem[] = [];
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Determine the search type and generate appropriate data
        const searchTypeValue = params.searchType;
        
        for (let i = startIndex; i < endIndex; i++) {
            const item: PaymentActivityItem = {
                id: `ID-${i + 1}`,
                memberId: `M${100000 + i}`,
                paymentId: `P${200000 + i}`,
                payeeId: `PY${400000 + i}`,
                payeeName: `Mock Payee ${i + 1}`,
                dateProcessed: new Date(Date.now() - i * 86400000).toISOString(),
                dueDate: new Date(Date.now() + (30 - i) * 86400000).toISOString(),
                status: i % 5 === 0 ? 'Failed' : 'Completed',
                paymentMethod: i % 2 === 0 ? 'ACH' : 'Check',
                amount: 100 + (i * 10)
            };
            items.push(item);
        }
        
        // Return the paged response
        return {
            items,
            pageNumber,
            pageSize,
            totalCount: totalItems,
            totalPages,
            hasNext: pageNumber < totalPages,
            hasPrevious: pageNumber > 1
        };
    }
}