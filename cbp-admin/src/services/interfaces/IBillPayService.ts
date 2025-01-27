import { IBaseService } from './IBaseService';
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
} from '../../types/bill-pay.types';
import {
    BillPaySecuritySettings,
    BillPaySecurityValidation,
    BillPayOTPMethod
} from '../../types/security.types';
import { PaginatedResponse, QueryOptions } from '../../types/index';

/**
 * Interface for bill pay operations
 * Handles payment processing, scheduling, and configuration
 */
export interface IBillPayService extends IBaseService {
    /**
     * Get bill pay configuration
     * @returns Current bill pay configuration
     */
    getConfiguration(): Promise<BillPayConfig>;

    /**
     * Update bill pay configuration
     * @param config Updated configuration
     * @returns Updated configuration with validation
     */
    updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation>;

    /**
     * Get payments with pagination and filtering
     * @param filters Payment filters
     * @returns Paginated list of payments
     */
    getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>>;

    /**
     * Get specific payment
     * @param paymentId Payment identifier
     * @returns Payment details
     */
    getPayment(paymentId: string): Promise<Payment>;

    /**
     * Create new payment
     * @param payment Payment to create
     * @returns Created payment
     */
    createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment>;

    /**
     * Update existing payment
     * @param paymentId Payment identifier
     * @param payment Updated payment data
     * @returns Updated payment
     */
    updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment>;

    /**
     * Cancel payment
     * @param paymentId Payment identifier
     * @param reason Cancellation reason
     */
    cancelPayment(paymentId: string, reason: string): Promise<void>;

    /**
     * Get payment history
     * @param paymentId Payment identifier
     * @returns List of payment history entries
     */
    getPaymentHistory(paymentId: string): Promise<PaymentHistory[]>;

    /**
     * Get payment exceptions
     * @param filters Exception filters
     * @returns List of payment exceptions
     */
    getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>>;

    /**
     * Resolve payment exception
     * @param exceptionId Exception identifier
     * @param resolution Resolution details
     */
    resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void>;

    /**
     * Get clients
     * @returns List of clients
     */
    getClients(): Promise<Client[]>;

    /**
     * Get payees for a client
     * @param clientId Client identifier
     * @returns List of payees
     */
    getPayees(clientId: string): Promise<Payee[]>;

    /**
     * Get bill pay statistics
     * @param timeframe Timeframe for stats
     * @returns Bill pay statistics
     */
    getStats(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<BillPayStats>;

    /**
     * Get transaction trends
     * @param timeframe Timeframe for trends
     * @returns Transaction trends
     */
    getTransactionTrends(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<TransactionTrend[]>;

    /**
     * Get holidays
     * @returns List of holidays
     */
    getHolidays(): Promise<Holiday[]>;

    /**
     * Add holiday
     * @param holiday Holiday to add
     * @returns Added holiday
     */
    addHoliday(holiday: HolidayInput): Promise<Holiday>;

    /**
     * Get notification templates
     * @returns List of notification templates
     */
    getNotificationTemplates(): Promise<NotificationTemplate[]>;

    /**
     * Update notification template
     * @param templateId Template identifier
     * @param template Updated template
     * @returns Updated template
     */
    updateNotificationTemplate(templateId: number, template: NotificationTemplateInput): Promise<NotificationTemplate>;

    /**
     * Get payment actions
     * @param paymentId Payment identifier
     * @returns List of payment actions
     */
    getPaymentActions(paymentId: string): Promise<PaymentAction[]>;

    /**
     * Get bill pay security settings
     * @returns Current bill pay security settings
     */
    getSecuritySettings(): Promise<BillPaySecuritySettings>;

    /**
     * Update bill pay security settings
     * @param settings Updated security settings
     * @returns Updated settings
     */
    updateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings>;

    /**
     * Validate bill pay security settings
     * @param settings Settings to validate
     * @returns Validation result
     */
    validateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation>;

    /**
     * Send OTP for verification
     * @param method OTP delivery method
     * @param destination Email or phone number to send OTP to
     */
    sendOTP(method: BillPayOTPMethod, destination: string): Promise<void>;
}
