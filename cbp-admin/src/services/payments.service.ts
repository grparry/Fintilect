import { ApiSuccessResponse } from '../types/api.types';
import api from './api';
import { paymentApi } from './api/payment.api';
import {
  Payment,
  PaymentStatus,
  ReportFilters,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
  PendingPayment,
  PendingPaymentSearchRequest,
  PendingPaymentListResponse,
  PendingPaymentSummary,
  PendingPaymentApproval,
  PendingPaymentRejection,
  ConfirmationMethod
} from '../types/bill-pay.types';

interface FetchPaymentsParams extends Partial<ReportFilters> {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  totalPages: number;
}

class PaymentsService {
  private readonly baseUrl = '/api/payments';

  async fetchPayments(params: FetchPaymentsParams): Promise<PaymentsResponse> {
    const response = await api.get<ApiSuccessResponse<PaymentsResponse>>(this.baseUrl, { params });
    return response.data.data;
  }

  async getPaymentById(id: string): Promise<Payment> {
    const response = await api.get<ApiSuccessResponse<Payment>>(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const response = await api.patch<ApiSuccessResponse<Payment>>(`${this.baseUrl}/${id}/status`, { status });
    return response.data.data;
  }

  async processPayment(id: string): Promise<Payment> {
    const response = await api.post<ApiSuccessResponse<Payment>>(`${this.baseUrl}/${id}/process`);
    return response.data.data;
  }

  async cancelPayment(id: string, reason: string): Promise<Payment> {
    const response = await api.post<ApiSuccessResponse<Payment>>(`${this.baseUrl}/${id}/cancel`, { reason });
    return response.data.data;
  }

  async exportPayments(filters: ReportFilters): Promise<Blob> {
    const response = await api.get<ApiSuccessResponse<Blob>>(`${this.baseUrl}/export`, { params: filters });
    return response.data.data;
  }

  async validatePayment(id: string): Promise<{
    valid: boolean;
    errors: Array<{ field: string; message: string }>;
  }> {
    const response = await api.get<ApiSuccessResponse<{
      valid: boolean;
      errors: Array<{ field: string; message: string }>;
    }>>(`${this.baseUrl}/${id}/validate`);
    return response.data.data;
  }

  async getPaymentHistory(id: string): Promise<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, any>;
  }>> {
    const response = await api.get<ApiSuccessResponse<Array<{
      action: string;
      performedBy: string;
      timestamp: string;
      details: Record<string, any>;
    }>>>(`${this.baseUrl}/${id}/history`);
    return response.data.data;
  }

  async getPendingPayment(id: string): Promise<PendingPayment> {
    const response = await api.get<ApiSuccessResponse<PendingPayment>>(`${this.baseUrl}/pending/${id}`);
    return response.data.data;
  }

  async createPendingPayment(payment: Omit<PendingPayment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<PendingPayment> {
    const response = await api.post<ApiSuccessResponse<PendingPayment>>(`${this.baseUrl}/pending`, payment);
    return response.data.data;
  }

  async searchPendingPayments(request: PendingPaymentSearchRequest): Promise<PendingPaymentListResponse> {
    const response = await api.post<ApiSuccessResponse<PendingPaymentListResponse>>(`${this.baseUrl}/pending/search`, request);
    return response.data.data;
  }

  async getPendingPaymentsSummary(filters?: Omit<PendingPaymentSearchRequest, 'page' | 'limit' | 'sortBy' | 'sortOrder'>): Promise<PendingPaymentSummary> {
    const response = await api.get<ApiSuccessResponse<PendingPaymentSummary>>(`${this.baseUrl}/pending/summary`, { params: filters });
    return response.data.data;
  }

  async confirmPayment(
    paymentId: string,
    method: ConfirmationMethod,
    code: string,
    userId: string
  ): Promise<PaymentConfirmationResponse> {
    const response = await api.post<ApiSuccessResponse<PaymentConfirmationResponse>>(`${this.baseUrl}/${paymentId}/confirm`, {
      method,
      code,
      userId,
    });
    return response.data.data;
  }

  async retryFailedPayment(id: string): Promise<Payment> {
    const response = await api.post<ApiSuccessResponse<Payment>>(`${this.baseUrl}/${id}/retry`);
    return response.data.data;
  }

  async approvePendingPayment(
    id: string,
    userId: string,
    notes?: string
  ): Promise<PendingPayment> {
    const approval: PendingPaymentApproval = {
      paymentId: id,
      approvedBy: userId,
      approvedAt: new Date().toISOString(),
      notes
    };

    const response = await paymentApi.approvePendingPayment(id, approval);
    return response.data;
  }

  async rejectPendingPayment(
    id: string,
    userId: string,
    reason: string,
    notes?: string
  ): Promise<PendingPayment> {
    const rejection: PendingPaymentRejection = {
      paymentId: id,
      rejectedBy: userId,
      rejectedAt: new Date().toISOString(),
      reason,
      notes
    };

    const response = await paymentApi.rejectPendingPayment(id, rejection);
    return response.data;
  }
}

export const paymentsService = new PaymentsService();
