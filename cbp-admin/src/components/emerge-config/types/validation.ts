/**
 * Validation error for a specific field
 */
export interface ValidationError {
    /** Field that failed validation */
    field: string;
    /** Error message */
    message: string;
}

/**
 * Result of validation
 */
export interface ValidationResult {
    /** Whether validation passed */
    valid: boolean;
    /** List of validation errors if any */
    errors?: ValidationError[];
}

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
    /** Minimum number of items (for arrays) */
    minItems?: number;
    /** Maximum number of items (for arrays) */
    maxItems?: number;
    /** Regular expression pattern */
    pattern?: string;
    /** Custom validation function */
    custom?: (value: unknown) => ValidationError | null;
}

/**
 * Map of field names to validation rules
 */
export interface ValidationRules {
    [field: string]: ValidationRule;
}
