/**
 * Pending Payments Report utility file
 * Contains types, enums, and API service functions for the Pending Payments report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for Pending Payments
 */
export enum PendingPaymentsSearchType {
  DateRange = 'DateRange'
}

/**
 * Pending Payments Search Type display names
 */
export const PENDING_PAYMENTS_SEARCH_TYPES = {
  [PendingPaymentsSearchType.DateRange]: 'Date Range'
};

/**
 * Sort Column enum for Pending Payments
 */
export enum PendingPaymentsSortColumn {
  PaymentID = 'PaymentID',
  RecurringID = 'RecurringID',
  MemberID = 'MemberID',
  Amount = 'Amount',
  PayeeName = 'PayeeName',
  WillProcessDate = 'WillProcessDate',
  DeliveryDate = 'DeliveryDate'
}

/**
 * Pending Payments Sort Column display names
 */
export const PENDING_PAYMENTS_SORT_COLUMNS = {
  [PendingPaymentsSortColumn.PaymentID]: 'Payment ID',
  [PendingPaymentsSortColumn.RecurringID]: 'Recurring ID',
  [PendingPaymentsSortColumn.MemberID]: 'Member ID',
  [PendingPaymentsSortColumn.Amount]: 'Amount',
  [PendingPaymentsSortColumn.PayeeName]: 'Payee Name',
  [PendingPaymentsSortColumn.WillProcessDate]: 'Process Date',
  [PendingPaymentsSortColumn.DeliveryDate]: 'Delivery Date'
};

/**
 * Pending Payments Item interface
 */
export interface PendingPaymentsItem {
  paymentID: string;
  recurringID?: string;
  memberID: string;
  amount: number;
  payeeName?: string;
  willProcessDate: string;
  deliveryDate?: string;
  status: string;
}

/**
 * Pending Payments Parameters interface
 */
export interface PendingPaymentsParams {
  date: string; 
  pageNumber: number;
  pageSize: number;
  sortColumn?: PendingPaymentsSortColumn;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Pending Payments Response interface
 */
export interface PendingPaymentsResponse {
  items: PendingPaymentsItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get Pending Payments data from the API
 * @param params Search parameters
 * @returns Promise with paginated response
 */
export const getPendingPayments = async (params: PendingPaymentsParams): Promise<PendingPaymentsResponse> => {
  try {
    const response = await reportService.getPendingPayments(params);
    return response;
  } catch (error) {
    console.error('Error fetching pending payments data:', error);
    throw error;
  }
};
