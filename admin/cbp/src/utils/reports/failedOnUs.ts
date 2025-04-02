import { reportService } from '../../services/factory/ServiceFactory';
import { format } from 'date-fns';

/**
 * Search Type enum for Failed On Us
 * Maps UI-friendly names to API expected string values
 */
export enum FailedOnUsSearchType {
  DateRange = 'DateRange',
  MemberID = 'MemberID',
  PaymentID = 'PaymentID'
}

/**
 * Failed On Us search type display names
 */
export const FAILED_ON_US_SEARCH_TYPES = {
  [FailedOnUsSearchType.DateRange]: 'Date Range',
  [FailedOnUsSearchType.MemberID]: 'Member ID',
  [FailedOnUsSearchType.PaymentID]: 'Payment ID'
};

/**
 * Sort Column enum for Failed On Us
 */
export enum FailedOnUsSortColumn {
  FailedDate = 'FailedDate',
  ProcessedDate = 'ProcessedDate',
  MemberId = 'MemberID',
  PaymentId = 'PaymentID',
  Amount = 'Amount',
  UserPayeeListId = 'UserPayeeListID',
  PayeeId = 'PayeeID',
  PayeeName = 'PayeeName',
  Status = 'Status',
  StatusCode = 'StatusCode'
}

/**
 * Failed On Us Sort Column display names
 */
export const FAILED_ON_US_SORT_COLUMNS = {
  [FailedOnUsSortColumn.FailedDate]: 'Failed Date',
  [FailedOnUsSortColumn.ProcessedDate]: 'Processed Date',
  [FailedOnUsSortColumn.MemberId]: 'Member ID',
  [FailedOnUsSortColumn.PaymentId]: 'Payment ID',
  [FailedOnUsSortColumn.Amount]: 'Amount',
  [FailedOnUsSortColumn.UserPayeeListId]: 'User Payee List ID',
  [FailedOnUsSortColumn.PayeeId]: 'Payee ID',
  [FailedOnUsSortColumn.PayeeName]: 'Payee Name',
  [FailedOnUsSortColumn.Status]: 'Status',
  [FailedOnUsSortColumn.StatusCode]: 'Status Code'
};

/**
 * Failed On Us Item interface matching C# API
 * Note: Property names use camelCase to match API response format
 */
export interface FailedOnUsItem {
  paymentId: string;
  memberId: string;
  memberFirstName: string | null;
  memberLastName: string | null;
  email: string | null;
  failedDate: string;
  processedDate: string;
  amount: number;
  status: string;
  statusCode: number;
  fundingAccount: string;
  userPayeeListId: string;
  payeeId: string;
  payeeName: string | null;
  usersAccountAtPayee: string;
  nameOnAccount: string;
  recurringPaymentId: string | null;
}

/**
 * Failed On Us Response interface
 */
export interface FailedOnUsResponse {
  items: FailedOnUsItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Failed On Us Params interface for API request
 */
export interface FailedOnUsParams {
  searchType: FailedOnUsSearchType;
  pageNumber: number;
  pageSize: number;
  sortColumn?: FailedOnUsSortColumn;
  sortDirection?: 'ASC' | 'DESC';
  startDate?: string;
  endDate?: string;
  memberId?: string;
  paymentId?: string;
}

/**
 * Get Failed On Us data from API
 * @param params Search parameters
 * @returns Promise with Failed On Us response
 */
export const getFailedOnUs = async (params: FailedOnUsParams): Promise<FailedOnUsResponse> => {
  const response = await reportService.getFailedOnUs(params);
  return response;
};
