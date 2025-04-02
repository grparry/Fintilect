import { IBaseService } from './IBaseService';
import {
    PaymentActivityRequest,
    PaymentActivityItemPagedResponse
} from '../../utils/reports/paymentActivity';
import {
    ErrorRecapRequest,
    ErrorRecapItemPagedResponse
} from '../../utils/reports/errorRecap';
import {
    ActiveUserCountRequest,
    ActiveUserCountItemPagedResponse
} from '../../utils/reports/activeUserCount';
import {
    FailedOnUsParams,
    FailedOnUsResponse
} from '../../utils/reports/failedOnUs';
import {
    GlobalHolidaysParams,
    GlobalHolidaysResponse
} from '../../utils/reports/globalHolidays';
import {
    MonthlyUsersParams,
    MonthlyUsersResponse
} from '../../utils/reports/monthlyUsers';
import {
    PendingPaymentsParams,
    PendingPaymentsResponse
} from '../../utils/reports/pendingPayments';
import {
    RecurringPaymentChangeHistoryParams,
    RecurringPaymentChangeHistoryResponse
} from '../../utils/reports/recurringPaymentChangeHistory';
import {
    UserPayeeChangeHistoryParams,
    UserPayeeChangeHistoryResponse
} from '../../utils/reports/userPayeeChangeHistory';
import {
    OnUsPostingsParams,
    OnUsPostingsResponse
} from '../../utils/reports/onUsPostings';
import {
    StatusesWithNotificationsParams,
    StatusesWithNotificationsResponse
} from '../../utils/reports/statusesWithNotifications';
import {
    LargePaymentParams,
    LargePaymentResponse
} from '../../utils/reports/largePayment';
import {
    ProcessingConfirmationParams,
    ProcessingConfirmationResponse
} from '../../utils/reports/processingConfirmation';
import {
    ScheduledPaymentChangeHistoryParams,
    ScheduledPaymentChangeHistoryResponse
} from '../../utils/reports/scheduledPaymentChangeHistory';
import {
    PayeeRequest,
    PayeeItemPagedResponse
} from '../../utils/reports/payee';
import {
    PaymentRequest,
    PaymentItemPagedResponse
} from '../../utils/reports/payment';
import {
    PaymentClearRequest,
    PaymentClearItemPagedResponse
} from '../../utils/reports/paymentClear';
import {
    RecurringPaymentParams,
    RecurringPaymentItemPagedResponse
} from '../../utils/reports/recurringPayment';
import {
    UserPayeeParams,
    UserPayeeItemPagedResponse
} from '../../utils/reports/userPayee';

/**
 * Interface for report management
 * Handles report generation for specific report endpoints
 */
export interface IReportService extends IBaseService {
    /**
     * Get error recap data using the dedicated endpoint
     * @param params Error recap search parameters
     * @returns Paged response with error recap items
     */
    getErrorRecap(params: ErrorRecapRequest): Promise<ErrorRecapItemPagedResponse>;

    /**
     * Get payment activity data using the dedicated endpoint
     * @param params Payment activity search parameters
     * @returns Paged response with payment activity items
     */
    getPaymentActivity(params: PaymentActivityRequest): Promise<PaymentActivityItemPagedResponse>;
    
    /**
     * Get active user count data using the dedicated endpoint
     * @param params Active user count search parameters
     * @returns Paged response with active user count items
     */
    getActiveUserCount(params: ActiveUserCountRequest): Promise<ActiveUserCountItemPagedResponse>;

    /**
     * Get failed on us data using the dedicated endpoint
     * @param params Failed on us search parameters
     * @returns Paged response with failed on us items
     */
    getFailedOnUs(params: FailedOnUsParams): Promise<FailedOnUsResponse>;

    /**
     * Get global holidays data using the dedicated endpoint
     * @param params Global holidays search parameters
     * @returns Paged response with global holidays items
     */
    getGlobalHolidays(params: GlobalHolidaysParams): Promise<GlobalHolidaysResponse>;

    /**
     * Get monthly users data using the dedicated endpoint
     * @param params Monthly users search parameters
     * @returns Paged response with monthly users items
     */
    getMonthlyUsers(params: MonthlyUsersParams): Promise<MonthlyUsersResponse>;

    /**
     * Get pending payments data using the dedicated endpoint
     * @param params Pending payments search parameters
     * @returns Paged response with pending payments items
     */
    getPendingPayments(params: PendingPaymentsParams): Promise<PendingPaymentsResponse>;

    /**
     * Get recurring payment change history data using the dedicated endpoint
     * @param params Recurring payment change history search parameters
     * @returns Paged response with recurring payment change history items
     */
    getRecurringPaymentChangeHistory(params: RecurringPaymentChangeHistoryParams): Promise<RecurringPaymentChangeHistoryResponse>;
    
    /**
     * Get user payee change history data using the dedicated endpoint
     * @param params User payee change history search parameters
     * @returns Paged response with user payee change history items
     */
    getUserPayeeChangeHistory(params: UserPayeeChangeHistoryParams): Promise<UserPayeeChangeHistoryResponse>;
    
    /**
     * Get on us postings data using the dedicated endpoint
     * @param params On us postings search parameters
     * @returns Paged response with on us postings items
     */
    getOnUsPostings(params: OnUsPostingsParams): Promise<OnUsPostingsResponse>;

    /**
     * Get statuses with notifications data using the dedicated endpoint
     * @param params Statuses with notifications search parameters
     * @returns Paged response with statuses with notifications items
     */
    getStatusesWithNotifications(params: StatusesWithNotificationsParams): Promise<StatusesWithNotificationsResponse>;

    /**
     * Get large payment data using the dedicated endpoint
     * @param params Large payment search parameters
     * @returns Paged response with large payment items
     */
    getLargePayment(params: LargePaymentParams): Promise<LargePaymentResponse>;
    
    /**
     * Get processing confirmation data using the dedicated endpoint
     * @param params Processing confirmation search parameters
     * @returns Paged response with processing confirmation items
     */
    getProcessingConfirmation(params: ProcessingConfirmationParams): Promise<ProcessingConfirmationResponse>;
    
    /**
     * Get scheduled payment change history data using the dedicated endpoint
     * @param params Scheduled payment change history search parameters
     * @returns Paged response with scheduled payment change history items
     */
    getScheduledPaymentChangeHistory(params: ScheduledPaymentChangeHistoryParams): Promise<ScheduledPaymentChangeHistoryResponse>;

    /**
     * Get payee report data using the dedicated endpoint
     * @param params Payee report search parameters
     * @returns Paged response with payee report items
     */
    getPayeeReport(params: PayeeRequest): Promise<PayeeItemPagedResponse>;

    /**
     * Get payment report data using the dedicated endpoint
     * @param params Payment report search parameters
     * @returns Paged response with payment report items
     */
    getPaymentReport(params: PaymentRequest): Promise<PaymentItemPagedResponse>;

    /**
     * Get payment clear report data using the dedicated endpoint
     * @param params Payment clear report search parameters
     * @returns Paged response with payment clear report items
     */
    getPaymentClearReport(params: PaymentClearRequest): Promise<PaymentClearItemPagedResponse>;

    /**
     * Get recurring payment report data using the dedicated endpoint
     * @param params Recurring payment report search parameters
     * @returns Paged response with recurring payment report items
     */
    getRecurringPaymentReport(params: RecurringPaymentParams): Promise<RecurringPaymentItemPagedResponse>;

    /**
     * Get user payee report data using the dedicated endpoint
     * @param params User payee report search parameters
     * @returns Paged response with user payee report items
     */
    getUserPayeeReport(params: UserPayeeParams): Promise<UserPayeeItemPagedResponse>;
}