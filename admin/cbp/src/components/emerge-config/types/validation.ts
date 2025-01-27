export type { ValidationResult, ValidationError } from '../../../services/validation';

/**
 * Single validation rule
 */
export interface ValidationRule {
    /** Whether the field is required */
    required?: boolean;
    /** List of allowed values */
    oneOf?: unknown[];
    /** Minimum number value */
    min?: number;
    /** Maximum number value */
    max?: number;
    /** Regular expression pattern */
    pattern?: string;
    /** Custom validation function */
    validate?: (value: unknown) => boolean | string;
}

/**
 * Map of field names to validation rules
 */
export interface ValidationRules {
    [field: string]: ValidationRule;
}