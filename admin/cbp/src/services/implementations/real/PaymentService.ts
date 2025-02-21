import { IPaymentService } from '../../interfaces/IPaymentService';
import { BaseService } from './BaseService';
import { Payment, PaymentFilters, PaymentHistory, PaymentStatus, PaymentActivityRequest, PaymentActivityListResponse } from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import logger from '../../../utils/logger';

export class PaymentService extends BaseService implements IPaymentService {
  constructor(basePath: string = '/api/v1/payment') {
    super(basePath);
  }

  async getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>> {
    try {
      const response = await this.get<PaginatedResponse<Payment>>('/payments', { params: filters });
      return response;
    } catch (error) {
      logger.error(`Error getting payments: ${error}`);
      throw error;
    }
  }

  async getPayment(paymentId: string): Promise<Payment> {
    try {
      const response = await this.get<Payment>(`/payments/${paymentId}`);
      return response;
    } catch (error) {
      logger.error(`Error getting payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    try {
      const response = await this.post<Payment>('/payments', payment);
      return response;
    } catch (error) {
      logger.error(`Error creating payment: ${error}`);
      throw error;
    }
  }

  async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
    try {
      const response = await this.put<Payment>(`/payments/${paymentId}`, payment);
      return response;
    } catch (error) {
      logger.error(`Error updating payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async cancelPayment(paymentId: string, reason: string): Promise<void> {
    try {
      await this.post(`/payments/${paymentId}/cancel`, { reason });
    } catch (error) {
      logger.error(`Error canceling payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
    try {
      const response = await this.get<PaymentHistory[]>(`/payments/${paymentId}/history`);
      return response;
    } catch (error) {
      logger.error(`Error getting payment history for ${paymentId}: ${error}`);
      throw error;
    }
  }

  async approvePayment(paymentId: string): Promise<void> {
    try {
      await this.post(`/payments/${paymentId}/approve`, {});
    } catch (error) {
      logger.error(`Error approving payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async rejectPayment(paymentId: string, reason: string): Promise<void> {
    try {
      await this.post(`/payments/${paymentId}/reject`, { reason });
    } catch (error) {
      logger.error(`Error rejecting payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async getPendingPayments(request: PaymentActivityRequest): Promise<PaymentActivityListResponse> {
    try {
      const response = await this.get<PaymentActivityListResponse>('/payments/pending', { params: request });
      return response;
    } catch (error) {
      logger.error(`Error getting pending payments: ${error}`);
      throw error;
    }
  }
}