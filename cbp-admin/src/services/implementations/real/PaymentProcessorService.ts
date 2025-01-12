import { inject, injectable } from 'inversify';
import { IPaymentProcessorService } from '../../interfaces/IPaymentProcessorService';
import { ApiClient } from '../../../api/ApiClient';
import { TYPES } from '../../../types/dependency.types';
import {
    Payment,
    PaymentMethod,
    PaymentStatus,
    PaymentType,
    PaymentPriority,
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

@injectable()
export class PaymentProcessorService implements IPaymentProcessorService {
    constructor(
        @inject(TYPES.ApiClient) private readonly apiClient: ApiClient,
        @inject(TYPES.BasePath) private readonly basePath: string = '/api/v1/payment-processor'
    ) {}

    async processPayment(payment: Payment): Promise<Payment> {
        const response = await this.apiClient.post<Payment>(`${this.basePath}/payments`, payment);
        return response.data;
    }

    async processBatch(payments: Payment[]): Promise<PaginatedResponse<Payment>> {
        const response = await this.apiClient.post<PaginatedResponse<Payment>>(`${this.basePath}/batches`, { payments });
        return response.data;
    }

    async getTransaction(transactionId: string): Promise<Payment> {
        const response = await this.apiClient.get<Payment>(`${this.basePath}/payments/${transactionId}`);
        return response.data;
    }

    async searchTransactions(filters: PaymentFilters & { page?: number; limit?: number }): Promise<PaginatedResponse<Payment>> {
        const response = await this.apiClient.get<PaginatedResponse<Payment>>(`${this.basePath}/payments`, { params: filters });
        return response.data;
    }

    async getBatch(batchId: string): Promise<PaginatedResponse<Payment>> {
        const response = await this.apiClient.get<PaginatedResponse<Payment>>(`${this.basePath}/batches/${batchId}`);
        return response.data;
    }

    async getBatches(params: {
        status?: PaymentStatus[];
        dateRange?: { startDate: string; endDate: string };
        clientId?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Payment>> {
        const response = await this.apiClient.get<PaginatedResponse<Payment>>(`${this.basePath}/batches`, { params });
        return response.data;
    }

    async cancelTransaction(transactionId: string): Promise<Payment> {
        const response = await this.apiClient.post<Payment>(
            `${this.basePath}/payments/${transactionId}/cancel`,
            {}
        );
        return response.data;
    }

    async retryTransaction(transactionId: string): Promise<Payment> {
        const response = await this.apiClient.post<Payment>(
            `${this.basePath}/payments/${transactionId}/retry`,
            {}
        );
        return response.data;
    }

    async schedulePayment(payment: Payment, schedule: { effectiveDate: string }): Promise<Payment> {
        const response = await this.apiClient.post<Payment>(`${this.basePath}/payments/schedule`, {
            payment,
            schedule
        });
        return response.data;
    }

    async validatePayment(payment: Payment): Promise<{ isValid: boolean; errors: string[] }> {
        const response = await this.apiClient.post<{ isValid: boolean; errors: string[] }>(
            `${this.basePath}/payments/validate`,
            payment
        );
        return response.data;
    }

    async getPaymentReceipt(transactionId: string): Promise<{ receiptId: string; content: string }> {
        const response = await this.apiClient.get<{ receiptId: string; content: string }>(
            `${this.basePath}/payments/${transactionId}/receipt`
        );
        return response.data;
    }

    async getProcessorConfig(): Promise<{
        maxBatchSize: number;
        retryAttempts: number;
        processingDelay: number;
        supportedMethods: PaymentMethod[];
        supportedTypes: string[];
    }> {
        const response = await this.apiClient.get<{
            maxBatchSize: number;
            retryAttempts: number;
            processingDelay: number;
            supportedMethods: PaymentMethod[];
            supportedTypes: string[];
        }>(`${this.basePath}/config`);
        return response.data;
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
        const response = await this.apiClient.patch<{
            maxBatchSize: number;
            retryAttempts: number;
            processingDelay: number;
            supportedMethods: PaymentMethod[];
            supportedTypes: string[];
        }>(`${this.basePath}/config`, config);
        return response.data;
    }

    async getProcessingErrors(transactionId: string): Promise<PaymentException[]> {
        const response = await this.apiClient.get<PaymentException[]>(
            `${this.basePath}/payments/${transactionId}/errors`
        );
        return response.data;
    }

    async getTransactionSummary(params: {
        dateRange: { startDate: string; endDate: string };
        clientId?: string;
        type?: PaymentType;
    }): Promise<BillPayStats> {
        const response = await this.apiClient.get<BillPayStats>(`${this.basePath}/summary`, { params });
        return response.data;
    }

    async getProcessorMetrics(params: {
        dateRange: { startDate: string; endDate: string };
        clientId?: string;
    }): Promise<TransactionTrend[]> {
        const response = await this.apiClient.get<TransactionTrend[]>(`${this.basePath}/metrics`, { params });
        return response.data;
    }
}
