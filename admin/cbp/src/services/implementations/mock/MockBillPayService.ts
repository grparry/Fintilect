import { IBillPayService } from '../../interfaces/IBillPayService';
import {
    Payment,
    PaymentFilters,
    PaymentHistory,
    ProcessingError,
    PaymentAction,
    PaymentException,
    PaymentExceptionAdjustment,
    PaymentExceptionCorrection,
    PaymentMethod,
    PaymentType,
    PaymentPriority,
    PaymentStatus
} from '../../../types/payment.types';
import {
    BillPayConfig,
    BillPayConfigUpdate,
    BillPayConfigValidation,
    Client,
    Payee,
    BillPayStats,
    TransactionTrend,
    Holiday,
    HolidayInput,
    NotificationTemplate,
    NotificationTemplateInput,
    ExceptionResolution,
    HolidayStatus,
    FISException,
    FISExceptionStatus
} from '../../../types/bill-pay.types';
import {
    BillPaySecuritySettings,
    BillPayOTPMethod,
    BillPaySecurityValidation
} from '../../../types/security.types';
import { PaginatedResponse } from '../../../types/common.types';
import { QueryOptions } from '../../../types/index';
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
import { BaseMockService } from './BaseMockService';

export class MockBillPayService extends BaseMockService implements IBillPayService {
    constructor(basePath: string = '/api/v1/bill-pay') {
        super(basePath);
    }
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
    private exceptions: FISException[] = [...mockExceptions];
    private holidays: Holiday[] = [...initialHolidays];
    private notificationTemplates: NotificationTemplate[] = [...mockTemplates];
    private clients: Client[] = [...mockClients];
    private payees: Payee[] = [...mockPayees];
    private paymentActions: PaymentAction[] = [...mockPaymentActions];
    private securitySettings: BillPaySecuritySettings = {
        passwordPolicy: {
            minLength: 12,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            expiryDays: 90,
            preventReuse: 5
        },
        loginPolicy: {
            maxAttempts: 3,
            lockoutDuration: 15,
            sessionTimeout: 30,
            requireMFA: true,
            allowRememberMe: false
        },
        ipWhitelist: {
            enabled: false,
            addresses: ''
        },
        otpSettings: {
            method: BillPayOTPMethod.EMAIL,
            email: 'admin@example.com',
            phone: '+1234567890'
        }
    };
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
    async getPayments(filters: PaymentFilters & QueryOptions): Promise<PaginatedResponse<Payment>> {
        let filteredPayments = [...this.payments];

        // Filter by client ID
        if (filters.ClientId) {
            filteredPayments = filteredPayments.filter(payment => 
                payment.Id === filters.ClientId
            );
        }

        // Filter by payee ID
        if (filters.PayeeId) {
            filteredPayments = filteredPayments.filter(payment => 
                payment.UserPayeeListId === filters.PayeeId
            );
        }

        // Filter by payment method
        if (filters.Method && filters.Method.length > 0) {
            filteredPayments = filteredPayments.filter(payment => 
                filters.Method!.includes(payment.PaymentMethod as PaymentMethod)
            );
        }

        // Filter by status
        if (filters.Status && filters.Status.length > 0) {
            filteredPayments = filteredPayments.filter(payment => 
                filters.Status!.includes(payment.Status as PaymentStatus)
            );
        }

        // Filter by date range
        if (filters.StartDate) {
            filteredPayments = filteredPayments.filter(payment => 
                new Date(payment.WillProcessDate) >= new Date(filters.StartDate!)
            );
        }

        if (filters.EndDate) {
            filteredPayments = filteredPayments.filter(payment => 
                new Date(payment.WillProcessDate) <= new Date(filters.EndDate!)
            );
        }

        // Apply default pagination since C# APIs don't support it
        const startIndex = 0;
        const endIndex = filteredPayments.length;
        const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

        return {
            items: paginatedPayments,
            total: filteredPayments.length,
            page: 1,
            limit: filteredPayments.length,
            totalPages: 1
        };
    }
    async getPayment(paymentId: string): Promise<Payment> {
        const payment = this.payments.find(p => p.Id === paymentId);
        if (!payment) {
            throw new Error(`Payment with ID ${paymentId} not found`);
        }
        return payment;
    }
    async createPayment(payment: Omit<Payment, 'Id'>): Promise<Payment> {
        const newPayment: Payment = {
            ...payment,
            Id: uuidv4(),
            Status: PaymentStatus.PENDING
        };
        this.payments.push(newPayment);
        return newPayment;
    }
    async updatePayment(paymentId: string, updates: Partial<Payment>): Promise<Payment> {
        const index = this.payments.findIndex(p => p.Id === paymentId);
        if (index === -1) {
            throw new Error(`Payment with ID ${paymentId} not found`);
        }

        this.payments[index] = {
            ...this.payments[index],
            ...updates,
            Status: updates.Status || this.payments[index].Status
        };

        return this.payments[index];
    }
    async cancelPayment(paymentId: string, reason: string): Promise<void> {
        const payment = await this.getPayment(paymentId);
        await this.updatePayment(paymentId, { Status: PaymentStatus.CANCELLED });

        // Add to payment history
        this.paymentHistory.push({
            Id: this.paymentHistory.length + 1,
            PaymentId: paymentId,
            UserPayeeListId: payment.UserPayeeListId,
            MemberId: payment.MemberId,
            FundingAccount: payment.FundingAccount,
            Amount: payment.Amount,
            WillProcessDate: payment.WillProcessDate,
            StatusCode: 0, // Cancelled
            Memo: reason
        });
    }
    async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
        await this.delay();
        return this.paymentHistory.filter(p => p.PaymentId === paymentId);
    }
    async getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>> {
        let filteredExceptions = [...this.exceptions].map(exception => ({
            Id: parseInt(exception.id),
            RecordType: 'EXCEPTION',
            SponsorTransactionId: exception.requestId,
            SponsorId: '',
            SponsorName: '',
            CustomerId: '',
            CustomerChangeIndicator: '',
            PrimaryCustomerFirstName: '',
            PrimaryCustomerLastName: '',
            PrimaryCustomerSsn: '',
            SecondaryCustomerFirstName: '',
            SecondaryCustomerLastName: '',
            SecondaryCustomerSsn: '',
            BusinessName: '',
            FederalTaxId: '',
            CustomerAddress1: '',
            CustomerAddress2: '',
            CustomerCity: '',
            CustomerState: '',
            CustomerZip: '',
            CustomerCountry: '',
            CustomerTelephone: '',
            InternalPayeeId: '',
            PayeeChangeIndicator: '',
            PayeeName: '',
            PayeeAttentionLine: '',
            PayeeTelephoneNumber: '',
            PayeeAddress1: '',
            PayeeAddress2: '',
            PayeeCity: '',
            PayeeState: '',
            PayeeZip: '',
            PayeeCountry: '',
            PayeeNickname: '',
            CustomerPayeeId: '',
            CustomerPayeeAccountNumber: '',
            ConfirmationNumber: '',
            TransactionAmount: '0',
            MemoLineInfo: exception.errorMessage,
            ServiceRequestNumber: exception.requestId,
            ServiceRequestDate: exception.createdAt,
            ServiceRequestTime: new Date(exception.createdAt).toLocaleTimeString()
        }));

        // Filter by date range
        if (filters.StartDate) {
            filteredExceptions = filteredExceptions.filter(e => 
                new Date(e.ServiceRequestDate) >= new Date(filters.StartDate!)
            );
        }

        if (filters.EndDate) {
            filteredExceptions = filteredExceptions.filter(e => 
                new Date(e.ServiceRequestDate) <= new Date(filters.EndDate!)
            );
        }

        // Apply default pagination since C# APIs don't support it
        const startIndex = 0;
        const endIndex = filteredExceptions.length;
        const paginatedExceptions = filteredExceptions.slice(startIndex, endIndex);

        return {
            items: paginatedExceptions,
            total: filteredExceptions.length,
            page: 1,
            limit: filteredExceptions.length,
            totalPages: 1
        };
    }
    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        const index = this.exceptions.findIndex(e => e.id === exceptionId);
        if (index === -1) {
            throw new Error(`Exception with ID ${exceptionId} not found`);
        }

        this.exceptions[index] = {
            ...this.exceptions[index],
            status: FISExceptionStatus.RESOLVED,
            errorMessage: resolution.notes || '',
            updatedAt: new Date().toISOString()
        };
    }
    async getClients(): Promise<Client[]> {
        return this.clients;
    }
    async getPayees(clientId: string): Promise<Payee[]> {
        return this.payees.filter(p => p.clientId === clientId);
    }
    async getStats(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<BillPayStats> {
        return mockDashboardStats(timeframe);
    }
    async getTransactionTrends(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<TransactionTrend[]> {
        const daysMap = {
            day: 1,
            week: 7,
            month: 30,
            quarter: 90,
            year: 365
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
            a.Details && 'PaymentId' in a.Details && a.Details.PaymentId === paymentId
        );
    }
    async getSecuritySettings(): Promise<BillPaySecuritySettings> {
        return this.securitySettings;
    }
    async updateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings> {
        this.securitySettings = { ...this.securitySettings, ...settings };
        return this.securitySettings;
    }
    async validateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation> {
        const isValid = settings.passwordPolicy.minLength >= 8 && 
                       settings.passwordPolicy.expiryDays >= 30 &&
                       settings.loginPolicy.maxAttempts >= 1 &&
                       settings.loginPolicy.lockoutDuration >= 5 &&
                       settings.loginPolicy.sessionTimeout >= 5;
        const errors: Record<string, string> = {};
        if (settings.passwordPolicy.minLength < 8) {
            errors['passwordPolicy.minLength'] = 'Minimum length must be at least 8';
        }
        if (settings.passwordPolicy.expiryDays < 30) {
            errors['passwordPolicy.expiryDays'] = 'Password must expire after at least 30 days';
        }
        if (settings.loginPolicy.maxAttempts < 1) {
            errors['loginPolicy.maxAttempts'] = 'Max login attempts must be at least 1';
        }
        if (settings.loginPolicy.lockoutDuration < 5) {
            errors['loginPolicy.lockoutDuration'] = 'Lockout duration must be at least 5 minutes';
        }
        if (settings.loginPolicy.sessionTimeout < 5) {
            errors['loginPolicy.sessionTimeout'] = 'Session timeout must be at least 5 minutes';
        }
        return {
            isValid: isValid,
            errors
        };
    }
    async sendOTP(method: BillPayOTPMethod, destination: string): Promise<void> {
        // Mock implementation - in real world this would send an actual OTP
        console.log(`Mock: Sending OTP via ${method} to ${destination}`);
    }
}