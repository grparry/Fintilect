/**
 * Recurring Payment Change History Report utility file
 * Contains types, enums, and API service functions for the Recurring Payment Change History report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search types for Recurring Payment Change History Report
 */
export enum RecurringPaymentChangeHistorySearchType {
    MemberID = 'MemberID',
    RecurringPaymentID = 'RecurringPaymentID',
    DateRange = 'DateRange'
}

/**
 * Display names for search types
 */
export const RECURRING_PAYMENT_CHANGE_HISTORY_SEARCH_TYPES = {
    [RecurringPaymentChangeHistorySearchType.MemberID]: 'Member ID',
    [RecurringPaymentChangeHistorySearchType.RecurringPaymentID]: 'Recurring Payment ID',
    [RecurringPaymentChangeHistorySearchType.DateRange]: 'Date Range'
};

/**
 * Sort columns for Recurring Payment Change History Report
 */
export enum RecurringPaymentChangeHistorySortColumn {
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
 * Display names for sort columns
 */
export const RECURRING_PAYMENT_CHANGE_HISTORY_SORT_COLUMNS = {
    [RecurringPaymentChangeHistorySortColumn.MemberID]: 'Member ID',
    [RecurringPaymentChangeHistorySortColumn.UpdatedBy]: 'Updated By',
    [RecurringPaymentChangeHistorySortColumn.UpdatedOn]: 'Updated On',
    [RecurringPaymentChangeHistorySortColumn.ChangeType]: 'Change Type',
    [RecurringPaymentChangeHistorySortColumn.RecurringPaymentId]: 'Recurring Payment ID',
    [RecurringPaymentChangeHistorySortColumn.PayeeName]: 'Payee Name',
    [RecurringPaymentChangeHistorySortColumn.Amount]: 'Amount',
    [RecurringPaymentChangeHistorySortColumn.Frequency]: 'Frequency'
};

/**
 * Parameters for Recurring Payment Change History Report
 */
export interface RecurringPaymentChangeHistoryParams {
    searchType: RecurringPaymentChangeHistorySearchType;
    recurringPaymentID?: string;
    memberID?: string;
    startDate?: string;
    endDate?: string;
    pageNumber: number;
    pageSize: number;
    sortColumn?: RecurringPaymentChangeHistorySortColumn;
    sortDirection?: 'ASC' | 'DESC';
}

/**
 * Item in Recurring Payment Change History Report
 */
export interface RecurringPaymentChangeHistoryItem {
    recurringPaymentId: string;
    memberID: string;
    payeeName: string;
    updatedOn: string;
    changeType: string;
    updatedBy: string;
    oldValue?: string;
    newValue?: string;
    fieldName?: string;
    amount?: number;
    frequency?: string;
}

/**
 * Response from Recurring Payment Change History Report API
 */
export interface RecurringPaymentChangeHistoryResponse {
    items: RecurringPaymentChangeHistoryItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

/**
 * Get Recurring Payment Change History data
 * @param params Search parameters
 * @returns Promise with response data
 */
export const getRecurringPaymentChangeHistory = async (
    params: RecurringPaymentChangeHistoryParams
): Promise<RecurringPaymentChangeHistoryResponse> => {
    try {
        const response = await reportService.getRecurringPaymentChangeHistory(params);
        return response;
    } catch (error) {
        console.error('Error fetching recurring payment change history data:', error);
        throw error;
    }
};
