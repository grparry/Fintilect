import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for Error Recap
 * Maps UI-friendly names to API expected numeric values (0-6)
 */
export enum ErrorRecapSearchType {
  PaymentID = 0,
  MemberID = 1,
  UserPayeeListID = 2,
  StatusCode = 3,
  DateRange = 4,
  PayeeID = 5,
  PayeeName = 6
}

/**
 * Error Recap search type display names
 */
export const ERROR_RECAP_SEARCH_TYPES = {
  [ErrorRecapSearchType.PaymentID]: 'Payment ID',
  [ErrorRecapSearchType.MemberID]: 'Member ID',
  [ErrorRecapSearchType.UserPayeeListID]: 'User Payee List ID',
  [ErrorRecapSearchType.StatusCode]: 'Status Code',
  [ErrorRecapSearchType.DateRange]: 'Date Range',
  [ErrorRecapSearchType.PayeeID]: 'Payee ID',
  [ErrorRecapSearchType.PayeeName]: 'Payee Name'
};

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
  hasPrevious: boolean;
}

/**
 * Error Recap request parameters matching API's ErrorHistoryReportRequest
 */
export interface ErrorRecapRequest {
  searchType: ErrorRecapSearchType;
  paymentId?: string;
  memberId?: string;
  userPayeeListId?: string;
  statusCode?: string;
  startDate?: string;
  endDate?: string;
  payeeId?: string;
  payeeName?: string;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Parameters for Error Recap Report
 */
export interface ErrorRecapParams {
  searchType: ErrorRecapSearchType;
  paymentId?: string;
  memberId?: string;
  userPayeeListId?: string;
  statusCode?: string;
  startDate?: string;
  endDate?: string;
  payeeId?: string;
  payeeName?: string;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Get error recap based on the provided parameters
 * @param params Parameters for the error recap report
 * @returns Paginated error recap report data
 */
export async function getErrorRecap(
  params: ErrorRecapParams
): Promise<ErrorRecapItemPagedResponse> {
  try {
    // Ensure required parameters are provided
    if (params.searchType === undefined) {
      throw new Error('SearchType is a required parameter');
    }

    // Map the params to the format expected by the API
    const requestParams: ErrorRecapRequest = {
      searchType: params.searchType,
      paymentId: params.paymentId,
      memberId: params.memberId,
      userPayeeListId: params.userPayeeListId,
      statusCode: params.statusCode,
      startDate: params.startDate,
      endDate: params.endDate,
      payeeId: params.payeeId,
      payeeName: params.payeeName,
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20,
      sortColumn: params.sortColumn,
      sortDirection: params.sortDirection
    };
    
    // Log the parameters being sent for debugging
    console.log('ErrorRecap request parameters:', requestParams);
    
    // Call the dedicated endpoint through the report service
    return await reportService.getErrorRecap(requestParams);
  } catch (error) {
    console.error('Error fetching error recap report:', error);
    throw error; // Re-throw to allow component to handle the error
  }
}
