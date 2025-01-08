import { ApiSuccessResponse, ApiPaginatedResponse, PaymentApiResponse } from '../types/api.types';
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
  ConfirmationMethod,
  PaymentMethod,
  Payee,
  Client
} from '../types/bill-pay.types';

interface FetchPaymentsParams extends Partial<ReportFilters> {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface PaymentsResponse {
  payments: Payment[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

class PaymentsService {
  private readonly baseUrl = '/api/v1/payment';

  async fetchPayments(params: FetchPaymentsParams): Promise<PaymentsResponse> {
    const response = await api.getPaginated<Payment>(this.baseUrl, {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
        ...params,
      },
    }) as ApiPaginatedResponse<Payment[]>;

    return {
      payments: response.data,
      meta: {
        totalCount: response.meta.totalCount,
        currentPage: response.meta.currentPage,
        totalPages: response.meta.totalPages,
        pageSize: response.meta.pageSize,
        hasNextPage: response.meta.hasNextPage,
        hasPreviousPage: response.meta.hasPreviousPage,
      },
    };
  }

  async getPaymentById(id: string): Promise<Payment> {
    const response = await api.get<ApiSuccessResponse<Payment>>(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const response = await api.patch<ApiSuccessResponse<Payment>>(
      `${this.baseUrl}/${id}/status`,
      { status },
      { retry: true }
    );
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

  async validatePayment(payment: Partial<Payment>): Promise<{
    valid: boolean;
    errors: Array<{ field: string; message: string }>;
  }> {
    const response = await paymentApi.validatePayment(payment);
    const errors = response.meta && typeof response.meta === 'object' && 'errors' in response.meta
      ? ((response.meta as unknown) as { errors: Array<{ field: string; message: string }> }).errors 
      : [];
    return {
      valid: response.data,
      errors
    };
  }

  async getPaymentHistory(id: string): Promise<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, any>;
  }>> {
    const response = await paymentApi.getPaymentHistory(id);
    return response.data;
  }

  async getPendingPayment(id: string): Promise<PendingPayment> {
    const response = await paymentApi.getPendingPayment(id);
    return response.data;
  }

  async createPendingPayment(payment: Omit<PendingPayment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<PendingPayment> {
    const response = await paymentApi.createPendingPayment(payment);
    return response.data;
  }

  async searchPendingPayments(request: PendingPaymentSearchRequest): Promise<PendingPaymentListResponse> {
    const response = await paymentApi.searchPendingPayments(request);
    return response.data;
  }

  async getPendingPaymentsSummary(filters?: Omit<PendingPaymentSearchRequest, 'page' | 'limit' | 'sortBy' | 'sortOrder'>): Promise<PendingPaymentSummary> {
    const response = await paymentApi.getPendingPaymentsSummary(filters);
    return response.data;
  }

  async confirmPayment(
    paymentId: string,
    confirmationMethod: ConfirmationMethod,
    code: string,
    userId: string
  ): Promise<PaymentConfirmationResponse> {
    const request: PaymentConfirmationRequest = {
      paymentId,
      method: PaymentMethod.ACH,
      confirmationMethod,
      code,
      userId
    };
    const response = await paymentApi.confirmPayment(request);
    return response.data;
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
    const approval: Omit<PendingPaymentApproval, 'paymentId'> = {
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
    const rejection: Omit<PendingPaymentRejection, 'paymentId'> = {
      rejectedBy: userId,
      rejectedAt: new Date().toISOString(),
      reason,
      notes
    };

    const response = await paymentApi.rejectPendingPayment(id, rejection);
    return response.data;
  }

  async getPayees(): Promise<Payee[]> {
    const response = await paymentApi.getPayees();
    return response.data;
  }

  async getClients(): Promise<Client[]> {
    const response = await paymentApi.getClients();
    return response.data;
  }

  async getPaymentLimits(): Promise<Record<PaymentMethod, number>> {
    const response = await paymentApi.getPaymentLimits();
    return response.data;
  }
}

export const paymentsService = new PaymentsService();
