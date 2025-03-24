import { BaseService } from './BaseService';
import { IFISExceptionService } from '../../interfaces/IFISExceptionService';
import {
    FISException,
    FISExceptionStatus,
    FISExceptionHistory,
    FISResponseHistory,
    FISRetryResult,
    FISRefundRequest,
    FISExceptionFilters
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';

export class FISExceptionService extends BaseService implements IFISExceptionService {
    constructor(basePath: string) {
        super(basePath);
    }

    async getFISExceptions(filters: FISExceptionFilters): Promise<PaginatedResponse<FISException>> {
        return this.get<PaginatedResponse<FISException>>('/exceptions', { params: filters });
    }

    async getFISException(exceptionId: number): Promise<FISException> {
        return this.get<FISException>(`/exceptions/${exceptionId}`);
    }

    async getFISExceptionHistory(exceptionId: number): Promise<FISExceptionHistory[]> {
        return this.get<FISExceptionHistory[]>(`/exceptions/${exceptionId}/history`);
    }

    async getFISResponseHistory(serviceRequestNumber: string): Promise<FISResponseHistory[]> {
        return this.get<FISResponseHistory[]>(`/responses/${serviceRequestNumber}/history`);
    }

    async retryFISException(exceptionId: number): Promise<FISRetryResult> {
        return this.post<FISRetryResult>(`/exceptions/${exceptionId}/retry`);
    }

    async requestFISRefund(exceptionId: number, request: FISRefundRequest): Promise<void> {
        await this.post(`/exceptions/${exceptionId}/refund`, request);
    }

    async updateFISExceptionStatus(exceptionId: number, status: FISExceptionStatus): Promise<void> {
        await this.put(`/exceptions/${exceptionId}/status`, { status });
    }

    async getFISExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<FISExceptionStatus, number>;
        successRate: number;
        avgRetryCount: number;
    }> {
        return this.get('/exceptions/summary');
    }
}
