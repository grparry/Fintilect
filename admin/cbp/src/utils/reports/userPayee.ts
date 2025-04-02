/**
 * User Payee Report utility file
 * Contains types, enums, and API service functions for the User Payee report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * User Payee Search Types
 * Matches the C# API enum values
 */
export enum UserPayeeSearchType {
  Member = 'Member',
  Payment = 'Payment',
  RecurringPayment = 'RecurringPayment',
  UserPayeeList = 'UserPayeeList',
  Payee = 'Payee'
}

/**
 * Human-readable labels for search types
 */
export const USER_PAYEE_SEARCH_TYPES: Record<UserPayeeSearchType, string> = {
  [UserPayeeSearchType.Member]: 'Member ID',
  [UserPayeeSearchType.Payment]: 'Payment ID',
  [UserPayeeSearchType.RecurringPayment]: 'Recurring Payment ID',
  [UserPayeeSearchType.UserPayeeList]: 'User Payee List ID',
  [UserPayeeSearchType.Payee]: 'Payee ID'
};

/**
 * User Payee Sort Columns
 * Matches the C# API enum values
 */
export enum UserPayeeSortColumn {
  PayeeName = 'PayeeName',
  MemberID = 'MemberID',
  UserPayeeListID = 'UserPayeeListID',
  AccountNumber = 'AccountNumber',
  Status = 'Status'
}

/**
 * User Payee Report Parameters
 */
export interface UserPayeeParams {
  searchType: UserPayeeSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days: number;
  sortColumn: UserPayeeSortColumn;
  sortDirection: 'ASC' | 'DESC';
  pageNumber: number;
  pageSize: number;
}

/**
 * User Payee Item
 * Represents a single user payee record
 */
export interface UserPayeeItem {
  userPayeeListID: string;
  memberID: string;
  payeeID: string;
  payeeName: string;
  dateAdded: string;
  accountID: string;
  accountName: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

/**
 * User Payee Paged Response
 * Represents the API response with pagination information
 */
export interface UserPayeeItemPagedResponse {
  items: UserPayeeItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get User Payee Report data from the API
 * @param params Report parameters
 * @returns Promise with paged response
 */
export const getUserPayeeReport = async (params: UserPayeeParams): Promise<UserPayeeItemPagedResponse> => {
  return await reportService.getUserPayeeReport(params);
};
