import { IBaseService } from './IBaseService';
import { Payment, PaymentFilters, PaymentHistory, PaymentActivityRequest, PaymentActivityListResponse } from '../../types/payment.types';
import { PaginatedResponse } from '../../types/common.types';

export interface IPaymentService extends IBaseService {
  /**
   * Get payments with pagination and filtering
   * @param filters Payment filters
   * @returns Paginated list of payments
   */
  getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>>;

  /**
   * Get specific payment
   * @param paymentId Payment identifier
   * @returns Payment details
   */
  getPayment(paymentId: string): Promise<Payment>;

  /**
   * Create new payment
   * @param payment Payment to create
   * @returns Created payment
   */
  createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment>;

  /**
   * Update existing payment
   * @param paymentId Payment identifier
   * @param payment Updated payment data
   * @returns Updated payment
   */
  updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment>;

  /**
   * Cancel payment
   * @param paymentId Payment identifier
   * @param reason Cancellation reason
   */
  cancelPayment(paymentId: string, reason: string): Promise<void>;

  /**
   * Get payment history
   * @param paymentId Payment identifier
   * @returns List of payment history entries
   */
  getPaymentHistory(paymentId: string): Promise<PaymentHistory[]>;

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
   * Get pending payments with filtering
   * @param request Search request parameters
   * @returns List of pending payments
   */
  getPendingPayments(request: PaymentActivityRequest): Promise<PaymentActivityListResponse>;
}