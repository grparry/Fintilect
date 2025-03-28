import { IReportService } from '../../interfaces/IReportService';
import { PaymentActivityRequest, PaymentActivityItemPagedResponse } from '../../../utils/reports/paymentActivity';
import { ErrorRecapRequest, ErrorRecapItemPagedResponse, ErrorRecapSearchType } from '../../../utils/reports/errorRecap';
import { BillPaySearchRequest, BillPaySearchItemPagedResponse, BillPaySearchType } from '../../../utils/reports/billPaySearch';
import { ActiveUserCountRequest, ActiveUserCountItemPagedResponse, ActiveUserCountSearchType } from '../../../utils/reports/activeUserCount';
import { FailedOnUsParams, FailedOnUsResponse, FailedOnUsSearchType } from '../../../utils/reports/failedOnUs';
import { GlobalHolidaysParams, GlobalHolidaysResponse } from '../../../utils/reports/globalHolidays';
import { MonthlyUsersParams, MonthlyUsersResponse, MonthlyUsersSearchType } from '../../../utils/reports/monthlyUsers';
import { PendingPaymentsParams, PendingPaymentsResponse } from '../../../utils/reports/pendingPayments';
import { RecurringPaymentChangeHistoryParams, RecurringPaymentChangeHistoryResponse, RecurringPaymentChangeHistorySearchType } from '../../../utils/reports/recurringPaymentChangeHistory';
import { UserPayeeChangeHistoryParams, UserPayeeChangeHistoryResponse, UserPayeeChangeHistorySearchType } from '../../../utils/reports/userPayeeChangeHistory';
import { OnUsPostingsParams, OnUsPostingsResponse, OnUsPostingsSearchType } from '../../../utils/reports/onUsPostings';
import { StatusesWithNotificationsParams, StatusesWithNotificationsResponse } from '../../../utils/reports/statusesWithNotifications';
import { LargePaymentParams, LargePaymentResponse } from '../../../utils/reports/largePayment';
import { ProcessingConfirmationParams, ProcessingConfirmationResponse, ProcessingConfirmationSearchType } from '../../../utils/reports/processingConfirmation';
import { ScheduledPaymentChangeHistoryParams, ScheduledPaymentChangeHistoryResponse, ScheduledPaymentChangeHistorySearchType } from '../../../utils/reports/scheduledPaymentChangeHistory';
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
        
        return this.get<ErrorRecapItemPagedResponse>(`/ErrorRecap?${queryString}`);
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
        
        return this.get<PaymentActivityItemPagedResponse>(`/PaymentActivity?${queryString}`);
    }

    async getBillPaySearch(params: BillPaySearchRequest): Promise<BillPaySearchItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        if (!params.id) {
            throw new Error('ID is a required parameter');
        }

        if (params.reportType === undefined) {
            throw new Error('ReportType is a required parameter');
        }

        // For BillPay Search, we need to use POST with a request body
        const requestBody = {
            SearchType: params.searchType,
            Id: params.id,
            Days: params.days,
            ReportType: params.reportType,
            SortColumn: params.sortColumn,
            PageNumber: params.pageNumber || 1,
            PageSize: params.pageSize || 20,
            SortDirection: params.sortDirection || 'ASC'
        };

        logger.info(`BillPaySearch request with body: ${JSON.stringify(requestBody)}`);
        
        return this.post<BillPaySearchItemPagedResponse>('/BillPaySearch', requestBody);
    }

    async getActiveUserCount(params: ActiveUserCountRequest): Promise<ActiveUserCountItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Build the query string directly with PascalCase parameter names
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        // Add specific parameters based on search type
        switch (params.searchType) {
            case ActiveUserCountSearchType.MemberID:
                if (!params.memberID) throw new Error('MemberID is required for this search type');
                searchParams.append('MemberID', params.memberID);
                break;
            case ActiveUserCountSearchType.DateRange:
                if (!params.startDate || !params.endDate) {
                    throw new Error('StartDate and EndDate are required for DateRange search type');
                }
                searchParams.append('StartDate', params.startDate);
                searchParams.append('EndDate', params.endDate);
                break;
            default:
                throw new Error(`Unsupported search type: ${params.searchType}`);
        }
        
        searchParams.append('PageNumber', (params.pageNumber || 1).toString());
        searchParams.append('PageSize', (params.pageSize || 20).toString());
        
        // Add sorting parameters if provided
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
            searchParams.append('SortDirection', params.sortDirection || 'ASC');
        }
        
        const queryString = searchParams.toString();
        logger.info(`ActiveUserCount request with query string: ${queryString}`);
        
        return this.get<ActiveUserCountItemPagedResponse>(`/ActiveUserCount?${queryString}`);
    }

    async getFailedOnUs(params: FailedOnUsParams): Promise<FailedOnUsResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        const searchParams = new URLSearchParams();
        
        searchParams.append('SearchType', params.searchType);
        searchParams.append('PageNumber', params.pageNumber.toString());
        searchParams.append('PageSize', params.pageSize.toString());
        
        if (params.memberID) {
            searchParams.append('MemberID', params.memberID);
        }
        
        if (params.paymentID) {
            searchParams.append('PaymentID', params.paymentID);
        }
        
        if (params.startDate) {
            searchParams.append('StartDate', params.startDate);
        }
        
        if (params.endDate) {
            searchParams.append('EndDate', params.endDate);
        }
        
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
            searchParams.append('SortDirection', params.sortDirection || 'ASC');
        }
        
        const queryString = searchParams.toString();
        logger.info(`FailedOnUs request with query string: ${queryString}`);
        
        return this.get<FailedOnUsResponse>(`/FailedOnUs?${queryString}`);
    }

    /**
     * Get global holidays data from the API
     * @param params Global holidays search parameters
     * @returns Promise with global holidays data
     */
    async getGlobalHolidays(params: GlobalHolidaysParams): Promise<GlobalHolidaysResponse> {
        const searchParams = new URLSearchParams();
        
        searchParams.append('SearchType', params.searchType);
        searchParams.append('PageNumber', params.pageNumber.toString());
        searchParams.append('PageSize', params.pageSize.toString());
        
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
            searchParams.append('SortDirection', params.sortDirection || 'ASC');
        }
        
        const queryString = searchParams.toString();
        logger.info(`GlobalHolidays request with query string: ${queryString}`);
        
        return this.get<GlobalHolidaysResponse>(`/GlobalHolidays?${queryString}`);
    }

    /**
     * Get monthly users data from the API
     * @param params Monthly users search parameters
     * @returns Promise with monthly users data
     */
    async getMonthlyUsers(params: MonthlyUsersParams): Promise<MonthlyUsersResponse> {
        const searchParams = new URLSearchParams();
        
        searchParams.append('SearchType', params.searchType);
        searchParams.append('PageNumber', params.pageNumber.toString());
        searchParams.append('PageSize', params.pageSize.toString());
        
        if (params.startDate) {
            searchParams.append('StartDate', params.startDate);
        }
        
        if (params.endDate) {
            searchParams.append('EndDate', params.endDate);
        }
        
        if (params.sortColumn) {
            searchParams.append('SortColumn', params.sortColumn);
            searchParams.append('SortDirection', params.sortDirection || 'ASC');
        }
        
        const queryString = searchParams.toString();
        logger.info(`MonthlyUsers request with query string: ${queryString}`);
        
        return this.get<MonthlyUsersResponse>(`/MonthlyUsers?${queryString}`);
    }

    /**
     * Get pending payments data from the API
     * @param params Pending payments search parameters
     * @returns Promise with pending payments data
     */
    async getPendingPayments(params: PendingPaymentsParams): Promise<PendingPaymentsResponse> {
        // Create request body with PascalCase properties as expected by the API
        const requestBody: Record<string, any> = {
            PageNumber: params.pageNumber,
            PageSize: params.pageSize,
            Date: params.date // Single date parameter
        };
        
        // Add sort parameters if provided
        if (params.sortColumn) {
            requestBody.SortColumn = params.sortColumn;
            requestBody.SortDirection = params.sortDirection?.toUpperCase() || 'ASC';
        }
        
        logger.info(`PendingPayments request with body: ${JSON.stringify(requestBody)}`);
        
        return this.post<PendingPaymentsResponse>('/PendingPayments', requestBody);
    }

    /**
     * Get recurring payment change history data from the API
     * @param params Recurring payment change history search parameters
     * @returns Promise with recurring payment change history data
     */
    async getRecurringPaymentChangeHistory(params: RecurringPaymentChangeHistoryParams): Promise<RecurringPaymentChangeHistoryResponse> {
        // Create request body with PascalCase properties as expected by the API
        const requestBody: Record<string, any> = {
            SearchType: params.searchType,
            PageNumber: params.pageNumber,
            PageSize: params.pageSize
        };
        
        // Add date range parameters for all search types
        if (params.startDate && params.endDate) {
            requestBody.StartDate = params.startDate;
            requestBody.EndDate = params.endDate;
        } else {
            throw new Error('Start date and end date are required');
        }
        
        // Add search parameters based on search type
        switch (params.searchType) {
            case RecurringPaymentChangeHistorySearchType.DateRange:
                // Date range parameters already added above
                break;
            case RecurringPaymentChangeHistorySearchType.RecurringPaymentID:
                if (!params.recurringPaymentID) {
                    throw new Error('Recurring payment ID is required for recurring payment ID search');
                }
                requestBody.RecurringPaymentID = params.recurringPaymentID;
                break;
            case RecurringPaymentChangeHistorySearchType.MemberID:
                if (!params.memberID) {
                    throw new Error('Member ID is required for member ID search');
                }
                requestBody.MemberID = params.memberID;
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Add sort parameters if provided
        if (params.sortColumn) {
            requestBody.SortColumn = params.sortColumn;
            requestBody.SortDirection = params.sortDirection?.toUpperCase() || 'ASC';
        }
        
        logger.info(`RecurringPaymentChangeHistory request with body: ${JSON.stringify(requestBody)}`);
        
        return this.post<RecurringPaymentChangeHistoryResponse>('/RecurringPaymentChangeHistory', requestBody);
    }

    /**
     * Get user payee change history data from the API
     * @param params User payee change history search parameters
     * @returns Promise with user payee change history data
     */
    async getUserPayeeChangeHistory(params: UserPayeeChangeHistoryParams): Promise<UserPayeeChangeHistoryResponse> {
        // Create request body with PascalCase properties as expected by the API
        const requestBody: Record<string, any> = {
            SearchType: params.searchType,
            PageNumber: params.pageNumber,
            PageSize: params.pageSize
        };
        
        // Add date range parameters
        if (params.startDate && params.endDate) {
            requestBody.StartDate = params.startDate;
            requestBody.EndDate = params.endDate;
        } else {
            throw new Error('Start date and end date are required');
        }
        
        // Add search parameters based on search type
        switch (params.searchType) {
            case UserPayeeChangeHistorySearchType.UserPayeeListID:
                if (!params.userPayeeListID) {
                    throw new Error('User Payee List ID is required for User Payee List ID search');
                }
                requestBody.UserPayeeListID = params.userPayeeListID;
                break;
            case UserPayeeChangeHistorySearchType.MemberID:
                if (!params.memberID) {
                    throw new Error('Member ID is required for Member ID search');
                }
                requestBody.MemberID = params.memberID;
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Add sort parameters if provided
        if (params.sortColumn) {
            requestBody.SortColumn = params.sortColumn;
            requestBody.SortDirection = params.sortDirection?.toUpperCase() || 'ASC';
        }
        
        logger.info(`UserPayeeChangeHistory request with body: ${JSON.stringify(requestBody)}`);
        
        return this.post<UserPayeeChangeHistoryResponse>('/UserPayeeChangeHistory', requestBody);
    }

    /**
     * Get on us postings data from the API
     * @param params On us postings search parameters
     * @returns Promise with on us postings data
     */
    async getOnUsPostings(params: OnUsPostingsParams): Promise<OnUsPostingsResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        logger.info(`OnUsPostings request with raw params: ${JSON.stringify(params)}`);
        
        // Add date range parameters - required for all search types
        if (!params.startDate || !params.endDate) {
            logger.error(`Missing date parameters: startDate=${params.startDate}, endDate=${params.endDate}`);
            throw new Error('Required parameter \'StartDate and EndDate\' is missing for search type: ' + params.searchType);
        }
        
        // Build the query parameters object
        const queryParams: Record<string, string> = {
            SearchType: params.searchType,
            StartDate: params.startDate,
            EndDate: params.endDate
        };
        
        // Add specific parameters based on search type
        switch (params.searchType) {
            case OnUsPostingsSearchType.PaymentID:
                if (!params.paymentID) {
                    throw new Error('Payment ID is required for Payment ID search');
                }
                queryParams.PaymentID = params.paymentID;
                break;
            case OnUsPostingsSearchType.MemberID:
                if (!params.memberID) {
                    throw new Error('Member ID is required for Member ID search');
                }
                queryParams.MemberID = params.memberID;
                break;
            case OnUsPostingsSearchType.AccountID:
                if (!params.accountID) {
                    throw new Error('Account ID is required for Account ID search');
                }
                queryParams.AccountID = params.accountID;
                break;
            case OnUsPostingsSearchType.LoanID:
                if (!params.loanID) {
                    throw new Error('Loan ID is required for Loan ID search');
                }
                queryParams.LoanID = params.loanID;
                break;
            case OnUsPostingsSearchType.RunID:
                if (!params.runID) {
                    throw new Error('Run ID is required for Run ID search');
                }
                queryParams.RunID = params.runID;
                break;
            case OnUsPostingsSearchType.DateRange:
                // Only date range parameters are required, which are already added
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Add pagination parameters
        if (params.pageNumber !== undefined) {
            queryParams.PageNumber = params.pageNumber.toString();
        }
        if (params.pageSize !== undefined) {
            queryParams.PageSize = params.pageSize.toString();
        }
        
        // Add sort parameters if provided
        if (params.sortColumn) {
            queryParams.SortColumn = params.sortColumn;
            queryParams.SortDirection = params.sortDirection?.toUpperCase() || 'ASC';
        }
        
        // Convert to URLSearchParams for logging
        const searchParams = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            searchParams.append(key, value);
        });
        logger.info(`OnUsPostings request with params: ${searchParams.toString()}`);
        
        // Pass the params object as the second argument to the get method
        // This will be converted to query parameters by axios
        return this.get<OnUsPostingsResponse>('/OnUsPostings', { params: queryParams });
    }

    /**
     * Get statuses with notifications data from the API
     * @param params Statuses with notifications search parameters
     * @returns Promise with statuses with notifications data
     */
    async getStatusesWithNotifications(params: StatusesWithNotificationsParams): Promise<StatusesWithNotificationsResponse> {
        logger.info(`StatusesWithNotifications request with raw params: ${JSON.stringify(params)}`);
        
        // Build the query parameters object
        const queryParams: Record<string, string> = {};
        
        // Add pagination parameters
        if (params.pageNumber !== undefined) {
            queryParams.PageNumber = params.pageNumber.toString();
        }
        if (params.pageSize !== undefined) {
            queryParams.PageSize = params.pageSize.toString();
        }
        
        // Add sort parameters if provided
        if (params.sortColumn) {
            queryParams.SortColumn = params.sortColumn;
            queryParams.SortDirection = params.sortDirection?.toUpperCase() || 'ASC';
        }
        
        // Convert to URLSearchParams for logging
        const searchParams = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            searchParams.append(key, value);
        });
        logger.info(`StatusesWithNotifications request with params: ${searchParams.toString()}`);
        
        // Pass the params object as the second argument to the get method
        // This will be converted to query parameters by axios
        return this.get<StatusesWithNotificationsResponse>('/StatusesWithNotifications', { params: queryParams });
    }

    async getLargePayment(params: LargePaymentParams): Promise<LargePaymentResponse> {
        try {
            // Validate required parameters
            if (!params.runDate) {
                throw new Error('RunDate is a required parameter');
            }
            
            // Create request body with PascalCase keys
            const requestBody: Record<string, any> = {
                RunDate: params.runDate
            };
            
            // Add pagination parameters if provided
            if (params.pageNumber) {
                requestBody.PageNumber = params.pageNumber;
            }
            
            if (params.pageSize) {
                requestBody.PageSize = params.pageSize;
            }
            
            // Add sort parameters if provided
            if (params.sortColumn) {
                requestBody.SortColumn = params.sortColumn;
                requestBody.SortDirection = params.sortDirection?.toUpperCase() || 'ASC';
            }
            
            logger.info(`LargePayment request with params: ${JSON.stringify(requestBody)}`);
            
            // Use POST method with the request body
            return this.post<LargePaymentResponse>('/largepayment', requestBody);
        } catch (error) {
            logger.error('Error getting large payment data', error);
            throw error;
        }
    }

    async getProcessingConfirmation(params: ProcessingConfirmationParams): Promise<ProcessingConfirmationResponse> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('SearchType', params.searchType);
            queryParams.append('StartDate', params.startDate);
            queryParams.append('EndDate', params.endDate);
            
            if (params.sortColumn) {
                queryParams.append('SortColumn', params.sortColumn);
            }
            
            if (params.sortDirection) {
                queryParams.append('SortDirection', params.sortDirection.toUpperCase());
            }
            
            if (params.pageNumber) {
                queryParams.append('PageNumber', params.pageNumber.toString());
            }
            
            if (params.pageSize) {
                queryParams.append('PageSize', params.pageSize.toString());
            }
            
            const response = await this.get<ProcessingConfirmationResponse>(
                `/processingconfirmation?${queryParams.toString()}`
            );
            return response;
        } catch (error) {
            logger.error('Error getting processing confirmation data', error);
            throw error;
        }
    }

    async getScheduledPaymentChangeHistory(params: ScheduledPaymentChangeHistoryParams): Promise<ScheduledPaymentChangeHistoryResponse> {
        try {
            // Validate required parameters based on search type
            if (params.searchType === undefined) {
                throw new Error('SearchType is a required parameter');
            }
            
            switch (params.searchType) {
                case ScheduledPaymentChangeHistorySearchType.MemberID:
                    if (!params.memberID) throw new Error('MemberID is required for this search type');
                    break;
                case ScheduledPaymentChangeHistorySearchType.RecurringPaymentID:
                    if (!params.recurringPaymentID) throw new Error('RecurringPaymentID is required for this search type');
                    break;
                case ScheduledPaymentChangeHistorySearchType.DateRange:
                    if (!params.startDate || !params.endDate) throw new Error('StartDate and EndDate are required for this search type');
                    break;
            }
            
            // Create request body with PascalCase keys
            const requestBody: Record<string, any> = {
                SearchType: params.searchType
            };
            
            // Add parameters based on search type
            if (params.searchType === ScheduledPaymentChangeHistorySearchType.MemberID && params.memberID) {
                requestBody.MemberID = params.memberID;
            }
            
            if (params.searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID && params.recurringPaymentID) {
                requestBody.RecurringPaymentID = params.recurringPaymentID;
            }
            
            if ((params.searchType === ScheduledPaymentChangeHistorySearchType.DateRange || 
                 params.startDate) && params.startDate) {
                requestBody.StartDate = params.startDate;
            }
            
            if ((params.searchType === ScheduledPaymentChangeHistorySearchType.DateRange || 
                 params.endDate) && params.endDate) {
                requestBody.EndDate = params.endDate;
            }
            
            // Add sort parameters if provided
            if (params.sortColumn) {
                requestBody.SortColumn = params.sortColumn;
            }
            
            if (params.sortDirection) {
                requestBody.SortDirection = params.sortDirection.toUpperCase();
            }
            
            // Add pagination parameters
            if (params.pageNumber) {
                requestBody.PageNumber = params.pageNumber;
            }
            
            if (params.pageSize) {
                requestBody.PageSize = params.pageSize;
            }
            
            logger.info(`Scheduled Payment Change History request with params: ${JSON.stringify(requestBody)}`);
            
            // Make the API call using POST
            const response = await this.post<ScheduledPaymentChangeHistoryResponse>(
                '/recurringpaymentchangehistory', requestBody
            );
            
            return response;
        } catch (error) {
            logger.error('Error getting scheduled payment change history data', error);
            throw error;
        }
    }
}