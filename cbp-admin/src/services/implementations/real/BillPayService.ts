import { IBillPayService } from '../../interfaces/IBillPayService';
import {
    BillPayConfig,
    BillPayConfigUpdate,
    BillPayConfigValidation,
    Payment,
    PaymentFilters,
    PaymentHistory,
    PaymentException,
    ExceptionResolution,
    PaymentAction,
    Client,
    Payee,
    BillPayStats,
    TransactionTrend,
    Holiday,
    HolidayInput,
    NotificationTemplate,
    NotificationTemplateInput
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { api } from '../../../utils/api';

export class BillPayService implements IBillPayService {
    basePath = '/api/bill-pay';

    async getConfiguration(): Promise<BillPayConfig> {
        const response = await api.get<BillPayConfig>(`${this.basePath}/config`);
        return response.data;
    }

    async updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        const response = await api.put<BillPayConfigValidation>(
            `${this.basePath}/config`,
            config
        );
        return response.data;
    }

    async getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>> {
        const response = await api.get<PaginatedResponse<Payment>>(
            `${this.basePath}/payments`,
            { params: filters }
        );
        return response.data;
    }

    async getPayment(paymentId: string): Promise<Payment> {
        const response = await api.get<Payment>(`${this.basePath}/payments/${paymentId}`);
        return response.data;
    }

    async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
        const response = await api.post<Payment>(`${this.basePath}/payments`, payment);
        return response.data;
    }

    async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
        const response = await api.put<Payment>(
            `${this.basePath}/payments/${paymentId}`,
            payment
        );
        return response.data;
    }

    async cancelPayment(paymentId: string, reason: string): Promise<void> {
        await api.post(`${this.basePath}/payments/${paymentId}/cancel`, { reason });
    }

    async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
        const response = await api.get<PaymentHistory[]>(
            `${this.basePath}/payments/${paymentId}/history`
        );
        return response.data;
    }

    async getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>> {
        const response = await api.get<PaginatedResponse<PaymentException>>(
            `${this.basePath}/exceptions`,
            { params: filters }
        );
        return response.data;
    }

    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        await api.post(
            `${this.basePath}/exceptions/${exceptionId}/resolve`,
            resolution
        );
    }

    async getClients(): Promise<Client[]> {
        const response = await api.get<Client[]>(`${this.basePath}/clients`);
        return response.data;
    }

    async getPayees(clientId: string): Promise<Payee[]> {
        const response = await api.get<Payee[]>(
            `${this.basePath}/clients/${clientId}/payees`
        );
        return response.data;
    }

    async getStats(timeframe: 'day' | 'week' | 'month'): Promise<BillPayStats> {
        const response = await api.get<BillPayStats>(
            `${this.basePath}/stats`,
            { params: { timeframe } }
        );
        return response.data;
    }

    async getTransactionTrends(timeframe: 'day' | 'week' | 'month'): Promise<TransactionTrend[]> {
        const response = await api.get<TransactionTrend[]>(
            `${this.basePath}/trends`,
            { params: { timeframe } }
        );
        return response.data;
    }

    async getHolidays(): Promise<Holiday[]> {
        const response = await api.get<Holiday[]>(`${this.basePath}/holidays`);
        return response.data;
    }

    async addHoliday(holiday: HolidayInput): Promise<Holiday> {
        const response = await api.post<Holiday>(`${this.basePath}/holidays`, holiday);
        return response.data;
    }

    async getNotificationTemplates(): Promise<NotificationTemplate[]> {
        const response = await api.get<NotificationTemplate[]>(
            `${this.basePath}/notification-templates`
        );
        return response.data;
    }

    async updateNotificationTemplate(
        templateId: number,
        template: NotificationTemplateInput
    ): Promise<NotificationTemplate> {
        const response = await api.put<NotificationTemplate>(
            `${this.basePath}/notification-templates/${templateId}`,
            template
        );
        return response.data;
    }

    async getPaymentActions(paymentId: string): Promise<PaymentAction[]> {
        const response = await api.get<PaymentAction[]>(
            `${this.basePath}/payments/${paymentId}/actions`
        );
        return response.data;
    }
}
