import { 
    ExceptionTool,
    ExceptionToolStatus,
    ExceptionToolPriority,
    ExceptionToolFilters,
    ExceptionResolution
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { BaseService } from './BaseService';

export class ExceptionService extends BaseService implements IExceptionService {
    constructor(basePath: string = '/api/v1/exceptions') {
        super(basePath);
    }

    async getExceptions(filters?: ExceptionToolFilters): Promise<PaginatedResponse<ExceptionTool>> {
        return this.get<PaginatedResponse<ExceptionTool>>('/exceptions', { params: filters });
    }

    async getException(exceptionId: string): Promise<ExceptionTool> {
        return this.get<ExceptionTool>(`/exceptions/${exceptionId}`);
    }

    async updateExceptionStatus(
        exceptionId: string,
        status: ExceptionToolStatus,
        notes?: string
    ): Promise<void> {
        await this.patch<void>(`/exceptions/${exceptionId}/status`, { status, notes });
    }

    async updateExceptionPriority(
        exceptionId: string,
        priority: ExceptionToolPriority
    ): Promise<void> {
        await this.patch<void>(`/exceptions/${exceptionId}/priority`, { priority });
    }

    async getExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<ExceptionToolStatus, number>;
        byPriority: Record<ExceptionToolPriority, number>;
        avgResolutionTime: number;
    }> {
        return this.get('/exceptions/summary');
    }

    async assignException(exceptionId: string, userId: string): Promise<void> {
        await this.post<void>(`/exceptions/${exceptionId}/assign`, { userId });
    }

    async bulkUpdateExceptions(
        exceptionIds: string[],
        updates: {
            status?: ExceptionToolStatus;
            priority?: ExceptionToolPriority;
            assignedTo?: string;
        }
    ): Promise<void> {
        await this.post<void>('/exceptions/bulk/update', { exceptionIds, updates });
    }

    async getExceptionAuditTrail(exceptionId: string): Promise<Array<{
        action: string;
        performedBy: string;
        timestamp: string;
        details: Record<string, unknown>;
    }>> {
        return this.get(`/exceptions/${exceptionId}/audit`);
    }

    async addExceptionNote(
        exceptionId: string,
        note: string,
        userId: string
    ): Promise<void> {
        await this.post<void>(`/exceptions/${exceptionId}/notes`, { note, userId });
    }

    async getExceptionNotes(exceptionId: string): Promise<Array<{
        id: string;
        content: string;
        createdBy: string;
        createdAt: string;
    }>> {
        return this.get(`/exceptions/${exceptionId}/notes`);
    }

    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        await this.post<void>(`/exceptions/${exceptionId}/resolve`, resolution);
    }
}