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
 * Interface for payment processor operations
 * Handles payment transactions, batching, and processing
 */
export interface IPaymentProcessorService extends IBaseService {
    /**
     * Process a single payment transaction
     * @param transaction Payment transaction to process
     * @returns Processed payment transaction
     */
    processPayment(transaction: PaymentTransaction): Promise<PaymentTransaction>;

    /**
     * Process multiple payment transactions as a batch
     * @param transactions List of payment transactions
     * @returns Processed batch with transaction results
     */
    processBatch(transactions: PaymentTransaction[]): Promise<TransactionBatch>;

    /**
     * Get payment transaction by ID
     * @param transactionId Transaction identifier
     * @returns Payment transaction details
     */
    getTransaction(transactionId: string): Promise<PaymentTransaction>;

    /**
     * Search payment transactions with filtering
     * @param params Search parameters
     * @returns Paginated list of transactions
     */
    searchTransactions(params: {
        status?: PaymentStatus[];
        method?: PaymentMethod;
        type?: PaymentType;
        priority?: PaymentPriority;
        dateRange?: DateRange;
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<PaymentTransaction>>;

    /**
     * Get transaction batch by ID
     * @param batchId Batch identifier
     * @returns Transaction batch details
     */
    getBatch(batchId: string): Promise<TransactionBatch>;

    /**
     * Get batches with filtering
     * @param params Filter parameters
     * @returns Paginated list of batches
     */
    getBatches(params: {
        status?: BatchStatus[];
        dateRange?: DateRange;
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<TransactionBatch>>;

    /**
     * Cancel a pending payment transaction
     * @param transactionId Transaction identifier
     * @returns Cancelled transaction
     */
    cancelTransaction(transactionId: string): Promise<PaymentTransaction>;

    /**
     * Retry a failed payment transaction
     * @param transactionId Transaction identifier
     * @returns Retried transaction
     */
    retryTransaction(transactionId: string): Promise<PaymentTransaction>;

    /**
     * Schedule a payment for future processing
     * @param transaction Payment transaction
     * @param schedule Payment schedule details
     * @returns Scheduled payment transaction
     */
    schedulePayment(transaction: PaymentTransaction, schedule: PaymentSchedule): Promise<PaymentTransaction>;

    /**
     * Validate a payment transaction before processing
     * @param transaction Payment transaction to validate
     * @returns Validation results
     */
    validatePayment(transaction: PaymentTransaction): Promise<PaymentValidation>;

    /**
     * Get payment receipt
     * @param transactionId Transaction identifier
     * @returns Payment receipt
     */
    getPaymentReceipt(transactionId: string): Promise<PaymentReceipt>;

    /**
     * Get processor configuration
     * @returns Current processor configuration
     */
    getProcessorConfig(): Promise<ProcessorConfig>;

    /**
     * Update processor configuration
     * @param config Updated configuration
     * @returns Updated processor configuration
     */
    updateProcessorConfig(config: Partial<ProcessorConfig>): Promise<ProcessorConfig>;

    /**
     * Get processing errors for a transaction
     * @param transactionId Transaction identifier
     * @returns List of processing errors
     */
    getProcessingErrors(transactionId: string): Promise<ProcessingError[]>;

    /**
     * Get transaction summary metrics
     * @param params Filter parameters
     * @returns Transaction summary
     */
    getTransactionSummary(params: {
        dateRange: DateRange;
        clientId?: string;
        type?: PaymentType;
    }): Promise<TransactionSummary>;

    /**
     * Get processor performance metrics
     * @param params Filter parameters
     * @returns Processor metrics
     */
    getProcessorMetrics(params: {
        dateRange: DateRange;
        clientId?: string;
    }): Promise<ProcessorMetrics>;
}
