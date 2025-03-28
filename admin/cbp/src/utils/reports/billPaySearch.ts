import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for BillPay Search
 * Maps UI-friendly names to API expected string values
 */
export enum BillPaySearchType {
  Member = 'Member',
  Payee = 'Payee',
  Payment = 'Payment',
  UserPayeeList = 'UserPayeeList'
}

/**
 * BillPay Search type display names
 */
export const BILL_PAY_SEARCH_TYPES = {
  [BillPaySearchType.Member]: 'Member ID',
  [BillPaySearchType.Payee]: 'Payee ID',
  [BillPaySearchType.Payment]: 'Payment ID',
  [BillPaySearchType.UserPayeeList]: 'User Payee List ID'
};

/**
 * BillPay Report Type enum
 */
export enum BillPayReportType {
  PaymentHistory = 'PaymentHistory',
  PendingPayments = 'PendingPayments',
  Payment = 'Payment',
  RecurringPayment = 'RecurringPayment',
  ErrorRecap = 'ErrorRecap',
  PaymentClear = 'PaymentClear',
  UserPayee = 'UserPayee',
  NickNames = 'NickNames',
  Payee = 'Payee'
}

/**
 * BillPay Report Type display names
 */
export const BILL_PAY_REPORT_TYPES = {
  [BillPayReportType.PaymentHistory]: 'Payment History',
  [BillPayReportType.PendingPayments]: 'Pending Payments',
  [BillPayReportType.Payment]: 'Payment',
  [BillPayReportType.RecurringPayment]: 'Recurring Payment',
  [BillPayReportType.ErrorRecap]: 'Error Recap',
  [BillPayReportType.PaymentClear]: 'Payment Clear',
  [BillPayReportType.UserPayee]: 'User Payee',
  [BillPayReportType.NickNames]: 'Nicknames',
  [BillPayReportType.Payee]: 'Payee'
};

/**
 * BillPay Search Sort Column enum
 */
export enum BillPaySearchSortColumn {
  MemberID = 'MemberID',
  PaymentID = 'PaymentID',
  DateProcessed = 'DateProcessed',
  Amount = 'Amount',
  Status = 'Status'
}

/**
 * BillPay Search Sort Column display names
 */
export const BILL_PAY_SORT_COLUMNS = {
  [BillPaySearchSortColumn.MemberID]: 'Member ID',
  [BillPaySearchSortColumn.PaymentID]: 'Payment ID',
  [BillPaySearchSortColumn.DateProcessed]: 'Date Processed',
  [BillPaySearchSortColumn.Amount]: 'Amount',
  [BillPaySearchSortColumn.Status]: 'Status'
};

/**
 * BillPay Search Item interface matching C# API
 */
export interface BillPaySearchItem {
  paymentID: string | null;
  recurringPaymentID: string | null;
  memberID: string | null;
  account: string | null;
  amount: number;
  checkNumber: string | null;
  dateProcessed: string | null;
  willProcessDate: string | null;
  dueDate: string | null;
  failedDate: string | null;
  cancelledDate: string | null;
  status: string | null;
  userPayeeListID: string | null;
  payeeID: string | null;
  accountAtPayee: string | null;
  nameOnAccount: string | null;
  paymentMethod: string | null;
  memo: string | null;
  sourceApplication: string | null;
  memberFirstName: string | null;
  memberMiddleName: string | null;
  memberLastName: string | null;
  memberAddress1: string | null;
  memberAddress2: string | null;
  memberCity: string | null;
  memberState: string | null;
  memberZipCode: string | null;
  memberCountry: string | null;
  memberHomePhone: string | null;
  memberWorkPhone: string | null;
  memberWorkPhoneExt: string | null;
  memberEmail: string | null;
}

/**
 * Paged response interface for BillPay Search
 */
export interface BillPaySearchItemPagedResponse {
  items: BillPaySearchItem[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * BillPay Search request parameters matching API's BillPaySearchRequest
 */
export interface BillPaySearchRequest {
  searchType: BillPaySearchType;
  id: string;
  days?: number | null;
  reportType: BillPayReportType;
  sortColumn?: BillPaySearchSortColumn;
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Parameters for BillPay Search Report
 */
export interface BillPaySearchParams {
  searchType: BillPaySearchType;
  id: string;
  days?: number | null;
  reportType: BillPayReportType;
  sortColumn?: BillPaySearchSortColumn;
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Get BillPay Search data from the API
 * @param params BillPay Search parameters
 * @returns Promise with paged response of BillPay Search items
 */
export const getBillPaySearch = async (
  params: BillPaySearchParams
): Promise<BillPaySearchItemPagedResponse> => {
  if (params.searchType === undefined) {
    throw new Error('SearchType is a required parameter');
  }

  if (!params.id) {
    throw new Error('ID is a required parameter');
  }

  if (params.reportType === undefined) {
    throw new Error('ReportType is a required parameter');
  }

  // Convert the params to the format expected by the API
  const requestParams: BillPaySearchRequest = {
    searchType: params.searchType,
    id: params.id,
    days: params.days || null,
    reportType: params.reportType,
    sortColumn: params.sortColumn,
    pageNumber: params.pageNumber || 1,
    pageSize: params.pageSize || 10,
    sortDirection: params.sortDirection || 'ASC'
  };

  return await reportService.getBillPaySearch(requestParams);
};
