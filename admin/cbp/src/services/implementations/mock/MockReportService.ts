import { PaymentActivityRequest, PaymentActivityItemPagedResponse, PaymentActivityItem, PaymentActivitySearchType } from '../../../utils/reports/paymentActivity';
import { ErrorRecapRequest, ErrorRecapItemPagedResponse, ErrorRecapItem, ErrorRecapSearchType } from '../../../utils/reports/errorRecap';
import { BillPaySearchRequest, BillPaySearchItemPagedResponse, BillPaySearchItem, BillPaySearchType } from '../../../utils/reports/billPaySearch';
import { ActiveUserCountRequest, ActiveUserCountItemPagedResponse, ActiveUserCountItem, ActiveUserCountSearchType } from '../../../utils/reports/activeUserCount';
import { FailedOnUsParams, FailedOnUsResponse, FailedOnUsItem, FailedOnUsSearchType } from '../../../utils/reports/failedOnUs';
import { GlobalHolidaysParams, GlobalHolidaysResponse, GlobalHolidaysSearchType } from '../../../utils/reports/globalHolidays';
import { MonthlyUsersParams, MonthlyUsersResponse, MonthlyUsersItem, MonthlyUsersSearchType } from '../../../utils/reports/monthlyUsers';
import { PendingPaymentsParams, PendingPaymentsResponse, PendingPaymentsItem } from '../../../utils/reports/pendingPayments';
import { RecurringPaymentChangeHistoryParams, RecurringPaymentChangeHistoryResponse, RecurringPaymentChangeHistoryItem, RecurringPaymentChangeHistorySearchType } from '../../../utils/reports/recurringPaymentChangeHistory';
import { UserPayeeChangeHistoryParams, UserPayeeChangeHistoryResponse, UserPayeeChangeHistorySearchType, UserPayeeChangeHistoryItem } from '../../../utils/reports/userPayeeChangeHistory';
import { OnUsPostingsParams, OnUsPostingsResponse, OnUsPostingsSearchType, OnUsPostingsItem } from '../../../utils/reports/onUsPostings';
import { StatusesWithNotificationsParams, StatusesWithNotificationsResponse, StatusesWithNotificationsItem } from '../../../utils/reports/statusesWithNotifications';
import { LargePaymentParams, LargePaymentResponse, LargePaymentItem } from '../../../utils/reports/largePayment';
import { ProcessingConfirmationParams, ProcessingConfirmationResponse } from '../../../utils/reports/processingConfirmation';
import { ScheduledPaymentChangeHistoryParams, ScheduledPaymentChangeHistoryResponse, ScheduledPaymentChangeHistoryItem, ScheduledPaymentChangeHistorySearchType } from '../../../utils/reports/scheduledPaymentChangeHistory';
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
        }
        if (params.sortDirection) {
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

    async getBillPaySearch(params: BillPaySearchRequest): Promise<BillPaySearchItemPagedResponse> {
        await this.delay();
        
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        if (!params.id) {
            throw new Error('ID is a required parameter');
        }
        
        if (params.reportType === undefined) {
            throw new Error('ReportType is a required parameter');
        }
        
        logger.info(`Mock BillPaySearch request with params: ${JSON.stringify({
            SearchType: params.searchType,
            Id: params.id,
            Days: params.days,
            ReportType: params.reportType,
            SortColumn: params.sortColumn,
            PageNumber: params.pageNumber || 1,
            PageSize: params.pageSize || 20,
            SortDirection: params.sortDirection || 'ASC'
        })}`);
        
        // Pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const totalItems = 120; // Mock total count
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Generate items for the current page
        const items: BillPaySearchItem[] = [];
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
            const today = new Date();
            const processedDate = new Date(today);
            processedDate.setDate(today.getDate() - (i % 30));
            
            const dueDate = new Date(processedDate);
            dueDate.setDate(processedDate.getDate() - 3);
            
            const item: BillPaySearchItem = {
                paymentID: `P${200000 + i}`,
                recurringPaymentID: i % 3 === 0 ? `RP${300000 + i}` : null,
                memberID: `M${100000 + i}`,
                account: `ACCT-${i % 5}`,
                amount: 100 + (i * 10.25),
                checkNumber: i % 2 === 0 ? `CHK-${1000 + i}` : null,
                dateProcessed: processedDate.toISOString(),
                willProcessDate: null,
                dueDate: dueDate.toISOString(),
                failedDate: null,
                cancelledDate: null,
                status: i % 5 === 0 ? 'Pending' : (i % 5 === 1 ? 'Processed' : (i % 5 === 2 ? 'Failed' : (i % 5 === 3 ? 'Cancelled' : 'Scheduled'))),
                userPayeeListID: `UPL${300000 + i}`,
                payeeID: `PY${400000 + i}`,
                accountAtPayee: `ACCT-${500000 + i}`,
                nameOnAccount: `Mock User ${i + 1}`,
                paymentMethod: i % 3 === 0 ? 'Check' : 'Electronic',
                memo: i % 2 === 0 ? `Payment memo ${i}` : null,
                sourceApplication: 'Web',
                memberFirstName: `FirstName${i}`,
                memberMiddleName: i % 2 === 0 ? `M` : null,
                memberLastName: `LastName${i}`,
                memberAddress1: `${1000 + i} Main St`,
                memberAddress2: i % 3 === 0 ? `Apt ${i}` : null,
                memberCity: 'Mockville',
                memberState: 'MO',
                memberZipCode: `${10000 + i}`,
                memberCountry: 'US',
                memberHomePhone: `555-${100 + i}-${1000 + i}`,
                memberWorkPhone: i % 2 === 0 ? `555-${200 + i}-${2000 + i}` : null,
                memberWorkPhoneExt: i % 4 === 0 ? `${i % 100}` : null,
                memberEmail: `user${i}@example.com`
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

    async getActiveUserCount(params: ActiveUserCountRequest): Promise<ActiveUserCountItemPagedResponse> {
        await this.delay();
        
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        // Validate required parameters based on search type
        switch (params.searchType) {
            case ActiveUserCountSearchType.MemberID:
                if (!params.memberID) throw new Error('MemberID is required for this search type');
                break;
            case ActiveUserCountSearchType.DateRange:
                if (!params.startDate || !params.endDate) throw new Error('StartDate and EndDate are required for this search type');
                break;
            default:
                throw new Error(`Unsupported search type: ${params.searchType}`);
        }
        
        logger.info(`Mock ActiveUserCount request with params: ${JSON.stringify(params)}`);
        
        // Pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const totalItems = 120; // Mock total count
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Generate items for the current page
        const items: ActiveUserCountItem[] = [];
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
            const today = new Date();
            const lastActivityDate = new Date(today);
            lastActivityDate.setDate(today.getDate() - (i % 30));
            
            const item: ActiveUserCountItem = {
                memberID: `M${100000 + i}`,
                firstName: `FirstName${i}`,
                lastName: `LastName${i}`,
                email: `user${i}@example.com`,
                lastActivityDate: lastActivityDate.toISOString(),
                paymentCount: 5 + (i % 20)
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

    async getFailedOnUs(params: FailedOnUsParams): Promise<FailedOnUsResponse> {
        await this.delay();
        
        if (params.searchType === undefined) {
            throw new Error('SearchType is a required parameter');
        }
        
        // Validate required parameters based on search type
        switch (params.searchType) {
            case FailedOnUsSearchType.MemberID:
                if (!params.memberID) throw new Error('MemberID is required for this search type');
                break;
            case FailedOnUsSearchType.PaymentID:
                if (!params.paymentID) throw new Error('PaymentID is required for this search type');
                break;
            case FailedOnUsSearchType.DateRange:
                if (!params.startDate || !params.endDate) throw new Error('StartDate and EndDate are required for this search type');
                break;
            default:
                throw new Error(`Unsupported search type: ${params.searchType}`);
        }
        
        logger.info(`Mock FailedOnUs request with params: ${JSON.stringify(params)}`);
        
        // Pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        const totalItems = 120; // Mock total count
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Generate items for the current page
        const items: FailedOnUsItem[] = [];
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
            const today = new Date();
            const paymentDate = new Date(today);
            paymentDate.setDate(today.getDate() - (i % 30));
            
            const item: FailedOnUsItem = {
                paymentID: `P${200000 + i}`,
                memberID: `M${100000 + i}`,
                firstName: `FirstName${i}`,
                lastName: `LastName${i}`,
                email: `user${i}@example.com`,
                paymentDate: paymentDate.toISOString(),
                amount: 100 + (i * 10.25),
                status: i % 3 === 0 ? 'Failed' : (i % 3 === 1 ? 'Rejected' : 'Returned'),
                errorMessage: i % 3 === 0 ? 'Insufficient funds' : (i % 3 === 1 ? 'Invalid account number' : 'Account closed')
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

    /**
     * Get mock global holidays data
     * @param params Global holidays search parameters
     * @returns Promise with mock global holidays data
     */
    async getGlobalHolidays(params: GlobalHolidaysParams): Promise<GlobalHolidaysResponse> {
        await this.delay();
        
        // Get pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        
        // Generate mock data
        const totalItems = 45; // Total number of items in the mock dataset
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Calculate start and end indices for the current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Holiday types for mock data
        const holidayTypes = ['Federal', 'State', 'Religious', 'Financial', 'International'];
        
        // Generate items for the current page
        const items = [];
        for (let i = startIndex; i < endIndex; i++) {
            const date = new Date(2023, i % 12, (i % 28) + 1);
            const item = {
                id: `H${1000 + i}`,
                date: date.toISOString(),
                description: `Holiday ${i + 1}`,
                holidayType: holidayTypes[i % holidayTypes.length]
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

    /**
     * Get mock monthly users data
     * @param params Monthly users search parameters
     * @returns Promise with mock monthly users data
     */
    async getMonthlyUsers(params: MonthlyUsersParams): Promise<MonthlyUsersResponse> {
        await this.delay();
        
        // Validate required parameters
        if (params.searchType !== MonthlyUsersSearchType.DateRange) {
            throw new Error('Invalid SearchType. Only DateRange is supported.');
        }
        
        if (!params.startDate || !params.endDate) {
            throw new Error('StartDate and EndDate are required for DateRange search type');
        }
        
        // Get pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        
        // Generate mock data
        const totalItems = 75; // Total number of items in the mock dataset
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Calculate start and end indices for the current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Generate items for the current page
        const items: MonthlyUsersItem[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            const item: MonthlyUsersItem = {
                memberID: `M${100000 + i}`,
                numberOfPayments: 5 + (i % 20) // Random number of payments between 5 and 24
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

    /**
     * Get pending payments data
     * @param params Pending payments search parameters
     * @returns Promise with pending payments data
     */
    async getPendingPayments(params: PendingPaymentsParams): Promise<PendingPaymentsResponse> {
        await this.delay();
        
        // Validate required parameters
        if (!params.date) {
            throw new Error('Date is required for this search type');
        }
        
        // Get pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        
        // Generate mock data
        const totalItems = 85; // Total number of items in the mock dataset
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Calculate start and end indices for the current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Status options for mock data
        const statusOptions = ['Pending', 'Processing', 'Scheduled'];
        
        // Payee name options for mock data
        const payeeNames = ['Electric Company', 'Water Utility', 'Cable Provider', 'Phone Company', 'Credit Card', 'Mortgage Lender'];
        
        // Parse the selected date
        const selectedDate = new Date(params.date);
        
        // Generate items for the current page
        const items: PendingPaymentsItem[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            // Generate process date (willProcessDate) within the next 30 days from the selected date
            const processDate = new Date(selectedDate);
            processDate.setDate(selectedDate.getDate() + (i % 30));
            
            // Generate delivery date a few days after process date
            const deliveryDate = new Date(processDate);
            deliveryDate.setDate(processDate.getDate() + 2 + (i % 3));
            
            const item: PendingPaymentsItem = {
                paymentID: `P${200000 + i}`,
                recurringID: i % 3 === 0 ? `R${100000 + (i % 20)}` : undefined,
                memberID: `M${100000 + (i % 50)}`,
                amount: 50 + (i % 10) * 25, // Random amount between $50 and $275
                payeeName: payeeNames[i % payeeNames.length],
                willProcessDate: processDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                deliveryDate: deliveryDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                status: statusOptions[i % statusOptions.length]
            };
            items.push(item);
        }
        
        // Sort the items if sort parameters are provided
        if (params.sortColumn) {
            const sortField = params.sortColumn.charAt(0).toLowerCase() + params.sortColumn.slice(1);
            const sortDirection = params.sortDirection || 'asc';
            
            items.sort((a, b) => {
                const aValue = a[sortField as keyof PendingPaymentsItem];
                const bValue = b[sortField as keyof PendingPaymentsItem];
                
                // Handle undefined values
                if (aValue === undefined && bValue === undefined) return 0;
                if (aValue === undefined) return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                if (bValue === undefined) return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                
                if (aValue < bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                }
                return 0;
            });
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

    /**
     * Get recurring payment change history data
     * @param params Recurring payment change history search parameters
     * @returns Promise with recurring payment change history data
     */
    async getRecurringPaymentChangeHistory(params: RecurringPaymentChangeHistoryParams): Promise<RecurringPaymentChangeHistoryResponse> {
        await this.delay();
        
        // Validate date parameters for all search types
        if (!params.startDate || !params.endDate) {
            throw new Error('Start date and end date are required');
        }
        
        // Validate required parameters based on search type
        switch (params.searchType) {
            case RecurringPaymentChangeHistorySearchType.DateRange:
                // Date parameters already validated above
                break;
            case RecurringPaymentChangeHistorySearchType.RecurringPaymentID:
                if (!params.recurringPaymentID) {
                    throw new Error('Recurring payment ID is required for recurring payment ID search');
                }
                break;
            case RecurringPaymentChangeHistorySearchType.MemberID:
                if (!params.memberID) {
                    throw new Error('Member ID is required for member ID search');
                }
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Get pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        
        // Generate mock data
        const totalItems = 75; // Total number of items in the mock dataset
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Calculate start and end indices for the current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Change type options for mock data
        const changeTypes = ['Created', 'Modified', 'Cancelled', 'Reactivated'];
        
        // Field name options for mock data
        const fieldNames = ['Amount', 'Frequency', 'NextPaymentDate', 'PayeeName', 'DeliveryMethod'];
        
        // User names for updatedBy field
        const userNames = ['John Smith', 'Jane Doe', 'Admin User', 'System'];
        
        // Payee name options for mock data
        const payeeNames = ['Electric Company', 'Water Utility', 'Cable Provider', 'Phone Company', 'Credit Card', 'Mortgage Lender'];
        
        // Frequency options
        const frequencies = ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly'];
        
        // Generate items for the current page
        const items: RecurringPaymentChangeHistoryItem[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            // Generate update date within the last 90 days
            const updatedOn = new Date();
            updatedOn.setDate(updatedOn.getDate() - (i % 90));
            
            // Select change type
            const changeType = changeTypes[i % changeTypes.length];
            
            // Generate field name, old value, and new value for modifications
            let fieldName: string | undefined;
            let oldValue: string | undefined;
            let newValue: string | undefined;
            let amount: number | undefined;
            let frequency: string | undefined;
            
            if (changeType === 'Modified') {
                fieldName = fieldNames[i % fieldNames.length];
                
                // Generate appropriate old and new values based on field name
                switch (fieldName) {
                    case 'Amount':
                        oldValue = `$${(50 + (i % 10) * 10).toFixed(2)}`;
                        newValue = `$${(100 + (i % 10) * 10).toFixed(2)}`;
                        amount = 100 + (i % 10) * 10;
                        break;
                    case 'Frequency':
                        oldValue = frequencies[i % frequencies.length];
                        newValue = frequencies[(i + 1) % frequencies.length];
                        frequency = frequencies[(i + 1) % frequencies.length];
                        break;
                    case 'NextPaymentDate':
                        const oldDate = new Date();
                        oldDate.setDate(oldDate.getDate() + 15);
                        const newDate = new Date();
                        newDate.setDate(newDate.getDate() + 30);
                        oldValue = oldDate.toISOString().split('T')[0];
                        newValue = newDate.toISOString().split('T')[0];
                        break;
                    case 'PayeeName':
                        oldValue = payeeNames[i % payeeNames.length];
                        newValue = `New ${payeeNames[i % payeeNames.length]}`;
                        break;
                    case 'DeliveryMethod':
                        oldValue = 'Check';
                        newValue = 'Electronic';
                        break;
                    default:
                        oldValue = 'Old Value';
                        newValue = 'New Value';
                }
            } else if (changeType === 'Created') {
                amount = 100 + (i % 10) * 25;
                frequency = frequencies[i % frequencies.length];
            }
            
            const item: RecurringPaymentChangeHistoryItem = {
                recurringPaymentId: `R${100000 + (i % 50)}`,
                memberID: `M${200000 + (i % 30)}`,
                payeeName: payeeNames[i % payeeNames.length],
                updatedOn: updatedOn.toISOString().split('T')[0], // Format as YYYY-MM-DD
                changeType,
                updatedBy: userNames[i % userNames.length],
                fieldName,
                oldValue,
                newValue,
                amount,
                frequency
            };
            items.push(item);
        }
        
        // Sort the items if sort parameters are provided
        if (params.sortColumn) {
            const sortField = params.sortColumn.charAt(0).toLowerCase() + params.sortColumn.slice(1);
            const sortDirection = params.sortDirection || 'asc';
            
            items.sort((a, b) => {
                const aValue = a[sortField as keyof RecurringPaymentChangeHistoryItem];
                const bValue = b[sortField as keyof RecurringPaymentChangeHistoryItem];
                
                // Handle undefined values
                if (aValue === undefined && bValue === undefined) return 0;
                if (aValue === undefined) return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                if (bValue === undefined) return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                
                if (aValue < bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                }
                return 0;
            });
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

    /**
     * Get user payee change history data
     * @param params User payee change history search parameters
     * @returns Promise with user payee change history data
     */
    async getUserPayeeChangeHistory(params: UserPayeeChangeHistoryParams): Promise<UserPayeeChangeHistoryResponse> {
        await this.delay();
        
        // Validate date parameters
        if (!params.startDate || !params.endDate) {
            throw new Error('Start date and end date are required');
        }
        
        // Validate required parameters based on search type
        switch (params.searchType) {
            case UserPayeeChangeHistorySearchType.UserPayeeListID:
                if (!params.userPayeeListID) {
                    throw new Error('User Payee List ID is required for User Payee List ID search');
                }
                break;
            case UserPayeeChangeHistorySearchType.MemberID:
                if (!params.memberID) {
                    throw new Error('Member ID is required for Member ID search');
                }
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Get pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        
        // Generate mock data
        const totalItems = 85; // Total number of items in the mock dataset
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Calculate start and end indices for the current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Change type options for mock data
        const changeTypes = ['Created', 'Modified', 'Deleted', 'Activated', 'Deactivated'];
        
        // User names for updatedBy field
        const userNames = ['John Smith', 'Jane Doe', 'Admin User', 'System'];
        
        // Payee name options for mock data
        const payeeNames = ['Electric Company', 'Water Utility', 'Cable Provider', 'Phone Company', 'Credit Card', 'Mortgage Lender'];
        
        // Payment method options
        const paymentMethods = ['Check', 'Electronic', 'Debit Card'];
        
        // Generate items for the current page
        const items: UserPayeeChangeHistoryItem[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            // Generate update date within the last 90 days
            const updatedOn = new Date();
            updatedOn.setDate(updatedOn.getDate() - (i % 90));
            
            // Select change type
            const changeType = changeTypes[i % changeTypes.length];
            
            const item: UserPayeeChangeHistoryItem = {
                memberID: `M${200000 + (i % 30)}`,
                userPayeeListId: `UPL${300000 + (i % 50)}`,
                payeeId: `P${400000 + (i % 40)}`,
                payeeName: payeeNames[i % payeeNames.length],
                updatedOn: updatedOn.toISOString().split('T')[0], // Format as YYYY-MM-DD
                changeType,
                updatedBy: userNames[i % userNames.length],
                paymentMethod: paymentMethods[i % paymentMethods.length],
                active: i % 2 === 0, // Alternating true/false
                fisPayeeId: `FIS${500000 + (i % 40)}`,
                usersAccountAtPayee: `ACCT-${600000 + (i % 40)}`,
                nameOnAccount: `${userNames[i % userNames.length]} Account`,
                payeeType: 'Standard'
            };
            
            // Add reason for some change types
            if (changeType === 'Modified' || changeType === 'Deleted' || changeType === 'Deactivated') {
                item.reason = `User requested ${changeType.toLowerCase()}`;
            }
            
            items.push(item);
        }
        
        // Sort the items if sort parameters are provided
        if (params.sortColumn) {
            const sortField = params.sortColumn.charAt(0).toLowerCase() + params.sortColumn.slice(1);
            const sortDirection = params.sortDirection || 'asc';
            
            items.sort((a, b) => {
                const aValue = a[sortField as keyof UserPayeeChangeHistoryItem];
                const bValue = b[sortField as keyof UserPayeeChangeHistoryItem];
                
                // Handle undefined values
                if (aValue === undefined && bValue === undefined) return 0;
                if (aValue === undefined) return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                if (bValue === undefined) return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                
                if (aValue < bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                }
                return 0;
            });
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

    /**
     * Get on us postings data
     * @param params On us postings search parameters
     * @returns Promise with on us postings data
     */
    async getOnUsPostings(params: OnUsPostingsParams): Promise<OnUsPostingsResponse> {
        await this.delay();
        
        // Validate date parameters
        if (!params.startDate || !params.endDate) {
            throw new Error('Start date and end date are required');
        }
        
        // Validate required parameters based on search type
        switch (params.searchType) {
            case OnUsPostingsSearchType.PaymentID:
                if (!params.paymentID) {
                    throw new Error('Payment ID is required for Payment ID search');
                }
                break;
            case OnUsPostingsSearchType.MemberID:
                if (!params.memberID) {
                    throw new Error('Member ID is required for Member ID search');
                }
                break;
            case OnUsPostingsSearchType.AccountID:
                if (!params.accountID) {
                    throw new Error('Account ID is required for Account ID search');
                }
                break;
            case OnUsPostingsSearchType.LoanID:
                if (!params.loanID) {
                    throw new Error('Loan ID is required for Loan ID search');
                }
                break;
            case OnUsPostingsSearchType.RunID:
                if (!params.runID) {
                    throw new Error('Run ID is required for Run ID search');
                }
                break;
            case OnUsPostingsSearchType.DateRange:
                // Only date range parameters are required, which are already added
                break;
            default:
                throw new Error(`Invalid search type: ${params.searchType}`);
        }
        
        // Get pagination parameters
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 20;
        
        // Generate mock data
        const totalItems = 75; // Total number of items in the mock dataset
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Calculate start and end indices for the current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        
        // Generate items for the current page
        const items: OnUsPostingsItem[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            // Generate entry date within the date range
            const entryDate = new Date();
            entryDate.setDate(entryDate.getDate() - (i % 30));
            
            // Generate modified date after entry date
            const modifiedDate = new Date(entryDate);
            modifiedDate.setHours(modifiedDate.getHours() + (i % 12));
            
            const item: OnUsPostingsItem = {
                seqNo: `SEQ${100000 + i}`,
                paymentID: `PAY${200000 + i}`,
                memberID: `M${300000 + (i % 20)}`,
                accountID: `ACC${400000 + (i % 15)}`,
                loanID: i % 3 === 0 ? `LOAN${500000 + (i % 10)}` : undefined,
                amount: 100 + (i * 10.25) % 900,
                comment: i % 5 === 0 ? `Comment for posting ${i}` : undefined,
                glCode: `GL${1000 + (i % 5)}`,
                runID: `RUN${600000 + (i % 8)}`,
                errorCode: i % 10 === 0 ? `ERR${i % 5}` : undefined,
                errorDesc: i % 10 === 0 ? `Error description ${i}` : undefined,
                sourceApp: i % 2 === 0 ? 'BillPay' : 'CoreBanking',
                entryDate: entryDate.toISOString(),
                modifiedDate: modifiedDate.toISOString(),
                modifiedBy: i % 3 === 0 ? 'System' : 'Admin User'
            };
            
            items.push(item);
        }
        
        // Sort the items if sort parameters are provided
        if (params.sortColumn) {
            const sortField = params.sortColumn.charAt(0).toLowerCase() + params.sortColumn.slice(1);
            const sortDirection = params.sortDirection || 'asc';
            
            items.sort((a, b) => {
                const aValue = a[sortField as keyof OnUsPostingsItem];
                const bValue = b[sortField as keyof OnUsPostingsItem];
                
                // Handle undefined values
                if (aValue === undefined && bValue === undefined) return 0;
                if (aValue === undefined) return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                if (bValue === undefined) return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                
                if (aValue < bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection.toLowerCase() === 'asc' ? 1 : -1;
                }
                return 0;
            });
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

    async getStatusesWithNotifications(params: StatusesWithNotificationsParams): Promise<StatusesWithNotificationsResponse> {
        await this.delay();
        
        // Validate required parameters
        if (params.pageNumber === undefined || params.pageSize === undefined) {
            throw new Error('PageNumber and PageSize are required parameters');
        }
        
        // Pagination parameters
        const pageNumber = params.pageNumber;
        const pageSize = params.pageSize;
        const totalItems = 75;
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Generate mock data
        const items: StatusesWithNotificationsItem[] = Array.from({ length: 50 }, (_, index) => ({
            statusCode: `SC${(index + 1).toString().padStart(3, '0')}`,
            statusDescription: `Status Description ${index + 1}`,
            statusFriendlyName: `Friendly Name ${index + 1}`,
            statusHostCode: `HC${(index + 1).toString().padStart(3, '0')}`,
            notificationId: `NID${(index + 1).toString().padStart(5, '0')}`,
            notificationErrorNumber: index % 10,
            notificationMatchMode: index % 3, // Changed to number
            notificationMatchOrder: index % 5,
            notificationDescription: `Notification Description ${index + 1}`,
            notificationText: `This is notification text for status ${index + 1}`
        }));
        
        // Apply sorting
        if (params.sortColumn) {
            items.sort((a, b) => {
                const aValue = a[params.sortColumn.toLowerCase() as keyof StatusesWithNotificationsItem];
                const bValue = b[params.sortColumn.toLowerCase() as keyof StatusesWithNotificationsItem];
                
                if (aValue === null || aValue === undefined) return 1;
                if (bValue === null || bValue === undefined) return -1;
                
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return params.sortDirection === 'asc' 
                        ? aValue.localeCompare(bValue) 
                        : bValue.localeCompare(aValue);
                }
                
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return params.sortDirection === 'asc' 
                        ? aValue - bValue 
                        : bValue - aValue;
                }
                
                return 0;
            });
        }
        
        // Apply pagination
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = items.slice(startIndex, endIndex);
        
        return {
            items: paginatedItems,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalCount: items.length,
            totalPages: Math.ceil(items.length / pageSize),
            hasNext: endIndex < items.length,
            hasPrevious: pageNumber > 1
        };
    }

    async getLargePayment(params: LargePaymentParams): Promise<LargePaymentResponse> {
        await this.delay();
        
        // Validate required parameters
        if (!params.runDate) {
            throw new Error('RunDate is a required parameter');
        }
        
        // Generate mock data
        const items: LargePaymentItem[] = Array.from({ length: 50 }, (_, index) => ({
            memberID: `M${(index + 1000).toString().padStart(6, '0')}`,
            amount: 1000 + (index * 100) + Math.floor(Math.random() * 100),
            payeeName: `Payee ${index + 1}`,
            status: index % 4 === 0 ? 'Completed' : index % 4 === 1 ? 'Pending' : index % 4 === 2 ? 'Failed' : 'Cancelled'
        }));
        
        // Apply sorting
        if (params.sortColumn) {
            items.sort((a, b) => {
                const aValue = a[params.sortColumn.toLowerCase() as keyof LargePaymentItem];
                const bValue = b[params.sortColumn.toLowerCase() as keyof LargePaymentItem];
                
                if (aValue === null || aValue === undefined) return 1;
                if (bValue === null || bValue === undefined) return -1;
                
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return params.sortDirection === 'asc' 
                        ? aValue.localeCompare(bValue) 
                        : bValue.localeCompare(aValue);
                }
                
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return params.sortDirection === 'asc' 
                        ? aValue - bValue 
                        : bValue - aValue;
                }
                
                return 0;
            });
        }
        
        // Apply pagination
        const pageSize = params.pageSize || 20;
        const pageNumber = params.pageNumber || 1;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = items.slice(startIndex, endIndex);
        
        return {
            items: paginatedItems,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalCount: items.length,
            totalPages: Math.ceil(items.length / pageSize),
            hasNext: endIndex < items.length,
            hasPrevious: pageNumber > 1
        };
    }

    async getProcessingConfirmation(params: ProcessingConfirmationParams): Promise<ProcessingConfirmationResponse> {
        await this.delay();
        
        // Validate required parameters
        if (!params.startDate || !params.endDate) {
            throw new Error('StartDate and EndDate are required parameters');
        }
        
        // Generate mock data
        const items: any[] = Array.from({ length: 25 }, (_, i) => ({
            start: `2025-03-${String(i + 1).padStart(2, '0')}T08:00:00`,
            end: `2025-03-${String(i + 1).padStart(2, '0')}T08:15:30`,
            message: `Daily processing completed successfully for day ${i + 1}`
        }));
        
        // Apply pagination
        const pageSize = params.pageSize || 10;
        const pageNumber = params.pageNumber || 1;
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedItems = items.slice(startIndex, startIndex + pageSize);
        
        return {
            items: paginatedItems,
            pageNumber,
            pageSize,
            totalCount: items.length,
            totalPages: Math.ceil(items.length / pageSize),
            hasNext: pageNumber < Math.ceil(items.length / pageSize),
            hasPrevious: pageNumber > 1
        };
    }

    async getScheduledPaymentChangeHistory(params: ScheduledPaymentChangeHistoryParams): Promise<ScheduledPaymentChangeHistoryResponse> {
        await this.delay();
        
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
        
        // Generate mock data
        const items: ScheduledPaymentChangeHistoryItem[] = Array.from({ length: 30 }, (_, i) => ({
            memberID: `M${100000 + i}`,
            updatedBy: `User${i % 5 + 1}`,
            updatedOn: `2025-03-${String(i % 28 + 1).padStart(2, '0')}T10:${String(i % 60).padStart(2, '0')}:00`,
            reason: i % 3 === 0 ? 'User Request' : i % 3 === 1 ? 'System Update' : 'Administrative Change',
            changeType: i % 4 === 0 ? 'Created' : i % 4 === 1 ? 'Modified' : i % 4 === 2 ? 'Cancelled' : 'Reactivated',
            recurringPaymentId: `RP${200000 + i}`,
            payeeId: `P${300000 + i}`,
            payeeName: `Payee ${i % 10 + 1}`,
            account: `ACCT-${400000 + i}`,
            active: i % 2 === 0 ? 'Yes' : 'No',
            amount: 100 + (i * 10),
            lastProcessedDate: i % 2 === 0 ? `2025-03-${String(i % 28 + 1).padStart(2, '0')}` : null,
            nextProcessDate: i % 2 === 0 ? `2025-04-${String(i % 28 + 1).padStart(2, '0')}` : null,
            nextDueDate: i % 2 === 0 ? `2025-04-${String(i % 28 + 1).padStart(2, '0')}` : null,
            numberOfPayments: i % 3 === 0 ? 'Unlimited' : `${i + 1}`,
            frequency: i % 4 === 0 ? 'Weekly' : i % 4 === 1 ? 'Bi-Weekly' : i % 4 === 2 ? 'Monthly' : 'Quarterly',
            memo: i % 2 === 0 ? `Payment memo ${i}` : null,
            sourceApplication: 'CBP Admin'
        }));
        
        // Apply pagination
        const pageSize = params.pageSize || 10;
        const pageNumber = params.pageNumber || 1;
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedItems = items.slice(startIndex, startIndex + pageSize);
        
        return {
            items: paginatedItems,
            pageNumber,
            pageSize,
            totalCount: items.length,
            totalPages: Math.ceil(items.length / pageSize),
            hasNext: pageNumber < Math.ceil(items.length / pageSize),
            hasPrevious: pageNumber > 1
        };
    }
}

// Helper function to get status descriptions
function getStatusDescription(statusCode: string): string {
    switch (statusCode) {
        case 'ACH': return 'ACH Processing';
        case 'PEND': return 'Pending';
        case 'PROC': return 'Processing';
        case 'COMP': return 'Completed';
        case 'CANC': return 'Cancelled';
        case 'FAIL': return 'Failed';
        case 'RTRN': return 'Returned';
        case 'HOLD': return 'On Hold';
        default: return 'Unknown Status';
    }
}