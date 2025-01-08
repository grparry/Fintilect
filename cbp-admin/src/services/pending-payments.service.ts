import { ApiPaginatedResponse, ApiSuccessResponse, ApiPaginationMeta } from '../types/api.types';
import api from './api';
import {
  PendingPayment,
  PendingPaymentFilters,
  PendingPaymentApproval,
  PendingPaymentRejection,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentHistory,
} from '../types/bill-pay.types';

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
  private readonly baseUrl = '/api/v2/payments/pending';

  async fetchPayments(params: FetchPaymentsParams): Promise<PaymentsResponse> {
    type PaginatedResponse = {
      data: PendingPayment[];
      meta: ApiPaginationMeta & {
        timestamp: string;
        requestId: string;
      };
    };

    const response = await api.get<ApiPaginatedResponse<PendingPayment[]>>(
      this.baseUrl,
      { params }
    );

    const { data: payments, meta } = response;

    return {
      payments,
      total: meta.totalCount,
      page: meta.currentPage,
      totalPages: meta.totalPages,
      limit: meta.pageSize,
    };
  }

  async getPaymentById(id: string): Promise<PendingPayment> {
    try {
      const response = await api.get<ApiSuccessResponse<PendingPayment>>(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } };
        throw new Error(apiError.response?.data?.message || 'Failed to fetch payment');
      }
      throw error;
    }
  }

  async approvePayment(id: string, approval: PendingPaymentApproval): Promise<void> {
    await api.post<ApiSuccessResponse<void>>(
      `${this.baseUrl}/${id}/approve`,
      approval
    );
  }

  async rejectPayment(id: string, rejection: PendingPaymentRejection): Promise<void> {
    await api.post<ApiSuccessResponse<void>>(
      `${this.baseUrl}/${id}/reject`,
      rejection
    );
  }

  async bulkApprovePayments(
    ids: string[],
    approval: Omit<PendingPaymentApproval, 'paymentId'>
  ): Promise<Array<{ id: string; success: boolean; error?: string }>> {
    const response = await api.post<
      ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>>
    >(`${this.baseUrl}/bulk/approve`, {
      ids,
      ...approval,
    });
    return response.data.data;
  }

  async bulkRejectPayments(
    ids: string[],
    rejection: Omit<PendingPaymentRejection, 'paymentId'>
  ): Promise<Array<{ id: string; success: boolean; error?: string }>> {
    const response = await api.post<
      ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>>
    >(`${this.baseUrl}/bulk/reject`, {
      ids,
      ...rejection,
    });
    return response.data.data;
  }

  async getSummary(filters: PendingPaymentSearchRequest): Promise<PendingPaymentSummary> {
    const response = await api.get<ApiSuccessResponse<PendingPaymentSummary>>(
      `${this.baseUrl}/summary`,
      { params: filters }
    );
    return response.data;
  }

  async getPaymentHistory(id: string): Promise<PaymentHistory> {
    const response = await api.get<ApiSuccessResponse<PaymentHistory>>(
      `${this.baseUrl}/${id}/history`
    );
    return response.data.data;
  }

  async searchPayments(request: PendingPaymentSearchRequest): Promise<PaymentHistory[]> {
    const response = await api.post<ApiSuccessResponse<PaymentHistory[]>>(
      `${this.baseUrl}/search`,
      request
    );
    return response.data.data;
  }

  async exportPayments(filters: PendingPaymentSearchRequest): Promise<Blob> {
    const response = await api.get<ApiSuccessResponse<Blob>>(
      `${this.baseUrl}/export`,
      {
        params: filters,
        responseType: 'blob',
      }
    );
    return response.data.data;
  }
}

export const pendingPaymentsService = new PendingPaymentsService();
