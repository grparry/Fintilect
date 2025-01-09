import api from './api';
import { ApiSuccessResponse, ApiPaginatedResponse } from '../types/api.types';
import {
  FISExceptionHistory,
  AuditEventStatus,
} from '../types/bill-pay.types';
import { auditService } from './audit.service';

interface FetchHistoryParams {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  type?: string[];
  userId?: string;
  exceptionId?: string;
}

interface HistoryResponse {
  data: FISExceptionHistory[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pages: number;
  };
}

interface HistoryStats {
  totalEntries: number;
  byType: Record<string, number>;
  byUser: Record<string, number>;
  firstEntry: string;
  lastEntry: string;
}

/**
 * Service for managing FIS Exception history entries
 * Handles tracking changes, resolutions, and actions taken on exceptions
 */
class ExceptionHistoryService {
  private readonly baseUrl = '/exception-history';

  /**
   * Search for history entries with filters and pagination
   */
  async searchHistory(params: FetchHistoryParams): Promise<ApiSuccessResponse<HistoryResponse>> {
    const response = await api.get<ApiSuccessResponse<HistoryResponse>>(
      `${this.baseUrl}/search`,
      { params }
    );
    return response.data;
  }

  /**
   * Get history entries for a specific exception
   */
  async getHistoryForException(
    exceptionId: string,
    params?: Omit<FetchHistoryParams, 'exceptionId'>
  ): Promise<ApiSuccessResponse<HistoryResponse>> {
    const response = await api.get<HistoryResponse>(
      `${this.baseUrl}/exceptions/${exceptionId}`,
      { params }
    );
    return {
      success: true,
      data: response.data
    };
  }

  /**
   * Get a specific history entry by ID
   */
  async getHistoryById(id: string): Promise<FISExceptionHistory> {
    const response = await api.get<ApiSuccessResponse<FISExceptionHistory>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  /**
   * Create a new history entry for an exception
   */
  async createHistoryEntry(
    exceptionId: string,
    type: string,
    details: {
      before?: Record<string, unknown>;
      after?: Record<string, unknown>;
      metadata?: Record<string, unknown>;
    }
  ): Promise<FISExceptionHistory> {
    await auditService.logEvent({
      eventType: 'EXCEPTION_HISTORY_CREATE',
      resourceId: exceptionId,
      resourceType: 'fis_exception_history',
      status: AuditEventStatus.INITIATED,
      metadata: { type, details },
    });

    try {
      const response = await api.post<ApiSuccessResponse<FISExceptionHistory>>(
        `${this.baseUrl}/exceptions/${exceptionId}/entries`,
        {
          type,
          details,
        }
      );

      const historyEntry = response.data.data;
      await auditService.logEvent({
        eventType: 'EXCEPTION_HISTORY_CREATE',
        resourceId: exceptionId,
        resourceType: 'fis_exception_history',
        status: AuditEventStatus.COMPLETED,
        metadata: {
          ...historyEntry,
          historyId: historyEntry.id,
        },
      });

      return historyEntry;
    } catch (error) {
      await auditService.logEvent({
        eventType: 'EXCEPTION_HISTORY_CREATE',
        resourceId: exceptionId,
        resourceType: 'fis_exception_history',
        status: AuditEventStatus.ERROR,
        metadata: { type, details, error },
      });
      throw error;
    }
  }

  /**
   * Get aggregated history statistics for an exception
   */
  async getHistoryStats(exceptionId: string): Promise<HistoryStats> {
    const response = await api.get<ApiSuccessResponse<HistoryStats>>(
      `${this.baseUrl}/exceptions/${exceptionId}/stats`
    );
    return response.data.data;
  }
}

export const exceptionHistoryService = new ExceptionHistoryService();
