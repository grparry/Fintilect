import { IBaseService } from './IBaseService';
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
} from '../../types/bill-pay.types';
import { PaginatedResponse } from '../../types/common.types';

/**


/**
 * Interface for exception management
 * Handles payment exceptions, error tracking, and resolution management
 */
    /**
     * Get exceptions with pagination and filtering
     * @param filters Exception filters
     * @returns Paginated list of exceptions
     */

    /**
     * Get specific exception
     * @param exceptionId Exception identifier
     * @returns Exception details
     */

    /**
     * Update exception status
     * @param exceptionId Exception identifier
     * @param status New status
     * @param notes Optional notes about the update
     */
    ): Promise<void>;

    /**
     * Update exception priority
     * @param exceptionId Exception identifier
     * @param priority New priority
     */
    ): Promise<void>;

    /**
     * Get FIS exceptions with pagination and filtering
     * @param filters FIS exception filters
     * @returns Paginated list of FIS exceptions
     */

    /**
     * Get specific FIS exception
     * @param exceptionId FIS exception identifier
     * @returns FIS exception details
     */

    /**
     * Get FIS exception history
     * @param exceptionId FIS exception identifier
     * @returns List of exception history entries
     */

    /**
     * Get FIS response history
     * @param requestId Request identifier
     * @returns List of response history entries
     */

    /**
     * Retry FIS exception
     * @param exceptionId Exception identifier
     * @returns Retry result
     */

    /**
     * Request refund for FIS exception
     * @param exceptionId Exception identifier
     * @param request Refund request details
     */

    /**
     * Get exception summary
     * @returns Exception summary statistics
     */

    /**
     * Get FIS exception summary
     * @returns FIS exception summary statistics
     */

    /**
     * Assign exception
     * @param exceptionId Exception identifier
     * @param userId User identifier
     */

    /**
     * Bulk update exceptions
     * @param exceptionIds List of exception identifiers
     * @param updates Updates to apply
     */
    ): Promise<void>;

    /**
     * Get exception audit trail
     * @param exceptionId Exception identifier
     * @returns List of audit entries
     */

    /**
     * Add exception note
     * @param exceptionId Exception identifier
     * @param note Note content
     * @param userId User identifier
     */
    ): Promise<void>;

    /**
     * Get exception notes
     * @param exceptionId Exception identifier
     * @returns List of notes
     */
