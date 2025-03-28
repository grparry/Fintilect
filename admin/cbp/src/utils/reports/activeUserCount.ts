import { reportService } from '../../services/factory/ServiceFactory';
import { format } from 'date-fns';

/**
 * Search Type enum for Active User Count
 * Maps UI-friendly names to API expected string values
 */
export enum ActiveUserCountSearchType {
  DateRange = 'DateRange',
  MemberID = 'MemberID'
}

/**
 * Active User Count search type display names
 */
export const ACTIVE_USER_COUNT_SEARCH_TYPES = {
  [ActiveUserCountSearchType.DateRange]: 'Date Range',
  [ActiveUserCountSearchType.MemberID]: 'Member ID'
};

/**
 * Sort Column enum for Active User Count
 */
export enum ActiveUserCountSortColumn {
  MemberID = 'MemberID',
  LastActivityDate = 'LastActivityDate',
  PaymentCount = 'PaymentCount'
}

/**
 * Active User Count Sort Column display names
 */
export const ACTIVE_USER_COUNT_SORT_COLUMNS = {
  [ActiveUserCountSortColumn.MemberID]: 'Member ID',
  [ActiveUserCountSortColumn.LastActivityDate]: 'Last Activity Date',
  [ActiveUserCountSortColumn.PaymentCount]: 'Payment Count'
};

/**
 * Active User Count Item interface matching C# API
 * Note: Property names use camelCase to match API response format
 */
export interface ActiveUserCountItem {
  memberID: string;
  lastActivityDate: string | null;
  paymentCount: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

/**
 * Paged response interface for Active User Count
 */
export interface ActiveUserCountItemPagedResponse {
  items: ActiveUserCountItem[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Active User Count request parameters matching API's ActiveUserCountRequest
 */
export interface ActiveUserCountRequest {
  searchType: string;
  memberID?: string;
  startDate?: string;
  endDate?: string;
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Parameters for Active User Count Report
 */
export interface ActiveUserCountParams {
  searchType: ActiveUserCountSearchType;
  memberID?: string;
  startDate?: string;
  endDate?: string;
  sortColumn?: ActiveUserCountSortColumn;
  sortDirection?: 'ASC' | 'DESC';
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Get active user count data from the API
 * @param params Active user count parameters
 * @returns Promise with paged response of active user count items
 */
export const getActiveUserCount = async (
  params: ActiveUserCountParams
): Promise<ActiveUserCountItemPagedResponse> => {
  try {
    // Transform the parameters to match the API expectations
    const requestParams: ActiveUserCountRequest = {
      searchType: params.searchType,
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20
    };

    // Add optional parameters based on search type
    if (params.searchType === ActiveUserCountSearchType.MemberID && params.memberID) {
      requestParams.memberID = params.memberID;
    } else if (params.searchType === ActiveUserCountSearchType.DateRange) {
      if (params.startDate) {
        requestParams.startDate = params.startDate;
      }
      if (params.endDate) {
        requestParams.endDate = params.endDate;
      }
    }

    // Add sorting parameters if provided
    if (params.sortColumn) {
      requestParams.sortColumn = params.sortColumn;
      requestParams.sortDirection = params.sortDirection || 'ASC';
    }

    // Call the API service
    const response = await reportService.getActiveUserCount(requestParams);
    
    return {
      items: response.items || [],
      pageNumber: response.pageNumber || 1,
      pageSize: response.pageSize || 20,
      totalCount: response.totalCount || 0,
      totalPages: response.totalPages || 1,
      hasNext: response.hasNext || false,
      hasPrevious: response.hasPrevious || false
    };
  } catch (error) {
    console.error('Error fetching active user count data:', error);
    throw error;
  }
};
