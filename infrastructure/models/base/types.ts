/**
 * API Types
 * These types define the shape of data sent to and received from the API.
 * They are used for type information only, not implementation.
 */
export interface Setting {
    key: string;
    value: string;
    description?: string;
    dataType: 'string' | 'number' | 'boolean' | 'json';
    validation?: Record<string, any>;
}

export interface SettingGroup {
    settings: Setting[];
    metadata: {
        __metadata?: Record<string, string>;
        __validations?: Record<string, any>;
        __display?: Record<string, any>;
    };
}

/**
 * Model Types
 * These types define the contract for our generated settings classes.
 * ISettingsGroup is implemented by the class, while ISettingsMetadata
 * is used for the static metadata property.
 */

/**
 * Interface that all settings classes must implement to provide
 * conversion between the model and API formats
 */
export interface ISettingsGroup {
    /**
     * Convert this settings object to an array of API Setting objects
     */
    toSettings(): Setting[];

    /**
     * Update this settings object from an array of API Setting objects
     */
    fromSettings(settings: Setting[]): void;
}

/**
 * Type for the static metadata property on settings classes
 * Example usage:
 * class MySettings implements ISettingsGroup {
 *     static readonly metadata: ISettingsMetadata = { ... };
 * }
 */
export interface ISettingsMetadata {
    readonly groupName: string;
    readonly settings: {
        readonly [key: string]: {
            readonly key: string;
            readonly type: string;
            readonly required: boolean;
        };
    };
}
