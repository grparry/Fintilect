import { IBaseService } from './IBaseService';
import {
    FISException,
    FISExceptionStatus,
    FISExceptionHistory,
    FISResponseHistory,
    FISRetryResult,
    FISRefundRequest,
    FISExceptionFilters
} from '../../types/bill-pay.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for FIS-specific exception management
 * Handles FIS payment exceptions, error tracking, and resolution management
 */
export interface IFISExceptionService extends IBaseService {
    /**
     * Get FIS exceptions with pagination and filtering
     * @param filters FIS exception filters
     * @returns Paginated list of FIS exceptions
     */
    getFISExceptions(filters: FISExceptionFilters): Promise<PaginatedResponse<FISException>>;

    /**
     * Get specific FIS exception
     * @param exceptionId FIS exception identifier
     * @returns FIS exception details
     */
    getFISException(exceptionId: string): Promise<FISException>;

    /**
     * Get FIS exception history
     * @param exceptionId FIS exception identifier
     * @returns List of exception history entries
     */
    getFISExceptionHistory(exceptionId: string): Promise<FISExceptionHistory[]>;

    /**
     * Get FIS response history
     * @param requestId Request identifier
     * @returns List of response history entries
     */
    getFISResponseHistory(requestId: string): Promise<FISResponseHistory[]>;

    /**
     * Retry FIS exception
     * @param exceptionId Exception identifier
     * @returns Retry result
     */
    retryFISException(exceptionId: string): Promise<FISRetryResult>;

    /**
     * Request refund for FIS exception
     * @param exceptionId Exception identifier
     * @param request Refund request details
     */
    requestFISRefund(exceptionId: string, request: FISRefundRequest): Promise<void>;

    /**
     * Update FIS exception status
     * @param exceptionId Exception identifier
     * @param status New status
     */
    updateFISExceptionStatus(exceptionId: string, status: FISExceptionStatus): Promise<void>;

    /**
     * Get FIS exception summary
     * @returns Exception summary statistics
     */
    getFISExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<FISExceptionStatus, number>;
        successRate: number;
        avgRetryCount: number;
    }>;
}
