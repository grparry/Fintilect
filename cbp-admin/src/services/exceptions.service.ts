import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import {
  PaymentException,
  ExceptionStatus,
  ExceptionFilters,
  ResolutionHistory,
} from '../types/bill-pay.types';

interface FetchExceptionsParams extends ExceptionFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface ExceptionsResponse {
  exceptions: PaymentException[];
  total: number;
  page: number;
  totalPages: number;
}

class ExceptionsService {
  private readonly baseUrl = '/api/v1/exceptions';

  async fetchExceptions(params: FetchExceptionsParams): Promise<ExceptionsResponse> {
    const response = await api.get<ApiSuccessResponse<ExceptionsResponse>>(
      this.baseUrl,
      { params }
    );
    return response.data.data;
  }

  async getException(id: string): Promise<PaymentException> {
    const response = await api.get<ApiSuccessResponse<PaymentException>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async getExceptionHistory(id: string): Promise<ResolutionHistory[]> {
    const response = await api.get<ApiSuccessResponse<ResolutionHistory[]>>(
      `${this.baseUrl}/${id}/history`
    );
    return response.data.data;
  }

  async resolveException(
    id: string,
    resolution: { action: string; notes?: string }
  ): Promise<PaymentException> {
    const response = await api.post<ApiSuccessResponse<PaymentException>>(
      `${this.baseUrl}/${id}/resolve`,
      resolution
    );
    return response.data.data;
  }

  async retryException(id: string): Promise<PaymentException> {
    const response = await api.post<ApiSuccessResponse<PaymentException>>(
      `${this.baseUrl}/${id}/retry`
    );
    return response.data.data;
  }

  async updateExceptionStatus(
    id: string,
    status: ExceptionStatus,
    resolution?: string
  ): Promise<PaymentException> {
    const response = await api.patch<ApiSuccessResponse<PaymentException>>(
      `${this.baseUrl}/${id}/status`,
      { status, resolution }
    );
    return response.data.data;
  }

  async assignException(id: string, userId: string): Promise<PaymentException> {
    const response = await api.patch<ApiSuccessResponse<PaymentException>>(
      `${this.baseUrl}/${id}/assign`,
      { userId }
    );
    return response.data.data;
  }

  async addExceptionNote(
    id: string,
    note: string,
    metadata?: Record<string, any>
  ): Promise<ResolutionHistory> {
    const response = await api.post<ApiSuccessResponse<ResolutionHistory>>(
      `${this.baseUrl}/${id}/notes`,
      { note, metadata }
    );
    return response.data.data;
  }

  async exportExceptions(filters: ExceptionFilters): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/export`, {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  }

  async bulkUpdateStatus(
    ids: string[],
    status: ExceptionStatus,
    resolution?: string
  ): Promise<void> {
    await api.patch<ApiSuccessResponse<void>>(`${this.baseUrl}/bulk/status`, {
      ids,
      status,
      resolution,
    });
  }

  async bulkAssign(ids: string[], userId: string): Promise<void> {
    await api.patch<ApiSuccessResponse<void>>(`${this.baseUrl}/bulk/assign`, {
      ids,
      userId,
    });
  }
}

export const exceptionsService = new ExceptionsService();
