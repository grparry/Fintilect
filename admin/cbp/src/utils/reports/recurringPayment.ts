import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Recurring Payment Search Types
 * Matches the C# API enum values
 */
export enum RecurringPaymentSearchType {
  Member = 'Member',
  Payment = 'Payment',
  RecurringPayment = 'RecurringPayment',
  UserPayeeList = 'UserPayeeList',
  Payee = 'Payee'
}

/**
 * Human-readable labels for search types
 */
export const RECURRING_PAYMENT_SEARCH_TYPES: Record<RecurringPaymentSearchType, string> = {
  [RecurringPaymentSearchType.Member]: 'Member ID',
  [RecurringPaymentSearchType.Payment]: 'Payment ID',
  [RecurringPaymentSearchType.RecurringPayment]: 'Recurring Payment ID',
  [RecurringPaymentSearchType.UserPayeeList]: 'User Payee List ID',
  [RecurringPaymentSearchType.Payee]: 'Payee ID'
};

/**
 * Recurring Payment Sort Columns
 * Matches the C# API enum values
 */
export enum RecurringPaymentSortColumn {
  RecurringPaymentID = 'RecurringPaymentID',
  NextPaymentDate = 'NextPaymentDate',
  Amount = 'Amount',
  Frequency = 'Frequency'
}

/**
 * Recurring Payment Report Parameters
 */
export interface RecurringPaymentParams {
  searchType: RecurringPaymentSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days: number;
  sortColumn: RecurringPaymentSortColumn;
  sortDirection: 'ASC' | 'DESC';
  pageNumber: number;
  pageSize: number;
}

/**
 * Recurring Payment Item
 * Represents a single recurring payment record
 */
export interface RecurringPaymentItem {
  recurringPaymentID: string;
  memberID: string;
  payeeID: string;
  payeeName: string;
  amount: number;
  frequency: string;
  nextPaymentDate: string;
  accountID: string;
  accountName: string;
  status: string;
}

/**
 * Recurring Payment Report Response
 */
export interface RecurringPaymentItemPagedResponse {
  items: RecurringPaymentItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  sortColumn?: RecurringPaymentSortColumn;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Get Recurring Payment Report data from the API
 * @param params Report parameters
 * @returns Promise with paged response
 */
export const getRecurringPaymentReport = async (params: RecurringPaymentParams): Promise<RecurringPaymentItemPagedResponse> => {
  return await reportService.getRecurringPaymentReport(params);
};
