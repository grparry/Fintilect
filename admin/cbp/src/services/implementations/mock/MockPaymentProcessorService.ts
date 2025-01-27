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
        const processedTransaction: PaymentTransaction = {
            ...transaction,
            id: transaction.id || uuidv4(),
            status: this.simulateProcessingResult(),
            updatedAt: new Date(),
            createdAt: transaction.createdAt || new Date(),
            processedAt: new Date()
        };
        this.transactions.set(processedTransaction.id, processedTransaction);
        return processedTransaction;
    }
    async processBatch(transactions: PaymentTransaction[]): Promise<TransactionBatch> {
        const batchId = uuidv4();
        const processedTransactions = await Promise.all(
            transactions.map(t => this.processPayment(t))
        );
        const batch: TransactionBatch = {
            id: batchId,
            transactions: processedTransactions,
            status: BatchStatus.COMPLETED,
            createdAt: new Date(),
            totalCount: processedTransactions.length,
            successCount: processedTransactions.filter(t => t.status === PaymentStatus.COMPLETED).length,
            failureCount: processedTransactions.filter(t => t.status === PaymentStatus.FAILED).length
        };
        this.batches.set(batchId, batch);
        return batch;
    }
    async getTransaction(transactionId: string): Promise<PaymentTransaction> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction) {
            throw new Error(`Transaction not found: ${transactionId}`);
        }
        return transaction;
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
        const { page = 1, limit = 10 } = params;
        let filteredTransactions = Array.from(this.transactions.values());
        if (params.status?.length) {
            filteredTransactions = filteredTransactions.filter(t => params.status?.includes(t.status));
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
            const start = new Date(params.dateRange.startDate);
            const end = new Date(params.dateRange.endDate);
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.createdAt);
                return date >= start && date <= end;
            });
        }
        if (params.clientId) {
            filteredTransactions = filteredTransactions.filter(t => t.clientId === params.clientId);
        }
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
        return {
            items: paginatedTransactions,
            total: filteredTransactions.length,
            page,
            limit,
            totalPages: Math.ceil(filteredTransactions.length / limit)
        };
    }
    async getBatch(batchId: string): Promise<TransactionBatch> {
        const batch = this.batches.get(batchId);
        if (!batch) {
            throw new Error(`Batch not found: ${batchId}`);
        }
        return batch;
    }
    async getBatches(params: {
        status?: BatchStatus[];
        dateRange?: DateRange;
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<TransactionBatch>> {
        const { page = 1, limit = 10 } = params;
        let filteredBatches = Array.from(this.batches.values());
        if (params.status?.length) {
            filteredBatches = filteredBatches.filter(b => params.status?.includes(b.status));
        }
        if (params.clientId) {
            filteredBatches = filteredBatches.filter(b => 
                b.transactions.some(t => t.clientId === params.clientId)
            );
        }
        if (params.dateRange) {
            const start = new Date(params.dateRange.startDate);
            const end = new Date(params.dateRange.endDate);
            filteredBatches = filteredBatches.filter(b => {
                const date = new Date(b.createdAt);
                return date >= start && date <= end;
            });
        }
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedBatches = filteredBatches.slice(startIndex, endIndex);
        return {
            items: paginatedBatches,
            total: filteredBatches.length,
            page,
            limit,
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
        const scheduledTransaction: PaymentTransaction = {
            ...transaction,
            id: transaction.id || uuidv4(),
            status: PaymentStatus.SCHEDULED,
            createdAt: new Date(),
            updatedAt: new Date(),
            scheduledAt: schedule.scheduledDate
        };
        this.transactions.set(scheduledTransaction.id, scheduledTransaction);
        return scheduledTransaction;
    }
    async validatePayment(transaction: PaymentTransaction): Promise<PaymentValidation> {
        const errors: ProcessingError[] = [];
        if (!transaction.amount || transaction.amount <= 0) {
            errors.push({
                code: 'INVALID_AMOUNT',
                message: 'Invalid amount',
                timestamp: new Date()
            });
        }
        if (!transaction.clientId) {
            errors.push({
                code: 'MISSING_CLIENT',
                message: 'Client ID is required',
                timestamp: new Date()
            });
        }
        if (!transaction.method) {
            errors.push({
                code: 'MISSING_METHOD',
                message: 'Payment method is required',
                timestamp: new Date()
            });
        }
        return {
            isValid: errors.length === 0,
            errors: errors.map(e => ({ code: e.code, message: e.message })),
            requiresApproval: false
        };
    }
    async getPaymentReceipt(transactionId: string): Promise<PaymentReceipt> {
        const transaction = await this.getTransaction(transactionId);
        return {
            transactionId,
            receiptNumber: `RCPT-${transactionId}`,
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
            supportedMethods: [PaymentMethod.ACH, PaymentMethod.WIRE, PaymentMethod.CHECK],
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
        const filteredTransactions = this.filterTransactionsByParams(transactions, params);
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
        const transactions = Array.from(this.transactions.values());
        const filteredTransactions = this.filterTransactionsByParams(transactions, params);
        const processingTimes = this.calculateProcessingTimes(filteredTransactions);
        const throughputStats = this.calculateThroughput(filteredTransactions);
        const errorStats = this.calculateErrorRates(filteredTransactions);
        return {
            processingTime: {
                average: processingTimes.average,
                min: processingTimes.min,
                max: processingTimes.max
            },
            successRate: this.calculateSuccessRate(filteredTransactions),
            failureRate: 100 - this.calculateSuccessRate(filteredTransactions),
            throughput: {
                daily: throughputStats.daily,
                hourly: throughputStats.hourly
            },
            errorRates: {
                validation: errorStats.validation || 0,
                processing: errorStats.processing || 0,
                network: errorStats.network || 0
            }
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
            const start = t.createdAt.getTime();
            const end = (t.processedAt || t.updatedAt).getTime();
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
        const timestamps = transactions.map(t => t.createdAt.getTime());
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