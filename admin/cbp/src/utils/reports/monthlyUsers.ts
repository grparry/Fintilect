/**
 * Monthly Users Report utility file
 * Contains types, enums, and API service functions for the Monthly Users report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for Monthly Users
 */
export enum MonthlyUsersSearchType {
  DateRange = 'DateRange'
}

/**
 * Monthly Users Search Type display names
 */
export const MONTHLY_USERS_SEARCH_TYPES = {
  [MonthlyUsersSearchType.DateRange]: 'Date Range'
};

/**
 * Sort Column enum for Monthly Users
 */
export enum MonthlyUsersSortColumn {
  MemberID = 'MemberID',
  NumberOfPayments = 'NumberOfPayments'
}

/**
 * Monthly Users Sort Column display names
 */
export const MONTHLY_USERS_SORT_COLUMNS = {
  [MonthlyUsersSortColumn.MemberID]: 'Member ID',
  [MonthlyUsersSortColumn.NumberOfPayments]: 'Number of Payments'
};

/**
 * Monthly Users Item interface matching C# API
 * Note: Property names use camelCase to match API response format
 */
export interface MonthlyUsersItem {
  memberID: string;
  numberOfPayments: number;
}

/**
 * Monthly Users Response interface
 */
export interface MonthlyUsersResponse {
  items: MonthlyUsersItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Monthly Users Params interface for API request
 */
export interface MonthlyUsersParams {
  searchType: MonthlyUsersSearchType;
  pageNumber: number;
  pageSize: number;
  sortColumn?: MonthlyUsersSortColumn;
  sortDirection?: 'ASC' | 'DESC';
  startDate?: string;
  endDate?: string;
}

/**
 * Fetches Monthly Users data from the API
 * @param params Request parameters
 * @returns Promise with the response data
 */
export const getMonthlyUsers = async (
  params: MonthlyUsersParams
): Promise<MonthlyUsersResponse> => {
  const response = await reportService.getMonthlyUsers(params);
  return response;
};
