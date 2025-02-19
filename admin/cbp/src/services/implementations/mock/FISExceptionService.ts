import { IFISExceptionService } from '../../interfaces/IFISExceptionService';
import {
    FISException,
    FISExceptionStatus,
    FISExceptionHistory,
    FISResponseHistory,
    FISRetryResult,
    FISRefundRequest,
    FISExceptionFilters,
    FISErrorCode
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from '../real/BaseService';

export class MockFISExceptionService extends BaseService implements IFISExceptionService {
    constructor(basePath: string) {
        super(basePath);
    }

    private mockExceptions: FISException[] = [
        {
            id: '1',
            requestId: 'REQ001',
            status: FISExceptionStatus.PENDING,
            errorCode: FISErrorCode.INVALID_ACCOUNT,
            errorMessage: 'Invalid account number provided',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            retryCount: 0
        },
        {
            id: '2',
            requestId: 'REQ002',
            status: FISExceptionStatus.FAILED,
            errorCode: FISErrorCode.TECHNICAL_ERROR,
            errorMessage: 'System error occurred',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            retryCount: 2
        }
    ];

    async getFISExceptions(filters: FISExceptionFilters): Promise<PaginatedResponse<FISException>> {
        let filtered = [...this.mockExceptions];
        
        if (filters.requestId) {
            filtered = filtered.filter(ex => ex.requestId === filters.requestId);
        }

        const limit = 10;
        const total = filtered.length;
        const totalPages = Math.ceil(total / limit);

        return {
            items: filtered.slice(0, limit),
            total,
            page: 1,
            limit,
            totalPages
        };
    }

    async getFISException(exceptionId: string): Promise<FISException> {
        const exception = this.mockExceptions.find(ex => ex.id === exceptionId);
        if (!exception) {
            throw new Error('Exception not found');
        }
        return exception;
    }

    async getFISExceptionHistory(exceptionId: string): Promise<FISExceptionHistory[]> {
        return [
            {
                id: '1',
                exceptionId,
                type: 'UPDATE',
                details: {
                    before: { status: FISExceptionStatus.PENDING },
                    after: { status: FISExceptionStatus.IN_PROGRESS }
                },
                userId: 'user1',
                userName: 'John Doe',
                timestamp: new Date().toISOString()
            }
        ];
    }

    async getFISResponseHistory(requestId: string): Promise<FISResponseHistory[]> {
        return [
            {
                id: '1',
                requestId,
                status: FISExceptionStatus.PENDING,
                response: { code: 200, message: 'Success' },
                timestamp: new Date().toISOString(),
                retryCount: 0
            }
        ];
    }

    async retryFISException(exceptionId: string): Promise<FISRetryResult> {
        const exception = await this.getFISException(exceptionId);
        return {
            success: true,
            message: 'Successfully retried',
            newStatus: FISExceptionStatus.RETRYING,
            retryCount: exception.retryCount + 1,
            lastRetryAt: new Date().toISOString()
        };
    }

    async requestFISRefund(exceptionId: string, request: FISRefundRequest): Promise<void> {
        const exception = await this.getFISException(exceptionId);
        exception.status = FISExceptionStatus.PENDING_REFUND;
    }

    async updateFISExceptionStatus(exceptionId: string, status: FISExceptionStatus): Promise<void> {
        const exception = await this.getFISException(exceptionId);
        exception.status = status;
        exception.updatedAt = new Date().toISOString();
    }

    async getFISExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<FISExceptionStatus, number>;
        successRate: number;
        avgRetryCount: number;
    }> {
        const byStatus = Object.values(FISExceptionStatus).reduce((acc, status) => {
            acc[status] = this.mockExceptions.filter(ex => ex.status === status).length;
            return acc;
        }, {} as Record<FISExceptionStatus, number>);

        const total = this.mockExceptions.length;
        const resolved = this.mockExceptions.filter(ex => ex.status === FISExceptionStatus.RESOLVED).length;
        const avgRetry = this.mockExceptions.reduce((sum, ex) => sum + ex.retryCount, 0) / total;

        return {
            total,
            byStatus,
            successRate: resolved / total,
            avgRetryCount: avgRetry
        };
    }
}
