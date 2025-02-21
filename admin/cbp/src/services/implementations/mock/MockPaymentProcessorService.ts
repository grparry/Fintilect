import { IPaymentProcessorService } from '../../interfaces/IPaymentProcessorService';
import { BaseMockService } from './BaseMockService';
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
    DateRange
} from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { v4 as uuidv4 } from 'uuid';

export class MockPaymentProcessorService extends BaseMockService implements IPaymentProcessorService {
    private transactions: Map<string, PaymentTransaction> = new Map();
    private batches: Map<string, TransactionBatch> = new Map();
    private errors: Map<string, ProcessingError[]> = new Map();
    constructor(
        basePath: string = '/api/v1/payment-processor'
    ) {
        super(basePath);
    }
    async processPayment(transaction: PaymentTransaction): Promise<PaymentTransaction> {
        const mockDelay = Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, mockDelay));

        const success = Math.random() > 0.2;
        const newStatus = success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;

        const processedTransaction: PaymentTransaction = {
            ...transaction,
            Id: transaction.Id || uuidv4(),
            Status: newStatus,
            UpdatedAt: new Date(),
            CreatedAt: new Date(),
            ProcessedAt: new Date()
        };
        this.transactions.set(processedTransaction.Id, processedTransaction);
        return processedTransaction;
    }
    async processBatch(transactions: PaymentTransaction[]): Promise<TransactionBatch> {
        const batchId = uuidv4();
        const batch: TransactionBatch = {
            Id: batchId,
            Status: BatchStatus.PROCESSING,
            TotalCount: transactions.length,
            SuccessCount: 0,
            FailureCount: 0,
            Transactions: [],
            CreatedAt: new Date(),
            CompletedAt: undefined
        };

        this.batches.set(batchId, batch);

        for (const transaction of transactions) {
            try {
                const processedTransaction = await this.processPayment(transaction);
                batch.Transactions.push(processedTransaction);
                if (processedTransaction.Status === PaymentStatus.COMPLETED) {
                    batch.SuccessCount++;
                } else {
                    batch.FailureCount++;
                }
            } catch (error) {
                batch.FailureCount++;
            }
        }

        batch.Status = batch.FailureCount === 0 ? BatchStatus.COMPLETED : BatchStatus.PARTIALLY_COMPLETED;
        batch.CompletedAt = new Date();

        return batch;
    }
    async getTransaction(transactionId: string): Promise<PaymentTransaction> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction) {
            throw new Error(`Transaction ${transactionId} not found`);
        }
        return transaction;
    }
    async getTransactions(filters: {
        Method?: PaymentMethod[];
        Type?: PaymentType[];
        Status?: PaymentStatus[];
        Priority?: PaymentPriority[];
        DateRange?: DateRange;
        ClientId?: string;
        PageSize?: number;
        PageNumber?: number;
    }): Promise<PaginatedResponse<PaymentTransaction>> {
        let filteredTransactions = Array.from(this.transactions.values());

        if (filters.Method?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.Method.includes(t.Method));
        }

        if (filters.Type?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.Type.includes(t.Type));
        }

        if (filters.Status?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.Status.includes(t.Status));
        }

        if (filters.Priority?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.Priority.includes(t.Priority));
        }

        if (filters.DateRange) {
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.CreatedAt);
                return date >= new Date(filters.DateRange.StartDate) && date <= new Date(filters.DateRange.EndDate);
            });
        }

        if (filters.ClientId) {
            filteredTransactions = filteredTransactions.filter(t => t.ClientId === filters.ClientId);
        }

        const pageSize = filters.PageSize || 10;
        const pageNumber = filters.PageNumber || 1;
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;

        return {
            items: filteredTransactions.slice(start, end),
            total: filteredTransactions.length,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(filteredTransactions.length / pageSize)
        };
    }
    async getBatch(batchId: string): Promise<TransactionBatch> {
        const batch = this.batches.get(batchId);
        if (!batch) {
            throw new Error(`Batch ${batchId} not found`);
        }
        return batch;
    }
    async getBatches(params: {
        status?: BatchStatus[];
        dateRange?: DateRange;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<TransactionBatch>> {
        let filteredBatches = Array.from(this.batches.values());

        if (params.status?.length) {
            filteredBatches = filteredBatches.filter(b => params.status.includes(b.Status));
        }

        if (params.dateRange) {
            filteredBatches = filteredBatches.filter(b => {
                const date = new Date(b.CreatedAt);
                return date >= new Date(params.dateRange.StartDate) && date <= new Date(params.dateRange.EndDate);
            });
        }

        const limit = params.limit || 10;
        const page = params.page || 1;
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            items: filteredBatches.slice(start, end),
            total: filteredBatches.length,
            page: page,
            limit: limit,
            totalPages: Math.ceil(filteredBatches.length / limit)
        };
    }
    async cancelTransaction(transactionId: string): Promise<PaymentTransaction> {
        const transaction = await this.getTransaction(transactionId);
        if (![PaymentStatus.PENDING, PaymentStatus.PROCESSING].includes(transaction.Status)) {
            throw new Error('Only pending or processing transactions can be cancelled');
        }
        const cancelledTransaction: PaymentTransaction = {
            ...transaction,
            Status: PaymentStatus.CANCELLED,
            UpdatedAt: new Date()
        };
        this.transactions.set(transactionId, cancelledTransaction);
        return cancelledTransaction;
    }
    async retryTransaction(transactionId: string): Promise<PaymentTransaction> {
        const transaction = await this.getTransaction(transactionId);
        if (transaction.Status !== PaymentStatus.FAILED) {
            throw new Error('Only failed transactions can be retried');
        }
        return this.processPayment({
            ...transaction,
            Status: PaymentStatus.PENDING
        });
    }
    async schedulePayment(transaction: PaymentTransaction, schedule: PaymentSchedule): Promise<PaymentTransaction> {
        const scheduledTransaction = {
            ...transaction,
            ScheduledAt: new Date(schedule.WillProcessDate),
            Status: PaymentStatus.PENDING,
            Metadata: {
                Schedule: schedule
            }
        };
        return this.processPayment(scheduledTransaction);
    }
    async validatePayment(transaction: PaymentTransaction): Promise<PaymentValidation> {
        const validation: PaymentValidation = {
            IsValid: true,
            RequiresApproval: false,
            Errors: []
        };

        if (!transaction.Amount || transaction.Amount <= 0) {
            validation.IsValid = false;
            validation.Errors.push({
                Code: 'INVALID_AMOUNT',
                Message: 'Amount must be greater than 0'
            });
        }

        if (transaction.ScheduledAt && transaction.ScheduledAt < new Date()) {
            validation.IsValid = false;
            validation.Errors.push({
                Code: 'INVALID_SCHEDULE',
                Message: 'Scheduled date is in the past'
            });
        }

        validation.IsValid = validation.Errors.length === 0;
        return validation;
    }
    async getPaymentReceipt(transactionId: string): Promise<PaymentReceipt> {
        const transaction = await this.getTransaction(transactionId);
        return {
            TransactionId: transaction.Id,
            ReceiptNumber: `RCPT-${transaction.Id}`,
            Timestamp: new Date(),
            Amount: transaction.Amount,
            Currency: transaction.Currency,
            Status: transaction.Status,
            Method: transaction.Method
        };
    }
    async getProcessorConfig(): Promise<ProcessorConfig> {
        return {
            MaxBatchSize: 1000,
            RetryAttempts: 3,
            ProcessingDelay: 1000,
            SupportedMethods: [PaymentMethod.ACH, PaymentMethod.CARD],
            SupportedTypes: [PaymentType.DEBIT, PaymentType.CREDIT],
            ValidationRules: {
                MinAmount: 0.01,
                MaxAmount: 1000000,
                RequiresApproval: 50000
            }
        };
    }
    async updateProcessorConfig(config: Partial<ProcessorConfig>): Promise<ProcessorConfig> {
        return {
            ...(await this.getProcessorConfig()),
            ...config
        };
    }
    async getProcessingErrors(transactionId: string): Promise<ProcessingError[]> {
        return this.errors.get(transactionId) || [];
    }
    async getTransactionSummary(params: {
        dateRange: DateRange;
        clientId?: string;
        type?: PaymentType;
    }): Promise<TransactionSummary> {
        const transactions = Array.from(this.transactions.values());
        const filteredTransactions = transactions.filter(t => {
            const date = new Date(t.CreatedAt);
            return date >= new Date(params.dateRange.StartDate) && 
                   date <= new Date(params.dateRange.EndDate) &&
                   (!params.clientId || t.ClientId === params.clientId) &&
                   (!params.type || t.Type === params.type);
        });

        return {
            TotalCount: filteredTransactions.length,
            TotalAmount: filteredTransactions.reduce((sum, t) => sum + t.Amount, 0),
            SuccessfulCount: filteredTransactions.filter(t => t.Status === PaymentStatus.COMPLETED).length,
            FailedCount: filteredTransactions.filter(t => t.Status === PaymentStatus.FAILED).length,
            ByMethod: this.groupTransactionsByMethod(filteredTransactions),
            ByType: this.groupTransactionsByType(filteredTransactions),
            ByStatus: this.groupTransactionsByStatus(filteredTransactions)
        };
    }
    async getProcessorMetrics(params: {
        dateRange: DateRange;
        clientId?: string;
    }): Promise<ProcessorMetrics> {
        const transactions = Array.from(this.transactions.values()).filter(t => {
            const date = new Date(t.CreatedAt);
            return date >= new Date(params.dateRange.StartDate) && 
                   date <= new Date(params.dateRange.EndDate) &&
                   (!params.clientId || t.ClientId === params.clientId);
        });

        return {
            TotalPayments: transactions.length,
            TotalAmount: transactions.reduce((sum, t) => sum + t.Amount, 0),
            FailedPayments: transactions.filter(t => t.Status === PaymentStatus.FAILED).length,
            FailedAmount: transactions.filter(t => t.Status === PaymentStatus.FAILED)
                .reduce((sum, t) => sum + t.Amount, 0),
            CompletedPayments: transactions.filter(t => t.Status === PaymentStatus.COMPLETED).length,
            CompletedAmount: transactions.filter(t => t.Status === PaymentStatus.COMPLETED)
                .reduce((sum, t) => sum + t.Amount, 0),
            InProcessPayments: transactions.filter(t => t.Status === PaymentStatus.PROCESSING).length,
            InProcessAmount: transactions.filter(t => t.Status === PaymentStatus.PROCESSING)
                .reduce((sum, t) => sum + t.Amount, 0),
            CancelledPayments: transactions.filter(t => t.Status === PaymentStatus.CANCELLED).length,
            CancelledAmount: transactions.filter(t => t.Status === PaymentStatus.CANCELLED)
                .reduce((sum, t) => sum + t.Amount, 0)
        };
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
        let filteredTransactions = Array.from(this.transactions.values());

        if (params.status?.length) {
            filteredTransactions = filteredTransactions.filter(t => params.status.includes(t.Status));
        }

        if (params.method) {
            filteredTransactions = filteredTransactions.filter(t => t.Method === params.method);
        }

        if (params.type) {
            filteredTransactions = filteredTransactions.filter(t => t.Type === params.type);
        }

        if (params.priority) {
            filteredTransactions = filteredTransactions.filter(t => t.Priority === params.priority);
        }

        if (params.dateRange) {
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.CreatedAt);
                return date >= new Date(params.dateRange.StartDate) && date <= new Date(params.dateRange.EndDate);
            });
        }

        if (params.clientId) {
            filteredTransactions = filteredTransactions.filter(t => t.ClientId === params.clientId);
        }

        const limit = params.limit || 10;
        const page = params.page || 1;
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            items: filteredTransactions.slice(start, end),
            total: filteredTransactions.length,
            page: page,
            limit: limit,
            totalPages: Math.ceil(filteredTransactions.length / limit)
        };
    }
    private simulateProcessingResult(): PaymentStatus {
        const random = Math.random();
        if (random < 0.8) return PaymentStatus.COMPLETED;
        if (random < 0.95) return PaymentStatus.FAILED;
        return PaymentStatus.PROCESSING;
    }
    private filterTransactionsByParams(transactions: PaymentTransaction[], params: {
        DateRange: DateRange;
        ClientId?: string;
        Type?: PaymentType;
    }): PaymentTransaction[] {
        return transactions.filter(t => {
            const date = new Date(t.CreatedAt);
            const start = new Date(params.DateRange.StartDate);
            const end = new Date(params.DateRange.EndDate);
            const dateInRange = date >= start && date <= end;
            const clientMatches = !params.ClientId || t.ClientId === params.ClientId;
            const typeMatches = !params.Type || t.Type === params.Type;
            return dateInRange && clientMatches && typeMatches;
        });
    }
    private calculateSuccessRate(transactions: PaymentTransaction[]): number {
        const completed = transactions.filter(t => t.Status === PaymentStatus.COMPLETED).length;
        return transactions.length > 0 ? (completed / transactions.length) * 100 : 0;
    }
    private calculateProcessingTimes(transactions: PaymentTransaction[]): { average: number; min: number; max: number } {
        const processedTransactions = transactions.filter(t => 
            t.Status === PaymentStatus.COMPLETED || t.Status === PaymentStatus.FAILED
        );
        if (processedTransactions.length === 0) {
            return { average: 0, min: 0, max: 0 };
        }
        const times = processedTransactions.map(t => {
            const start = new Date(t.CreatedAt).getTime();
            const end = new Date(t.ProcessedAt || t.UpdatedAt).getTime();
            return end - start;
        });
        return {
            average: times.reduce((sum, t) => sum + t, 0) / times.length,
            min: Math.min(...times),
            max: Math.max(...times)
        };
    }
    private calculateThroughput(transactions: PaymentTransaction[]): { daily: number; hourly: number } {
        if (transactions.length === 0) {
            return { daily: 0, hourly: 0 };
        }
        const timestamps = transactions.map(t => new Date(t.CreatedAt).getTime());
        const start = Math.min(...timestamps);
        const end = Math.max(...timestamps);
        const hours = (end - start) / (1000 * 60 * 60);
        const days = hours / 24;
        return {
            daily: days > 0 ? transactions.length / days : transactions.length,
            hourly: hours > 0 ? transactions.length / hours : transactions.length
        };
    }
    private calculateErrorRates(transactions: PaymentTransaction[]): { validation: number; processing: number; network: number } {
        const failedTransactions = transactions.filter(t => t.Status === PaymentStatus.FAILED);
        const total = transactions.length;
        if (total === 0) {
            return { validation: 0, processing: 0, network: 0 };
        }
        const errorCounts = {
            validation: 0,
            processing: 0,
            network: 0
        };
        failedTransactions.forEach(t => {
            const errors = this.errors.get(t.Id) || [];
            errors.forEach(error => {
                if (error.Code.startsWith('VAL_')) {
                    errorCounts.validation++;
                } else if (error.Code.startsWith('PROC_')) {
                    errorCounts.processing++;
                } else if (error.Code.startsWith('NET_')) {
                    errorCounts.network++;
                }
            });
        });
        return {
            validation: (errorCounts.validation / total) * 100,
            processing: (errorCounts.processing / total) * 100,
            network: (errorCounts.network / total) * 100
        };
    }
    private groupTransactionsByMethod(transactions: PaymentTransaction[]): Record<PaymentMethod, number> {
        return transactions.reduce((acc, t) => {
            acc[t.Method] = (acc[t.Method] || 0) + 1;
            return acc;
        }, {} as Record<PaymentMethod, number>);
    }
    private groupTransactionsByType(transactions: PaymentTransaction[]): Record<PaymentType, number> {
        return transactions.reduce((acc, t) => {
            acc[t.Type] = (acc[t.Type] || 0) + 1;
            return acc;
        }, {} as Record<PaymentType, number>);
    }
    private groupTransactionsByStatus(transactions: PaymentTransaction[]): Record<PaymentStatus, number> {
        return transactions.reduce((acc, t) => {
            acc[t.Status] = (acc[t.Status] || 0) + 1;
            return acc;
        }, {} as Record<PaymentStatus, number>);
    }
}