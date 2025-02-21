import { 
  ExceptionTool,
  ExceptionToolStatus,
  ExceptionToolPriority,
  ExceptionToolFilters,
  ExceptionResolution
} from '../../../types/bill-pay.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { PaymentMethod, PaymentStatus } from '../../../types/payment.types';
import { v4 as uuidv4 } from 'uuid';

export class MockExceptionService extends BaseMockService implements IExceptionService {
  private exceptions: Map<string, ExceptionTool> = new Map();
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
      priority: 'High' as ExceptionToolPriority,
      timestamp: new Date().toISOString(),
      paymentType: 'ACH',
      retryCount: 0
    };
    this.exceptions.set(mockException.id, mockException);

    // Initialize mock audit trail
    this.auditTrails.set(mockException.id, [
      {
        action: 'Created',
        performedBy: 'system',
        timestamp: new Date().toISOString(),
        details: { reason: 'Payment failure' }
      }
    ]);

    // Initialize mock notes
    this.notes.set(mockException.id, [
      {
        id: uuidv4(),
        content: 'Initial investigation started',
        createdBy: 'system',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  async getExceptions(filters?: ExceptionToolFilters): Promise<PaginatedResponse<ExceptionTool>> {
    // Apply filters if provided
    let filteredExceptions = Array.from(this.exceptions.values());
    if (filters) {
      if (filters.status) {
        filteredExceptions = filteredExceptions.filter(e => e.status === filters.status);
      }
      if (filters.priority) {
        filteredExceptions = filteredExceptions.filter(e => e.priority === filters.priority);
      }
      // Add more filter implementations as needed
    }

    return {
      items: filteredExceptions,
      total: filteredExceptions.length,
      page: 1,
      limit: filteredExceptions.length,
      totalPages: 1
    };
  }

  async getException(exceptionId: string): Promise<ExceptionTool> {
    const exception = this.exceptions.get(exceptionId);
    if (!exception) {
      throw new Error(`Exception not found: ${exceptionId}`);
    }
    return exception;
  }

  async updateExceptionStatus(
    exceptionId: string,
    status: ExceptionToolStatus,
    notes?: string
  ): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.status = status;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addAuditEntry(exceptionId, 'StatusUpdated', 'system', { status, notes });
  }

  async updateExceptionPriority(
    exceptionId: string,
    priority: ExceptionToolPriority
  ): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.priority = priority;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addAuditEntry(exceptionId, 'PriorityUpdated', 'system', { priority });
  }

  async getExceptionSummary(): Promise<{
    total: number;
    byStatus: Record<ExceptionToolStatus, number>;
    byPriority: Record<ExceptionToolPriority, number>;
    avgResolutionTime: number;
  }> {
    const exceptions = Array.from(this.exceptions.values());
    const byStatus: Record<ExceptionToolStatus, number> = {} as Record<ExceptionToolStatus, number>;
    const byPriority: Record<ExceptionToolPriority, number> = {} as Record<ExceptionToolPriority, number>;

    exceptions.forEach(e => {
      byStatus[e.status] = (byStatus[e.status] || 0) + 1;
      byPriority[e.priority] = (byPriority[e.priority] || 0) + 1;
    });

    return {
      total: exceptions.length,
      byStatus,
      byPriority,
      avgResolutionTime: 24 * 60 * 60 * 1000 // Mock 24 hours in milliseconds
    };
  }

  async assignException(exceptionId: string, userId: string): Promise<void> {
    const exception = await this.getException(exceptionId);
    // We can't modify assignedTo since it's not in the type, but we can track it in audit
    this.addAuditEntry(exceptionId, 'Assigned', userId, { userId });
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
      const exception = await this.getException(id);
      if (updates.status) {
        exception.status = updates.status;
      }
      if (updates.priority) {
        exception.priority = updates.priority;
      }
      this.exceptions.set(id, exception);

      // Add to audit trail
      this.addAuditEntry(id, 'BulkUpdated', 'system', updates as Record<string, unknown>);
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

  async addExceptionNote(
    exceptionId: string,
    note: string,
    userId: string
  ): Promise<void> {
    const noteEntry = {
      id: uuidv4(),
      content: note,
      createdBy: userId,
      createdAt: new Date().toISOString()
    };

    const existingNotes = this.notes.get(exceptionId) || [];
    existingNotes.push(noteEntry);
    this.notes.set(exceptionId, existingNotes);

    // Add to audit trail
    this.addAuditEntry(exceptionId, 'NoteAdded', userId, { noteId: noteEntry.id });
  }

  async getExceptionNotes(exceptionId: string): Promise<Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>> {
    return this.notes.get(exceptionId) || [];
  }

  async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.status = 'Resolved' as ExceptionToolStatus;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addAuditEntry(exceptionId, 'Resolved', resolution.userId || 'system', resolution as unknown as Record<string, unknown>);
  }

  private addAuditEntry(
    exceptionId: string,
    action: string,
    performedBy: string,
    details: Record<string, unknown>
  ): void {
    const auditEntry = {
      action,
      performedBy,
      timestamp: new Date().toISOString(),
      details
    };

    const existingAudit = this.auditTrails.get(exceptionId) || [];
    existingAudit.push(auditEntry);
    this.auditTrails.set(exceptionId, existingAudit);
  }
}