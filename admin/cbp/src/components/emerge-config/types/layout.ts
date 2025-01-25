import { ComponentType } from 'react';

/**
 * Field definition for layout
 */
export interface FieldDefinition {
    /** Field name in the configuration object */
    name: string;
    /** Display label */
    label: string;
    /** Help text */
    helperText?: string;
    /** Component to render the field */
    component: ComponentType<any>;
    /** Additional props for the component */
    props?: Record<string, unknown>;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Conditions for showing the field */
    showWhen?: {
        field: string;
        value: unknown;
    };
}

/**
 * Section definition for layout
 */
export interface SectionDefinition {
    /** Section title */
    title: string;
    /** Section description */
    description?: string;
    /** Fields in the section */
    fields: FieldDefinition[];
    /** Whether the section is expanded by default */
    defaultExpanded?: boolean;
}

/**
 * Complete layout definition
 */
export interface LayoutDefinition {
    /** Layout sections */
    sections: SectionDefinition[];
    /** Whether to show a divider between sections */
    showDividers?: boolean;
    /** Additional styles for the layout */
    sx?: Record<string, unknown>;
}
