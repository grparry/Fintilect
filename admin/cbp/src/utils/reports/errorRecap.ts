import { reportService } from '../../services/factory/ServiceFactory';
import { ErrorRecapRequest, ErrorRecapItemPagedResponse } from '../../types/report.types';

/**
 * Error Recap search type display names
 */
export const ERROR_RECAP_SEARCH_TYPES = {
  'PaymentID': 'Payment ID',
  'MemberID': 'Member ID',
  'UserPayeeListID': 'User Payee List ID',
  'StatusCode': 'Status Code'
};

/**
 * Parameters for Error Recap Report
 */
export interface ErrorRecapReportParams {
  searchType: keyof typeof ERROR_RECAP_SEARCH_TYPES;
  searchValue: string;
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Error Recap Report Data
 */
export interface ErrorRecapReportData {
  failedDate: string;
  memberID: string;
  paymentID: string;
  amount: number;
  payeeID: string;
  payeeName: string;
  userPayeeListID: string;
  usersAccountAtPayee: string;
  nameOnAccount: string;
  status: string;
  hostCode: string;
  error: string;
}

/**
 * Paginated response for Error Recap Report
 */
export interface ErrorRecapReportResponse {
  items: ErrorRecapReportData[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
}

/**
 * Get error recap based on the provided parameters
 * @param params Parameters for the error recap report
 * @returns Paginated error recap report data
 */
export async function getErrorRecap(
  params: ErrorRecapReportParams
): Promise<ErrorRecapReportResponse> {
  try {
    // Ensure required parameters are provided
    if (!params.searchType || !params.searchValue) {
      throw new Error('SearchType and SearchValue are required parameters');
    }

    // Map the params to the format expected by the API
    const requestParams: ErrorRecapRequest = {
      searchType: params.searchType,
      searchValue: params.searchValue,
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20
    };
    
    // Log the parameters being sent for debugging
    console.log('ErrorRecap request parameters:', requestParams);
    
    // Call the dedicated endpoint through the report service
    const response = await reportService.getErrorRecap(requestParams);
    
    // Map the response to the expected format
    if (response && response.items) {
      // Transform the response items to match the expected ErrorRecapReportData format
      const mappedItems = response.items.map(item => ({
        failedDate: item.failedDate || '',
        memberID: item.memberId || '',
        paymentID: item.paymentId || '',
        amount: item.amount,
        payeeID: item.payeeId || '',
        payeeName: item.payeeName || '',
        userPayeeListID: item.userPayeeListId || '',
        usersAccountAtPayee: item.usersAccountAtPayee || '',
        nameOnAccount: item.nameOnAccount || '',
        status: item.status || '',
        hostCode: item.hostCode || '',
        error: item.error || ''
      }));

      return {
        items: mappedItems,
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        hasNext: response.hasNext
      };
    }
    
    // Return empty response if no data
    return {
      items: [],
      pageNumber: requestParams.pageNumber,
      pageSize: requestParams.pageSize,
      totalCount: 0,
      totalPages: 0,
      hasNext: false
    };
  } catch (error) {
    console.error('Error fetching error recap report:', error);
    throw error; // Re-throw to allow component to handle the error
  }
}
