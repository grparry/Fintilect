import { IBaseService } from './IBaseService';
import {
    ExceptionTool,
    ExceptionToolStatus,
    ExceptionToolPriority,
    ExceptionToolFilters,
    ExceptionResolution,
    FISException,
    FISExceptionFilters,
    FISResponseHistory,
    FISRetryResult,
    FISExceptionStats
} from '../../types/bill-pay.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for exception management
 * Handles payment exceptions, error tracking, and resolution management
 */
export interface IExceptionService extends IBaseService {
    /**
     * Get exceptions with pagination and filtering
     * @param filters Exception filters
     * @returns Paginated list of exceptions
     */
    getExceptions(filters: ExceptionToolFilters): Promise<PaginatedResponse<ExceptionTool>>;

    /**
     * Get specific exception
     * @param exceptionId Exception identifier
     * @returns Exception details
     */
    getException(exceptionId: string): Promise<ExceptionTool>;

    /**
     * Update exception status
     * @param exceptionId Exception identifier
     * @param status New status
     * @param notes Optional notes about the update
     */
    updateExceptionStatus(
        exceptionId: string,
        status: ExceptionToolStatus,
        notes?: string
    ): Promise<void>;

    /**
     * Update exception priority
     * @param exceptionId Exception identifier
     * @param priority New priority
     */
    updateExceptionPriority(
        exceptionId: string,
        priority: ExceptionToolPriority
    ): Promise<void>;

    /**
     * Get exception summary
     * @returns Exception summary statistics
     */
    getExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<ExceptionToolStatus, number>;
        byPriority: Record<ExceptionToolPriority, number>;
        avgResolutionTime: number;
    }>;

    /**
     * Assign exception
     * @param exceptionId Exception identifier
     * @param userId User identifier
     */
    assignException(exceptionId: string, userId: string): Promise<void>;

    /**
     * Bulk update exceptions
     * @param exceptionIds List of exception identifiers
     * @param updates Updates to apply
     */
    bulkUpdateExceptions(
        exceptionIds: string[],
        updates: {
            status?: ExceptionToolStatus;
            priority?: ExceptionToolPriority;
            assignedTo?: string;
        }
    ): Promise<void>;

    /**
     * Get exception audit trail
     * @param exceptionId Exception identifier
     * @returns List of audit entries
     */
    getExceptionAuditTrail(exceptionId: string): Promise<Array<{
        action: string;
        performedBy: string;
        timestamp: string;
        details: Record<string, unknown>;
    }>>;

    /**
     * Add exception note
     * @param exceptionId Exception identifier
     * @param note Note content
     * @param userId User identifier
     */
    addExceptionNote(
        exceptionId: string,
        note: string,
        userId: string
    ): Promise<void>;

    /**
     * Get exception notes
     * @param exceptionId Exception identifier
     * @returns List of notes
     */
    getExceptionNotes(exceptionId: string): Promise<Array<{
        id: string;
        content: string;
        createdBy: string;
        createdAt: string;
    }>>;

    /**
     * Resolve a payment exception
     * @param exceptionId Exception identifier
     * @param resolution Resolution details
     */
    resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void>;

    /**
     * Get FIS exceptions with filtering
     * @param filters Exception filters
     * @returns List of FIS exceptions
     */
    getFISExceptions(filters: FISExceptionFilters): Promise<FISException[]>;

    /**
     * Get FIS exception response history
     * @param requestId Request identifier
     * @returns List of response history entries
     */
    getFISResponseHistory(requestId: string): Promise<FISResponseHistory[]>;

    /**
     * Retry a failed FIS exception
     * @param exceptionId Exception identifier
     * @returns Retry result
     */
    retryFISException(exceptionId: string): Promise<FISRetryResult>;

    /**
     * Ignore a FIS exception
     * @param exceptionId Exception identifier
     * @param notes Notes about why the exception was ignored
     */
    ignoreFISException(exceptionId: string, notes: string): Promise<void>;

    /**
     * Bulk retry FIS exceptions
     * @param exceptionIds List of exception identifiers
     * @returns List of retry results
     */
    bulkRetryFISExceptions(exceptionIds: string[]): Promise<FISRetryResult[]>;

    /**
     * Bulk delete FIS exceptions
     * @param exceptionIds List of exception identifiers
     */
    bulkDeleteFISExceptions(exceptionIds: string[]): Promise<void>;

    /**
     * Get FIS exception statistics
     * @returns Exception statistics
     */
    getFISExceptionStats(): Promise<FISExceptionStats>;
}