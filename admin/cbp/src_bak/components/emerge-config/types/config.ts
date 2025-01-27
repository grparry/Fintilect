import { ComponentType } from 'react';
import { ValidationRules, ValidationResult } from './validation';
import { LayoutDefinition } from './layout';
import { NavigationMetadata } from './navigation';

/**


/**
 * Base interface for all configuration values
 */
    [key: string]: unknown;

/**
 * Metadata for configuration sections
 */
    /** Unique key for the configuration section */
    /** Display title */
    /** Description of the configuration section */
    /** Icon component to display */
    /** Required permissions to view/edit */
    /** Navigation metadata */

/**
 * Configuration section state
 */
    /** Loading state */
    /** Error message if any */
    /** Current configuration value */
    /** Validation state */

/**
 * Props for configuration sections
 */
    /** Called when validation state changes */
    /** Called when value changes */
    /** Called when save completes */
