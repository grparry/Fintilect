import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Enum for Large Payment sort columns
 */
export enum LargePaymentSortColumn {
  MemberID = 'MemberID',
  Amount = 'Amount',
  PayeeName = 'PayeeName',
  Status = 'Status'
}

/**
 * Array of sort column options for dropdown
 */
export const LARGE_PAYMENT_SORT_COLUMNS = [
  { value: LargePaymentSortColumn.MemberID, label: 'Member ID' },
  { value: LargePaymentSortColumn.Amount, label: 'Amount' },
  { value: LargePaymentSortColumn.PayeeName, label: 'Payee Name' },
  { value: LargePaymentSortColumn.Status, label: 'Status' }
];

/**
 * Interface for Large Payment request parameters
 */
export interface LargePaymentParams {
  runDate: string;
  sortColumn: LargePaymentSortColumn;
  sortDirection?: 'ASC' | 'DESC';
  pageNumber: number;
  pageSize: number;
}

/**
 * Interface for Large Payment item
 */
export interface LargePaymentItem {
  memberID: string;
  amount: number;
  payeeName: string;
  status: string;
}

/**
 * Interface for Large Payment response
 */
export interface LargePaymentResponse {
  items: LargePaymentItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get large payment data from the API
 * @param params Large payment search parameters
 * @returns Promise with large payment data
 */
export const getLargePayment = async (params: LargePaymentParams): Promise<LargePaymentResponse> => {
  return reportService.getLargePayment(params);
};
