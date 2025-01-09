import { ApiSuccessResponse } from '../types/api.types';
import {
  Exception,
  ExceptionCategory,
  ExceptionFilter,
  ExceptionSeverity,
  ExceptionStats,
  CreateExceptionRequest,
  UpdateExceptionRequest,
} from '../types/exception.types';
import api from './api';
import { auditService } from './audit.service';

/**
 * Service for managing and tracking exceptions in the Bill Pay system
 */
class ExceptionService {
  private readonly baseUrl = '/exceptions';

  /**
   * Creates a new exception
   */
  public async createException(request: CreateExceptionRequest): Promise<Exception> {
    await auditService.logEvent({
      eventType: 'EXCEPTION_CREATE',
      resourceId: 'pending',  // Using 'pending' as a placeholder until we have the actual ID
      resourceType: 'exception',
      status: 'INITIATED',
      metadata: request,
    });

    try {
      const response = await api.post<ApiSuccessResponse<Exception>>(
        this.baseUrl,
        request
      );

      const exception = response.data.data;
      await auditService.logEvent({
        eventType: 'EXCEPTION_CREATE',
        resourceId: exception.id,
        resourceType: 'exception',
        status: 'COMPLETED',
        metadata: {
          category: exception.category,
          severity: exception.severity,
        },
      });

      return exception;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'EXCEPTION_CREATE',
        resourceId: 'pending',  // Using 'pending' as a placeholder until we have the actual ID
        resourceType: 'exception',
        status: 'ERROR',
        metadata: { error, request },
      });
      throw err;
    }
  }

  /**
   * Updates an existing exception
   */
  public async updateException(id: string, request: UpdateExceptionRequest): Promise<Exception> {
    await auditService.logEvent({
      eventType: 'EXCEPTION_UPDATE',
      resourceId: id,
      resourceType: 'exception',
      status: 'INITIATED',
      metadata: request,
    });

    try {
      const response = await api.patch<ApiSuccessResponse<Exception>>(
        `${this.baseUrl}/${id}`,
        request
      );

      const exception = response.data.data;
      await auditService.logEvent({
        eventType: 'EXCEPTION_UPDATE',
        resourceId: id,
        resourceType: 'exception',
        status: 'COMPLETED',
        metadata: {
          newStatus: request.status,
          assignedTo: request.assignedTo,
        },
      });

      return exception;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: 'EXCEPTION_UPDATE',
        resourceId: id,
        resourceType: 'exception',
        status: 'ERROR',
        metadata: { error, request },
      });
      throw err;
    }
  }

  /**
   * Gets an exception by ID
   */
  public async getException(id: string): Promise<Exception> {
    const response = await api.get<ApiSuccessResponse<Exception>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  /**
   * Lists exceptions based on filters
   */
  public async listExceptions(filter?: ExceptionFilter): Promise<Exception[]> {
    const response = await api.get<ApiSuccessResponse<Exception[]>>(
      this.baseUrl,
      { params: filter }
    );
    return response.data.data;
  }

  /**
   * Gets exception statistics
   */
  public async getExceptionStats(): Promise<ExceptionStats> {
    const response = await api.get<ApiSuccessResponse<ExceptionStats>>(
      `${this.baseUrl}/stats`
    );
    return response.data.data;
  }

  /**
   * Acknowledges an exception
   */
  public async acknowledgeException(id: string): Promise<Exception> {
    return this.updateException(id, { status: 'ACKNOWLEDGED' });
  }

  /**
   * Resolves an exception with a resolution message
   */
  public async resolveException(id: string, resolution: string): Promise<Exception> {
    return this.updateException(id, {
      status: 'RESOLVED',
      resolution,
    });
  }

  /**
   * Assigns an exception to a user
   */
  public async assignException(id: string, userId: string): Promise<Exception> {
    return this.updateException(id, { assignedTo: userId });
  }

  /**
   * Helper method to create a system exception
   */
  public async logSystemException(
    message: string,
    severity: ExceptionSeverity,
    metadata?: Record<string, any>
  ): Promise<Exception> {
    return this.createException({
      message,
      category: 'SYSTEM',
      severity,
      metadata,
    });
  }

  /**
   * Helper method to create a payment processing exception
   */
  public async logPaymentException(
    message: string,
    severity: ExceptionSeverity,
    metadata?: Record<string, any>
  ): Promise<Exception> {
    return this.createException({
      message,
      category: 'PAYMENT_PROCESSING',
      severity,
      metadata,
    });
  }

  /**
   * Helper method to create a security exception
   */
  public async logSecurityException(
    message: string,
    severity: ExceptionSeverity,
    metadata?: Record<string, any>
  ): Promise<Exception> {
    return this.createException({
      message,
      category: 'SECURITY',
      severity,
      metadata,
    });
  }
}

export const exceptionService = new ExceptionService();
