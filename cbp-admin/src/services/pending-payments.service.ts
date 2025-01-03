import { ApiSuccessResponse } from '../types/api.types';
import {
  PendingPayment,
  PendingPaymentFilters,
  PendingPaymentApproval,
  PendingPaymentRejection,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentHistory,
} from '../types/bill-pay.types';
import { pendingPaymentsApi } from './api/pending-payments.api';

interface FetchPaymentsParams extends PendingPaymentFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaymentsResponse {
  payments: PendingPayment[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

class PendingPaymentsService {
  private api = pendingPaymentsApi;

  async fetchPayments(params: FetchPaymentsParams): Promise<PaymentsResponse> {
    const searchRequest: PendingPaymentSearchRequest = {
      ...params,
      method: params.method?.[0],
      status: params.status?.[0],
      priority: params.priority?.[0],
    };
    const response = await this.api.searchPendingPayments(searchRequest);
    const payments = response.data;
    return {
      payments,
      total: payments.length,
      page: params.page ?? 1,
      totalPages: Math.ceil(payments.length / (params.limit ?? 10)),
      limit: params.limit ?? 10
    };
  }

  async getPaymentById(id: string): Promise<PendingPayment> {
    const response = await this.api.getPaymentById(id);
    return response.data;
  }

  async approvePayment(id: string, approval: Omit<PendingPaymentApproval, 'paymentId'>): Promise<PendingPayment> {
    const fullApproval: PendingPaymentApproval = {
      ...approval,
      paymentId: id
    };
    const response = await this.api.approvePayment(id, approval);
    return response.data;
  }

  async rejectPayment(id: string, rejection: Omit<PendingPaymentRejection, 'paymentId'>): Promise<PendingPayment> {
    const fullRejection: PendingPaymentRejection = {
      ...rejection,
      paymentId: id
    };
    const response = await this.api.rejectPayment(id, rejection);
    return response.data;
  }

  async bulkApprove(ids: string[], approval: Omit<PendingPaymentApproval, 'paymentId'>): Promise<Array<{ id: string; success: boolean; error?: string }>> {
    const fullApproval: PendingPaymentApproval = {
      ...approval,
      paymentId: ids[0] // Using first ID as reference
    };
    const response = await this.api.bulkApprove(ids, approval);
    return response.data;
  }

  async bulkReject(ids: string[], rejection: Omit<PendingPaymentRejection, 'paymentId'>): Promise<Array<{ id: string; success: boolean; error?: string }>> {
    const fullRejection: PendingPaymentRejection = {
      ...rejection,
      paymentId: ids[0] // Using first ID as reference
    };
    const response = await this.api.bulkReject(ids, rejection);
    return response.data;
  }

  async getSummary(filters: PendingPaymentFilters): Promise<PendingPaymentSummary> {
    const searchRequest: PendingPaymentSearchRequest = {
      ...filters,
      method: filters.method?.[0],
      status: filters.status?.[0],
      priority: filters.priority?.[0],
    };
    const response = await this.api.getSummary(searchRequest);
    return response.data;
  }

  async exportPayments(filters: PendingPaymentFilters): Promise<Blob> {
    const searchRequest: PendingPaymentSearchRequest = {
      ...filters,
      method: filters.method?.[0],
      status: filters.status?.[0],
      priority: filters.priority?.[0],
    };
    return this.api.exportPayments(searchRequest);
  }

  async validateApproval(id: string): Promise<{
    valid: boolean;
    errors: Array<{ code: string; message: string }>;
    warnings: Array<{ code: string; message: string }>;
  }> {
    const response = await this.api.validateApproval(id);
    if (response.data) {
      return {
        valid: true,
        errors: [],
        warnings: []
      };
    } else {
      return {
        valid: false,
        errors: [{ code: 'VALIDATION_FAILED', message: 'Payment validation failed' }],
        warnings: []
      };
    }
  }

  async getPaymentHistory(id: string): Promise<PaymentHistory> {
    const response = await this.api.getPaymentHistory(id);
    return response.data;
  }
}

export const pendingPaymentsService = new PendingPaymentsService();
