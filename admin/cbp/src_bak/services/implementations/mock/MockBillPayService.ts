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
import {
    BillPaySecuritySettings,
    BillPaySecurityValidation,
    BillPayOTPMethod
} from '../../../types/security.types';
import { PaginatedResponse, Pagination, PaginationOptions } from '../../types/index';
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
    private exceptions: PaymentException[] = [...mockExceptions];
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





        // Validate configuration


                ...this.config,
                ...config,



        // Apply filters
            );
            );

        // Apply pagination




            ...payment,



            ...this.payments[index],
            ...payment,



            ...this.payments[index],




        // Apply filters (similar to payments)
            );
            );

        // Apply pagination




            ...this.exceptions[index],
                ...(this.exceptions[index].resolutions || []),
                {
                    ...resolution,
            ],






            ...holiday,




            ...this.notificationTemplates[index],
            ...template,


        );




        


        // Mock implementation - in real world this would send an actual OTP
