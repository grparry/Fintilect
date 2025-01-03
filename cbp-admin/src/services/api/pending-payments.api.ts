import { ApiSuccessResponse, PaymentApiResponse } from '../../types/api.types';
import { BaseApi } from './base.api';
import {
  PendingPayment,
  PendingPaymentApproval,
  PendingPaymentRejection,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PendingPaymentListResponse,
  PaymentHistory,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
} from '../../types/bill-pay.types';

interface PaymentsResponse {
  data: PendingPayment[];
  total: number;
  page: number;
  limit: number;
}

export interface PendingPaymentsApi {
  searchPendingPayments(filters: PendingPaymentSearchRequest): Promise<ApiSuccessResponse<PendingPayment[]>>;
  approvePendingPayment(id: string, approval: PendingPaymentApproval): Promise<ApiSuccessResponse<void>>;
  rejectPendingPayment(id: string, rejection: PendingPaymentRejection): Promise<ApiSuccessResponse<void>>;
  bulkApprovePendingPayments(ids: string[], approval: PendingPaymentApproval): Promise<ApiSuccessResponse<void>>;
  bulkRejectPendingPayments(ids: string[], rejection: PendingPaymentRejection): Promise<ApiSuccessResponse<void>>;
  validateApproval(id: string): Promise<ApiSuccessResponse<boolean>>;
  getPaymentHistory(id: string): Promise<ApiSuccessResponse<PaymentHistory>>;
  confirmPayment(id: string, confirmation: PaymentConfirmationRequest): Promise<ApiSuccessResponse<PaymentConfirmationResponse>>;
  fetchPayments(params: PendingPaymentSearchRequest & {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiSuccessResponse<PaymentsResponse>>;
  getPaymentById(id: string): Promise<ApiSuccessResponse<PendingPayment>>;
  approvePayment(id: string, approval: Omit<PendingPaymentApproval, 'paymentId'>): Promise<ApiSuccessResponse<PendingPayment>>;
  rejectPayment(id: string, rejection: Omit<PendingPaymentRejection, 'paymentId'>): Promise<ApiSuccessResponse<PendingPayment>>;
  bulkApprove(ids: string[], approval: Omit<PendingPaymentApproval, 'paymentId'>): Promise<ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>>>;
  bulkReject(ids: string[], rejection: Omit<PendingPaymentRejection, 'paymentId'>): Promise<ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>>>;
  getSummary(filters: PendingPaymentSearchRequest): Promise<ApiSuccessResponse<PendingPaymentSummary>>;
  exportPayments(filters: PendingPaymentSearchRequest): Promise<Blob>;
  getPendingPaymentsSummary(): Promise<ApiSuccessResponse<PendingPaymentSummary>>;
}

export class PendingPaymentsApi extends BaseApi implements PendingPaymentsApi {
  private baseUrl: string = '/api/v1/payment';

  constructor() {
    super();
  }

  private convertSearchRequestToParams(request: PendingPaymentSearchRequest): Record<string, string> {
    const params: Record<string, string> = {};
    
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'object' && value !== null) {
          params[key] = JSON.stringify(value);
        } else {
          params[key] = String(value);
        }
      }
    });

    return params;
  }

  async fetchPayments(params: PendingPaymentSearchRequest & {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiSuccessResponse<PaymentsResponse>> {
    const queryParams = this.convertSearchRequestToParams(params);
    
    try {
      // The response from MSW already includes success and meta
      const response = await this.get<ApiSuccessResponse<PaymentsResponse>>(`${this.baseUrl}/pending`, {
        params: queryParams
      });

      // Ensure we always return a valid response shape
      return {
        success: true,
        data: {
          data: response.data?.data || [],
          total: response.data?.total || 0,
          page: response.data?.page || 0,
          limit: response.data?.limit || 10
        },
        meta: response.meta || {
          timestamp: new Date().toISOString(),
          requestId: crypto.randomUUID()
        }
      };
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error; // Let the component handle the error
    }
  }

  async getPaymentById(id: string): Promise<ApiSuccessResponse<PendingPayment>> {
    const response = await this.get<PendingPayment>(`${this.baseUrl}/pending/${id}`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async approvePayment(
    id: string,
    approval: Omit<PendingPaymentApproval, 'paymentId'>
  ): Promise<ApiSuccessResponse<PendingPayment>> {
    const response = await this.post<PendingPayment>(`${this.baseUrl}/pending/${id}/approve`, approval);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async rejectPayment(
    id: string,
    rejection: Omit<PendingPaymentRejection, 'paymentId'>
  ): Promise<ApiSuccessResponse<PendingPayment>> {
    const response = await this.post<PendingPayment>(`${this.baseUrl}/pending/${id}/reject`, rejection);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async bulkApprove(
    ids: string[],
    approval: Omit<PendingPaymentApproval, 'paymentId'>
  ): Promise<ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>>> {
    const response = await this.post<Array<{ id: string; success: boolean; error?: string }>>(
      `${this.baseUrl}/pending/bulk-approve`,
      {
        ids,
        ...approval,
      }
    );
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async bulkReject(
    ids: string[],
    rejection: Omit<PendingPaymentRejection, 'paymentId'>
  ): Promise<ApiSuccessResponse<Array<{ id: string; success: boolean; error?: string }>>> {
    const response = await this.post<Array<{ id: string; success: boolean; error?: string }>>(
      `${this.baseUrl}/pending/bulk-reject`,
      {
        ids,
        ...rejection,
      }
    );
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getSummary(filters: PendingPaymentSearchRequest): Promise<ApiSuccessResponse<PendingPaymentSummary>> {
    const response = await this.post<PendingPaymentSummary>(`${this.baseUrl}/pending/summary`, {
      ...filters,
      method: filters.method?.[0],
      status: filters.status?.[0],
      priority: filters.priority?.[0],
    });
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async exportPayments(filters: PendingPaymentSearchRequest): Promise<Blob> {
    const queryParams = this.convertSearchRequestToParams(filters);
    return this.getBlob(`${this.baseUrl}/pending/export`, { params: queryParams });
  }

  async searchPendingPayments(params: PendingPaymentSearchRequest): Promise<ApiSuccessResponse<PendingPayment[]>> {
    const queryParams = this.convertSearchRequestToParams(params);
    const response = await this.get<PendingPayment[]>(`${this.baseUrl}/pending/search`, { 
      params: queryParams 
    });

    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async approvePendingPayment(id: string, approval: PendingPaymentApproval): Promise<ApiSuccessResponse<void>> {
    await this.post<void>(`${this.baseUrl}/pending/${id}/approve`, approval);
    return { 
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async rejectPendingPayment(id: string, rejection: PendingPaymentRejection): Promise<ApiSuccessResponse<void>> {
    await this.post<void>(`${this.baseUrl}/pending/${id}/reject`, rejection);
    return { 
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async bulkApprovePendingPayments(ids: string[], approval: PendingPaymentApproval): Promise<ApiSuccessResponse<void>> {
    await this.post<void>(`${this.baseUrl}/pending/bulk-approve`, {
      ids,
      ...approval,
    });
    return { 
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async bulkRejectPendingPayments(ids: string[], rejection: PendingPaymentRejection): Promise<ApiSuccessResponse<void>> {
    await this.post<void>(`${this.baseUrl}/pending/bulk-reject`, {
      ids,
      ...rejection,
    });
    return { 
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async validateApproval(id: string): Promise<ApiSuccessResponse<boolean>> {
    // TO DO: implement validation logic
    return { success: true, data: true, meta: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID()
    } };
  }

  async getPaymentHistory(id: string): Promise<ApiSuccessResponse<PaymentHistory>> {
    // TO DO: implement get payment history logic
    return { success: true, data: {} as PaymentHistory, meta: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID()
    } };
  }

  async confirmPayment(id: string, confirmation: PaymentConfirmationRequest): Promise<ApiSuccessResponse<PaymentConfirmationResponse>> {
    // TO DO: implement confirm payment logic
    return { success: true, data: {} as PaymentConfirmationResponse, meta: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID()
    } };
  }

  async getPendingPaymentsSummary(): Promise<ApiSuccessResponse<PendingPaymentSummary>> {
    const response = await this.get<PendingPaymentSummary>(`${this.baseUrl}/payments/pending/summary`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }
}

export const pendingPaymentsApi = new PendingPaymentsApi();
