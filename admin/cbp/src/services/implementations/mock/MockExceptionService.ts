import { 
  Exception,
  ExceptionFilter,
  ExceptionStatus,
  ExceptionListResponse,
  UpdateExceptionRequest,
  ExceptionCorrectionType
} from '../../../types/exception.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { BaseMockService } from './BaseMockService';
import { v4 as uuidv4 } from 'uuid';

export class MockExceptionService extends BaseMockService implements IExceptionService {
  private exceptions: Map<string, Exception> = new Map();
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

  constructor(basePath: string = '/api/v1/Exception') {
    super(basePath);
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Initialize mock exceptions
    const mockException: Exception = {
      id: 1,
      payeeName: 'Test Payee',
      sponsorId: 'sponsor_123',
      sponsorName: 'Test Sponsor',
      customerId: 'cust_123',
      transactionAmount: '1000.00',
      serviceRequestNumber: 'req_123',
      serviceRequestDate: new Date().toISOString(),
      created: new Date().toISOString(),
      correctionMade: false,
      status: ExceptionStatus.PENDING
    };
    this.exceptions.set(mockException.id.toString(), mockException);

    // Initialize mock audit trail
    this.auditTrails.set(mockException.id.toString(), [
      {
        action: 'CREATED',
        performedBy: 'System',
        timestamp: new Date().toISOString(),
        details: { reason: 'Payment processing error' }
      }
    ]);

    // Initialize mock notes
    this.notes.set(mockException.id.toString(), [
      {
        id: uuidv4(),
        content: 'Initial investigation started',
        createdBy: 'System',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  async getExceptions(filters?: ExceptionFilter): Promise<ExceptionListResponse> {
    // Apply filters if provided
    let filteredExceptions = Array.from(this.exceptions.values());
    if (filters) {
      if (filters.date) {
        filteredExceptions = filteredExceptions.filter(e => 
          new Date(e.serviceRequestDate) >= new Date(filters.date!)
        );
      }
      if (filters.endDate) {
        filteredExceptions = filteredExceptions.filter(e => 
          new Date(e.serviceRequestDate) <= new Date(filters.endDate!)
        );
      }
      if (filters.sponsorIds && filters.sponsorIds.length > 0) {
        filteredExceptions = filteredExceptions.filter(e => 
          filters.sponsorIds!.includes(e.sponsorId || '')
        );
      }
      if (filters.correctionMade !== undefined) {
        filteredExceptions = filteredExceptions.filter(e => 
          e.correctionMade === filters.correctionMade
        );
      }
    }

    return {
      exceptions: filteredExceptions
    };
  }

  async getException(exceptionId: string): Promise<Exception> {
    const exception = this.exceptions.get(exceptionId);
    if (!exception) {
      throw new Error(`Exception not found: ${exceptionId}`);
    }
    return exception;
  }

  async updateExceptionStatus(
    exceptionId: string,
    status: ExceptionStatus,
    notes?: string
  ): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.status = status;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addToAuditTrail(exceptionId, {
      action: 'StatusUpdated',
      performedBy: 'system',
      timestamp: new Date().toISOString(),
      details: { status, notes }
    });
  }

  async updateExceptionPriority(
    exceptionId: string,
    priority: string
  ): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.priority = priority;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addToAuditTrail(exceptionId, {
      action: 'PriorityUpdated',
      performedBy: 'system',
      timestamp: new Date().toISOString(),
      details: { priority }
    });
  }

  async getExceptionSummary(): Promise<{
    totalCount: number;
    byStatus: Record<ExceptionStatus, number>;
    byCategory: Record<string, number>;
    bySeverity: Record<string, number>;
    avgResolutionTime: number;
  }> {
    const exceptions = Array.from(this.exceptions.values());
    const byStatus: Record<ExceptionStatus, number> = {} as Record<ExceptionStatus, number>;
    const byCategory: Record<string, number> = {} as Record<string, number>;
    const bySeverity: Record<string, number> = {} as Record<string, number>;

    exceptions.forEach(e => {
      if (e.status) {
        byStatus[e.status] = (byStatus[e.status] || 0) + 1;
      }
      // Mock category and severity data
      const mockCategory = 'PAYMENT_PROCESSING';
      const mockSeverity = 'MEDIUM';
      byCategory[mockCategory] = (byCategory[mockCategory] || 0) + 1;
      bySeverity[mockSeverity] = (bySeverity[mockSeverity] || 0) + 1;
    });

    return {
      totalCount: exceptions.length,
      byStatus,
      byCategory,
      bySeverity,
      avgResolutionTime: 120 // Mock average resolution time in minutes
    };
  }

  async assignException(exceptionId: string, userId: string): Promise<void> {
    const exception = await this.getException(exceptionId);
    // In a real implementation, we would set the assignedTo field
    // For mock purposes, we'll just update the audit trail
    this.addToAuditTrail(exceptionId, {
      action: 'ASSIGNED',
      performedBy: userId,
      timestamp: new Date().toISOString(),
      details: { assignedTo: userId }
    });
  }

  async bulkUpdateExceptions(
    exceptionIds: string[],
    updates: {
      status?: ExceptionStatus;
      priority?: string;
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
      
      // We can't set assignedTo as it's not in the type
      
      this.exceptions.set(id, exception);

      // Add to audit trail
      this.addToAuditTrail(id, {
        action: 'BulkUpdated',
        performedBy: 'system',
        timestamp: new Date().toISOString(),
        details: updates as Record<string, unknown>
      });
    }
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
    this.addToAuditTrail(exceptionId, {
      action: 'NoteAdded',
      performedBy: userId,
      timestamp: new Date().toISOString(),
      details: { noteId: noteEntry.id }
    });
  }

  async getExceptionNotes(exceptionId: string): Promise<Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>> {
    return this.notes.get(exceptionId) || [];
  }

  async getExceptionAuditTrail(exceptionId: string): Promise<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, unknown>;
  }>> {
    return this.auditTrails.get(exceptionId) || [];
  }

  async resolveException(exceptionId: string, resolution: string): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.correctionMade = true;
    exception.status = ExceptionStatus.RESOLVED;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addToAuditTrail(exceptionId, {
      action: 'RESOLVED',
      performedBy: 'User',
      timestamp: new Date().toISOString(),
      details: { resolution }
    });

    // Add resolution note
    this.addExceptionNote(exceptionId, resolution, 'User');
  }

  async updateExceptionCorrection(
    exceptionId: string, 
    correctionType: ExceptionCorrectionType, 
    correctionData: {
      usersAccountAtPayee?: string;
      manualDescription?: string;
      fisPayeeId?: string;
    }
  ): Promise<void> {
    const exception = await this.getException(exceptionId);
    exception.correctionMade = true;
    this.exceptions.set(exceptionId, exception);

    // Add to audit trail
    this.addToAuditTrail(exceptionId, {
      action: 'CORRECTION_APPLIED',
      performedBy: 'User',
      timestamp: new Date().toISOString(),
      details: { 
        correctionType,
        ...correctionData
      }
    });

    // Add correction note
    let noteContent = `Correction applied: ${ExceptionCorrectionType[correctionType]}`;
    if (correctionData.usersAccountAtPayee) {
      noteContent += ` - Account Number: ${correctionData.usersAccountAtPayee}`;
    }
    if (correctionData.manualDescription) {
      noteContent += ` - Description: ${correctionData.manualDescription}`;
    }
    if (correctionData.fisPayeeId) {
      noteContent += ` - FIS Payee ID: ${correctionData.fisPayeeId}`;
    }
    
    this.addExceptionNote(exceptionId, noteContent, 'User');
  }

  private addToAuditTrail(
    exceptionId: string,
    entry: {
      action: string;
      performedBy: string;
      timestamp: string;
      details: Record<string, unknown>;
    }
  ): void {
    const existingAudit = this.auditTrails.get(exceptionId) || [];
    existingAudit.push(entry);
    this.auditTrails.set(exceptionId, existingAudit);
  }
}