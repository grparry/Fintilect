import { injectable } from 'inversify';
import { IPaymentProcessorService } from '../../interfaces/IPaymentProcessorService';
import { BaseMockService } from './BaseMockService';
import { mockPayments, mockPendingPayments } from './data/processor/mockPaymentData';
import {
    Payment,
    PaymentMethod,
    PaymentStatus,
    PaymentType,
    PaymentHistory,
    PaymentException,
    ExceptionResolution,
    PaymentAction,
    PaymentFilters,
    PendingPayment,
    BillPayStats,
    TransactionTrend
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class MockPaymentProcessorService extends BaseMockService implements IPaymentProcessorService {
    private payments: Map<string, Payment> = new Map();
    private batches: Map<string, Payment[]> = new Map();
    private exceptions: Map<string, PaymentException[]> = new Map();

    constructor() {
        super('/api/v1/payment-processor');
        this.initializeMockData();
    }

    private initializeMockData(): void {
        mockPayments.forEach(payment => {
            this.payments.set(payment.id, payment);
        });
    }

    async processPayment(payment: Payment): Promise<Payment> {
        await this.delay();
        
        const processedPayment = {
            ...payment,
            id: payment.id || uuidv4(),
            status: this.simulateProcessingResult(),
            updatedAt: new Date().toISOString()
        };
        
        this.payments.set(processedPayment.id, processedPayment);
        return processedPayment;
    }

    async processBatch(payments: Payment[]): Promise<PaginatedResponse<Payment>> {
        await this.delay();
        
        const batchId = uuidv4();
        const processedPayments = await Promise.all(
            payments.map(p => this.processPayment(p))
        );
        
        this.batches.set(batchId, processedPayments);
        
        return {
            items: processedPayments,
            total: processedPayments.length,
            page: 1,
            limit: processedPayments.length,
            totalPages: 1
        };
    }

    async getTransaction(transactionId: string): Promise<Payment> {
        const payment = this.payments.get(transactionId);
        if (!payment) {
            throw new Error(`Transaction not found: ${transactionId}`);
        }
        return payment;
    }

    async searchTransactions(filters: PaymentFilters & { page?: number; limit?: number }): Promise<PaginatedResponse<Payment>> {
        const { page = 1, limit = 10 } = filters;
        let filteredPayments = Array.from(this.payments.values());

        if (filters.status?.length) {
            filteredPayments = filteredPayments.filter(p => filters.status?.includes(p.status));
        }
        if (filters.method?.length) {
            filteredPayments = filteredPayments.filter(p => filters.method?.includes(p.method));
        }
        if (filters.startDate) {
            filteredPayments = filteredPayments.filter(p => new Date(p.effectiveDate) >= new Date(filters.startDate!));
        }
        if (filters.endDate) {
            filteredPayments = filteredPayments.filter(p => new Date(p.effectiveDate) <= new Date(filters.endDate!));
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

        return {
            items: paginatedPayments,
            total: filteredPayments.length,
            page,
            limit,
            totalPages: Math.ceil(filteredPayments.length / limit)
        };
    }

    async getBatch(batchId: string): Promise<PaginatedResponse<Payment>> {
        const batch = this.batches.get(batchId);
        if (!batch) {
            throw new Error(`Batch not found: ${batchId}`);
        }
        return {
            items: batch,
            total: batch.length,
            page: 1,
            limit: batch.length,
            totalPages: 1
        };
    }

    async getBatches(params: {
        status?: PaymentStatus[];
        dateRange?: { startDate: string; endDate: string };
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Payment>> {
        const { page = 1, limit = 10 } = params;
        const allBatches = Array.from(this.batches.values()).flat();
        let filteredBatches = allBatches;

        if (params.status?.length) {
            filteredBatches = filteredBatches.filter(p => params.status?.includes(p.status));
        }
        if (params.clientId) {
            filteredBatches = filteredBatches.filter(p => p.clientId === params.clientId);
        }
        if (params.dateRange) {
            const start = new Date(params.dateRange.startDate);
            const end = new Date(params.dateRange.endDate);
            filteredBatches = filteredBatches.filter(p => {
                const date = new Date(p.effectiveDate);
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

    async cancelTransaction(transactionId: string): Promise<Payment> {
        const payment = await this.getTransaction(transactionId);
        if (![PaymentStatus.PENDING, PaymentStatus.PROCESSING].includes(payment.status)) {
            throw new Error('Only pending or processing payments can be cancelled');
        }
        
        const cancelledPayment = {
            ...payment,
            status: PaymentStatus.CANCELLED,
            updatedAt: new Date().toISOString()
        };
        
        this.payments.set(transactionId, cancelledPayment);
        return cancelledPayment;
    }

    async retryTransaction(transactionId: string): Promise<Payment> {
        const payment = await this.getTransaction(transactionId);
        if (payment.status !== PaymentStatus.FAILED) {
            throw new Error('Only failed payments can be retried');
        }
        return this.processPayment({
            ...payment,
            status: PaymentStatus.PENDING
        });
    }

    async schedulePayment(payment: Payment, schedule: { effectiveDate: string }): Promise<Payment> {
        const scheduledPayment = {
            ...payment,
            id: payment.id || uuidv4(),
            status: PaymentStatus.SCHEDULED,
            effectiveDate: schedule.effectiveDate,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.payments.set(scheduledPayment.id, scheduledPayment);
        return scheduledPayment;
    }

    async validatePayment(payment: Payment): Promise<{ isValid: boolean; errors: string[] }> {
        const errors: string[] = [];
        
        if (!payment.amount || payment.amount <= 0) {
            errors.push('Invalid amount');
        }
        if (!payment.clientId) {
            errors.push('Client ID is required');
        }
        if (!payment.payeeId) {
            errors.push('Payee ID is required');
        }
        if (!payment.method) {
            errors.push('Payment method is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    async getPaymentReceipt(transactionId: string): Promise<{ receiptId: string; content: string }> {
        const payment = await this.getTransaction(transactionId);
        return {
            receiptId: `RCPT-${transactionId}`,
            content: `Receipt for payment ${payment.id}\nAmount: ${payment.amount}\nStatus: ${payment.status}\nDate: ${payment.effectiveDate}`
        };
    }

    async getProcessorConfig(): Promise<{
        maxBatchSize: number;
        retryAttempts: number;
        processingDelay: number;
        supportedMethods: PaymentMethod[];
        supportedTypes: string[];
    }> {
        return {
            maxBatchSize: 1000,
            retryAttempts: 3,
            processingDelay: 1000,
            supportedMethods: [PaymentMethod.ACH, PaymentMethod.WIRE, PaymentMethod.CHECK],
            supportedTypes: ['DEBIT', 'CREDIT']
        };
    }

    async updateProcessorConfig(config: {
        maxBatchSize?: number;
        retryAttempts?: number;
        processingDelay?: number;
        supportedMethods?: PaymentMethod[];
        supportedTypes?: string[];
    }): Promise<{
        maxBatchSize: number;
        retryAttempts: number;
        processingDelay: number;
        supportedMethods: PaymentMethod[];
        supportedTypes: string[];
    }> {
        return {
            ...(await this.getProcessorConfig()),
            ...config
        };
    }

    async getProcessingErrors(transactionId: string): Promise<PaymentException[]> {
        return this.exceptions.get(transactionId) || [];
    }

    async getTransactionSummary(params: {
        dateRange: { startDate: string; endDate: string };
        clientId?: string;
        type?: PaymentType;
    }): Promise<BillPayStats> {
        const payments = Array.from(this.payments.values());
        const filteredPayments = this.filterPaymentsByParams(payments, params);

        return {
            totalTransactions: filteredPayments.length,
            totalAmount: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
            successRate: this.calculateSuccessRate(filteredPayments),
            averageTransactionSize: this.calculateAverageTransactionSize(filteredPayments),
            transactionsByMethod: this.groupPaymentsByMethod(filteredPayments),
            transactionsByStatus: this.groupPaymentsByStatus(filteredPayments),
            recentActivity: this.getRecentActivity(filteredPayments)
        };
    }

    async getProcessorMetrics(params: {
        dateRange: { startDate: string; endDate: string };
        clientId?: string;
    }): Promise<TransactionTrend[]> {
        const payments = Array.from(this.payments.values());
        const filteredPayments = this.filterPaymentsByParams(payments, params);
        return this.generateTransactionTrends(filteredPayments, params.dateRange);
    }

    private simulateProcessingResult(): PaymentStatus {
        const random = Math.random();
        if (random < 0.8) return PaymentStatus.COMPLETED;
        if (random < 0.95) return PaymentStatus.FAILED;
        return PaymentStatus.PROCESSING;
    }

    private filterPaymentsByParams(payments: Payment[], params: {
        dateRange: { startDate: string; endDate: string };
        clientId?: string;
        type?: PaymentType;
    }): Payment[] {
        return payments.filter(p => {
            const date = new Date(p.effectiveDate);
            const start = new Date(params.dateRange.startDate);
            const end = new Date(params.dateRange.endDate);
            const dateInRange = date >= start && date <= end;
            const clientMatches = !params.clientId || p.clientId === params.clientId;
            return dateInRange && clientMatches;
        });
    }

    private calculateSuccessRate(payments: Payment[]): number {
        const completed = payments.filter(p => p.status === PaymentStatus.COMPLETED).length;
        return payments.length > 0 ? (completed / payments.length) * 100 : 0;
    }

    private calculateAverageTransactionSize(payments: Payment[]): number {
        return payments.length > 0
            ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length
            : 0;
    }

    private groupPaymentsByMethod(payments: Payment[]): Record<PaymentMethod, number> {
        return payments.reduce((acc, p) => {
            acc[p.method] = (acc[p.method] || 0) + 1;
            return acc;
        }, {} as Record<PaymentMethod, number>);
    }

    private groupPaymentsByStatus(payments: Payment[]): Record<PaymentStatus, number> {
        return payments.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<PaymentStatus, number>);
    }

    private getRecentActivity(payments: Payment[]): Array<{
        id: string;
        amount: number;
        method: PaymentMethod;
        status: PaymentStatus;
        timestamp: string;
    }> {
        return payments
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 10)
            .map(p => ({
                id: p.id,
                amount: p.amount,
                method: p.method,
                status: p.status,
                timestamp: p.updatedAt
            }));
    }

    private generateTransactionTrends(
        payments: Payment[],
        dateRange: { startDate: string; endDate: string }
    ): TransactionTrend[] {
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        const trends: TransactionTrend[] = [];
        
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
            const date = d.toISOString().split('T')[0];
            const dayPayments = payments.filter(p => 
                p.effectiveDate.split('T')[0] === date
            );
            
            trends.push({
                date,
                amount: dayPayments.reduce((sum, p) => sum + p.amount, 0),
                count: dayPayments.length
            });
        }
        
        return trends;
    }
}
