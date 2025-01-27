import { IPaymentProcessorService } from '../../interfaces/IPaymentProcessorService';
import { PaginatedResponse } from '../../../types/common.types';
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
    DateRange,
} from '../../../types/payment.types';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';

export class PaymentProcessorService extends BaseService implements IPaymentProcessorService {
    constructor(
        basePath: string = '/api/v1/payments'
    ) {
        super(basePath);
    }
    async processPayment(transaction: PaymentTransaction): Promise<PaymentTransaction> {
        try {
            return await this.post<PaymentTransaction>('/process', transaction);
        } catch (error) {
            throw this.handleError(error, 'Failed to process payment');
        }
    }
    async processBatch(transactions: PaymentTransaction[]): Promise<TransactionBatch> {
        try {
            return await this.post<TransactionBatch>('/batches', { transactions });
        } catch (error) {
            throw this.handleError(error, 'Failed to process batch');
        }
    }
    async getTransaction(transactionId: string): Promise<PaymentTransaction> {
        try {
            return await this.get<PaymentTransaction>(`/transactions/${transactionId}`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get transaction');
        }
    }
    async searchTransactions(params: {
        status?: PaymentStatus[];
        method?: PaymentMethod;
        type?: PaymentType;
        priority?: PaymentPriority;
        dateRange?: DateRange;
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<PaymentTransaction>> {
        try {
            return await this.get<PaginatedResponse<PaymentTransaction>>('/transactions', { params });
        } catch (error) {
            throw this.handleError(error, 'Failed to search transactions');
        }
    }
    async getBatch(batchId: string): Promise<TransactionBatch> {
        try {
            return await this.get<TransactionBatch>(`/batches/${batchId}`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get batch');
        }
    }
    async getBatches(params: {
        status?: BatchStatus[];
        dateRange?: DateRange;
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<TransactionBatch>> {
        try {
            return await this.get<PaginatedResponse<TransactionBatch>>('/batches', { params });
        } catch (error) {
            throw this.handleError(error, 'Failed to get batches');
        }
    }
    async cancelTransaction(transactionId: string): Promise<PaymentTransaction> {
        try {
            return await this.post<PaymentTransaction>(`/transactions/${transactionId}/cancel`);
        } catch (error) {
            throw this.handleError(error, 'Failed to cancel transaction');
        }
    }
    async retryTransaction(transactionId: string): Promise<PaymentTransaction> {
        try {
            return await this.post<PaymentTransaction>(`/transactions/${transactionId}/retry`);
        } catch (error) {
            throw this.handleError(error, 'Failed to retry transaction');
        }
    }
    async schedulePayment(transaction: PaymentTransaction, schedule: PaymentSchedule): Promise<PaymentTransaction> {
        try {
            return await this.post<PaymentTransaction>('/schedule', { transaction, schedule });
        } catch (error) {
            throw this.handleError(error, 'Failed to schedule payment');
        }
    }
    async validatePayment(transaction: PaymentTransaction): Promise<PaymentValidation> {
        try {
            return await this.post<PaymentValidation>('/validate', transaction);
        } catch (error) {
            throw this.handleError(error, 'Failed to validate payment');
        }
    }
    async getPaymentReceipt(transactionId: string): Promise<PaymentReceipt> {
        try {
            return await this.get<PaymentReceipt>(`/transactions/${transactionId}/receipt`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get payment receipt');
        }
    }
    async getProcessorConfig(): Promise<ProcessorConfig> {
        try {
            return await this.get<ProcessorConfig>('/config');
        } catch (error) {
            throw this.handleError(error, 'Failed to get processor config');
        }
    }
    async updateProcessorConfig(config: Partial<ProcessorConfig>): Promise<ProcessorConfig> {
        try {
            return await this.put<ProcessorConfig>('/config', config);
        } catch (error) {
            throw this.handleError(error, 'Failed to update processor config');
        }
    }
    async getProcessingErrors(transactionId: string): Promise<ProcessingError[]> {
        try {
            return await this.get<ProcessingError[]>(`/transactions/${transactionId}/errors`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get processing errors');
        }
    }
    async getTransactionSummary(params: {
        dateRange: DateRange;
        clientId?: string;
        type?: PaymentType;
    }): Promise<TransactionSummary> {
        try {
            return await this.get<TransactionSummary>('/transactions/summary', { params });
        } catch (error) {
            throw this.handleError(error, 'Failed to get transaction summary');
        }
    }
    async getProcessorMetrics(params: {
        dateRange: DateRange;
        clientId?: string;
    }): Promise<ProcessorMetrics> {
        try {
            return await this.get<ProcessorMetrics>('/metrics', { params });
        } catch (error) {
            throw this.handleError(error, 'Failed to get processor metrics');
        }
    }
    protected handleError(error: unknown, defaultMessage: string = 'Payment processor error'): Error {
        if (error instanceof Error) {
            return error;
        }
        logger.error(`${defaultMessage}: ${error instanceof Error ? error.message : String(error)}`);
        return new Error(defaultMessage);
    }
}