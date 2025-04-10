import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Sort Column enum for Suspended Payment
 */
export enum SuspendedPaymentSortColumn {
  PaymentID = 'PaymentID',
  RecurringID = 'RecurringID',
  MemberID = 'MemberID',
  Account = 'Account',
  Amount = 'Amount',
  PayeeID = 'PayeeID',
  PayeeName = 'PayeeName',
  UserPayeeListID = 'UserPayeeListID',
  UsersAccountAtPayee = 'UsersAccountAtPayee',
  NameOnAccount = 'NameOnAccount',
  ProcessDate = 'ProcessDate',
  DeliveryDate = 'DeliveryDate',
  Comments = 'Comments',
  Source = 'Source',
  EntryDate = 'EntryDate',
  LastUpdated = 'LastUpdated'
}

/**
 * Suspended Payment Item interface matching C# API
 */
export interface SuspendedPaymentItem {
  paymentID: string | null;
  recurringID: string | null;
  memberID: string | null;
  account: string | null;
  amount: number;
  payeeID: string | null;
  payeeName: string | null;
  userPayeeListID: string | null;
  usersAccountAtPayee: string | null;
  nameOnAccount: string | null;
  processDate: string | null;
  deliveryDate: string | null;
  comments: string | null;
  source: string | null;
  entryDate: string | null;
  lastUpdated: string | null;
}

/**
 * Paged response interface for Suspended Payment
 */
export interface SuspendedPaymentItemPagedResponse {
  items: SuspendedPaymentItem[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Suspended Payment request parameters matching API
 */
export interface SuspendedPaymentRequest {
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Parameters for Suspended Payment Report
 */
export interface SuspendedPaymentParams {
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: SuspendedPaymentSortColumn;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Get suspended payments based on the provided parameters
 * @param params Parameters for the suspended payment report
 * @returns Paginated suspended payment report data
 */
export async function getSuspendedPayments(
  params: SuspendedPaymentParams
): Promise<SuspendedPaymentItemPagedResponse> {
  try {
    // Map the params to the format expected by the API
    const requestParams: SuspendedPaymentRequest = {
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 20,
      sortColumn: params.sortColumn,
      sortDirection: params.sortDirection
    };
    
    // Log the parameters being sent for debugging
    console.log('Suspended Payment request parameters:', requestParams);
    
    // Call the dedicated endpoint through the report service
    return await reportService.getSuspendedPaymentReport(requestParams);
  } catch (error) {
    console.error('Error fetching suspended payment report:', error);
    throw error; // Re-throw to allow component to handle the error
  }
}
