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
  ExceptionToolFilters,
  FISExceptionFilters,
  FISErrorCode,
  ExceptionResolution,
  FISExceptionStats,
} from '../../../types/bill-pay.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { PaymentMethod, PaymentStatus } from '../../../types/payment.types';
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
  constructor(basePath: string = '/api/v1/exceptions') {
    super(basePath);
    this.initializeMockData();
  }
  private initializeMockData(): void {
    // Initialize mock exceptions
    const mockException: ExceptionTool = {
      id: '1',
      clientName: 'Test Client',
      paymentId: 'pmt_123',
      amount: 1000,
      status: 'Failed' as ExceptionToolStatus,
      errorCode: 'ERR_001',
      errorMessage: 'Payment processing timeout',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      paymentType: PaymentMethod.ACH,
      retryCount: 0,
      priority: 'High' as ExceptionToolPriority
    };
    this.exceptions.set(mockException.id, mockException);

    // Initialize mock FIS exception
    const mockFisException: FISException = {
      id: '1',
      requestId: 'req_123',
      status: FISExceptionStatus.FAILED,
      errorCode: FISErrorCode.TECHNICAL_ERROR,
      errorMessage: 'Technical error occurred',
      metadata: {},
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      retryCount: 0
    };
    this.fisExceptions.set(mockFisException.id, mockFisException);
  }
  async getExceptions(filters: ExceptionToolFilters): Promise<PaginatedResponse<ExceptionTool>> {
    let filtered = Array.from(this.exceptions.values());

    filtered = filtered.filter(exc => {
      const matchesStatus = !filters.status || exc.status === filters.status;
      const matchesPriority = !filters.priority || exc.priority === filters.priority;
      const matchesPaymentType = !filters.paymentType || exc.paymentType === filters.paymentType;
      const matchesSearch = !filters.searchTerm || 
        exc.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        exc.errorMessage.toLowerCase().includes(filters.searchTerm.toLowerCase());

      let matchesDate = true;
      if (filters.startDate || filters.endDate) {
        const excDate = new Date(exc.timestamp);
        if (filters.startDate && excDate < new Date(filters.startDate)) matchesDate = false;
        if (filters.endDate && excDate > new Date(filters.endDate)) matchesDate = false;
      }

      return matchesStatus && matchesPriority && matchesPaymentType && matchesSearch && matchesDate;
    });

    // Handle pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      items: filtered.slice(start, end),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
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
      // Add to audit trail
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
  async getFISExceptions(filters?: FISExceptionFilters): Promise<FISException[]> {
    let filtered = Array.from(this.fisExceptions.values());
    if (filters?.requestId) {
      filtered = filtered.filter(exc => exc.requestId === filters.requestId);
    }
    return filtered;
  }
  async getFISException(id: string): Promise<FISException> {
    const exception = this.fisExceptions.get(id);
    if (!exception) {
      throw new Error(`FIS Exception with id ${id} not found`);
    }
    return exception;
  }
  async getFISExceptionHistory(id: string): Promise<FISExceptionHistory[]> {
    return [{
      id: uuidv4(),
      exceptionId: id,
      type: 'UPDATE',
      details: {},
      userId: 'system',
      userName: 'System',
      timestamp: new Date().toISOString()
    }];
  }
  async getExceptionStats(): Promise<Record<string, number>> {
    const exceptions = Array.from(this.exceptions.values());
    return {
      total: exceptions.length,
      pending: exceptions.filter(e => e.status === 'Pending').length,
      resolved: exceptions.filter(e => e.status === 'Resolved').length,
      failed: exceptions.filter(e => e.status === 'Failed').length
    };
  }
  async getResolutionMetrics(): Promise<{ avgResolutionTime: number; resolutionRate: number }> {
    const exceptions = Array.from(this.exceptions.values());
    const resolved = exceptions.filter(e => e.status === 'Resolved');
    return {
      avgResolutionTime: 24, // Mock 24 hour average resolution time
      resolutionRate: resolved.length / exceptions.length
    };
  }
  async addExceptionNote(exceptionId: string, note: string): Promise<void> {
    const existingNotes = this.notes.get(exceptionId) || [];
    existingNotes.push({
      id: uuidv4(),
      content: note,
      createdBy: 'system',
      createdAt: new Date().toISOString()
    });
    this.notes.set(exceptionId, existingNotes);
  }
  async bulkUpdateExceptions(
    exceptionIds: string[],
    updates: {
      status?: ExceptionToolStatus;
      priority?: ExceptionToolPriority;
      assignedTo?: string;
    }
  ): Promise<void> {
    for (const id of exceptionIds) {
      const exception = this.exceptions.get(id);
      if (exception) {
        this.exceptions.set(id, { ...exception, ...updates });
      }
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
  async getExceptionNotes(exceptionId: string): Promise<Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>> {
    return this.notes.get(exceptionId) || [];
  }
  async getExceptionSummary(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    avgResolutionTime: number;
  }> {
    const exceptions = Array.from(this.exceptions.values());
    return {
      total: exceptions.length,
      byStatus: exceptions.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byPriority: exceptions.reduce((acc, curr) => {
        acc[curr.priority] = (acc[curr.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      avgResolutionTime: 24 // Mock 24 hour average resolution time
    };
  }

  async assignException(exceptionId: string, userId: string): Promise<void> {
    const exception = this.exceptions.get(exceptionId);
    if (!exception) {
      throw new Error('Exception not found');
    }
    // Add to audit trail
    const auditEntry = {
      action: 'ASSIGN',
      performedBy: userId,
      timestamp: new Date().toISOString(),
      details: { userId }
    };
    const existingAudit = this.auditTrails.get(exceptionId) || [];
    existingAudit.push(auditEntry);
    this.auditTrails.set(exceptionId, existingAudit);
  }

  async getExceptionUpdates(exceptionId: string): Promise<Array<{
    id: string;
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, unknown>;
  }>> {
    const updates = this.auditTrails.get(exceptionId) || [];
    return updates.map(update => ({
      id: uuidv4(),
      ...update
    }));
  }

  async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
    const exception = this.exceptions.get(exceptionId);
    if (!exception) {
      throw new Error('Exception not found');
    }
    exception.status = 'Resolved' as ExceptionToolStatus;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    const auditEntry = {
      action: 'RESOLVE',
      performedBy: resolution.userId || 'system',
      timestamp: resolution.timestamp || new Date().toISOString(),
      details: { resolution }
    };
    const existingAudit = this.auditTrails.get(exceptionId) || [];
    existingAudit.push(auditEntry);
    this.auditTrails.set(exceptionId, existingAudit);
  }

  async getFISResponseHistory(requestId: string): Promise<FISResponseHistory[]> {
    return [{
      id: '1',
      requestId,
      status: FISExceptionStatus.FAILED,
      response: {},
      timestamp: new Date().toISOString(),
      retryCount: 0
    }];
  }

  async retryFISException(exceptionId: string): Promise<FISRetryResult> {
    const exception = this.fisExceptions.get(exceptionId);
    if (!exception) {
      throw new Error('FIS Exception not found');
    }
    exception.status = FISExceptionStatus.RETRYING;
    exception.retryCount++;
    this.fisExceptions.set(exceptionId, exception);
    return {
      success: true,
      message: 'Retry initiated',
      retryCount: exception.retryCount,
      lastRetryAt: new Date().toISOString(),
      newStatus: PaymentStatus.PENDING
    };
  }

  async ignoreFISException(exceptionId: string, notes: string): Promise<void> {
    const exception = this.fisExceptions.get(exceptionId);
    if (!exception) {
      throw new Error('FIS Exception not found');
    }
    exception.status = FISExceptionStatus.RESOLVED;
    exception.metadata = { ...exception.metadata, notes };
    this.fisExceptions.set(exceptionId, exception);
  }

  async bulkRetryFISExceptions(exceptionIds: string[]): Promise<FISRetryResult[]> {
    return Promise.all(exceptionIds.map(id => this.retryFISException(id)));
  }

  async bulkDeleteFISExceptions(exceptionIds: string[]): Promise<void> {
    exceptionIds.forEach(id => {
      const exception = this.fisExceptions.get(id);
      if (exception) {
        exception.status = FISExceptionStatus.RESOLVED;
        this.fisExceptions.set(id, exception);
      }
    });
  }

  async getFISExceptionStats(): Promise<FISExceptionStats> {
    const exceptions = Array.from(this.fisExceptions.values());
    return {
      total: exceptions.length,
      byStatus: exceptions.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {} as Record<FISExceptionStatus, number>),
      byType: { FIS: exceptions.length, ACH: 0, WIRE: 0 },
      byErrorCode: exceptions.reduce((acc, curr) => {
        acc[curr.errorCode] = (acc[curr.errorCode] || 0) + 1;
        return acc;
      }, {} as Record<FISErrorCode, number>),
      avgResolutionTime: 0,
      resolutionRate: exceptions.filter(e => e.status === FISExceptionStatus.RESOLVED).length / exceptions.length,
      successRate: 0,
      avgRetryCount: exceptions.reduce((acc, curr) => acc + curr.retryCount, 0) / exceptions.length
    };
  }
}