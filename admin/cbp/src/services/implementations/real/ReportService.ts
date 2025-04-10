import { IReportService } from '../../interfaces/IReportService';
import { PaymentActivityRequest, PaymentActivityItemPagedResponse } from '../../../utils/reports/paymentActivity';
import { ErrorRecapRequest, ErrorRecapItemPagedResponse, ErrorRecapSearchType } from '../../../utils/reports/errorRecap';
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
import { PayeeRequest, PayeeItemPagedResponse, PayeeSearchType } from '../../../utils/reports/payee';
import { PaymentRequest, PaymentItemPagedResponse, PaymentSearchType } from '../../../utils/reports/payment';
import { PaymentClearRequest, PaymentClearItemPagedResponse, PaymentClearSearchType } from '../../../utils/reports/paymentClear';
import { RecurringPaymentParams, RecurringPaymentItemPagedResponse, RecurringPaymentSearchType } from '../../../utils/reports/recurringPayment';
import { UserPayeeParams, UserPayeeItemPagedResponse, UserPayeeSearchType } from '../../../utils/reports/userPayee';
import { OFACExceptionsRequest, OFACExceptionsItemPagedResponse, OFACExceptionsSearchType } from '../../../utils/reports/ofacExceptions';
import { SuspendedPaymentRequest, SuspendedPaymentItemPagedResponse } from '../../../utils/reports/suspendedPayment';
import { SettlementSummaryParams, SettlementSummaryItem, SettlementSummarySearchType } from '../../../utils/reports/settlementSummary';
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

    async getActiveUserCount(params: ActiveUserCountRequest): Promise<ActiveUserCountItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Build the query string directly with PascalCase parameter names
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        // Add specific parameters based on search type
        switch (params.searchType) {
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
        
        if (params.memberId) {
            searchParams.append('MemberID', params.memberId);
        }
        
        if (params.paymentId) {
            searchParams.append('PaymentID', params.paymentId);
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
        
        // Use POST method with the request body
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

    async getPayeeReport(params: PayeeRequest): Promise<PayeeItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Validate required parameters based on search type
        switch (params.searchType) {
            case PayeeSearchType.Member:
                if (!params.memberID) throw new Error('MemberID is required for this search type');
                break;
            case PayeeSearchType.Payment:
                if (!params.paymentID) throw new Error('PaymentID is required for this search type');
                break;
            case PayeeSearchType.RecurringPayment:
                if (!params.recurringPaymentID) throw new Error('RecurringPaymentID is required for this search type');
                break;
            case PayeeSearchType.UserPayeeList:
                if (!params.userPayeeListID) throw new Error('UserPayeeListID is required for this search type');
                break;
            case PayeeSearchType.Payee:
                if (!params.payeeID) throw new Error('PayeeID is required for this search type');
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Create request body with all parameters
        const requestBody = {
            searchType: params.searchType,
            memberID: params.memberID,
            paymentID: params.paymentID,
            recurringPaymentID: params.recurringPaymentID,
            userPayeeListID: params.userPayeeListID,
            payeeID: params.payeeID,
            days: params.days,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn || 'PayeeName',
            sortDirection: params.sortDirection || 'ASC'
        };
        
        logger.info(`Payee report request with params: ${JSON.stringify(requestBody)}`);
        
        try {
            // Use POST method with request body
            return await this.post<PayeeItemPagedResponse>('/Payee', requestBody);
        } catch (error) {
            logger.error('Error fetching payee report', error);
            throw error;
        }
    }

    async getPaymentReport(params: PaymentRequest): Promise<PaymentItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Validate required parameters based on search type
        switch (params.searchType) {
            case PaymentSearchType.Member:
                if (!params.memberID) throw new Error('MemberID is required for this search type');
                break;
            case PaymentSearchType.Payment:
                if (!params.paymentID) throw new Error('PaymentID is required for this search type');
                break;
            case PaymentSearchType.RecurringPayment:
                if (!params.recurringPaymentID) throw new Error('RecurringPaymentID is required for this search type');
                break;
            case PaymentSearchType.UserPayeeList:
                if (!params.userPayeeListID) throw new Error('UserPayeeListID is required for this search type');
                break;
            case PaymentSearchType.Payee:
                if (!params.payeeID) throw new Error('PayeeID is required for this search type');
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Create request body with all parameters
        const requestBody = {
            searchType: params.searchType,
            memberID: params.memberID,
            paymentID: params.paymentID,
            recurringPaymentID: params.recurringPaymentID,
            userPayeeListID: params.userPayeeListID,
            payeeID: params.payeeID,
            days: params.days,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn || 'DateProcessed',
            sortDirection: params.sortDirection || 'DESC'
        };
        
        logger.info(`Payment report request with params: ${JSON.stringify(requestBody)}`);
        
        try {
            // Use POST method with request body
            return await this.post<PaymentItemPagedResponse>('/Payment', requestBody);
        } catch (error) {
            logger.error('Error fetching payment report', error);
            throw error;
        }
    }

    async getPaymentClearReport(params: PaymentClearRequest): Promise<PaymentClearItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Validate required parameters based on search type
        switch (params.searchType) {
            case PaymentClearSearchType.Member:
                if (!params.memberID) throw new Error('MemberID is required for this search type');
                break;
            case PaymentClearSearchType.Payment:
                if (!params.paymentID) throw new Error('PaymentID is required for this search type');
                break;
            case PaymentClearSearchType.RecurringPayment:
                if (!params.recurringPaymentID) throw new Error('RecurringPaymentID is required for this search type');
                break;
            case PaymentClearSearchType.UserPayeeList:
                if (!params.userPayeeListID) throw new Error('UserPayeeListID is required for this search type');
                break;
            case PaymentClearSearchType.Payee:
                if (!params.payeeID) throw new Error('PayeeID is required for this search type');
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Create request body with all parameters
        const requestBody = {
            searchType: params.searchType,
            memberID: params.memberID,
            paymentID: params.paymentID,
            recurringPaymentID: params.recurringPaymentID,
            userPayeeListID: params.userPayeeListID,
            payeeID: params.payeeID,
            days: params.days,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn || 'ClearedDate',
            sortDirection: params.sortDirection || 'DESC'
        };
        
        logger.info(`Payment clear report request with params: ${JSON.stringify(requestBody)}`);
        
        try {
            // Use POST method with request body
            return await this.post<PaymentClearItemPagedResponse>('/PaymentClear', requestBody);
        } catch (error) {
            logger.error('Error fetching payment clear report', error);
            throw error;
        }
    }

    async getRecurringPaymentReport(params: RecurringPaymentParams): Promise<RecurringPaymentItemPagedResponse> {
        this.validateRecurringPaymentParams(params);
        
        // Create request body with all parameters
        const requestBody = {
            searchType: params.searchType,
            memberID: params.memberID,
            paymentID: params.paymentID,
            recurringPaymentID: params.recurringPaymentID,
            userPayeeListID: params.userPayeeListID,
            payeeID: params.payeeID,
            days: params.days,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn || 'NextPaymentDate',
            sortDirection: params.sortDirection || 'DESC'
        };
        
        logger.info(`Recurring payment report request with params: ${JSON.stringify(requestBody)}`);
        
        try {
            // Use POST method with request body
            return await this.post<RecurringPaymentItemPagedResponse>('/RecurringPayment', requestBody);
        } catch (error) {
            logger.error('Error fetching recurring payment report', error);
            throw error;
        }
    }

    async getUserPayeeReport(params: UserPayeeParams): Promise<UserPayeeItemPagedResponse> {
        this.validateUserPayeeParams(params);
        
        // Create request body with all parameters
        const requestBody = {
            searchType: params.searchType,
            memberID: params.memberID,
            paymentID: params.paymentID,
            recurringPaymentID: params.recurringPaymentID,
            userPayeeListID: params.userPayeeListID,
            payeeID: params.payeeID,
            days: params.days,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn || 'DateAdded',
            sortDirection: params.sortDirection || 'DESC'
        };
        
        logger.info(`User payee report request with params: ${JSON.stringify(requestBody)}`);
        
        try {
            // Use POST method with request body
            return await this.post<UserPayeeItemPagedResponse>('/UserPayee', requestBody);
        } catch (error) {
            logger.error('Error fetching user payee report', error);
            throw error;
        }
    }

    private validateRecurringPaymentParams(params: RecurringPaymentParams): void {
        if (!params.searchType) {
            throw new Error('SearchType is required');
        }

        // Validate required parameters based on search type
        switch (params.searchType) {
            case RecurringPaymentSearchType.Member:
                if (!params.memberID) {
                    throw new Error('Member ID is required for Member search type');
                }
                break;
            case RecurringPaymentSearchType.Payment:
                if (!params.paymentID) {
                    throw new Error('Payment ID is required for Payment search type');
                }
                break;
            case RecurringPaymentSearchType.RecurringPayment:
                if (!params.recurringPaymentID) {
                    throw new Error('Recurring Payment ID is required for Recurring Payment search type');
                }
                break;
            case RecurringPaymentSearchType.UserPayeeList:
                if (!params.userPayeeListID) {
                    throw new Error('User Payee List ID is required for User Payee List search type');
                }
                break;
            case RecurringPaymentSearchType.Payee:
                if (!params.payeeID) {
                    throw new Error('Payee ID is required for Payee search type');
                }
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }

        // Validate days
        if (params.days < 1 || params.days > 3650) {
            throw new Error('Days must be between 1 and 3650');
        }
    }

    private validateUserPayeeParams(params: UserPayeeParams): void {
        if (!params.searchType) {
            throw new Error('SearchType is required');
        }

        // Validate required parameters based on search type
        switch (params.searchType) {
            case UserPayeeSearchType.Member:
                if (!params.memberID) {
                    throw new Error('Member ID is required for Member search type');
                }
                break;
            case UserPayeeSearchType.Payment:
                if (!params.paymentID) {
                    throw new Error('Payment ID is required for Payment search type');
                }
                break;
            case UserPayeeSearchType.RecurringPayment:
                if (!params.recurringPaymentID) {
                    throw new Error('Recurring Payment ID is required for Recurring Payment search type');
                }
                break;
            case UserPayeeSearchType.UserPayeeList:
                if (!params.userPayeeListID) {
                    throw new Error('User Payee List ID is required for User Payee List search type');
                }
                break;
            case UserPayeeSearchType.Payee:
                if (!params.payeeID) {
                    throw new Error('Payee ID is required for Payee search type');
                }
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }

        // Validate days
        if (params.days < 1 || params.days > 3650) {
            throw new Error('Days must be between 1 and 3650');
        }
    }

    /**
     * Get OFAC exceptions report data using the dedicated endpoint
     * @param params OFAC exceptions report search parameters
     * @returns Promise with OFAC exceptions report data
     */
    async getOFACExceptionsReport(params: OFACExceptionsRequest): Promise<OFACExceptionsItemPagedResponse> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Create request body with all parameters
        const requestBody: Record<string, any> = {
            SearchType: params.searchType,
            PageNumber: params.pageNumber || 1,
            PageSize: params.pageSize || 20
        };

        // Add parameters based on search type
        switch (params.searchType) {
            case OFACExceptionsSearchType.SingleDate:
                if (!params.selectedSingleDate) {
                    throw new Error('Selected single date is required for Single Date search type');
                }
                requestBody.SelectedSingleDate = params.selectedSingleDate;
                break;
            case OFACExceptionsSearchType.MonthYear:
                if (params.monthSelected === undefined || params.yearSelected === undefined) {
                    throw new Error('Month and year are required for Month/Year search type');
                }
                requestBody.MonthSelected = params.monthSelected;
                requestBody.YearSelected = params.yearSelected;
                break;
            case OFACExceptionsSearchType.DateRange:
                if (!params.selectedStartDate || !params.selectedEndDate) {
                    throw new Error('Start date and end date are required for Date Range search type');
                }
                requestBody.SelectedStartDate = params.selectedStartDate;
                requestBody.SelectedEndDate = params.selectedEndDate;
                break;
            case OFACExceptionsSearchType.All:
                // No additional parameters needed for All search type
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }

        // Add sort parameters if provided
        if (params.sortColumn) {
            requestBody.SortColumn = params.sortColumn;
            requestBody.SortDirection = params.sortDirection || 'DESC';
        }

        logger.info(`OFAC Exceptions report request with params: ${JSON.stringify(requestBody)}`);

        try {
            // Use POST method with request body
            return await this.post<OFACExceptionsItemPagedResponse>('/OFACExceptions', requestBody);
        } catch (error) {
            logger.error('Error fetching OFAC exceptions report', error);
            throw error;
        }
    }

    /**
     * Get suspended payment report data using the dedicated endpoint
     * @param params Suspended payment report search parameters
     * @returns Promise with suspended payment report data
     */
    async getSuspendedPaymentReport(params: SuspendedPaymentRequest): Promise<SuspendedPaymentItemPagedResponse> {
        // Create request body with all parameters
        const requestBody: Record<string, any> = {
            PageNumber: params.pageNumber || 1,
            PageSize: params.pageSize || 20
        };

        // Add sort parameters if provided
        if (params.sortColumn) {
            requestBody.SortColumn = params.sortColumn;
            requestBody.SortDirection = params.sortDirection || 'DESC';
        }

        logger.info(`Suspended Payment report request with params: ${JSON.stringify(requestBody)}`);

        try {
            // Use GET method with query parameters
            const searchParams = new URLSearchParams();
            
            searchParams.append('PageNumber', (params.pageNumber || 1).toString());
            searchParams.append('PageSize', (params.pageSize || 20).toString());
            
            if (params.sortColumn) {
                searchParams.append('SortColumn', params.sortColumn);
                searchParams.append('SortDirection', params.sortDirection || 'DESC');
            }
            
            const queryString = searchParams.toString();
            logger.info(`Suspended Payment request with query string: ${queryString}`);
            
            return await this.get<SuspendedPaymentItemPagedResponse>(`/SuspendedPayment?${queryString}`);
        } catch (error) {
            logger.error('Error fetching suspended payment report', error);
            throw error;
        }
    }

    /**
     * Get settlement summary report data using the dedicated endpoint
     * @param params Settlement summary report search parameters
     * @returns Promise with settlement summary items
     */
    async getSettlementSummaryReport(params: SettlementSummaryParams): Promise<SettlementSummaryItem[]> {
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }

        // Build the query string with PascalCase parameter names as expected by the API
        const searchParams = new URLSearchParams();
        searchParams.append('SearchType', params.searchType.toString());
        
        // Add specific parameters based on search type
        switch (params.searchType) {
            case SettlementSummarySearchType.SingleDate:
                if (!params.selectedSingleDate) {
                    throw new Error('Selected single date is required for Single Date search type');
                }
                searchParams.append('SelectedSingleDate', params.selectedSingleDate);
                break;
            case SettlementSummarySearchType.MonthYear:
                if (params.monthSelected === undefined || params.yearSelected === undefined) {
                    throw new Error('Month and year are required for Month/Year search type');
                }
                searchParams.append('MonthSelected', params.monthSelected.toString());
                searchParams.append('YearSelected', params.yearSelected.toString());
                break;
            case SettlementSummarySearchType.Year:
                if (params.yearSelected === undefined) {
                    throw new Error('Year is required for Year search type');
                }
                searchParams.append('YearSelected', params.yearSelected.toString());
                break;
            case SettlementSummarySearchType.DateRange:
                if (!params.selectedStartDate || !params.selectedEndDate) {
                    throw new Error('Start date and end date are required for Date Range search type');
                }
                searchParams.append('SelectedStartDate', params.selectedStartDate);
                searchParams.append('SelectedEndDate', params.selectedEndDate);
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }

        const queryString = searchParams.toString();
        logger.info(`Settlement Summary report request with query string: ${queryString}`);

        try {
            // Use GET method with query parameters
            return await this.get<SettlementSummaryItem[]>(`/SettlementSummary?${queryString}`);
        } catch (error) {
            logger.error('Error fetching settlement summary report', error);
            throw error;
        }
    }
}