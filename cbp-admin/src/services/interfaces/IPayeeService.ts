import { IBaseService } from './IBaseService';
import {
    Payee,
    PayeeStatus,
    PayeeType,
    PayeeValidationResult,
    PayeeConversionSummary,
    PayeeConversionFilters,
    PayeeConversionFile,
    PayeeConversionValidation,
    PayeeConversionFileUploadResponse,
    PayeeConversionProgressResponse,
    PayeeConversionProgress,
    PayeeConversionRecord,
    PayeeConversionTemplate
} from '../../types/bill-pay.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for payee management
 * Handles payee operations, validation, and conversion
 */
export interface IPayeeService extends IBaseService {
    /**
     * Get payees with pagination and filtering
     * @param filters Payee filters
     * @returns Paginated list of payees
     */
    getPayees(filters: {
        clientId?: string;
        status?: PayeeStatus;
        type?: PayeeType;
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
    validatePayee(payee: Partial<Payee>): Promise<PayeeValidationResult>;

    /**
     * Get payee conversion summary
     * @returns Conversion summary statistics
     */
    getConversionSummary(): Promise<PayeeConversionSummary>;

    /**
     * Get payee conversions with pagination and filtering
     * @param filters Conversion filters
     * @returns Paginated list of conversion records
     */
    getConversions(filters: PayeeConversionFilters): Promise<PaginatedResponse<PayeeConversionRecord>>;

    /**
     * Get conversion files
     * @returns List of conversion files
     */
    getConversionFiles(): Promise<PayeeConversionFile[]>;

    /**
     * Upload conversion file
     * @param file File data
     * @param templateId Template identifier
     * @returns Upload response
     */
    uploadConversionFile(
        file: File,
        templateId: string
    ): Promise<PayeeConversionFileUploadResponse>;

    /**
     * Validate conversion file
     * @param fileId File identifier
     * @returns Validation results
     */
    validateConversionFile(fileId: string): Promise<PayeeConversionValidation>;

    /**
     * Start conversion process
     * @param fileId File identifier
     * @returns Initial progress response
     */
    startConversion(fileId: string): Promise<PayeeConversionProgressResponse>;

    /**
     * Get conversion progress
     * @param fileId File identifier
     * @returns Current progress
     */
    getConversionProgress(fileId: string): Promise<PayeeConversionProgress>;

    /**
     * Cancel conversion
     * @param fileId File identifier
     */
    cancelConversion(fileId: string): Promise<void>;

    /**
     * Get conversion templates
     * @returns List of conversion templates
     */
    getConversionTemplates(): Promise<PayeeConversionTemplate[]>;

    /**
     * Create conversion template
     * @param template Template to create
     * @returns Created template
     */
    createConversionTemplate(template: Omit<PayeeConversionTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<PayeeConversionTemplate>;

    /**
     * Update conversion template
     * @param templateId Template identifier
     * @param template Updated template data
     * @returns Updated template
     */
    updateConversionTemplate(
        templateId: string,
        template: Partial<PayeeConversionTemplate>
    ): Promise<PayeeConversionTemplate>;

    /**
     * Delete conversion template
     * @param templateId Template identifier
     */
    deleteConversionTemplate(templateId: string): Promise<void>;

    /**
     * Get conversion history
     * @param conversionId Conversion identifier
     * @returns List of history entries
     */
    getConversionHistory(conversionId: string): Promise<Array<{
        action: string;
        timestamp: string;
        details: Record<string, unknown>;
        user: string;
    }>>;

    /**
     * Export conversion results
     * @param conversionId Conversion identifier
     * @param format Export format
     * @returns Export file URL
     */
    exportConversionResults(
        conversionId: string,
        format: 'csv' | 'excel'
    ): Promise<string>;

    /**
     * Retry failed conversions
     * @param conversionId Conversion identifier
     * @param recordIds Optional specific record IDs to retry
     * @returns Retry results
     */
    retryFailedConversions(
        conversionId: string,
        recordIds?: string[]
    ): Promise<{
        successful: number;
        failed: number;
        errors: Record<string, string>;
    }>;
}
