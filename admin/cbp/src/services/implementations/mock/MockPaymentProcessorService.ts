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
            id: transaction.id || uuidv4(),
            status: newStatus,
            updatedAt: new Date(),
            createdAt: new Date(),
            processedAt: new Date()
        };
        this.transactions.set(processedTransaction.id, processedTransaction);
        return processedTransaction;
    }
    async processBatch(transactions: PaymentTransaction[]): Promise<TransactionBatch> {
        const batchId = uuidv4();
        const batch: TransactionBatch = {
            id: batchId,
            status: BatchStatus.PROCESSING,
            totalCount: transactions.length,
            successCount: 0,
            failureCount: 0,
            transactions: [],
            createdAt: new Date(),
            completedAt: undefined
        };

        this.batches.set(batchId, batch);

        for (const transaction of transactions) {
            try {
                const processedTransaction = await this.processPayment(transaction);
                batch.transactions.push(processedTransaction);
                if (processedTransaction.status === PaymentStatus.COMPLETED) {
                    batch.successCount++;
                } else {
                    batch.failureCount++;
                }
            } catch (error) {
                batch.failureCount++;
            }
        }

        batch.status = batch.failureCount === 0 ? BatchStatus.COMPLETED : BatchStatus.PARTIALLY_COMPLETED;
        batch.completedAt = new Date();

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
        method?: PaymentMethod[];
        type?: PaymentType[];
        status?: PaymentStatus[];
        priority?: PaymentPriority[];
        dateRange?: DateRange;
        clientId?: string;
        pageSize?: number;
        pageNumber?: number;
    }): Promise<PaginatedResponse<PaymentTransaction>> {
        let filteredTransactions = Array.from(this.transactions.values());

        if (filters.method?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.method.includes(t.method));
        }

        if (filters.type?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.type.includes(t.type));
        }

        if (filters.status?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.status.includes(t.status));
        }

        if (filters.priority?.length) {
            filteredTransactions = filteredTransactions.filter(t => filters.priority.includes(t.priority));
        }

        if (filters.dateRange) {
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.createdAt);
                return date >= new Date(filters.dateRange.startDate) && date <= new Date(filters.dateRange.endDate);
            });
        }

        if (filters.clientId) {
            filteredTransactions = filteredTransactions.filter(t => t.clientId === filters.clientId);
        }

        const pageSize = filters.pageSize || 10;
        const pageNumber = filters.pageNumber || 1;
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
            filteredBatches = filteredBatches.filter(b => params.status.includes(b.status));
        }

        if (params.dateRange) {
            filteredBatches = filteredBatches.filter(b => {
                const date = new Date(b.createdAt);
                return date >= new Date(params.dateRange.startDate) && date <= new Date(params.dateRange.endDate);
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
        if (![PaymentStatus.PENDING, PaymentStatus.PROCESSING].includes(transaction.status)) {
            throw new Error('Only pending or processing transactions can be cancelled');
        }
        const cancelledTransaction: PaymentTransaction = {
            ...transaction,
            status: PaymentStatus.CANCELLED,
            updatedAt: new Date()
        };
        this.transactions.set(transactionId, cancelledTransaction);
        return cancelledTransaction;
    }
    async retryTransaction(transactionId: string): Promise<PaymentTransaction> {
        const transaction = await this.getTransaction(transactionId);
        if (transaction.status !== PaymentStatus.FAILED) {
            throw new Error('Only failed transactions can be retried');
        }
        return this.processPayment({
            ...transaction,
            status: PaymentStatus.PENDING
        });
    }
    async schedulePayment(transaction: PaymentTransaction, schedule: PaymentSchedule): Promise<PaymentTransaction> {
        const scheduledTransaction = {
            ...transaction,
            scheduledAt: new Date(schedule.willProcessDate),
            status: PaymentStatus.PENDING,
            metadata: {
                schedule: schedule
            }
        };
        return this.processPayment(scheduledTransaction);
    }
    async validatePayment(transaction: PaymentTransaction): Promise<PaymentValidation> {
        const validation: PaymentValidation = {
            isValid: true,
            requiresApproval: false,
            errors: []
        };

        if (!transaction.amount || transaction.amount <= 0) {
            validation.isValid = false;
            validation.errors.push({
                code: 'INVALID_AMOUNT',
                message: 'Amount must be greater than 0'
            });
        }

        if (transaction.scheduledAt && transaction.scheduledAt < new Date()) {
            validation.isValid = false;
            validation.errors.push({
                code: 'INVALID_SCHEDULE',
                message: 'Scheduled date is in the past'
            });
        }

        validation.isValid = validation.errors.length === 0;
        return validation;
    }
    async getPaymentReceipt(transactionId: string): Promise<PaymentReceipt> {
        const transaction = await this.getTransaction(transactionId);
        return {
            transactionId: transaction.id,
            receiptNumber: `RCPT-${transaction.id}`,
            timestamp: new Date(),
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            method: transaction.method
        };
    }
    async getProcessorConfig(): Promise<ProcessorConfig> {
        return {
            maxBatchSize: 1000,
            retryAttempts: 3,
            processingDelay: 1000,
            supportedMethods: [PaymentMethod.ACH, PaymentMethod.CARD],
            supportedTypes: [PaymentType.DEBIT, PaymentType.CREDIT],
            validationRules: {
                minAmount: 0.01,
                maxAmount: 1000000,
                requiresApproval: 50000
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
            const date = new Date(t.createdAt);
            return date >= new Date(params.dateRange.startDate) && 
                   date <= new Date(params.dateRange.endDate) &&
                   (!params.clientId || t.clientId === params.clientId) &&
                   (!params.type || t.type === params.type);
        });

        return {
            totalCount: filteredTransactions.length,
            totalAmount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
            successfulCount: filteredTransactions.filter(t => t.status === PaymentStatus.COMPLETED).length,
            failedCount: filteredTransactions.filter(t => t.status === PaymentStatus.FAILED).length,
            byMethod: this.groupTransactionsByMethod(filteredTransactions),
            byType: this.groupTransactionsByType(filteredTransactions),
            byStatus: this.groupTransactionsByStatus(filteredTransactions)
        };
    }
    async getProcessorMetrics(params: {
        dateRange: DateRange;
        clientId?: string;
    }): Promise<ProcessorMetrics> {
        const transactions = Array.from(this.transactions.values()).filter(t => {
            const date = new Date(t.createdAt);
            return date >= new Date(params.dateRange.startDate) && 
                   date <= new Date(params.dateRange.endDate) &&
                   (!params.clientId || t.clientId === params.clientId);
        });

        return {
            totalPayments: transactions.length,
            totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
            failedPayments: transactions.filter(t => t.status === PaymentStatus.FAILED).length,
            failedAmount: transactions.filter(t => t.status === PaymentStatus.FAILED)
                .reduce((sum, t) => sum + t.amount, 0),
            completedPayments: transactions.filter(t => t.status === PaymentStatus.COMPLETED).length,
            completedAmount: transactions.filter(t => t.status === PaymentStatus.COMPLETED)
                .reduce((sum, t) => sum + t.amount, 0),
            inProcessPayments: transactions.filter(t => t.status === PaymentStatus.PROCESSING).length,
            inProcessAmount: transactions.filter(t => t.status === PaymentStatus.PROCESSING)
                .reduce((sum, t) => sum + t.amount, 0),
            cancelledPayments: transactions.filter(t => t.status === PaymentStatus.CANCELLED).length,
            cancelledAmount: transactions.filter(t => t.status === PaymentStatus.CANCELLED)
                .reduce((sum, t) => sum + t.amount, 0)
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
            filteredTransactions = filteredTransactions.filter(t => params.status.includes(t.status));
        }

        if (params.method) {
            filteredTransactions = filteredTransactions.filter(t => t.method === params.method);
        }

        if (params.type) {
            filteredTransactions = filteredTransactions.filter(t => t.type === params.type);
        }

        if (params.priority) {
            filteredTransactions = filteredTransactions.filter(t => t.priority === params.priority);
        }

        if (params.dateRange) {
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.createdAt);
                return date >= new Date(params.dateRange.startDate) && date <= new Date(params.dateRange.endDate);
            });
        }

        if (params.clientId) {
            filteredTransactions = filteredTransactions.filter(t => t.clientId === params.clientId);
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
        dateRange: DateRange;
        clientId?: string;
        type?: PaymentType;
    }): PaymentTransaction[] {
        return transactions.filter(t => {
            const date = new Date(t.createdAt);
            const start = new Date(params.dateRange.startDate);
            const end = new Date(params.dateRange.endDate);
            const dateInRange = date >= start && date <= end;
            const clientMatches = !params.clientId || t.clientId === params.clientId;
            const typeMatches = !params.type || t.type === params.type;
            return dateInRange && clientMatches && typeMatches;
        });
    }
    private calculateSuccessRate(transactions: PaymentTransaction[]): number {
        const completed = transactions.filter(t => t.status === PaymentStatus.COMPLETED).length;
        return transactions.length > 0 ? (completed / transactions.length) * 100 : 0;
    }
    private calculateProcessingTimes(transactions: PaymentTransaction[]): { average: number; min: number; max: number } {
        const processedTransactions = transactions.filter(t => 
            t.status === PaymentStatus.COMPLETED || t.status === PaymentStatus.FAILED
        );
        if (processedTransactions.length === 0) {
            return { average: 0, min: 0, max: 0 };
        }
        const times = processedTransactions.map(t => {
            const start = new Date(t.createdAt).getTime();
            const end = new Date(t.processedAt || t.updatedAt).getTime();
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
        const timestamps = transactions.map(t => new Date(t.createdAt).getTime());
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
        const failedTransactions = transactions.filter(t => t.status === PaymentStatus.FAILED);
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
            const errors = this.errors.get(t.id) || [];
            errors.forEach(error => {
                if (error.code.startsWith('VAL_')) {
                    errorCounts.validation++;
                } else if (error.code.startsWith('PROC_')) {
                    errorCounts.processing++;
                } else if (error.code.startsWith('NET_')) {
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
            acc[t.method] = (acc[t.method] || 0) + 1;
            return acc;
        }, {} as Record<PaymentMethod, number>);
    }
    private groupTransactionsByType(transactions: PaymentTransaction[]): Record<PaymentType, number> {
        return transactions.reduce((acc, t) => {
            acc[t.type] = (acc[t.type] || 0) + 1;
            return acc;
        }, {} as Record<PaymentType, number>);
    }
    private groupTransactionsByStatus(transactions: PaymentTransaction[]): Record<PaymentStatus, number> {
        return transactions.reduce((acc, t) => {
            acc[t.status] = (acc[t.status] || 0) + 1;
            return acc;
        }, {} as Record<PaymentStatus, number>);
    }
}