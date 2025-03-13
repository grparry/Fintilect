import { reportService } from '../../services/factory/ServiceFactory';
import { format } from 'date-fns';
import { PaymentActivityItem, PaymentActivityItemPagedResponse, PaymentActivityRequest, SearchType } from '../../types/report.types';

/**
 * Payment Activity search type mapping to API string values
 */
export const PAYMENT_ACTIVITY_SEARCH_TYPES = {
  'MemberID': SearchType.MemberID,
  'MemberIDAndDate': SearchType.MemberIDAndDate,
  'MemberIDAndPayeeName': SearchType.MemberIDAndPayeeName,
  'MemberIDAndDateAndPayeeName': SearchType.MemberIDAndDateAndPayeeName,
  'DateRange': SearchType.DateRange,
  'PaymentID': SearchType.PaymentID
};

/**
 * Legacy Payment Activity search type display names
 * @deprecated Use PAYMENT_ACTIVITY_SEARCH_TYPES instead
 */
export const PAYMENT_ACTIVITY_SEARCH_TYPES_LEGACY = {
  'PaymentActivity_MemberID': 'Member ID',
  'PaymentActivity_MemberIDAndDate': 'Member ID and Date Range',
  'PaymentActivity_MemberIDAndPayeeName': 'Member ID and Payee Name',
  'PaymentActivity_MemberIDAndDateAndPayeeName': 'Member ID, Date Range, and Payee Name',
  'PaymentActivity_Date': 'Date Range'
};

/**
 * Parameters for Payment Activity Report using the dedicated endpoint
 */
export interface PaymentActivityParams {
  searchType: keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES;
  searchValue?: string;
  startDate?: Date;
  endDate?: Date;
  payeeName?: string;
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Legacy parameters for Payment Activity Report
 * @deprecated Use PaymentActivityParams instead
 */
export interface PaymentActivityReportParams {
  searchType: keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES_LEGACY;
  startDate?: Date;
  endDate?: Date;
  memberId?: string;
  payeeName?: string;
}

/**
 * Payment Activity Report Data
 */
export interface PaymentActivityReportData {
  memberID: string;
  paymentID: string;
  payeeID: string;
  payeeName: string;
  dateProcessed: string;
  dueDate: string;
  status: string;
  paymentMethod: string;
  amount: number;
}

/**
 * Get payment activity based on the provided parameters using the dedicated endpoint
 * @param params Parameters for the payment activity report
 * @returns Payment activity report data with pagination
 */
export async function getPaymentActivity(
  params: PaymentActivityParams
): Promise<PaymentActivityItemPagedResponse> {
  try {
    // Map the search type to the API string value
    const searchType = PAYMENT_ACTIVITY_SEARCH_TYPES[params.searchType];
    
    // Build the request object for the dedicated endpoint
    const request: PaymentActivityRequest = {
      searchType,
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20
    };
    
    // Add optional parameters based on search type
    if (params.searchValue) {
      request.searchValue = params.searchValue;
    }
    
    if (params.payeeName) {
      request.payeeName = params.payeeName;
    }
    
    // Format dates if available
    if (params.startDate) {
      request.startDate = format(params.startDate, 'yyyy-MM-dd');
    }
    
    if (params.endDate) {
      request.endDate = format(params.endDate, 'yyyy-MM-dd');
    }
    
    console.log('Payment Activity Report request:', request);
    
    // Call the dedicated endpoint through the report service
    return await reportService.getPaymentActivity(request);
  } catch (error) {
    console.error('Error fetching payment activity report:', error);
    throw error;
  }
}

/**
 * Legacy implementation using the general report endpoint
 * @deprecated Use getPaymentActivity instead
 */
export async function getPaymentActivityLegacy(
  params: PaymentActivityReportParams
): Promise<PaymentActivityItem[]> {
  try {
    // Default dates to use when user doesn't specify dates
    const DEFAULT_START_DATE = '2000-01-01';
    const DEFAULT_END_DATE = '2099-12-31';
    
    // Build the arguments string based on search type
    let argumentsStr = '';
    
    switch (params.searchType) {
      case 'PaymentActivity_MemberID':
        // Member ID only
        argumentsStr = `SearchType=${params.searchType}`;
        argumentsStr += `,MemberID=${params.memberId || ''}`;
        // Use default dates instead of empty values
        argumentsStr += `,StartDate=${DEFAULT_START_DATE},EndDate=${DEFAULT_END_DATE}`;
        // Include empty payee name
        argumentsStr += ',PayeeName=""';
        break;
        
      case 'PaymentActivity_MemberIDAndDate':
        // Member ID with date range
        argumentsStr = `SearchType=${params.searchType}`;
        argumentsStr += `,MemberID=${params.memberId || ''}`;
        // Format dates if available, otherwise use defaults
        argumentsStr += `,StartDate=${params.startDate ? format(params.startDate, 'yyyy-MM-dd') : DEFAULT_START_DATE}`;
        argumentsStr += `,EndDate=${params.endDate ? format(params.endDate, 'yyyy-MM-dd') : DEFAULT_END_DATE}`;
        // Include empty payee name
        argumentsStr += ',PayeeName=""';
        break;
        
      case 'PaymentActivity_MemberIDAndPayeeName':
        // Member ID with payee name
        argumentsStr = `SearchType=${params.searchType}`;
        argumentsStr += `,MemberID=${params.memberId || ''}`;
        argumentsStr += `,PayeeName=${params.payeeName || ''}`;
        // Use default dates
        argumentsStr += `,StartDate=${DEFAULT_START_DATE},EndDate=${DEFAULT_END_DATE}`;
        break;
        
      case 'PaymentActivity_MemberIDAndDateAndPayeeName':
        // Member ID with date range and payee name
        argumentsStr = `SearchType=${params.searchType}`;
        argumentsStr += `,MemberID=${params.memberId || ''}`;
        argumentsStr += `,PayeeName=${params.payeeName || ''}`;
        // Format dates if available, otherwise use defaults
        argumentsStr += `,StartDate=${params.startDate ? format(params.startDate, 'yyyy-MM-dd') : DEFAULT_START_DATE}`;
        argumentsStr += `,EndDate=${params.endDate ? format(params.endDate, 'yyyy-MM-dd') : DEFAULT_END_DATE}`;
        break;
        
      case 'PaymentActivity_Date':
        // Date range only
        argumentsStr = `SearchType=${params.searchType}`;
        // Format dates if available, otherwise use defaults
        argumentsStr += `,StartDate=${params.startDate ? format(params.startDate, 'yyyy-MM-dd') : DEFAULT_START_DATE}`;
        argumentsStr += `,EndDate=${params.endDate ? format(params.endDate, 'yyyy-MM-dd') : DEFAULT_END_DATE}`;
        // Include empty member ID and payee name
        argumentsStr += ',MemberID="",PayeeName=""';
        break;
        
      default:
        // For any other search types, include all parameters
        argumentsStr = `SearchType=${params.searchType}`;
        // Format dates if available, otherwise use defaults
        argumentsStr += `,StartDate=${params.startDate ? format(params.startDate, 'yyyy-MM-dd') : DEFAULT_START_DATE}`;
        argumentsStr += `,EndDate=${params.endDate ? format(params.endDate, 'yyyy-MM-dd') : DEFAULT_END_DATE}`;
        // Include member ID and payee name if available, otherwise empty
        argumentsStr += `,MemberID=${params.memberId || ''}`;
        argumentsStr += `,PayeeName=${params.payeeName || ''}`;
        break;
    }
    
    console.log('Payment Activity Report arguments:', argumentsStr);
    
    // Call the report service
    const response = await reportService.runReport('rptPaymentActivityJSON', argumentsStr);
    
    // Process the response
    if (response && response.jsonResponse) {
      try {
        // Check if jsonResponse is already an object or needs to be parsed
        const data = typeof response.jsonResponse === 'string' 
          ? JSON.parse(response.jsonResponse) 
          : response.jsonResponse;
        
        return Array.isArray(data) ? data : [];
      } catch (parseError) {
        console.error('Error parsing payment activity report response:', parseError);
        return [];
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching payment activity report:', error);
    throw error;
  }
}
