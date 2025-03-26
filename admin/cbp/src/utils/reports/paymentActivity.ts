import { reportService } from '../../services/factory/ServiceFactory';
import { format } from 'date-fns';

/**
 * Search Type enum for Payment Activity
 * Maps UI-friendly names to API expected values
 */
export enum PaymentActivitySearchType {
    MemberID = 0,
    MemberIDAndDate = 1,
    MemberIDAndPayeeName = 2,
    MemberIDAndDateAndPayeeName = 3,
    DateRange = 5,
    PaymentID = 6,
    PayeeName = 7
}

/**
 * Payment Activity search type mapping to API string values
 */
export const PAYMENT_ACTIVITY_SEARCH_TYPES = {
  'MemberID': PaymentActivitySearchType.MemberID,
  'MemberIDAndDate': PaymentActivitySearchType.MemberIDAndDate,
  'MemberIDAndPayeeName': PaymentActivitySearchType.MemberIDAndPayeeName,
  'MemberIDAndDateAndPayeeName': PaymentActivitySearchType.MemberIDAndDateAndPayeeName,
  'DateRange': PaymentActivitySearchType.DateRange,
  'PaymentID': PaymentActivitySearchType.PaymentID,
  'PayeeName': PaymentActivitySearchType.PayeeName
};

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
    searchType: number;
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
    sortColumn?: string;
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
    sortColumn: params.sortColumn,
    sortDirection: params.sortDirection,
  };

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

  return reportService.getPaymentActivity(request);
};
