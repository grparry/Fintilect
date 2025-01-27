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
   * Get pending payments with filtering
   * @param request Search request parameters
   * @returns Paginated list of pending payments
   */
  getPendingPayments(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>>;

  /**
   * Get summary of pending payments
   * @param request Search request parameters
   * @returns Summary of pending payments
   */
  getPendingPaymentsSummary(request: PendingPaymentSearchRequest): Promise<PendingPaymentSummary>;

  /**
   * Export pending payments
   * @param request Search request parameters
   * @returns Blob containing exported data
   */
  exportPendingPayments(request: PendingPaymentSearchRequest): Promise<Blob>;

  /**
   * Approve a pending payment
   * @param paymentId Payment identifier
   * @returns Void promise
   */
  approvePayment(paymentId: string): Promise<void>;

  /**
   * Reject a pending payment
   * @param paymentId Payment identifier
   * @param reason Rejection reason
   * @returns Void promise
   */
  rejectPayment(paymentId: string, reason: string): Promise<void>;

  /**
   * Bulk approve pending payments
   * @param paymentIds List of payment identifiers
   * @returns True if successful
   */
  bulkApprove(paymentIds: string[]): Promise<boolean>;

  /**
   * Bulk reject pending payments
   * @param paymentIds List of payment identifiers
   * @returns True if successful
   */
  bulkReject(paymentIds: string[]): Promise<boolean>;

  /**
   * Get payment history
   * @param paymentId Payment identifier
   * @returns Payment history
   */
  getPaymentHistory(paymentId: string): Promise<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, any>;
  }>;

  /**
   * Confirm a payment
   * @param paymentId Payment identifier
   * @param request Confirmation request
   * @returns Response with success status
   */
  confirmPayment(paymentId: string, request: any): Promise<PaymentConfirmationResponse>;
}
