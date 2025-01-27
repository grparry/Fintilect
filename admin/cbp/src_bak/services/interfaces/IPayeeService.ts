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


/**
 * Interface for payee management
 * Handles payee operations, validation, and conversion
 */
    /**
     * Get payees with pagination and filtering
     * @param filters Payee filters
     * @returns Paginated list of payees
     */

    /**
     * Get specific payee
     * @param payeeId Payee identifier
     * @returns Payee details
     */

    /**
     * Create payee
     * @param payee Payee to create
     * @returns Created payee
     */

    /**
     * Update payee
     * @param payeeId Payee identifier
     * @param payee Updated payee data
     * @returns Updated payee
     */

    /**
     * Delete payee
     * @param payeeId Payee identifier
     */

    /**
     * Validate payee
     * @param payee Payee data to validate
     * @returns Validation results
     */

    /**
     * Get payee conversion summary
     * @returns Conversion summary statistics
     */

    /**
     * Get payee conversions with pagination and filtering
     * @param filters Conversion filters
     * @returns Paginated list of conversion records
     */

    /**
     * Get conversion files
     * @returns List of conversion files
     */

    /**
     * Upload conversion file
     * @param file File data
     * @param templateId Template identifier
     * @returns Upload response
     */
    ): Promise<PayeeConversionFileUploadResponse>;

    /**
     * Validate conversion file
     * @param fileId File identifier
     * @returns Validation results
     */

    /**
     * Start conversion process
     * @param fileId File identifier
     * @returns Initial progress response
     */

    /**
     * Get conversion progress
     * @param fileId File identifier
     * @returns Current progress
     */

    /**
     * Cancel conversion
     * @param fileId File identifier
     */

    /**
     * Get conversion templates
     * @returns List of conversion templates
     */

    /**
     * Create conversion template
     * @param template Template to create
     * @returns Created template
     */

    /**
     * Update conversion template
     * @param templateId Template identifier
     * @param template Updated template data
     * @returns Updated template
     */
    ): Promise<PayeeConversionTemplate>;

    /**
     * Delete conversion template
     * @param templateId Template identifier
     */

    /**
     * Get conversion history
     * @param conversionId Conversion identifier
     * @returns List of history entries
     */

    /**
     * Export conversion results
     * @param conversionId Conversion identifier
     * @param format Export format
     * @returns Export file URL
     */
    ): Promise<string>;

    /**
     * Retry failed conversions
     * @param conversionId Conversion identifier
     * @param recordIds Optional specific record IDs to retry
     * @returns Retry results
     */
    ): Promise<{
