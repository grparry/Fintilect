import { IBaseService } from './IBaseService';
import {
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaginatedResponse,
  PaymentConfirmationResponse,
} from '../../types/bill-pay.types';

export interface IPaymentService extends IBaseService {
  /**


  /**
   * Get pending payments with filtering
   * @param request Search request parameters
   * @returns Paginated list of pending payments
   */

  /**
   * Get summary of pending payments
   * @param request Search request parameters
   * @returns Summary of pending payments
   */

  /**
   * Export pending payments
   * @param request Search request parameters
   * @returns Blob containing exported data
   */

  /**
   * Approve a pending payment
   * @param paymentId Payment identifier
   * @returns Void promise
   */

  /**
   * Reject a pending payment
   * @param paymentId Payment identifier
   * @param reason Rejection reason
   * @returns Void promise
   */

  /**
   * Bulk approve pending payments
   * @param paymentIds List of payment identifiers
   * @returns True if successful
   */

  /**
   * Bulk reject pending payments
   * @param paymentIds List of payment identifiers
   * @returns True if successful
   */

  /**
   * Get payment history
   * @param paymentId Payment identifier
   * @returns Payment history
   */

  /**
   * Confirm a payment
   * @param paymentId Payment identifier
   * @param request Confirmation request
   * @returns Response with success status
   */
