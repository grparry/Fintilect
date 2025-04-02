import { reportService } from '../../services/factory/ServiceFactory';
import { format } from 'date-fns';

/**
 * Search Type enum for Payment Activity
 * Maps UI-friendly names to API expected values
 */
export enum PaymentActivitySearchType {
    MemberID = 'PaymentActivity_MemberID',
    MemberIDAndDate = 'PaymentActivity_MemberIDAndDate',
    MemberIDAndPayeeName = 'PaymentActivity_MemberIDAndPayeeName',
    MemberIDAndDateAndPayeeName = 'PaymentActivity_MemberIDAndDateAndPayeeName',
    DateRange = 'PaymentActivity_Date',
    PaymentID = 'PaymentActivity_PaymentID',
    PayeeName = 'PaymentActivity_PayeeName'
}

/**
 * Payment Activity search type display names
 */
export const PAYMENT_ACTIVITY_SEARCH_TYPES = {
  [PaymentActivitySearchType.MemberID]: 'Member ID',
  [PaymentActivitySearchType.MemberIDAndDate]: 'Member ID and Date',
  [PaymentActivitySearchType.MemberIDAndPayeeName]: 'Member ID and Payee Name',
  [PaymentActivitySearchType.MemberIDAndDateAndPayeeName]: 'Member ID, Date, and Payee Name',
  [PaymentActivitySearchType.DateRange]: 'Date Range',
  [PaymentActivitySearchType.PaymentID]: 'Payment ID',
  [PaymentActivitySearchType.PayeeName]: 'Payee Name'
};

/**
 * Sort Column enum for Payment Activity
 */
export enum PaymentActivitySortColumn {
  MemberID = 'MemberID',
  PaymentID = 'PaymentID',
  PayeeName = 'PayeeName',
  DateProcessed = 'DateProcessed',
  DueDate = 'DueDate',
  Status = 'Status',
  PaymentMethod = 'PaymentMethod',
  Amount = 'Amount'
}

/**
 * Payment Activity Item interface matching C# API
 * Note: Property names use camelCase to match API response format
 */
export interface PaymentActivityItem {
    id?: string;
    memberId: string | null;
    paymentId: string | null;
    payeeId: string | null;
    payeeName: string | null;
    paymentDate?: string | null;
    processedDate?: string | null;
    dateProcessed?: string | null;
    dueDate?: string | null;
    status: string | null;
    paymentMethod: string | null;
    paymentType?: string | null;
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
 * Payment Activity request parameters matching API's PaymentActivityRequest
 * Note: SearchType is a numeric enum value matching the API expectations
 */
export interface PaymentActivityRequest {
    searchType: string;
    memberId?: string;  // Used for member ID related search types
    paymentId?: string; // Used for payment ID search type
    startDate?: string;
    endDate?: string;
    payeeName?: string;
    pageNumber?: number;
    pageSize?: number;
    sortColumn?: string;
    sortDirection?: 'ASC' | 'DESC';
}

/**
 * Parameters for Payment Activity Report using the dedicated endpoint
 */
export interface PaymentActivityParams {
    searchType: PaymentActivitySearchType;
    memberId?: string;
    paymentId?: string;
    startDate?: string;
    endDate?: string;
    payeeName?: string;
    pageNumber?: number;
    pageSize?: number;
    sortColumn?: PaymentActivitySortColumn;
    sortDirection?: 'ASC' | 'DESC';
}

/**
 * Get payment activity data from the API
 * @param params Payment activity parameters
 * @returns Promise with paged response of payment activity items
 */
export const getPaymentActivity = async (
  params: PaymentActivityParams
): Promise<PaymentActivityItemPagedResponse> => {
  const { searchType, memberId, paymentId, startDate, endDate, payeeName, pageNumber, pageSize, sortColumn, sortDirection } = params;

  // Get the enum value for the search type
  const searchTypeValue = searchType;

  // Create the request object with pagination and sorting
  const request: PaymentActivityRequest = {
    searchType: searchTypeValue,
    pageNumber: params.pageNumber || 1,
    pageSize: params.pageSize || 20,
    sortColumn: sortColumn
  };
  
  // Set sort direction as a separate property to avoid any encoding issues
  // The API expects either 'ASC' or 'DESC' without any additional characters
  if (sortDirection === 'ASC') {
    request.sortDirection = 'ASC';
  } else {
    request.sortDirection = 'DESC';
  }

  // Add specific parameters based on search type
  if ([
    PaymentActivitySearchType.MemberID,
    PaymentActivitySearchType.MemberIDAndDate,
    PaymentActivitySearchType.MemberIDAndPayeeName,
    PaymentActivitySearchType.MemberIDAndDateAndPayeeName
  ].includes(searchType) && memberId) {
    request.memberId = memberId;
  }

  if (searchType === PaymentActivitySearchType.PaymentID && paymentId) {
    request.paymentId = paymentId;
  }

  // Add date parameters if applicable for date-related search types
  if ([
    PaymentActivitySearchType.DateRange,
    PaymentActivitySearchType.MemberIDAndDate,
    PaymentActivitySearchType.MemberIDAndDateAndPayeeName
  ].includes(searchType)) {
    if (startDate) {
      request.startDate = startDate;
    }
    if (endDate) {
      request.endDate = endDate;
    }
  }

  // Add payee name if applicable for payee-related search types
  if ([
    PaymentActivitySearchType.PayeeName,
    PaymentActivitySearchType.MemberIDAndPayeeName,
    PaymentActivitySearchType.MemberIDAndDateAndPayeeName
  ].includes(searchType) && payeeName) {
    request.payeeName = payeeName;
  }

  // Log the request for debugging
  console.log('Payment Activity Request:', request);
  console.log('Sort parameters being sent to API:', { 
    sortColumn: request.sortColumn, 
    sortDirection: request.sortDirection 
  });

  return reportService.getPaymentActivity(request);
};
