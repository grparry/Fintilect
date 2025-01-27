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
import { PaginatedResponse, QueryOptions } from '../types/index';

/**


/**
 * Interface for bill pay operations
 * Handles payment processing, scheduling, and configuration
 */
    /**
     * Get bill pay configuration
     * @returns Current bill pay configuration
     */

    /**
     * Update bill pay configuration
     * @param config Updated configuration
     * @returns Updated configuration with validation
     */

    /**
     * Get payments with pagination and filtering
     * @param filters Payment filters
     * @returns Paginated list of payments
     */

    /**
     * Get specific payment
     * @param paymentId Payment identifier
     * @returns Payment details
     */

    /**
     * Create new payment
     * @param payment Payment to create
     * @returns Created payment
     */

    /**
     * Update existing payment
     * @param paymentId Payment identifier
     * @param payment Updated payment data
     * @returns Updated payment
     */

    /**
     * Cancel payment
     * @param paymentId Payment identifier
     * @param reason Cancellation reason
     */

    /**
     * Get payment history
     * @param paymentId Payment identifier
     * @returns List of payment history entries
     */

    /**
     * Get payment exceptions
     * @param filters Exception filters
     * @returns List of payment exceptions
     */

    /**
     * Resolve payment exception
     * @param exceptionId Exception identifier
     * @param resolution Resolution details
     */

    /**
     * Get clients
     * @returns List of clients
     */

    /**
     * Get payees for a client
     * @param clientId Client identifier
     * @returns List of payees
     */

    /**
     * Get bill pay statistics
     * @param timeframe Timeframe for stats
     * @returns Bill pay statistics
     */

    /**
     * Get transaction trends
     * @param timeframe Timeframe for trends
     * @returns Transaction trends
     */

    /**
     * Get holidays
     * @returns List of holidays
     */

    /**
     * Add holiday
     * @param holiday Holiday to add
     * @returns Added holiday
     */

    /**
     * Get notification templates
     * @returns List of notification templates
     */

    /**
     * Update notification template
     * @param templateId Template identifier
     * @param template Updated template
     * @returns Updated template
     */

    /**
     * Get payment actions
     * @param paymentId Payment identifier
     * @returns List of payment actions
     */

    /**
     * Get bill pay security settings
     * @returns Current bill pay security settings
     */

    /**
     * Update bill pay security settings
     * @param settings Updated security settings
     * @returns Updated settings
     */

    /**
     * Validate bill pay security settings
     * @param settings Settings to validate
     * @returns Validation result
     */

    /**
     * Send OTP for verification
     * @param method OTP delivery method
     * @param destination Email or phone number to send OTP to
     */
