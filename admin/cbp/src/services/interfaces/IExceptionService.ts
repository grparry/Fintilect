import { IBaseService } from './IBaseService';
import {
    Exception,
    ExceptionFilter,
    ExceptionStatus,
    UpdateExceptionRequest,
    ExceptionListResponse,
    ExceptionCorrectionType
} from '../../types/exception.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for exception management
 * Handles payment exceptions, error tracking, and resolution management
 */
export interface IExceptionService extends IBaseService {
    /**
     * Get exceptions with filtering
     * @param filters Exception filters
     * @returns List of exceptions
     */
    getExceptions(filters: ExceptionFilter): Promise<ExceptionListResponse>;

    /**
     * Get specific exception
     * @param exceptionId Exception identifier
     * @returns Exception details
     */
    getException(exceptionId: string): Promise<Exception>;

    /**
     * Update exception status
     * @param exceptionId Exception identifier
     * @param status New status
     * @param notes Optional notes about the update
     */
    updateExceptionStatus(
        exceptionId: string,
        status: ExceptionStatus,
        notes?: string
    ): Promise<void>;

    /**
     * Update exception priority
     * @param exceptionId Exception identifier
     * @param priority New priority
     */
    updateExceptionPriority(
        exceptionId: string,
        priority: string
    ): Promise<void>;

    /**
     * Get summary of exceptions
     * @returns Exception summary statistics
     */
    getExceptionSummary(): Promise<{
        totalCount: number;
        byStatus: Record<ExceptionStatus, number>;
        byCategory: Record<string, number>;
        bySeverity: Record<string, number>;
        avgResolutionTime: number;
    }>;

    /**
     * Assign exception to user
     * @param exceptionId Exception identifier
     * @param userId User identifier
     */
    assignException(exceptionId: string, userId: string): Promise<void>;

    /**
     * Bulk update exceptions
     * @param exceptionIds List of exception identifiers
     * @param updates Update data
     */
    bulkUpdateExceptions(
        exceptionIds: string[],
        updates: {
            status?: ExceptionStatus;
            priority?: string;
            assignedTo?: string;
        }
    ): Promise<void>;

    /**
     * Get audit trail for exception
     * @param exceptionId Exception identifier
     * @returns Audit trail entries
     */
    getExceptionAuditTrail(exceptionId: string): Promise<Array<{
        action: string;
        performedBy: string;
        timestamp: string;
        details: Record<string, unknown>;
    }>>;

    /**
     * Add note to exception
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
     * Get notes for exception
     * @param exceptionId Exception identifier
     * @returns Exception notes
     */
    getExceptionNotes(exceptionId: string): Promise<Array<{
        id: string;
        content: string;
        createdBy: string;
        createdAt: string;
    }>>;

    /**
     * Resolve exception
     * @param exceptionId Exception identifier
     * @param resolution Resolution details
     */
    resolveException(exceptionId: string, resolution: string): Promise<void>;

    /**
     * Update exception with correction information
     * @param exceptionId Exception identifier
     * @param correctionType Type of correction
     * @param correctionData Correction data based on the correction type
     */
    updateExceptionCorrection(
        exceptionId: string, 
        correctionType: ExceptionCorrectionType, 
        correctionData: {
            usersAccountAtPayee?: string;
            manualDescription?: string;
            fisPayeeId?: string;
            amount?: number;
            date?: string;
            notes?: string;
        }
    ): Promise<void>;
}