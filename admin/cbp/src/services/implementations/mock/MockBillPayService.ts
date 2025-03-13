import { IBillPayService } from '../../interfaces/IBillPayService';
import {
    BillPayConfig,
    BillPayConfigUpdate,
    BillPayConfigValidation,
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
import {
    PaymentException,
    PaymentFilters
} from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { Client } from '../../../types/client.types';
import { mockExceptions } from './data/billpay/exceptions';
import { mockDashboardStats, generateMockTrends } from './data/billpay/dashboard';
import { mockTemplates, initialHolidays } from './data/billpay/settings';
import { mockClients, mockPayees } from './data/billpay/clients';
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
    private exceptions: FISException[] = [...mockExceptions];
    private holidays: Holiday[] = [...initialHolidays];
    private notificationTemplates: NotificationTemplate[] = [...mockTemplates];
    private clients: Client[] = [...mockClients];
    private payees: Payee[] = [...mockPayees];
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

    async getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>> {
        // Map FISExceptions to PaymentExceptions
        let filteredExceptions = this.exceptions.map(exception => ({
            id: exception.id,
            recordType: exception.recordType,
            sponsorTransactionID: exception.sponsorTransactionId,
            sponsorID: exception.sponsorId,
            sponsorName: exception.sponsorName,
            clientID: exception.customerId,
            clientChangeIndicator: exception.customerChangeIndicator,
            primaryClientFirstName: exception.primaryCustomerFirstName,
            primaryClientLastName: exception.primaryCustomerLastName,
            primaryClientSsn: exception.primaryCustomerSsn,
            secondaryClientFirstName: exception.secondaryCustomerFirstName,
            secondaryClientLastName: exception.secondaryCustomerLastName,
            secondaryClientSsn: exception.secondaryCustomerSsn,
            businessName: exception.businessName,
            federalTaxID: exception.federalTaxId,
            clientAddress1: exception.customerAddress1,
            clientAddress2: exception.customerAddress2,
            clientCity: exception.customerCity,
            clientState: exception.customerState,
            clientZip: exception.customerZip,
            clientCountry: exception.customerCountry,
            clientTelephone: exception.customerTelephone,
            internalPayeeID: exception.internalPayeeId,
            payeeChangeIndicator: exception.payeeChangeIndicator,
            payeeName: exception.payeeName,
            payeeAttentionLine: exception.payeeAttentionLine,
            payeeTelephoneNumber: exception.payeeTelephoneNumber,
            payeeAddress1: exception.payeeAddress1,
            payeeAddress2: exception.payeeAddress2,
            payeeCity: exception.payeeCity,
            payeeState: exception.payeeState,
            payeeZip: exception.payeeZip,
            payeeCountry: exception.payeeCountry,
            payeeNickname: exception.payeeNickname,
            clientPayeeID: exception.customerPayeeId,
            clientPayeeAccountNumber: exception.customerPayeeAccountNumber,
            confirmationNumber: exception.confirmationNumber,
            transactionAmount: exception.transactionAmount,
            memoLineInfo: exception.memoLineInfo,
            serviceRequestNumber: exception.serviceRequestNumber,
            serviceRequestDate: exception.serviceRequestDate.toISOString().split('T')[0],
            serviceRequestTime: exception.serviceRequestTime
        }));

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
        const exceptionIndex = this.exceptions.findIndex(e => e.id === parseInt(exceptionId));
        if (exceptionIndex === -1) {
            throw new Error(`Exception with ID ${exceptionId} not found`);
        }
        this.exceptions[exceptionIndex].status = FISExceptionStatus.RESOLVED;
        // Store resolution data in a way that matches FISException structure
        this.exceptions[exceptionIndex].errorMessage = resolution.notes || '';
        this.exceptions[exceptionIndex].created = new Date();
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
            'day': 1,
            'week': 7,
            'month': 30,
            'quarter': 90,
            'year': 365
        };
        return generateMockTrends(daysMap[timeframe]);
    }

    async getHolidays(): Promise<Holiday[]> {
        return this.holidays;
    }

    async addHoliday(holiday: HolidayInput): Promise<Holiday> {
        const newHoliday: Holiday = {
            id: Date.now(),
            ...holiday,
            status: HolidayStatus.ACTIVE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.holidays.push(newHoliday);
        return newHoliday;
    }

    async getNotificationTemplates(): Promise<NotificationTemplate[]> {
        return this.notificationTemplates;
    }

    async updateNotificationTemplate(
        templateId: number,
        template: NotificationTemplateInput
    ): Promise<NotificationTemplate> {
        const index = this.notificationTemplates.findIndex(t => t.id === templateId);
        if (index === -1) {
            throw new Error(`Template with ID ${templateId} not found`);
        }
        this.notificationTemplates[index] = {
            ...this.notificationTemplates[index],
            ...template,
            updatedAt: new Date().toISOString()
        };
        return this.notificationTemplates[index];
    }

    async getSecuritySettings(): Promise<BillPaySecuritySettings> {
        return this.securitySettings;
    }

    async updateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings> {
        this.securitySettings = {
            ...this.securitySettings,
            ...settings
        };
        return this.securitySettings;
    }

    async validateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation> {
        const errors: Record<string, string> = {};
        
        if (settings.passwordPolicy.minLength < 8) {
            errors['passwordPolicy.minLength'] = 'Password must be at least 8 characters';
        }
        if (settings.passwordPolicy.expiryDays < 30) {
            errors['passwordPolicy.expiryDays'] = 'Password must expire after at least 30 days';
        }
        if (settings.loginPolicy.maxAttempts < 1) {
            errors['loginPolicy.maxAttempts'] = 'Max attempts must be at least 1';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    async sendOTP(method: BillPayOTPMethod, destination: string): Promise<void> {
        // Mock implementation - just validate the method and destination
        if (!Object.values(BillPayOTPMethod).includes(method)) {
            throw new Error(`Invalid OTP method: ${method}`);
        }
        if (!destination) {
            throw new Error('Destination is required');
        }
    }

    async getFISException(id: number): Promise<FISException | null> {
        const exception = this.exceptions.find(ex => ex.id === id);
        if (!exception) {
            return null;
        }
        return exception;
    }

    async updateFISException(id: number, updates: Partial<FISException>): Promise<FISException> {
        const exception = await this.getFISException(id);
        if (!exception) {
            throw new Error('Exception not found');
        }
        const updated = {
            ...exception,
            ...updates,
            created: exception.created
        };
        const index = this.exceptions.findIndex(ex => ex.id === id);
        if (index !== -1) {
            this.exceptions[index] = updated;
        }
        return updated;
    }
}