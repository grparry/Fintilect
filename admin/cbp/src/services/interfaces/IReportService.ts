import { IBaseService } from './IBaseService';
import {
    PaymentActivityRequest,
    PaymentActivityItemPagedResponse
} from '../../utils/reports/paymentActivity';
import {
    ErrorRecapRequest,
    ErrorRecapItemPagedResponse
} from '../../utils/reports/errorRecap';

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
}