import { IBaseService } from './IBaseService';
import {
    PaymentTransaction,
    PaymentStatus,
    PaymentMethod,
    PaymentType,
    PaymentPriority,
    PaymentSchedule,
    TransactionBatch,
    BatchStatus,
    ProcessorConfig,
    ProcessingError,
    PaymentValidation,
    PaymentReceipt,
    TransactionSummary,
    ProcessorMetrics,
    PaginatedResponse,
    DateRange
} from '../../types/payment.types';

/**


/**
 * Interface for payment processor operations
 * Handles payment transactions, batching, and processing
 */
    /**
     * Process a single payment transaction
     * @param transaction Payment transaction to process
     * @returns Processed payment transaction
     */

    /**
     * Process multiple payment transactions as a batch
     * @param transactions List of payment transactions
     * @returns Processed batch with transaction results
     */

    /**
     * Get payment transaction by ID
     * @param transactionId Transaction identifier
     * @returns Payment transaction details
     */

    /**
     * Search payment transactions with filtering
     * @param params Search parameters
     * @returns Paginated list of transactions
     */

    /**
     * Get transaction batch by ID
     * @param batchId Batch identifier
     * @returns Transaction batch details
     */

    /**
     * Get batches with filtering
     * @param params Filter parameters
     * @returns Paginated list of batches
     */

    /**
     * Cancel a pending payment transaction
     * @param transactionId Transaction identifier
     * @returns Cancelled transaction
     */

    /**
     * Retry a failed payment transaction
     * @param transactionId Transaction identifier
     * @returns Retried transaction
     */

    /**
     * Schedule a payment for future processing
     * @param transaction Payment transaction
     * @param schedule Payment schedule details
     * @returns Scheduled payment transaction
     */

    /**
     * Validate a payment transaction before processing
     * @param transaction Payment transaction to validate
     * @returns Validation results
     */

    /**
     * Get payment receipt
     * @param transactionId Transaction identifier
     * @returns Payment receipt
     */

    /**
     * Get processor configuration
     * @returns Current processor configuration
     */

    /**
     * Update processor configuration
     * @param config Updated configuration
     * @returns Updated processor configuration
     */

    /**
     * Get processing errors for a transaction
     * @param transactionId Transaction identifier
     * @returns List of processing errors
     */

    /**
     * Get transaction summary metrics
     * @param params Filter parameters
     * @returns Transaction summary
     */

    /**
     * Get processor performance metrics
     * @param params Filter parameters
     * @returns Processor metrics
     */
