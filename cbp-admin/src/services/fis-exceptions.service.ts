import api from './api';
import { ApiSuccessResponse, ApiPaginatedResponse } from '../types/api.types';
import {
  FISException,
  FISExceptionStatus,
  FISExceptionFilters,
  FISRetryResult,
  FISExceptionHistory,
  FISRefundRequest,
  AuditEventStatus
} from '../types/bill-pay.types';
import { auditService } from './audit.service';

interface FetchFISExceptionsParams {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  type?: string;
  status?: FISExceptionStatus[];
}

interface FISExceptionsResponse {
  data: FISException[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pages: number;
  };
}

class FISExceptionsService {
  private readonly baseUrl = '/exceptions';

  /**
   * Fetch exceptions with filters and pagination
   */
  async fetchExceptions(params: FetchFISExceptionsParams): Promise<FISExceptionsResponse> {
    const response = await api.get<ApiSuccessResponse<FISExceptionsResponse>>(
      `${this.baseUrl}/search`,
      { params }
    );
    return response.data.data;
  }

  /**
   * Get a specific exception by ID
   */
  async getExceptionById(id: string): Promise<FISException> {
    const response = await api.get<ApiSuccessResponse<FISException>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  /**
   * Resolve an exception
   */
  async resolveException(
    exceptionId: string,
    request: {
      resolution: string;
    }
  ): Promise<FISException> {
    await auditService.logEvent({
      eventType: 'EXCEPTION_RESOLVE',
      resourceId: exceptionId,
      resourceType: 'fis_exception',
      status: AuditEventStatus.INITIATED,
      metadata: request,
    });

    try {
      const response = await api.post<ApiSuccessResponse<FISException>>(
        `${this.baseUrl}/${exceptionId}/resolve`,
        request
      );

      const exception = response.data.data;
      await auditService.logEvent({
        eventType: 'EXCEPTION_RESOLVE',
        resourceId: exceptionId,
        resourceType: 'fis_exception',
        status: AuditEventStatus.COMPLETED,
        metadata: { ...request, exceptionStatus: exception.status },
      });

      return exception;
    } catch (error) {
      await auditService.logEvent({
        eventType: 'EXCEPTION_RESOLVE',
        resourceId: exceptionId,
        resourceType: 'fis_exception',
        status: AuditEventStatus.ERROR,
        metadata: { ...request, error },
      });
      throw error;
    }
  }

  /**
   * Reprocess an exception
   */
  async reprocessException(
    exceptionId: string,
    request: {
      notes: string;
    }
  ): Promise<FISException> {
    await auditService.logEvent({
      eventType: 'EXCEPTION_REPROCESS',
      resourceId: exceptionId,
      resourceType: 'fis_exception',
      status: AuditEventStatus.INITIATED,
      metadata: request,
    });

    try {
      const response = await api.post<ApiSuccessResponse<FISException>>(
        `${this.baseUrl}/${exceptionId}/reprocess`,
        request
      );

      const exception = response.data.data;
      await auditService.logEvent({
        eventType: 'EXCEPTION_REPROCESS',
        resourceId: exceptionId,
        resourceType: 'fis_exception',
        status: AuditEventStatus.COMPLETED,
        metadata: { ...request, exceptionStatus: exception.status },
      });

      return exception;
    } catch (error) {
      await auditService.logEvent({
        eventType: 'EXCEPTION_REPROCESS',
        resourceId: exceptionId,
        resourceType: 'fis_exception',
        status: AuditEventStatus.ERROR,
        metadata: { ...request, error },
      });
      throw error;
    }
  }

  /**
   * Process a refund for an exception
   */
  async refundException(
    exceptionId: string,
    request: {
      amount: number;
      reason: string;
    }
  ): Promise<FISException> {
    await auditService.logEvent({
      eventType: 'EXCEPTION_REFUND',
      resourceId: exceptionId,
      resourceType: 'fis_exception',
      status: AuditEventStatus.INITIATED,
      metadata: request,
    });

    try {
      const response = await api.post<ApiSuccessResponse<FISException>>(
        `${this.baseUrl}/${exceptionId}/refund`,
        request
      );

      const exception = response.data.data;
      await auditService.logEvent({
        eventType: 'EXCEPTION_REFUND',
        resourceId: exceptionId,
        resourceType: 'fis_exception',
        status: AuditEventStatus.COMPLETED,
        metadata: { ...request, exceptionStatus: exception.status },
      });

      return exception;
    } catch (error) {
      await auditService.logEvent({
        eventType: 'EXCEPTION_REFUND',
        resourceId: exceptionId,
        resourceType: 'fis_exception',
        status: AuditEventStatus.ERROR,
        metadata: { ...request, error },
      });
      throw error;
    }
  }

  /**
   * Get exception history entries
   */
  async getExceptionHistory(
    exceptionId: string,
    params: {
      page?: number;
      pageSize?: number;
      type?: string[];
      startDate?: string;
      endDate?: string;
      userId?: string;
    }
  ): Promise<ApiPaginatedResponse<FISExceptionHistory>> {
    const response = await api.get<ApiPaginatedResponse<FISExceptionHistory>>(
      `/exception-history`,
      {
        params: {
          ...params,
          exceptionId,
        },
      }
    );
    return response.data;
  }

  /**
   * Add a history entry for an exception
   */
  async addHistoryEntry(
    exceptionId: string,
    type: string,
    details: {
      before?: Record<string, unknown>;
      after?: Record<string, unknown>;
      metadata?: Record<string, unknown>;
    }
  ): Promise<FISExceptionHistory> {
    const response = await api.post<ApiSuccessResponse<FISExceptionHistory>>(
      `/exception-history/exceptions/${exceptionId}/history`,
      {
        type,
        details,
      }
    );
    return response.data.data;
  }
}

export const fisExceptionsService = new FISExceptionsService();
