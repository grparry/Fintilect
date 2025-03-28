import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Enum for Scheduled Payment Change History search types
 */
export enum ScheduledPaymentChangeHistorySearchType {
  MemberID = 'MemberID',
  RecurringPaymentID = 'RecurringPaymentID',
  DateRange = 'DateRange'
}

/**
 * Enum for Scheduled Payment Change History sort columns
 */
export enum ScheduledPaymentChangeHistorySortColumn {
  MemberID = 'MemberID',
  UpdatedBy = 'UpdatedBy',
  UpdatedOn = 'UpdatedOn',
  ChangeType = 'ChangeType',
  RecurringPaymentId = 'RecurringPaymentId',
  PayeeName = 'PayeeName',
  Amount = 'Amount',
  Frequency = 'Frequency'
}

/**
 * Sort column options for the UI
 */
export const SCHEDULED_PAYMENT_CHANGE_HISTORY_SORT_COLUMNS = [
  { value: ScheduledPaymentChangeHistorySortColumn.UpdatedOn, label: 'Updated On' },
  { value: ScheduledPaymentChangeHistorySortColumn.MemberID, label: 'Member ID' },
  { value: ScheduledPaymentChangeHistorySortColumn.UpdatedBy, label: 'Updated By' },
  { value: ScheduledPaymentChangeHistorySortColumn.ChangeType, label: 'Change Type' },
  { value: ScheduledPaymentChangeHistorySortColumn.RecurringPaymentId, label: 'Recurring Payment ID' },
  { value: ScheduledPaymentChangeHistorySortColumn.PayeeName, label: 'Payee Name' },
  { value: ScheduledPaymentChangeHistorySortColumn.Amount, label: 'Amount' },
  { value: ScheduledPaymentChangeHistorySortColumn.Frequency, label: 'Frequency' }
];

/**
 * Search type options for the UI
 */
export const SCHEDULED_PAYMENT_CHANGE_HISTORY_SEARCH_TYPES = [
  { value: ScheduledPaymentChangeHistorySearchType.DateRange, label: 'Date Range' },
  { value: ScheduledPaymentChangeHistorySearchType.MemberID, label: 'Member ID' },
  { value: ScheduledPaymentChangeHistorySearchType.RecurringPaymentID, label: 'Recurring Payment ID' }
];

/**
 * Interface for Scheduled Payment Change History request parameters
 */
export interface ScheduledPaymentChangeHistoryParams {
  searchType: ScheduledPaymentChangeHistorySearchType;
  startDate: string;
  endDate: string;
  memberID?: string;
  recurringPaymentID?: string;
  sortColumn?: ScheduledPaymentChangeHistorySortColumn;
  sortDirection?: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

/**
 * Interface for Scheduled Payment Change History item
 */
export interface ScheduledPaymentChangeHistoryItem {
  memberID: string | null;
  updatedBy: string | null;
  updatedOn: string | null;
  reason: string | null;
  changeType: string | null;
  recurringPaymentId: string | null;
  payeeId: string | null;
  payeeName: string | null;
  account: string | null;
  active: string | null;
  amount: number;
  lastProcessedDate: string | null;
  nextProcessDate: string | null;
  nextDueDate: string | null;
  numberOfPayments: string | null;
  frequency: string | null;
  memo: string | null;
  sourceApplication: string | null;
}

/**
 * Interface for Scheduled Payment Change History response
 */
export interface ScheduledPaymentChangeHistoryResponse {
  items: ScheduledPaymentChangeHistoryItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get Scheduled Payment Change History data
 * @param params Request parameters
 * @returns Promise with the response data
 */
export const getScheduledPaymentChangeHistory = async (
  params: ScheduledPaymentChangeHistoryParams
): Promise<ScheduledPaymentChangeHistoryResponse> => {
  return reportService.getScheduledPaymentChangeHistory(params);
};
