/**
 * Base setting type representing a single configuration value
 */
export interface Setting {
    key: string;
    value: string;
    description?: string;
    dataType: 'string' | 'number' | 'boolean' | 'json';
    validation?: Record<string, any>;
}

/**
 * Group of related settings with metadata
 */
export interface SettingGroup {
    settings: Setting[];
    metadata: {
        __metadata?: Record<string, string>;
        __validations?: Record<string, any>;
        __display?: Record<string, any>;
    };
}
