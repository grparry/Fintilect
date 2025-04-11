/**
 * Payment Report utility file
 * Contains types, enums, and API service functions for the Payment report
 */
import { reportService } from '../../services/factory/ServiceFactory';
import logger from '../logger';

/**
 * Enum for Payment search types
 */
export enum PaymentSearchType {
  Member = 'Member',
  Payment = 'Payment',
  RecurringPayment = 'RecurringPayment',
  UserPayeeList = 'UserPayeeList',
  Payee = 'Payee'
}

/**
 * Display names for Payment search types
 */
export const PAYMENT_SEARCH_TYPES: Record<PaymentSearchType, string> = {
  [PaymentSearchType.Member]: 'Member ID',
  [PaymentSearchType.Payment]: 'Payment ID',
  [PaymentSearchType.RecurringPayment]: 'Recurring Payment ID',
  [PaymentSearchType.UserPayeeList]: 'User Payee List ID',
  [PaymentSearchType.Payee]: 'Payee ID'
};

/**
 * Enum for Payment sort columns
 */
export enum PaymentSortColumn {
  DateProcessed = 'DateProcessed',
  PaymentID = 'PaymentID',
  MemberID = 'MemberID',
  Amount = 'Amount',
  PayeeName = 'PayeeName',
  Status = 'Status'
}

/**
 * Request parameters for Payment Report API
 */
export interface PaymentRequest {
  searchType: PaymentSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days?: number;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: string;
}

/**
 * Parameters for the getPaymentReport function
 * This is used by the UI components
 */
export interface PaymentParams {
  searchType: PaymentSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days?: number;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: PaymentSortColumn;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Payment item interface
 */
export interface PaymentItem {
  paymentID: string;
  memberID: string;
  amount: number;
  dateProcessed: string;
  dateScheduled?: string;
  payeeName: string;
  status: string;
  paymentMethod?: string;
  accountNumber?: string;
}

/**
 * Paged response interface for Payment Report
 */
export interface PaymentItemPagedResponse {
  items: PaymentItem[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  sortColumn?: string;
  sortDirection?: string;
}

/**
 * Validates payment report parameters based on search type
 * @param params Payment report parameters
 * @returns Validated parameters with defaults applied
 */
export const validatePaymentParams = (params: PaymentParams): PaymentRequest => {
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

  // Ensure days is within valid range
  if (params.days && (params.days < 1 || params.days > 3650)) {
    throw new Error('Days must be between 1 and 3650');
  }

  // Convert the sortColumn enum value to string exactly as expected by the API
  const sortColumn = params.sortColumn || PaymentSortColumn.DateProcessed;
  
  // Use lowercase sort direction to match the pattern in ScheduledPaymentChangeHistoryReport
  const sortDirection = params.sortDirection || 'DESC';

  return {
    ...params,
    sortColumn,
    sortDirection
  };
};

/**
 * Get payment report data from the API
 * @param params Payment report parameters
 * @returns Promise with payment report data
 */
export const getPaymentReport = async (params: PaymentParams): Promise<PaymentItemPagedResponse> => {
  try {
    // Validate and prepare parameters
    const requestParams = validatePaymentParams(params);
    
    // Call the API through the report service
    const response = await reportService.getPaymentReport(requestParams);
    return response;
  } catch (error) {
    logger.error('Error fetching payment report:', error);
    throw error;
  }
};
