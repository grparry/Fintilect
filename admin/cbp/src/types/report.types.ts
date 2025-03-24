import { Dayjs } from 'dayjs';

/**
 * Report request interface matching C# API
 */
export interface ReportRunRequest {
    name: string | null;
    arguments: string | null;  // JSON string of report arguments
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

/**
 * Error Recap Item interface matching C# API
 */
export interface ErrorRecapItem {
    failedDate: string | null;
    memberId: string | null;
    paymentId: string | null;
    amount: number;
    userPayeeListId: string | null;
    payeeId: string | null;
    payeeName: string | null;
    usersAccountAtPayee: string | null;
    nameOnAccount: string | null;
    status: string | null;
    hostCode: string | null;
    error: string | null;
}

/**
 * Paged response interface for Error Recap
 */
export interface ErrorRecapItemPagedResponse {
    items: ErrorRecapItem[] | null;
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
}

/**
 * Error Recap request parameters
 */
export interface ErrorRecapRequest {
    searchType: string;
    searchValue: string;
    pageNumber?: number;
    pageSize?: number;
}

/**
 * Payment Activity Item interface matching C# API
 * Note: Property names use uppercase "ID" to match API response format
 */
export interface PaymentActivityItem {
    memberID: string | null;
    paymentID: string | null;
    payeeID: string | null;
    payeeName: string | null;
    dateProcessed: string | null;
    dueDate: string | null;
    status: string | null;
    paymentMethod: string | null;
    amount: number;
}

/**
 * Paged response interface for Payment Activity
 */
export interface PaymentActivityItemPagedResponse {
    items: PaymentActivityItem[] | null;
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

/**
 * Payment Activity request parameters
 * Note: SearchType is a string value matching the stored procedure parameter format
 */
export interface PaymentActivityRequest {
    searchType: string;
    searchValue?: string;
    startDate?: string;
    endDate?: string;
    payeeName?: string;
    pageNumber?: number;
    pageSize?: number;
}

/**
 * Search Type enum for Payment Activity
 * Maps UI-friendly names to API expected values
 */
export enum SearchType {
    None = 'None',
    MemberID = 'PaymentActivity_MemberID',
    MemberIDAndDate = 'PaymentActivity_MemberIDAndDate',
    MemberIDAndPayeeName = 'PaymentActivity_MemberIDAndPayeeName',
    MemberIDAndDateAndPayeeName = 'PaymentActivity_MemberIDAndDateAndPayeeName',
    DateRange = 'PaymentActivity_Date',
    PaymentID = 'PaymentActivity_PaymentID',
    PayeeName = 'PaymentActivity_PayeeName'
    // Add other search types as needed
}