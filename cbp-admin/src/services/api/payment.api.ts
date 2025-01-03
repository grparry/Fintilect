import { ApiSuccessResponse, PaymentApiResponse } from '../../types/api.types';
import { BaseApi } from './base.api';
import {
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
  PendingPayment,
  PendingPaymentSearchRequest,
  PendingPaymentListResponse,
  PendingPaymentSummary,
  PendingPaymentApproval,
  PendingPaymentRejection,
  PaymentException,
  ExceptionResolution,
  FISExceptionFilters,
  FISException,
  ExceptionStats,
  FISResponseHistory,
  FISRetryResult,
  Payment,
  Payee,
  Client,
  PaymentMethod,
  PayeeConversionFile,
  PayeeConversionRecord,
  PayeeConversionFileUploadResponse
} from '../../types/bill-pay.types';

export interface PaymentApi {
  getPaymentExceptions(): Promise<PaymentApiResponse<PaymentException[]>>;
  resolvePaymentException(id: string, resolution: ExceptionResolution): Promise<PaymentApiResponse<void>>;
  retryPaymentException(id: string): Promise<PaymentApiResponse<void>>;
  getFISExceptions(filters: FISExceptionFilters): Promise<PaymentApiResponse<FISException[]>>;
  getExceptionStats(): Promise<PaymentApiResponse<ExceptionStats>>;
  getFISExceptionHistory(id: string): Promise<PaymentApiResponse<FISResponseHistory[]>>;
  exportExceptions(filters: FISExceptionFilters): Promise<PaymentApiResponse<Blob>>;
  bulkRetry(ids: string[]): Promise<PaymentApiResponse<FISRetryResult[]>>;
  bulkDelete(ids: string[]): Promise<PaymentApiResponse<void>>;
  retryFISException(id: string): Promise<PaymentApiResponse<FISRetryResult>>;
  validatePayment(payment: Partial<Payment>): Promise<PaymentApiResponse<boolean>>;
  getPayees(): Promise<PaymentApiResponse<Payee[]>>;
  getClients(): Promise<PaymentApiResponse<Client[]>>;
  getPaymentLimits(): Promise<PaymentApiResponse<Record<PaymentMethod, number>>>;
  saveDraft(payment: Partial<Payment>): Promise<PaymentApiResponse<Payment>>;
  getPayeeConversionFiles(): Promise<PaymentApiResponse<PayeeConversionFile[]>>;
  getPayeeConversionRecords(fileId: string): Promise<PaymentApiResponse<PayeeConversionRecord[]>>;
  uploadPayeeConversionFile(file: File): Promise<PaymentApiResponse<PayeeConversionFile>>;
  startPayeeConversion(fileId: string): Promise<PaymentApiResponse<void>>;
  getPayeeConversionProgress(fileId: string): Promise<PaymentApiResponse<PayeeConversionFile>>;
  confirmPayment(request: PaymentConfirmationRequest): Promise<PaymentApiResponse<PaymentConfirmationResponse>>;
  createPendingPayment(payment: Omit<PendingPayment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<PaymentApiResponse<PendingPayment>>;
  searchPendingPayments(request: PendingPaymentSearchRequest): Promise<PaymentApiResponse<PendingPaymentListResponse>>;
  getPendingPayment(id: string): Promise<PaymentApiResponse<PendingPayment>>;
  getPaymentHistory(id: string): Promise<PaymentApiResponse<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, any>;
  }>>>;
  approvePendingPayment(id: string, approval: Omit<PendingPaymentApproval, 'paymentId'>): Promise<PaymentApiResponse<PendingPayment>>;
  rejectPendingPayment(id: string, rejection: Omit<PendingPaymentRejection, 'paymentId'>): Promise<PaymentApiResponse<PendingPayment>>;
  getPendingPaymentsSummary(filters?: Omit<PendingPaymentSearchRequest, 'page' | 'limit' | 'sortBy' | 'sortOrder'>): Promise<PaymentApiResponse<PendingPaymentSummary>>;
  uploadFile(file: File): Promise<ApiSuccessResponse<PayeeConversionFileUploadResponse>>;
}

export class PaymentApi extends BaseApi implements PaymentApi {
  private baseUrl: string = '/api/v1/payment';

  constructor() {
    super();
  }

  async getPaymentExceptions(): Promise<PaymentApiResponse<PaymentException[]>> {
    const response = await this.get<PaymentException[]>(`${this.baseUrl}/exceptions`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async resolvePaymentException(id: string, resolution: ExceptionResolution): Promise<PaymentApiResponse<void>> {
    await this.post<void>(`${this.baseUrl}/exceptions/${id}/resolve`, resolution);
    return {
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async retryPaymentException(id: string): Promise<PaymentApiResponse<void>> {
    await this.post<void>(`${this.baseUrl}/exceptions/${id}/retry`);
    return {
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getFISExceptions(filters: FISExceptionFilters): Promise<PaymentApiResponse<FISException[]>> {
    const response = await this.post<FISException[]>(`${this.baseUrl}/fis/exceptions`, filters);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getExceptionStats(): Promise<PaymentApiResponse<ExceptionStats>> {
    const response = await this.get<ExceptionStats>(`${this.baseUrl}/exceptions/stats`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getFISExceptionHistory(id: string): Promise<PaymentApiResponse<FISResponseHistory[]>> {
    const response = await this.get<FISResponseHistory[]>(`${this.baseUrl}/fis/exceptions/${id}/history`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async exportExceptions(filters: FISExceptionFilters): Promise<PaymentApiResponse<Blob>> {
    const response = await this.post<Blob>(`${this.baseUrl}/fis/exceptions/export`, filters);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async bulkRetry(ids: string[]): Promise<PaymentApiResponse<FISRetryResult[]>> {
    const response = await this.post<FISRetryResult[]>(`${this.baseUrl}/fis/exceptions/bulk-retry`, { ids });
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async bulkDelete(ids: string[]): Promise<PaymentApiResponse<void>> {
    await this.post<void>(`${this.baseUrl}/fis/exceptions/bulk-delete`, { ids });
    return {
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async retryFISException(id: string): Promise<PaymentApiResponse<FISRetryResult>> {
    const response = await this.post<FISRetryResult>(`${this.baseUrl}/fis/exceptions/${id}/retry`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async validatePayment(payment: Partial<Payment>): Promise<PaymentApiResponse<boolean>> {
    const response = await this.post<boolean>(`${this.baseUrl}/validate`, payment);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPayees(): Promise<PaymentApiResponse<Payee[]>> {
    const response = await this.get<Payee[]>(`${this.baseUrl}/payees`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getClients(): Promise<PaymentApiResponse<Client[]>> {
    const response = await this.get<Client[]>(`${this.baseUrl}/clients`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPaymentLimits(): Promise<PaymentApiResponse<Record<PaymentMethod, number>>> {
    const response = await this.get<Record<PaymentMethod, number>>(`${this.baseUrl}/limits`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async saveDraft(payment: Partial<Payment>): Promise<PaymentApiResponse<Payment>> {
    const response = await this.post<Payment>(`${this.baseUrl}/drafts`, payment);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPayeeConversionFiles(): Promise<PaymentApiResponse<PayeeConversionFile[]>> {
    const response = await this.get<PayeeConversionFile[]>(`${this.baseUrl}/payee-conversion/files`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPayeeConversionRecords(fileId: string): Promise<PaymentApiResponse<PayeeConversionRecord[]>> {
    const response = await this.get<PayeeConversionRecord[]>(`${this.baseUrl}/payee-conversion/files/${fileId}/records`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async uploadPayeeConversionFile(file: File): Promise<PaymentApiResponse<PayeeConversionFile>> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.post<PayeeConversionFile>(`${this.baseUrl}/payee-conversion/files`, formData);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async startPayeeConversion(fileId: string): Promise<PaymentApiResponse<void>> {
    await this.post<void>(`${this.baseUrl}/payee-conversion/files/${fileId}/start`);
    return {
      success: true,
      data: undefined,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPayeeConversionProgress(fileId: string): Promise<PaymentApiResponse<PayeeConversionFile>> {
    const response = await this.get<PayeeConversionFile>(`${this.baseUrl}/payee-conversion/files/${fileId}/progress`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async confirmPayment(request: PaymentConfirmationRequest): Promise<PaymentApiResponse<PaymentConfirmationResponse>> {
    const response = await this.post<PaymentConfirmationResponse>(`${this.baseUrl}/payments/confirm`, request);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async createPendingPayment(payment: Omit<PendingPayment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<PaymentApiResponse<PendingPayment>> {
    const response = await this.post<PendingPayment>(`${this.baseUrl}/pending`, payment);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async searchPendingPayments(request: PendingPaymentSearchRequest): Promise<PaymentApiResponse<PendingPaymentListResponse>> {
    const response = await this.post<PendingPaymentListResponse>(`${this.baseUrl}/pending-payments`, request);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPendingPayment(id: string): Promise<PaymentApiResponse<PendingPayment>> {
    const response = await this.get<PendingPayment>(`${this.baseUrl}/payments/${id}`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPaymentHistory(id: string): Promise<PaymentApiResponse<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, any>;
  }>>> {
    const response = await this.get<Array<{
      action: string;
      performedBy: string;
      timestamp: string;
      details: Record<string, any>;
    }>>(`${this.baseUrl}/pending/${id}/history`);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async approvePendingPayment(id: string, approval: Omit<PendingPaymentApproval, 'paymentId'>): Promise<PaymentApiResponse<PendingPayment>> {
    const response = await this.post<PendingPayment>(`${this.baseUrl}/payments/${id}/approve`, approval);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async rejectPendingPayment(id: string, rejection: Omit<PendingPaymentRejection, 'paymentId'>): Promise<PaymentApiResponse<PendingPayment>> {
    const response = await this.post<PendingPayment>(`${this.baseUrl}/payments/${id}/reject`, rejection);
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async getPendingPaymentsSummary(filters?: Omit<PendingPaymentSearchRequest, 'page' | 'limit' | 'sortBy' | 'sortOrder'>): Promise<PaymentApiResponse<PendingPaymentSummary>> {
    const stringParams = filters ? Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>) : undefined;

    const response = await this.get<PendingPaymentSummary>(`${this.baseUrl}/payments/summary`, { params: stringParams });
    return {
      success: true,
      data: response,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    };
  }

  async uploadFile(file: File): Promise<ApiSuccessResponse<PayeeConversionFileUploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.post<PayeeConversionFileUploadResponse>(
      '/api/v1/payment/payee-conversion/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
}

export const paymentApi = new PaymentApi();
