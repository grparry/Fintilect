import { BaseService } from '../implementations/real/BaseService';
import {
  UserPayeeChangeHistoryListResponse,
  UserPayeeChangeHistoryReportRequest,
  UserPayeeUpdateAccountNumberRequest,
  UserPayeeUpdateFisPayeeIdRequest,
  UpdateAccountAndReprocessRequest,
  UpdateAccountAndRefund,
  UpdateFisPayeeIdAndRefundRequest,
  ManualUpdateRequest,
  CopyMemberPayeesRequest,
  UserPayeeListResponse,
  GlobalPayeeChangeHistoryReportRequest,
  GlobalPayeeChangeHistoryListResponse
} from '../../types/payees.types';

/**
 * Service interface for managing user-specific payee operations.
 * This service handles operations related to individual user payees,
 * such as updating account numbers, FIS payee IDs, and managing payee history.
 */
export interface IPayeeService extends BaseService {
  /**
   * Gets the change history for user payees within a specified date range.
   * @param request The request containing start date, end date, and search value
   * @returns A list of user payee change history records
   */
  getUserPayeeChangeHistory(request: UserPayeeChangeHistoryReportRequest): Promise<UserPayeeChangeHistoryListResponse>;

  /**
   * Updates the account number for a specific user payee.
   * @param request The request containing user payee ID and new account number
   */
  updateUserPayeeAccountNumber(request: UserPayeeUpdateAccountNumberRequest): Promise<void>;

  /**
   * Updates the FIS payee ID for a specific user payee.
   * @param request The request containing user payee ID and new FIS payee ID
   */
  updateUserPayeeFisId(request: UserPayeeUpdateFisPayeeIdRequest): Promise<void>;

  /**
   * Updates the account number and reprocesses the payment.
   * @param request The request containing user payee ID and new account number
   */
  updateAccountAndReprocess(request: UpdateAccountAndReprocessRequest): Promise<void>;

  /**
   * Updates the account number and refunds the payment.
   * @param request The request containing user payee ID and new account number
   */
  updateAccountAndRefund(request: UpdateAccountAndRefund): Promise<void>;

  /**
   * Updates the FIS payee ID and refunds the payment.
   * @param request The request containing user payee ID and new FIS payee ID
   */
  updateFisPayeeIdAndRefund(request: UpdateFisPayeeIdAndRefundRequest): Promise<void>;

  /**
   * Performs a manual update on an exception and refunds the payment.
   * @param request The request containing user payee ID
   */
  manualExceptionReprocess(request: ManualUpdateRequest): Promise<void>;

  /**
   * Copies payees from one member to another.
   * @param request The request containing the new member ID
   */
  copyMemberPayees(request: CopyMemberPayeesRequest): Promise<void>;

  /**
   * Gets a list of payees for a specific member.
   * @param memberId The ID of the member to get payees for
   * @returns A list of payees associated with the member
   */
  getMemberPayees(memberId: string): Promise<UserPayeeListResponse>;

  /**
   * Gets the global change history for payees within a specified date range.
   * @param request The request containing start date, end date, and search value
   * @returns A list of global payee change history records
   */
  getGlobalPayeeChangeHistory(request: GlobalPayeeChangeHistoryReportRequest): Promise<GlobalPayeeChangeHistoryListResponse>;
}
