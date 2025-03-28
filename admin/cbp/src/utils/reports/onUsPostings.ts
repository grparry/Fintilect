/**
 * On Us Postings Report utility file
 * Contains types, enums, and API service functions for the On Us Postings report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Enum for On Us Postings search types
 * These values must match the API's OnUsPostingsSearchType enum
 */
export enum OnUsPostingsSearchType {
  DateRange = 'DateRange',
  PaymentID = 'PaymentID',
  MemberID = 'MemberID',
  AccountID = 'AccountID',
  LoanID = 'LoanID',
  RunID = 'RunID'
}

/**
 * Display names for On Us Postings search types
 */
export const ON_US_POSTINGS_SEARCH_TYPES: Record<OnUsPostingsSearchType, string> = {
  [OnUsPostingsSearchType.DateRange]: 'Date Range',
  [OnUsPostingsSearchType.PaymentID]: 'Payment ID',
  [OnUsPostingsSearchType.MemberID]: 'Member ID',
  [OnUsPostingsSearchType.AccountID]: 'Account ID',
  [OnUsPostingsSearchType.LoanID]: 'Loan ID',
  [OnUsPostingsSearchType.RunID]: 'Run ID'
};

/**
 * Enum for On Us Postings sort columns
 * These values must match the API's OnUsPostingsSortColumn enum
 */
export enum OnUsPostingsSortColumn {
  PaymentID = 'PaymentID',
  MemberID = 'MemberID',
  EntryDate = 'EntryDate',
  ModifiedDate = 'ModifiedDate',
  Amount = 'Amount',
  AccountID = 'AccountID',
  LoanID = 'LoanID',
  ErrorCode = 'ErrorCode',
  RunID = 'RunID'
}

/**
 * Display names for On Us Postings sort columns
 */
export const ON_US_POSTINGS_SORT_COLUMNS: Record<OnUsPostingsSortColumn, string> = {
  [OnUsPostingsSortColumn.PaymentID]: 'Payment ID',
  [OnUsPostingsSortColumn.MemberID]: 'Member ID',
  [OnUsPostingsSortColumn.EntryDate]: 'Entry Date',
  [OnUsPostingsSortColumn.ModifiedDate]: 'Modified Date',
  [OnUsPostingsSortColumn.Amount]: 'Amount',
  [OnUsPostingsSortColumn.AccountID]: 'Account ID',
  [OnUsPostingsSortColumn.LoanID]: 'Loan ID',
  [OnUsPostingsSortColumn.ErrorCode]: 'Error Code',
  [OnUsPostingsSortColumn.RunID]: 'Run ID'
};

/**
 * Interface for On Us Postings item
 */
export interface OnUsPostingsItem {
  seqNo?: string;
  paymentID?: string;
  memberID?: string;
  accountID?: string;
  loanID?: string;
  amount: number;
  comment?: string;
  glCode?: string;
  runID?: string;
  errorCode?: string;
  errorDesc?: string;
  sourceApp?: string;
  entryDate?: string;
  modifiedDate?: string;
  modifiedBy?: string;
}

/**
 * Interface for On Us Postings request parameters
 */
export interface OnUsPostingsParams {
  searchType: OnUsPostingsSearchType;
  startDate: string;
  endDate: string;
  paymentID?: string;
  memberID?: string;
  accountID?: string;
  loanID?: string;
  runID?: string;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: OnUsPostingsSortColumn;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Interface for On Us Postings response
 */
export interface OnUsPostingsResponse {
  items: OnUsPostingsItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get On Us Postings data from the API
 * @param params On Us Postings search parameters
 * @returns Promise with On Us Postings data
 */
export const getOnUsPostings = async (params: OnUsPostingsParams): Promise<OnUsPostingsResponse> => {
  return reportService.getOnUsPostings(params);
};
