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
import {
    BillPaySecuritySettings,
    BillPaySecurityValidation,
    BillPayOTPMethod
} from '../../../types/security.types';
import { PaginatedResponse } from '../../../types/common.types';
import { QueryOptions } from '../../../types/index';
import { ApiResponse } from '../../../types/api.types';
import api from '../../api';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';

export class BillPayService extends BaseService implements IBillPayService {
    constructor(basePath: string = '/api/v1/bill-pay') {
        super(basePath);
    }
    async getConfiguration(): Promise<BillPayConfig> {
        try {
            return await this.get<BillPayConfig>('/config');
        } catch (error) {
            logger.error(`Error getting bill pay configuration: ${error}`);
            throw error;
        }
    }
    async updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        try {
            return await this.put<BillPayConfigValidation>('/config', config);
        } catch (error) {
            logger.error(`Error updating bill pay configuration: ${error}`);
            throw error;
        }
    }
    async validateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        try {
            return await this.post<BillPayConfigValidation>('/config/validate', config);
        } catch (error) {
            logger.error(`Error validating bill pay configuration: ${error}`);
            throw error;
        }
    }
    async getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>> {
        try {
            return await this.get<PaginatedResponse<Payment>>('/payments', filters);
        } catch (error) {
            logger.error(`Error getting payments: ${error}`);
            throw error;
        }
    }
    async getPayment(paymentId: string): Promise<Payment> {
        try {
            return await this.get<Payment>(`/payments/${paymentId}`);
        } catch (error) {
            logger.error(`Error getting payment: ${error}`);
            throw error;
        }
    }
    async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
        try {
            return await this.post<Payment>('/payments', payment);
        } catch (error) {
            logger.error(`Error creating payment: ${error}`);
            throw error;
        }
    }
    async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
        try {
            return await this.put<Payment>(`/payments/${paymentId}`, payment);
        } catch (error) {
            logger.error(`Error updating payment: ${error}`);
            throw error;
        }
    }
    async cancelPayment(paymentId: string, reason: string): Promise<void> {
        try {
            await this.put<void>(`/payments/${paymentId}/cancel`, { reason });
        } catch (error) {
            logger.error(`Error canceling payment: ${error}`);
            throw error;
        }
    }
    async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
        try {
            return await this.get<PaymentHistory[]>(`/payments/${paymentId}/history`);
        } catch (error) {
            logger.error(`Error getting payment history: ${error}`);
            throw error;
        }
    }
    async getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>> {
        try {
            return await this.get<PaginatedResponse<PaymentException>>('/exceptions', filters);
        } catch (error) {
            logger.error(`Error getting exceptions: ${error}`);
            throw error;
        }
    }
    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        try {
            await this.put<void>(`/exceptions/${exceptionId}/resolve`, resolution);
        } catch (error) {
            logger.error(`Error resolving exception: ${error}`);
            throw error;
        }
    }
    async getClients(): Promise<Client[]> {
        try {
            return await this.get<Client[]>('/clients');
        } catch (error) {
            logger.error(`Error getting clients: ${error}`);
            throw error;
        }
    }
    async getPayees(clientId: string): Promise<Payee[]> {
        try {
            return await this.get<Payee[]>(`/clients/${clientId}/payees`);
        } catch (error) {
            logger.error(`Error getting payees: ${error}`);
            throw error;
        }
    }
    async getStats(timeframe: 'day' | 'week' | 'month'): Promise<BillPayStats> {
        try {
            return await this.get<BillPayStats>('/stats', { timeframe });
        } catch (error) {
            logger.error(`Error getting bill pay stats: ${error}`);
            throw error;
        }
    }
    async getTransactionTrends(timeframe: 'day' | 'week' | 'month'): Promise<TransactionTrend[]> {
        try {
            return await this.get<TransactionTrend[]>('/trends', { timeframe });
        } catch (error) {
            logger.error(`Error getting transaction trends: ${error}`);
            throw error;
        }
    }
    async getHolidays(): Promise<Holiday[]> {
        try {
            return await this.get<Holiday[]>('/holidays');
        } catch (error) {
            logger.error(`Error getting holidays: ${error}`);
            throw error;
        }
    }
    async addHoliday(holiday: HolidayInput): Promise<Holiday> {
        try {
            return await this.post<Holiday>('/holidays', holiday);
        } catch (error) {
            logger.error(`Error adding holiday: ${error}`);
            throw error;
        }
    }
    async getNotificationTemplates(): Promise<NotificationTemplate[]> {
        try {
            return await this.get<NotificationTemplate[]>('/notifications/templates');
        } catch (error) {
            logger.error(`Error getting notification templates: ${error}`);
            throw error;
        }
    }
    async updateNotificationTemplate(
        templateId: number,
        template: NotificationTemplateInput
    ): Promise<NotificationTemplate> {
        try {
            return await this.put<NotificationTemplate>(`/notifications/templates/${templateId}`, template);
        } catch (error) {
            logger.error(`Error updating notification template: ${error}`);
            throw error;
        }
    }
    async getPaymentActions(paymentId: string): Promise<PaymentAction[]> {
        try {
            return await this.get<PaymentAction[]>(`/payments/${paymentId}/actions`);
        } catch (error) {
            logger.error(`Error getting payment actions: ${error}`);
            throw error;
        }
    }
    async getSecuritySettings(): Promise<BillPaySecuritySettings> {
        try {
            return await this.get<BillPaySecuritySettings>('/security/settings');
        } catch (error) {
            logger.error(`Error getting security settings: ${error}`);
            throw error;
        }
    }
    async updateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings> {
        try {
            return await this.put<BillPaySecuritySettings>('/security/settings', settings);
        } catch (error) {
            logger.error(`Error updating security settings: ${error}`);
            throw error;
        }
    }
    async validateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation> {
        try {
            return await this.post<BillPaySecurityValidation>('/security/settings/validate', settings);
        } catch (error) {
            logger.error(`Error validating security settings: ${error}`);
            throw error;
        }
    }
    async sendOTP(method: BillPayOTPMethod, destination: string): Promise<void> {
        try {
            await this.post('/security/otp/send', { method, destination });
        } catch (error) {
            logger.error(`Error sending OTP: ${error}`);
            throw error;
        }
    }
    private handleError(error: unknown, defaultMessage: string): Error {
        if (error instanceof Error) {
            return error;
        }
        if (typeof error === 'string') {
            return new Error(error);
        }
        return new Error(defaultMessage);
    }
}