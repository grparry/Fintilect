import api from './api';
import { ApiSuccessResponse, ApiPaginatedResponse } from '../types/api.types';
import {
  PaymentException,
  ExceptionStatus,
  ExceptionFilters,
  ResolutionHistory,
  ExceptionStats,
} from '../types/bill-pay.types';

interface FetchExceptionsParams extends ExceptionFilters {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface ExceptionsResponse {
  exceptions: PaymentException[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

class ExceptionsService {
  private readonly baseUrl = '/system/errors';

  async fetchExceptions(params: FetchExceptionsParams): Promise<ExceptionsResponse> {
    const response = await api.getPaginated<PaymentException>(this.baseUrl, {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
      },
    });

    return {
      exceptions: response.data,
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

  async getException(id: string): Promise<PaymentException> {
    const response = await api.get<PaymentException>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async getExceptionHistory(id: string): Promise<ResolutionHistory[]> {
    const response = await api.get<ResolutionHistory[]>(`${this.baseUrl}/${id}/history`);
    return response.data;
  }

  async resolveException(
    id: string,
    resolution: { action: string; notes?: string }
  ): Promise<PaymentException> {
    const response = await api.post<PaymentException>(
      `${this.baseUrl}/${id}/resolve`,
      resolution,
      {
        retry: true,
        retryDelay: 1000,
      }
    );
    return response.data;
  }

  async retryException(id: string): Promise<PaymentException> {
    const response = await api.post<PaymentException>(
      `${this.baseUrl}/${id}/retry`,
      undefined,
      {
        retry: true,
        retryDelay: 1000,
      }
    );
    return response.data;
  }

  async updateExceptionStatus(
    id: string,
    status: ExceptionStatus,
    resolution?: string
  ): Promise<PaymentException> {
    const response = await api.patch<PaymentException>(
      `${this.baseUrl}/${id}/status`,
      { status, resolution },
      {
        retry: true,
      }
    );
    return response.data;
  }

  async assignException(id: string, userId: string): Promise<PaymentException> {
    const response = await api.patch<PaymentException>(
      `${this.baseUrl}/${id}/assign`,
      { userId },
      {
        retry: true,
      }
    );
    return response.data;
  }

  async addExceptionNote(
    id: string,
    note: string,
    metadata?: Record<string, any>
  ): Promise<ResolutionHistory> {
    const response = await api.post<ResolutionHistory>(
      `${this.baseUrl}/${id}/notes`,
      { note, metadata },
      {
        retry: true,
      }
    );
    return response.data;
  }

  async getExceptionStats(): Promise<ExceptionStats> {
    const response = await api.get<ExceptionStats>(`${this.baseUrl}/stats`);
    return response.data;
  }

  async exportExceptions(filters: ExceptionFilters): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/export`, {
      params: filters,
      responseType: 'blob',
      headers: {
        Accept: 'application/octet-stream',
      },
    });
    return response.data;
  }
}

export const exceptionsService = new ExceptionsService();
