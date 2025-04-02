import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Search Type enum for Payee Report
 * Maps UI-friendly names to API expected string values
 */
export enum PayeeSearchType {
  Member = 'Member',
  Payment = 'Payment',
  RecurringPayment = 'RecurringPayment',
  UserPayeeList = 'UserPayeeList',
  Payee = 'Payee'
}

/**
 * Payee search type display names
 */
export const PAYEE_SEARCH_TYPES = {
  [PayeeSearchType.Member]: 'Member ID',
  [PayeeSearchType.Payment]: 'Payment ID',
  [PayeeSearchType.RecurringPayment]: 'Recurring Payment ID',
  [PayeeSearchType.UserPayeeList]: 'User Payee List ID',
  [PayeeSearchType.Payee]: 'Payee ID'
};

/**
 * Sort Column enum for Payee Report
 */
export enum PayeeSortColumn {
  PayeeName = 'PayeeName',
  PayeeID = 'PayeeID',
  Address = 'Address',
  City = 'City',
  State = 'State'
}

/**
 * Payee Item interface matching C# API
 */
export interface PayeeItem {
  payeeID: string;
  payeeName: string;
  memberID: string;
  memberName: string;
  accountNumber: string;
  dateAdded: string;
  status: string;
  paymentMethod: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

/**
 * Paged response interface for Payee Report
 */
export interface PayeeItemPagedResponse {
  items: PayeeItem[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Request parameters for Payee Report
 */
export interface PayeeRequest {
  searchType: PayeeSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days?: number;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: string;
}

/**
 * Parameters for the getPayeeReport function
 * This is used by the UI components
 */
export interface PayeeParams {
  searchType: PayeeSearchType;
  memberID?: string;
  paymentID?: string;
  recurringPaymentID?: string;
  userPayeeListID?: string;
  payeeID?: string;
  days?: number;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: string;
}

/**
 * Get payee report data from the API
 * @param params Payee report parameters
 * @returns Promise with payee report data
 */
export const getPayeeReport = async (params: PayeeParams): Promise<PayeeItemPagedResponse> => {
  try {
    // Validate required parameters based on search type
    switch (params.searchType) {
      case PayeeSearchType.Member:
        if (!params.memberID) throw new Error('MemberID is required for this search type');
        break;
      case PayeeSearchType.Payment:
        if (!params.paymentID) throw new Error('PaymentID is required for this search type');
        break;
      case PayeeSearchType.RecurringPayment:
        if (!params.recurringPaymentID) throw new Error('RecurringPaymentID is required for this search type');
        break;
      case PayeeSearchType.UserPayeeList:
        if (!params.userPayeeListID) throw new Error('UserPayeeListID is required for this search type');
        break;
      case PayeeSearchType.Payee:
        if (!params.payeeID) throw new Error('PayeeID is required for this search type');
        break;
    }

    // Map the params to the format expected by the API
    const requestParams: PayeeRequest = {
      searchType: params.searchType,
      memberID: params.memberID,
      paymentID: params.paymentID,
      recurringPaymentID: params.recurringPaymentID,
      userPayeeListID: params.userPayeeListID,
      payeeID: params.payeeID,
      days: params.days,
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20,
      sortColumn: params.sortColumn,
      sortDirection: params.sortDirection || 'ASC'
    };
    
    // Call the dedicated endpoint through the report service
    return await reportService.getPayeeReport(requestParams);
  } catch (error) {
    console.error('Error in getPayeeReport:', error);
    throw error;
  }
};
