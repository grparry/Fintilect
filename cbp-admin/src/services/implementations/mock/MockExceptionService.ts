import { 
  ExceptionTool,
  ExceptionToolStatus,
  ExceptionToolPriority,
  FISException,
  FISExceptionStatus,
  FISExceptionHistory,
  FISResponseHistory,
  FISRetryResult,
  FISRefundRequest,
  ExceptionFilters,
  FISExceptionFilters,
  FISErrorCode,
  PaymentType,
  PaymentStatus
} from '../../../types/bill-pay.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { v4 as uuidv4 } from 'uuid';

export class MockExceptionService extends BaseMockService implements IExceptionService {
  private exceptions: Map<string, ExceptionTool> = new Map();
  private fisExceptions: Map<string, FISException> = new Map();
  private auditTrails: Map<string, Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, unknown>;
  }>> = new Map();
  private notes: Map<string, Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>> = new Map();

  constructor() {
    super('/api/exceptions');
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Initialize mock exceptions
    const mockException: ExceptionTool = {
      id: 1,
      clientName: 'Test Client',
      paymentId: 'pmt_123',
      amount: 1000,
      status: 'Failed' as ExceptionToolStatus,
      errorCode: 'ERR_001',
      errorMessage: 'Payment processing timeout',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      paymentType: 'ACH' as PaymentType,
      retryCount: 0,
      priority: 'High' as ExceptionToolPriority
    };
    this.exceptions.set(mockException.id.toString(), mockException);

    // Initialize mock FIS exceptions
    const mockFISException: FISException = {
      id: '1',
      requestId: 'req_123',
      status: FISExceptionStatus.FAILED,
      errorCode: FISErrorCode.INVALID_ACCOUNT,
      errorMessage: 'Invalid account information',
      metadata: {
        paymentId: 'pmt_123',
        amount: 1000,
      },
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      retryCount: 2
    };
    this.fisExceptions.set(mockFISException.id, mockFISException);
  }

  async getExceptions(filters: ExceptionFilters): Promise<PaginatedResponse<ExceptionTool>> {
    let filtered = Array.from(this.exceptions.values());

    if (filters) {
      filtered = filtered.filter(exc => {
        const matchesStatus = !filters.status || filters.status.includes(FISExceptionStatus.FAILED,);
        
        let matchesDate = true;
        if (filters.startDate || filters.endDate) {
          const excDate = new Date(exc.timestamp);
          if (filters.startDate && excDate < new Date(filters.startDate)) matchesDate = false;
          if (filters.endDate && excDate > new Date(filters.endDate)) matchesDate = false;
        }

        return matchesStatus && matchesDate;
      });
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return {
      items,
      page,
      total,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getException(exceptionId: string): Promise<ExceptionTool> {
    const exception = this.exceptions.get(exceptionId);
    if (!exception) {
      throw new Error(`Exception not found: ${exceptionId}`);
    }
    return exception;
  }

  async updateExceptionStatus(exceptionId: string, status: ExceptionToolStatus, notes?: string): Promise<void> {
    const exception = await this.getException(exceptionId);
    const updated = {
      ...exception,
      status,
      timestamp: new Date().toISOString()
    };
    this.exceptions.set(exceptionId, updated);

    if (notes) {
      await this.addExceptionNote(exceptionId, notes, 'system');
    }
  }

  async updateExceptionPriority(exceptionId: string, priority: ExceptionToolPriority): Promise<void> {
    const exception = await this.getException(exceptionId);
    const updated = {
      ...exception,
      priority,
      timestamp: new Date().toISOString()
    };
    this.exceptions.set(exceptionId, updated);
  }

  async getFISExceptions(filters: FISExceptionFilters): Promise<PaginatedResponse<FISException>> {
    await this.delay();

    let filteredExceptions = Array.from(this.fisExceptions.values());

    if (filters.status && filters.status.length > 0) {
      filteredExceptions = filteredExceptions.filter(exception => filters.status!.includes(exception.status));
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = filteredExceptions.length;
    const start = (page - 1) * limit;
    const items = filteredExceptions.slice(start, start + limit);

    return {
      items,
      page,
      total,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getFISException(exceptionId: string): Promise<FISException> {
    const exception = this.fisExceptions.get(exceptionId);
    if (!exception) {
      throw new Error(`FIS Exception not found: ${exceptionId}`);
    }
    return exception;
  }

  async getFISExceptionHistory(exceptionId: string): Promise<FISExceptionHistory[]> {
    const exception = await this.getFISException(exceptionId);
    return [
      {
        id: uuidv4(),
        exceptionId,
        type: 'CREATE',
        details: {
          metadata: {
            errorCode: exception.errorCode,
            errorMessage: exception.errorMessage
          }
        },
        userId: 'system',
        userName: 'System',
        timestamp: exception.createdAt
      }
    ];
  }

  async getFISResponseHistory(requestId: string): Promise<FISResponseHistory[]> {
    return [
      {
        id: uuidv4(),
        requestId,
        status: FISExceptionStatus.FAILED,
        response: { error: 'Internal Server Error' },
        timestamp: new Date().toISOString(),
        retryCount: 0
      }
    ];
  }

  async retryFISException(exceptionId: string): Promise<FISRetryResult> {
    const exception = await this.getFISException(exceptionId);
    const success = Math.random() > 0.3; // 70% success rate for mock

    const updated = {
      ...exception,
      status: success ? FISExceptionStatus.RESOLVED : FISExceptionStatus.FAILED,
      retryCount: exception.retryCount + 1,
      updatedAt: new Date().toISOString()
    };
    this.fisExceptions.set(exceptionId, updated);

    return {
      success,
      message: success ? 'Retry successful' : 'Retry failed',
      newStatus: updated.status,
      retryCount: updated.retryCount,
      lastRetryAt: updated.updatedAt
    };
  }

  async requestFISRefund(exceptionId: string, request: FISRefundRequest): Promise<void> {
    const exception = await this.getFISException(exceptionId);
    const updated = {
      ...exception,
      status: FISExceptionStatus.REFUNDED,
      updatedAt: new Date().toISOString()
    };
    this.fisExceptions.set(exceptionId, updated);

    // Add to audit trail
    const auditEntry = {
      action: 'REFUND_REQUESTED',
      performedBy: 'system',
      timestamp: new Date().toISOString(),
      details: { request }
    };
    const trail = this.auditTrails.get(exceptionId) || [];
    trail.push(auditEntry);
    this.auditTrails.set(exceptionId, trail);
  }

  async getExceptionSummary(): Promise<{
    total: number;
    byStatus: Record<ExceptionToolStatus, number>;
    byPriority: Record<ExceptionToolPriority, number>;
    avgResolutionTime: number;
  }> {
    const exceptions = Array.from(this.exceptions.values());
    const total = exceptions.length;

    // Calculate status breakdown
    const byStatus = exceptions.reduce((acc, exc) => {
      acc[exc.status] = (acc[exc.status] || 0) + 1;
      return acc;
    }, {} as Record<ExceptionToolStatus, number>);

    // Calculate priority breakdown
    const byPriority = exceptions.reduce((acc, exc) => {
      acc[exc.priority] = (acc[exc.priority] || 0) + 1;
      return acc;
    }, {} as Record<ExceptionToolPriority, number>);

    // Calculate average resolution time (for resolved exceptions)
    const resolvedExceptions = exceptions.filter(exc => exc.status === 'Resolved');
    const avgResolutionTime = resolvedExceptions.length > 0
      ? resolvedExceptions.reduce((sum, exc) => {
          const resolutionTime = new Date(exc.timestamp).getTime() - new Date(exc.timestamp).getTime();
          return sum + resolutionTime;
        }, 0) / resolvedExceptions.length
      : 0;

    return {
      total,
      byStatus,
      byPriority,
      avgResolutionTime
    };
  }

  async getFISExceptionSummary(): Promise<{
    total: number;
    byStatus: Record<FISExceptionStatus, number>;
    avgRetryCount: number;
    successRate: number;
  }> {
    const exceptions = Array.from(this.fisExceptions.values());
    const total = exceptions.length;

    // Calculate status breakdown
    const byStatus = exceptions.reduce((acc, exc) => {
      acc[exc.status] = (acc[exc.status] || 0) + 1;
      return acc;
    }, {} as Record<FISExceptionStatus, number>);

    // Calculate average retry count
    const avgRetryCount = exceptions.length > 0
      ? exceptions.reduce((sum, exc) => sum + exc.retryCount, 0) / exceptions.length
      : 0;

    // Calculate success rate
    const resolvedCount = exceptions.filter(exc => exc.status === FISExceptionStatus.RESOLVED).length;
    const successRate = total > 0 ? (resolvedCount / total) * 100 : 0;

    return {
      total,
      byStatus,
      avgRetryCount,
      successRate
    };
  }

  async assignException(exceptionId: string, userId: string): Promise<void> {
    const exception = await this.getException(exceptionId);
    const updated = {
      ...exception,
      timestamp: new Date().toISOString()
    };
    this.exceptions.set(exceptionId, updated);

    // Add audit trail entry
    const auditEntry = {
      action: 'ASSIGNED',
      performedBy: userId,
      timestamp: new Date().toISOString(),
      details: { userId }
    };
    const trail = this.auditTrails.get(exceptionId) || [];
    trail.push(auditEntry);
    this.auditTrails.set(exceptionId, trail);
  }

  async bulkUpdateExceptions(
    exceptionIds: string[],
    updates: {
      status?: ExceptionToolStatus;
      priority?: ExceptionToolPriority;
    }
  ): Promise<void> {
    for (const id of exceptionIds) {
      const exception = await this.getException(id);
      const updated = {
        ...exception,
        ...updates,
        timestamp: new Date().toISOString()
      };
      this.exceptions.set(id, updated);
    }
  }

  async getExceptionAuditTrail(exceptionId: string): Promise<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, unknown>;
  }>> {
    return this.auditTrails.get(exceptionId) || [];
  }

  async addExceptionNote(exceptionId: string, note: string, userId: string): Promise<void> {
    const noteEntry = {
      id: uuidv4(),
      content: note,
      createdBy: userId,
      createdAt: new Date().toISOString()
    };
    const existingNotes = this.notes.get(exceptionId) || [];
    existingNotes.push(noteEntry);
    this.notes.set(exceptionId, existingNotes);
  }

  async getExceptionNotes(exceptionId: string): Promise<Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>> {
    return this.notes.get(exceptionId) || [];
  }
}
