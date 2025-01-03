import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import {
  FISException,
  FISExceptionStatus,
  FISExceptionFilters,
  FISRetryResult,
} from '../types/bill-pay.types';

interface FetchFISExceptionsParams extends FISExceptionFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface FISExceptionsResponse {
  exceptions: FISException[];
  total: number;
  page: number;
  totalPages: number;
}

class FISExceptionsService {
  private readonly baseUrl = '/api/fis/exceptions';

  async fetchExceptions(params: FetchFISExceptionsParams): Promise<FISExceptionsResponse> {
    const response = await api.get<ApiSuccessResponse<FISExceptionsResponse>>(
      this.baseUrl,
      { params }
    );
    return response.data.data;
  }

  async getExceptionById(id: string): Promise<FISException> {
    const response = await api.get<ApiSuccessResponse<FISException>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async updateExceptionStatus(
    id: string,
    status: FISExceptionStatus,
    resolution?: string
  ): Promise<FISException> {
    const response = await api.patch<ApiSuccessResponse<FISException>>(
      `${this.baseUrl}/${id}/status`,
      { status, resolution }
    );
    return response.data.data;
  }

  async retryException(id: string): Promise<FISRetryResult> {
    const response = await api.post<ApiSuccessResponse<FISRetryResult>>(
      `${this.baseUrl}/${id}/retry`
    );
    return response.data.data;
  }

  async deleteException(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async bulkRetry(ids: string[]): Promise<Array<{ id: string; result: FISRetryResult }>> {
    const response = await api.post<ApiSuccessResponse<Array<{ id: string; result: FISRetryResult }>>>(
      `${this.baseUrl}/bulk/retry`,
      { ids }
    );
    return response.data.data;
  }

  async bulkDelete(ids: string[]): Promise<void> {
    await api.delete(`${this.baseUrl}/bulk`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ids: ids.join(',') }
    });
  }

  async exportExceptions(filters: FISExceptionFilters): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/export`,
      {
        params: filters,
        responseType: 'blob',
      }
    );
    return response.data;
  }

  async getExceptionStats(): Promise<{
    total: number;
    byStatus: Record<FISExceptionStatus, number>;
    byErrorCode: Record<string, number>;
    averageRetryCount: number;
    resolutionRate: number;
  }> {
    const response = await api.get<ApiSuccessResponse<{
      total: number;
      byStatus: Record<FISExceptionStatus, number>;
      byErrorCode: Record<string, number>;
      averageRetryCount: number;
      resolutionRate: number;
    }>>(`${this.baseUrl}/stats`);
    return response.data.data;
  }
}

export const fisExceptionsService = new FISExceptionsService();
