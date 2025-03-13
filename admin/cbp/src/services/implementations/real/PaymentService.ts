import { IPaymentService } from '../../interfaces/IPaymentService';
import { BaseService } from './BaseService';
import { Payment, PaymentFilters, PaymentHistory, PaymentStatus, PaymentActivityRequest, PaymentActivityListResponse } from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import logger from '../../../utils/logger';

export class PaymentService extends BaseService implements IPaymentService {
  constructor(basePath: string = '/api/v1/Payment') {
    super(basePath);
  }

  async getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>> {
    try {
      // Use the Search API endpoint for payments
      const response = await this.post<PaginatedResponse<Payment>>('/search/payment', filters);
      return response;
    } catch (error) {
      logger.error(`Error getting payments: ${error}`);
      throw error;
    }
  }

  async getPayment(paymentId: string): Promise<Payment> {
    try {
      // Use the specific payment endpoint with path parameter
      const response = await this.get<Payment>(`/${paymentId}`);
      return response;
    } catch (error) {
      logger.error(`Error getting payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    try {
      // Note: The API spec doesn't show a direct endpoint for creating payments in the admin API
      // This would typically be handled by the consumer-facing API
      // For completeness, we'll keep this method but log a warning
      logger.warn('Creating payments directly through the admin API may not be supported');
      const response = await this.post<Payment>('', payment);
      return response;
    } catch (error) {
      logger.error(`Error creating payment: ${error}`);
      throw error;
    }
  }

  async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
    try {
      // Use the PUT endpoint with paymentId path parameter
      const response = await this.put<Payment>(`/${paymentId}`, payment);
      return response;
    } catch (error) {
      logger.error(`Error updating payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async cancelPayment(paymentId: string, reason: string): Promise<void> {
    try {
      // Use the DELETE endpoint with paymentId path parameter
      await this.delete(`/${paymentId}`, { data: { reason } });
    } catch (error) {
      logger.error(`Error canceling payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async getPaymentHistory(paymentId: string, searchParams?: any): Promise<PaymentHistory[]> {
    try {
      // Use the change-history endpoint with the required parameters
      // If searchParams is provided, use it; otherwise, use default parameters
      const requestParams = searchParams || {
        paymentID: paymentId // Legacy format for backward compatibility
      };
      
      // Ensure the request has the correct parameter names according to the API
      const request = {
        StartDate: requestParams.StartDate || "2021-01-01",
        EndDate: requestParams.EndDate || new Date().toISOString().split('T')[0],
        SearchType: requestParams.SearchType || 2, // 2 is for PaymentId
        SearchValue: requestParams.SearchValue || paymentId
      };
      
      const response = await this.post<{ histories: PaymentHistory[] }>('/change-history', request);
      return response.histories || [];
    } catch (error) {
      logger.error(`Error getting payment history for ${paymentId}: ${error}`);
      throw error;
    }
  }

  async approvePayment(paymentId: string): Promise<void> {
    try {
      // Use the status endpoint to update payment status
      await this.post('/status', { 
        paymentID: paymentId,
        status: PaymentStatus.APPROVED
      });
    } catch (error) {
      logger.error(`Error approving payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async rejectPayment(paymentId: string, reason: string): Promise<void> {
    try {
      // Use the status endpoint to update payment status
      await this.post('/status', { 
        paymentID: paymentId,
        status: PaymentStatus.REJECTED,
        reason
      });
    } catch (error) {
      logger.error(`Error rejecting payment ${paymentId}: ${error}`);
      throw error;
    }
  }

  async getPendingPayments(request: PaymentActivityRequest): Promise<PaymentActivityListResponse> {
    try {
      // Use the pending-payments endpoint
      const response = await this.post<PaymentActivityListResponse>('/pending-payments', request);
      return response;
    } catch (error) {
      logger.error(`Error getting pending payments: ${error}`);
      throw error;
    }
  }
}