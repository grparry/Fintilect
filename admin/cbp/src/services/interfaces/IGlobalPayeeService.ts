import { IBaseService } from './IBaseService';
import { PaginatedResponse } from '../../types/common.types';
import { PaymentStatus, PaymentMethod } from '../../types/payment.types';
import {
  Payee,
  PaymentValidationResult,
  FisPayeeRequest,
  FisPayeeResponse,
  FisPayeeDetailedResponse
} from '../../types/bill-pay.types';

/**
 * Interface for global payee management
 * Handles FIS global payee operations and validation
 */
export interface IGlobalPayeeService extends IBaseService {
    /**
     * Get a global payee from FIS Web Service
     * @param request FIS payee request parameters
     * @returns FIS payee response
     */
    getFisPayee(request: FisPayeeRequest): Promise<FisPayeeResponse>;

    /**
     * Get a detailed global payee from FIS Web Service (v2)
     * @param request FIS payee request parameters
     * @returns FIS payee detailed response
     */
    getFisPayeeDetailed(request: FisPayeeRequest): Promise<FisPayeeDetailedResponse>;

    /**
     * Get payees with pagination and filtering
     * @param filters Payee filters
     * @returns Paginated list of payees
     */
    getPayees(filters: {
        clientId?: string;
        status?: PaymentStatus;
        type?: PaymentMethod;
        searchTerm?: string;
    }): Promise<PaginatedResponse<Payee>>;

    /**
     * Get specific payee
     * @param payeeId Payee identifier
     * @returns Payee details
     */
    getPayee(payeeId: string): Promise<Payee>;

    /**
     * Create payee
     * @param payee Payee to create
     * @returns Created payee
     */
    createPayee(payee: Omit<Payee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payee>;

    /**
     * Update payee
     * @param payeeId Payee identifier
     * @param payee Updated payee data
     * @returns Updated payee
     */
    updatePayee(payeeId: string, payee: Partial<Payee>): Promise<Payee>;

    /**
     * Delete payee
     * @param payeeId Payee identifier
     */
    deletePayee(payeeId: string): Promise<void>;

    /**
     * Validate payee
     * @param payee Payee data to validate
     * @returns Validation results
     */
    validatePayee(payee: Partial<Payee>): Promise<PaymentValidationResult>;
}