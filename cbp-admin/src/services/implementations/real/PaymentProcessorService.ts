import { inject, injectable } from 'inversify';
import { IPaymentProcessorService } from '../../interfaces/IPaymentProcessorService';
import { ApiClient } from '../../../api/ApiClient';
import { TYPES } from '../../../types/dependency.types';
import {
    PaymentTransaction,
    PaymentStatus,
    PaymentMethod,
    PaymentType,
    TransactionBatch,
    ProcessorConfig,
    ProcessingError,
    PaymentValidation,
    PaymentReceipt,
    TransactionSummary,
    ProcessorMetrics,
    DateRange
} from '../../../types/payment.types';

@injectable()
export class PaymentProcessorService implements IPaymentProcessorService {
    constructor(
        @inject(TYPES.ApiClient) private readonly apiClient: ApiClient,
        @inject(TYPES.BasePath) private readonly basePath: string = '/api/v1/payment-processor'
    ) {}

    async processPayment(transaction: PaymentTransaction): Promise<PaymentTransaction> {
        try {
            const response = await this.apiClient.post<PaymentTransaction>(`${this.basePath}/payments`, transaction);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async processBatch(transactions: PaymentTransaction[]): Promise<TransactionBatch> {
        try {
            const response = await this.apiClient.post<TransactionBatch>(`${this.basePath}/batches`, { transactions });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getTransaction(transactionId: string): Promise<PaymentTransaction> {
        try {
            const response = await this.apiClient.get<PaymentTransaction>(`${this.basePath}/payments/${transactionId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async validatePayment(transaction: PaymentTransaction): Promise<PaymentValidation> {
        try {
            const response = await this.apiClient.post<PaymentValidation>(`${this.basePath}/payments/validate`, transaction);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getPaymentReceipt(transactionId: string): Promise<PaymentReceipt> {
        try {
            const response = await this.apiClient.get<PaymentReceipt>(`${this.basePath}/payments/${transactionId}/receipt`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getProcessorConfig(): Promise<ProcessorConfig> {
        try {
            const response = await this.apiClient.get<ProcessorConfig>(`${this.basePath}/config`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateProcessorConfig(config: Partial<ProcessorConfig>): Promise<ProcessorConfig> {
        try {
            const response = await this.apiClient.patch<ProcessorConfig>(`${this.basePath}/config`, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getProcessingErrors(transactionId: string): Promise<ProcessingError[]> {
        try {
            const response = await this.apiClient.get<ProcessingError[]>(`${this.basePath}/payments/${transactionId}/errors`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getTransactionSummary(params: { dateRange: DateRange; clientId?: string; type?: PaymentType }): Promise<TransactionSummary> {
        try {
            const response = await this.apiClient.get<TransactionSummary>(`${this.basePath}/summary`, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getProcessorMetrics(params: { dateRange: DateRange; clientId?: string }): Promise<ProcessorMetrics> {
        try {
            const response = await this.apiClient.get<ProcessorMetrics>(`${this.basePath}/metrics`, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): any {
        // Handle error
    }
}
