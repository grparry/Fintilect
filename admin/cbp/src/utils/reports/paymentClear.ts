/**
 * Payment Clear Report utility file
 * Contains types, enums, and API service functions for the Payment Clear report
 */
import { reportService } from '../../services/factory/ServiceFactory';
import logger from '../logger';

/**
 * Enum for Payment Clear search types
 */
export enum PaymentClearSearchType {
  Member = 'Member',
  Payment = 'Payment',
  RecurringPayment = 'RecurringPayment',
  UserPayeeList = 'UserPayeeList',
  Payee = 'Payee'
}

/**
 * Display names for Payment Clear search types
 */
export const PAYMENT_CLEAR_SEARCH_TYPES: Record<PaymentClearSearchType, string> = {
  [PaymentClearSearchType.Member]: 'Member ID',
  [PaymentClearSearchType.Payment]: 'Payment ID',
  [PaymentClearSearchType.RecurringPayment]: 'Recurring Payment ID',
  [PaymentClearSearchType.UserPayeeList]: 'User Payee List ID',
  [PaymentClearSearchType.Payee]: 'Payee ID'
};

/**
 * Enum for Payment Clear sort columns
 */
export enum PaymentClearSortColumn {
  ClearedDate = 'ClearedDate',
  PaymentID = 'PaymentID',
  MemberID = 'MemberID',
  Amount = 'Amount',
  PayeeName = 'PayeeName'
}

/**
 * Request parameters for Payment Clear Report API
 */
export interface PaymentClearRequest {
  searchType: PaymentClearSearchType;
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
 * Parameters for the getPaymentClearReport function
 * This is used by the UI components
 */
export interface PaymentClearParams {
  searchType: PaymentClearSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days?: number;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: PaymentClearSortColumn;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Payment Clear item interface
 */
export interface PaymentClearItem {
  paymentID: string;
  memberID: string;
  amount: number;
  payeeName: string;
  clearedDate: string;
  dateProcessed: string;
  paymentMethod?: string;
  accountNumber?: string;
  checkNumber?: string;
}

/**
 * Paged response interface for Payment Clear Report
 */
export interface PaymentClearItemPagedResponse {
  items: PaymentClearItem[] | null;
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
 * Validates payment clear report parameters based on search type
 * @param params Payment clear report parameters
 * @returns Validated parameters with defaults applied
 */
export const validatePaymentClearParams = (params: PaymentClearParams): PaymentClearRequest => {
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

  // Ensure days is within valid range
  if (params.days && (params.days < 1 || params.days > 3650)) {
    throw new Error('Days must be between 1 and 3650');
  }

  // Convert the sortColumn enum value to string exactly as expected by the API
  const sortColumn = params.sortColumn || PaymentClearSortColumn.ClearedDate;
  
  // Use uppercase sort direction to match the API expectations
  const sortDirection = params.sortDirection || 'DESC';

  return {
    ...params,
    sortColumn,
    sortDirection
  };
};

/**
 * Get payment clear report data from the API
 * @param params Payment clear report parameters
 * @returns Promise with payment clear report data
 */
export const getPaymentClearReport = async (params: PaymentClearParams): Promise<PaymentClearItemPagedResponse> => {
  try {
    // Validate and prepare parameters
    const requestParams = validatePaymentClearParams(params);
    
    // Call the API through the report service
    const response = await reportService.getPaymentClearReport(requestParams);
    return response;
  } catch (error) {
    logger.error('Error fetching payment clear report:', error);
    throw error;
  }
};
