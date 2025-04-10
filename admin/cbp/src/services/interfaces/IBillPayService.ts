import { IBaseService } from './IBaseService';
import {
    BillPayConfig,
    BillPayConfigUpdate,
    BillPayConfigValidation,
    Payee,
    BillPayStats,
    TransactionTrend,
    ExceptionResolution
} from '../../types/bill-pay.types';
import {
    Holiday,
    HolidayInput,
    HolidayStatus
} from '../../types/calendar.types';
import {
    Client
} from '../../types/client.types';
import {
    PaymentException,
    PaymentFilters
} from '../../types/payment.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for bill pay operations
 * Handles bill pay configuration, client management, and analytics
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
     * Send OTP for verification
     * @param method OTP delivery method
     * @param destination Email or phone number to send OTP to
     */
    sendOTP(method: string, destination: string): Promise<void>;
}