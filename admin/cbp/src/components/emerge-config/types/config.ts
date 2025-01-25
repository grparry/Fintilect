import { ComponentType } from 'react';
import { ValidationRules, ValidationResult } from './validation';
import { LayoutDefinition } from './layout';
import { NavigationMetadata } from './navigation';

/**
 * Base interface for all configuration values
 */
export interface ConfigValue {
    [key: string]: unknown;
}

/**
 * Metadata for configuration sections
 */
export interface ConfigMetadata {
    /** Unique key for the configuration section */
    key: string;
    /** Display title */
    title: string;
    /** Description of the configuration section */
    description: string;
    /** Icon component to display */
    icon: ComponentType;
    /** Required permissions to view/edit */
    permissions: string[];
    /** Navigation metadata */
    navigation: NavigationMetadata;
}

/**
 * Configuration section state
 */
export interface ConfigSectionState<T extends ConfigValue> {
    /** Loading state */
    loading: boolean;
    /** Error message if any */
    error: string | null;
    /** Current configuration value */
    value: T | null;
    /** Validation state */
    validationResult: ValidationResult | null;
}

/**
 * Props for configuration sections
 */
export interface ConfigSectionProps<T extends ConfigValue> {
    /** Called when validation state changes */
    onValidate?: (result: ValidationResult) => void;
    /** Called when value changes */
    onChange?: (value: T) => void;
    /** Called when save completes */
    onSave?: (value: T) => void;
}
