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
    NotificationTemplateInput,
    PaymentStatus,
    ExceptionStatus
} from '../../../types/bill-pay.types';
import { PaginatedResponse, Pagination, PaginationOptions } from '../../../types/index';
import { 
    mockPayments,
    mockPendingPayments,
    mockPaymentHistory
} from './data/billpay/payments';
import { mockExceptions } from './data/billpay/exceptions';
import { mockDashboardStats, generateMockTrends } from './data/billpay/dashboard';
import { mockTemplates, initialHolidays } from './data/billpay/settings';
import { mockClients, mockPayees } from './data/billpay/clients';
import { mockPaymentActions } from './data/billpay/payments';
import { v4 as uuidv4 } from 'uuid';

export class MockBillPayService implements IBillPayService {
    basePath = '/api/bill-pay';
    private config: BillPayConfig = {
        id: 'config-1',
        cutoffTime: '16:00',
        maxDailyLimit: 1000000,
        maxTransactionLimit: 100000,
        allowWeekendProcessing: false,
        requireDualApproval: true,
        retryAttempts: 3,
        notificationEmail: 'billpay@example.com',
        enableEmailNotifications: true,
        lastUpdatedAt: new Date().toISOString(),
        lastUpdatedBy: 'admin',
        validationRules: {
            minTransactionAmount: 0.01,
            maxTransactionAmount: 100000,
            minDailyLimit: 1000,
            maxDailyLimit: 1000000,
            minRetryAttempts: 1,
            maxRetryAttempts: 5
        }
    };
    private payments: Payment[] = [...mockPayments];
    private paymentHistory: PaymentHistory[] = [...mockPaymentHistory];
    private exceptions: PaymentException[] = [...mockExceptions];
    private holidays: Holiday[] = [...initialHolidays];
    private notificationTemplates: NotificationTemplate[] = [...mockTemplates];
    private clients: Client[] = [...mockClients];
    private payees: Payee[] = [...mockPayees];
    private paymentActions: PaymentAction[] = [...mockPaymentActions];

    async getConfiguration(): Promise<BillPayConfig> {
        return this.config;
    }

    async updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        // Validate configuration
        const validation: BillPayConfigValidation = {
            valid: true,
            errors: []
        };

        if (config.maxDailyLimit > this.config.validationRules.maxDailyLimit) {
            validation.valid = false;
            validation.errors.push({
                field: 'maxDailyLimit',
                message: `Cannot exceed maximum daily limit of ${this.config.validationRules.maxDailyLimit}`
            });
        }

        if (validation.valid) {
            this.config = {
                ...this.config,
                ...config,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: 'mock-user'
            };
        }

        return validation;
    }

    async getPayments(filters: PaymentFilters & PaginationOptions): Promise<PaginatedResponse<Payment>> {
        let filteredPayments = [...this.payments];

        // Apply filters
        if (filters.clientId) {
            filteredPayments = filteredPayments.filter(p => p.clientId === filters.clientId);
        }
        if (filters.payeeId) {
            filteredPayments = filteredPayments.filter(p => p.payeeId === filters.payeeId);
        }
        if (filters.method?.length) {
            filteredPayments = filteredPayments.filter(p => filters.method!.includes(p.method));
        }
        if (filters.status?.length) {
            filteredPayments = filteredPayments.filter(p => filters.status!.includes(p.status));
        }
        if (filters.startDate) {
            filteredPayments = filteredPayments.filter(p => 
                new Date(p.effectiveDate) >= new Date(filters.startDate!)
            );
        }
        if (filters.endDate) {
            filteredPayments = filteredPayments.filter(p => 
                new Date(p.effectiveDate) <= new Date(filters.endDate!)
            );
        }

        // Apply pagination
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

        const pagination: Pagination = {
            total: filteredPayments.length,
            page,
            limit,
            pages: Math.ceil(filteredPayments.length / limit)
        };

        return {
            items: paginatedPayments,
            pagination
        };
    }

    async getPayment(paymentId: string): Promise<Payment> {
        const payment = this.payments.find(p => p.id === paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    }

    async createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
        const newPayment: Payment = {
            ...payment,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.payments.unshift(newPayment);
        return newPayment;
    }

    async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
        const index = this.payments.findIndex(p => p.id === paymentId);
        if (index === -1) {
            throw new Error('Payment not found');
        }

        this.payments[index] = {
            ...this.payments[index],
            ...payment,
            updatedAt: new Date().toISOString()
        };

        return this.payments[index];
    }

    async cancelPayment(paymentId: string, reason: string): Promise<void> {
        const index = this.payments.findIndex(p => p.id === paymentId);
        if (index === -1) {
            throw new Error('Payment not found');
        }

        this.payments[index] = {
            ...this.payments[index],
            status: PaymentStatus.CANCELLED,
            updatedAt: new Date().toISOString()
        };

        this.paymentHistory.unshift({
            paymentId,
            action: 'cancelled',
            performedBy: 'mock-user',
            timestamp: new Date().toISOString(),
            details: { reason }
        });
    }

    async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
        return this.paymentHistory.filter(h => h.paymentId === paymentId);
    }

    async getExceptions(filters: PaymentFilters & PaginationOptions): Promise<PaginatedResponse<PaymentException>> {
        let filteredExceptions = [...this.exceptions];

        // Apply filters (similar to payments)
        if (filters.startDate) {
            filteredExceptions = filteredExceptions.filter(e => 
                new Date(e.createdAt) >= new Date(filters.startDate!)
            );
        }
        if (filters.endDate) {
            filteredExceptions = filteredExceptions.filter(e => 
                new Date(e.createdAt) <= new Date(filters.endDate!)
            );
        }

        // Apply pagination
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedExceptions = filteredExceptions.slice(startIndex, endIndex);

        const pagination: Pagination = {
            total: filteredExceptions.length,
            page,
            limit,
            pages: Math.ceil(filteredExceptions.length / limit)
        };

        return {
            items: paginatedExceptions,
            pagination
        };
    }

    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        const index = this.exceptions.findIndex(e => e.id === exceptionId);
        if (index === -1) {
            throw new Error('Exception not found');
        }

        this.exceptions[index] = {
            ...this.exceptions[index],
            status: ExceptionStatus.RESOLVED,
            resolutions: [
                ...(this.exceptions[index].resolutions || []),
                {
                    ...resolution,
                    timestamp: new Date().toISOString()
                }
            ],
            updatedAt: new Date().toISOString()
        };
    }

    async getClients(): Promise<Client[]> {
        return this.clients;
    }

    async getPayees(clientId: string): Promise<Payee[]> {
        return this.payees.filter(p => p.clientId === clientId);
    }

    async getStats(timeframe: 'day' | 'week' | 'month'): Promise<BillPayStats> {
        return mockDashboardStats();
    }

    async getTransactionTrends(timeframe: 'day' | 'week' | 'month'): Promise<TransactionTrend[]> {
        const daysMap = {
            day: 1,
            week: 7,
            month: 30
        };
        return generateMockTrends(daysMap[timeframe]);
    }

    async getHolidays(): Promise<Holiday[]> {
        return this.holidays;
    }

    async addHoliday(holiday: HolidayInput): Promise<Holiday> {
        const newHoliday: Holiday = {
            ...holiday,
            id: this.holidays.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.holidays.push(newHoliday);
        return newHoliday;
    }

    async getNotificationTemplates(): Promise<NotificationTemplate[]> {
        return this.notificationTemplates;
    }

    async updateNotificationTemplate(templateId: number, template: NotificationTemplateInput): Promise<NotificationTemplate> {
        const index = this.notificationTemplates.findIndex(t => t.id === templateId);
        if (index === -1) {
            throw new Error('Template not found');
        }

        this.notificationTemplates[index] = {
            ...this.notificationTemplates[index],
            ...template,
            lastModified: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return this.notificationTemplates[index];
    }

    async getPaymentActions(paymentId: string): Promise<PaymentAction[]> {
        return this.paymentActions.filter(a => 
            a.details && 'paymentId' in a.details && a.details.paymentId === paymentId
        );
    }
}
