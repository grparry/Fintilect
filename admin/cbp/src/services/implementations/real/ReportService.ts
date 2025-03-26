import { IReportService } from '../../interfaces/IReportService';
import { PaymentActivityRequest, PaymentActivityItemPagedResponse } from '../../../utils/reports/paymentActivity';
import { ErrorRecapRequest, ErrorRecapItemPagedResponse, ErrorRecapSearchType } from '../../../utils/reports/errorRecap';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';

export class ReportService extends BaseService implements IReportService {
    constructor(basePath: string = '/api/v1/Report') {
        super(basePath);
    }

    async getErrorRecap(params: ErrorRecapRequest): Promise<ErrorRecapItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Build the query string directly with PascalCase parameter names
        // This ensures the parameters are included in the URL as expected by the API
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        // Add specific parameters based on search type
        switch (params.searchType) {
            case ErrorRecapSearchType.PaymentID:
                if (!params.paymentId) throw new Error('PaymentID is required for this search type');
                searchParams.append('PaymentID', params.paymentId);
                break;
            case ErrorRecapSearchType.MemberID:
                if (!params.memberId) throw new Error('MemberID is required for this search type');
                searchParams.append('MemberID', params.memberId);
                break;
            case ErrorRecapSearchType.UserPayeeListID:
                if (!params.userPayeeListId) throw new Error('UserPayeeListID is required for this search type');
                searchParams.append('UserPayeeListID', params.userPayeeListId);
                break;
            case ErrorRecapSearchType.StatusCode:
                if (!params.statusCode) throw new Error('StatusCode is required for this search type');
                searchParams.append('StatusCode', params.statusCode);
                break;
            case ErrorRecapSearchType.DateRange:
                if (!params.startDate || !params.endDate) throw new Error('StartDate and EndDate are required for this search type');
                searchParams.append('StartDate', params.startDate);
                searchParams.append('EndDate', params.endDate);
                break;
            case ErrorRecapSearchType.PayeeID:
                if (!params.payeeId) throw new Error('PayeeID is required for this search type');
                searchParams.append('PayeeID', params.payeeId);
                break;
            case ErrorRecapSearchType.PayeeName:
                if (!params.payeeName) throw new Error('PayeeName is required for this search type');
                searchParams.append('PayeeName', params.payeeName);
                break;
            default:
                throw new Error(`Unsupported search type: ${params.searchType}`);
        }
        
        // Add pagination parameters
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
        logger.info(`ErrorRecap request with query string: ${queryString}`);
        
        return this.get<ErrorRecapItemPagedResponse>(`/errorRecap?${queryString}`);
    }

    async getPaymentActivity(params: PaymentActivityRequest): Promise<PaymentActivityItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Build the query string directly with PascalCase parameter names
        // This ensures the parameters are included in the URL as expected by the API
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        // Add optional parameters if provided
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
        
        // Add sorting parameters if provided
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
            searchParams.append('SortDirection', params.sortDirection || 'ASC');
        }
        
        const queryString = searchParams.toString();
        logger.info(`PaymentActivity request with query string: ${queryString}`);
        
        return this.get<PaymentActivityItemPagedResponse>(`/paymentActivity?${queryString}`);
    }
}