/**
 * User Payee Change History Report utility file
 * Contains types, enums, and API service functions for the User Payee Change History report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search types for User Payee Change History Report
 */
export enum UserPayeeChangeHistorySearchType {
    MemberID = 'MemberID',
    UserPayeeListID = 'UserPayeeListID'
}

/**
 * Display names for search types
 */
export const USER_PAYEE_CHANGE_HISTORY_SEARCH_TYPES = {
    [UserPayeeChangeHistorySearchType.MemberID]: 'Member ID',
    [UserPayeeChangeHistorySearchType.UserPayeeListID]: 'User Payee List ID'
};

/**
 * Sort columns for User Payee Change History Report
 */
export enum UserPayeeChangeHistorySortColumn {
    MemberID = 'MemberID',
    UserPayeeListId = 'UserPayeeListId',
    UpdatedBy = 'UpdatedBy',
    UpdatedOn = 'UpdatedOn',
    ChangeType = 'ChangeType',
    PayeeId = 'PayeeId',
    PayeeName = 'PayeeName',
    PaymentMethod = 'PaymentMethod',
    Active = 'Active'
}

/**
 * Display names for sort columns
 */
export const USER_PAYEE_CHANGE_HISTORY_SORT_COLUMNS = {
    [UserPayeeChangeHistorySortColumn.MemberID]: 'Member ID',
    [UserPayeeChangeHistorySortColumn.UserPayeeListId]: 'User Payee List ID',
    [UserPayeeChangeHistorySortColumn.UpdatedBy]: 'Updated By',
    [UserPayeeChangeHistorySortColumn.UpdatedOn]: 'Updated On',
    [UserPayeeChangeHistorySortColumn.ChangeType]: 'Change Type',
    [UserPayeeChangeHistorySortColumn.PayeeId]: 'Payee ID',
    [UserPayeeChangeHistorySortColumn.PayeeName]: 'Payee Name',
    [UserPayeeChangeHistorySortColumn.PaymentMethod]: 'Payment Method',
    [UserPayeeChangeHistorySortColumn.Active]: 'Active'
};

/**
 * User Payee Change History Item interface
 */
export interface UserPayeeChangeHistoryItem {
    memberID: string;
    userPayeeListId: string;
    updatedBy: string;
    updatedOn: string;
    reason?: string;
    changeType: string;
    payeeId: string;
    fisPayeeId?: string;
    payeeName: string;
    usersAccountAtPayee?: string;
    nameOnAccount?: string;
    paymentMethod: string;
    active: boolean;
    payeeType?: string;
}

/**
 * Parameters for User Payee Change History Report
 */
export interface UserPayeeChangeHistoryParams {
    searchType: UserPayeeChangeHistorySearchType;
    memberID?: string;
    userPayeeListID?: string;
    startDate: string;
    endDate: string;
    pageNumber: number;
    pageSize: number;
    sortColumn?: UserPayeeChangeHistorySortColumn;
    sortDirection?: 'asc' | 'desc';
}

/**
 * Response for User Payee Change History Report
 */
export interface UserPayeeChangeHistoryResponse {
    items: UserPayeeChangeHistoryItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    sortColumn?: string;
    sortDirection?: string;
}

/**
 * Get User Payee Change History data from the API
 * @param params User Payee Change History search parameters
 * @returns Promise with User Payee Change History data
 */
export const getUserPayeeChangeHistory = async (params: UserPayeeChangeHistoryParams): Promise<UserPayeeChangeHistoryResponse> => {
    return reportService.getUserPayeeChangeHistory(params);
};
