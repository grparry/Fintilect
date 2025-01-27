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
    FISExceptionFilters
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { BaseService } from './BaseService';

export class ExceptionService extends BaseService implements IExceptionService {
    constructor(basePath: string = '/api/v1/exceptions') {
        super(basePath);
    }
    async getExceptions(filters?: ExceptionFilters): Promise<PaginatedResponse<ExceptionTool>> {
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
    async getFISExceptions(filters?: FISExceptionFilters): Promise<PaginatedResponse<FISException>> {
        return this.get<PaginatedResponse<FISException>>('/fis', { params: filters });
    }
    async getFISException(exceptionId: string): Promise<FISException> {
        return this.get<FISException>(`/fis/${exceptionId}`);
    }
    async getFISExceptionHistory(exceptionId: string): Promise<FISExceptionHistory[]> {
        return this.get<FISExceptionHistory[]>(`/fis/${exceptionId}/history`);
    }
    async getFISResponseHistory(requestId: string): Promise<FISResponseHistory[]> {
        return this.get<FISResponseHistory[]>(`/fis/responses/${requestId}`);
    }
    async retryFISException(exceptionId: string): Promise<FISRetryResult> {
        return this.post<FISRetryResult>(`/fis/${exceptionId}/retry`, {});
    }
    async requestFISRefund(exceptionId: string, request: FISRefundRequest): Promise<void> {
        await this.post<void>(`/fis/${exceptionId}/refund`, request);
    }
    async getExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<ExceptionToolStatus, number>;
        byPriority: Record<ExceptionToolPriority, number>;
        avgResolutionTime: number;
    }> {
        return this.get<{
            total: number;
            byStatus: Record<ExceptionToolStatus, number>;
            byPriority: Record<ExceptionToolPriority, number>;
            avgResolutionTime: number;
        }>(`/exceptions/summary`);
    }
    async getFISExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<FISExceptionStatus, number>;
        avgRetryCount: number;
        successRate: number;
    }> {
        return this.get<{
            total: number;
            byStatus: Record<FISExceptionStatus, number>;
            avgRetryCount: number;
            successRate: number;
        }>(`/fis/summary`);
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
        await this.patch<void>(`/exceptions/bulk`, { ids: exceptionIds, ...updates });
    }
    async getExceptionAuditTrail(exceptionId: string): Promise<Array<{
        action: string;
        performedBy: string;
        timestamp: string;
        details: Record<string, unknown>;
    }>> {
        return this.get<Array<{
            action: string;
            performedBy: string;
            timestamp: string;
            details: Record<string, unknown>;
        }>>(`/exceptions/${exceptionId}/audit`);
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
        return this.get<Array<{
            id: string;
            content: string;
            createdBy: string;
            createdAt: string;
        }>>(`/exceptions/${exceptionId}/notes`);
    }
}