import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';

/**
 * Filter configuration for PSCU log file processing
 */
export interface FilterConfig {
    /** Field name */
    name: string;
    /** Values that cause inclusion */
    valuesCausingInclusion: string;
    /** Values that cause exclusion */
    valuesCausingExclusion: string;
    /** Whether the field is required */
    requiresValue: boolean;
    /** Error message for validation */
    errorMessage: string;
}

/**
 * Path configuration for file handling
 */
export interface PathConfig {
    /** Input directory path */
    inputPath: string;
    /** Output directory path */
    outputPath: string;
    /** Error directory path */
    errorPath: string;
    /** Processed files directory path */
    processedPath: string;
    /** Input filename pattern (e.g. *.txt) */
    inputFilenamePattern: string;
    /** Prefix for output files */
    outputFilePrefix: string;
    /** Timeout for exclusive file access */
    inputFileExclusiveAccessTimeout: string;
}

/**
 * Input file field configuration
 */
export interface InputFieldConfig {
    /** Field name */
    name: string;
    /** Field position (1-based) */
    position: number;
    /** Field length */
    length: number;
    /** Whether the field is required */
    required: boolean;
    /** Validation regex pattern */
    validationPattern: string;
    /** Validation error message */
    validationMessage: string;
}

/**
 * Output file field configuration
 */
export interface OutputFieldConfig {
    /** Field name */
    name: string;
    /** Field position (1-based) */
    position: number;
    /** Field length */
    length: number;
    /** Character to use for padding */
    padCharacter: string;
    /** Field alignment (Left/Right) */
    alignment: 'Left' | 'Right';
}

/**
 * Settings for the PSCU log file transform service
 */
export class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    private _filters: string;
    private _pathConfiguration: string;
    private _inputFileFields: string;
    private _outputFileFields: string;

    /**
     * The filters configuration
     * @type {FilterConfig[]}
     */
    get filters(): FilterConfig[] {
        try {
            return JSON.parse(this._filters || '[]');
        } catch (e) {
            console.error('Invalid filters JSON:', e);
            return [];
        }
    }
    set filters(value: FilterConfig[]) {
        this.validateFilters(value);
        this._filters = JSON.stringify(value);
    }

    /**
     * The path configuration
     * @type {PathConfig}
     */
    get pathConfiguration(): PathConfig {
        try {
            return JSON.parse(this._pathConfiguration || '{}');
        } catch (e) {
            console.error('Invalid path configuration JSON:', e);
            return {} as PathConfig;
        }
    }
    set pathConfiguration(value: PathConfig) {
        this.validatePathConfiguration(value);
        this._pathConfiguration = JSON.stringify(value);
    }

    /**
     * The input file field configuration
     * @type {InputFieldConfig[]}
     */
    get inputFileFields(): InputFieldConfig[] {
        try {
            return JSON.parse(this._inputFileFields || '[]');
        } catch (e) {
            console.error('Invalid input file fields JSON:', e);
            return [];
        }
    }
    set inputFileFields(value: InputFieldConfig[]) {
        this.validateInputFileFields(value);
        this._inputFileFields = JSON.stringify(value);
    }

    /**
     * The output file field configuration
     * @type {OutputFieldConfig[]}
     */
    get outputFileFields(): OutputFieldConfig[] {
        try {
            return JSON.parse(this._outputFileFields || '[]');
        } catch (e) {
            console.error('Invalid output file fields JSON:', e);
            return [];
        }
    }
    set outputFileFields(value: OutputFieldConfig[]) {
        this.validateOutputFileFields(value);
        this._outputFileFields = JSON.stringify(value);
    }

    private validateFilters(filters: FilterConfig[]): void {
        if (!Array.isArray(filters)) {
            throw new Error('Filters must be an array');
        }
        filters.forEach((filter, index) => {
            if (typeof filter.name !== 'string' || !filter.name) {
                throw new Error(`Filter at index ${index} must have a name`);
            }
            if (typeof filter.requiresValue !== 'boolean') {
                throw new Error(`Filter at index ${index} has invalid requiresValue`);
            }
            if (filter.requiresValue && (!filter.errorMessage || typeof filter.errorMessage !== 'string')) {
                throw new Error(`Filter at index ${index} requires an error message when requiresValue is true`);
            }
        });
    }

    private validatePathConfiguration(config: PathConfig): void {
        if (!config || typeof config !== 'object') {
            throw new Error('Path configuration must be an object');
        }
        if (!config.inputPath || typeof config.inputPath !== 'string') {
            throw new Error('Path configuration must have a valid inputPath');
        }
        if (!config.outputPath || typeof config.outputPath !== 'string') {
            throw new Error('Path configuration must have a valid outputPath');
        }
        // Additional validation...
    }

    private validateInputFileFields(fields: InputFieldConfig[]): void {
        if (!Array.isArray(fields)) {
            throw new Error('Input file fields must be an array');
        }
        fields.forEach((field, index) => {
            if (typeof field.name !== 'string' || !field.name) {
                throw new Error(`Input field at index ${index} must have a name`);
            }
            if (typeof field.position !== 'number' || field.position < 1) {
                throw new Error(`Input field at index ${index} must have a valid position`);
            }
            if (typeof field.length !== 'number' || field.length < 1) {
                throw new Error(`Input field at index ${index} must have a valid length`);
            }
            if (field.required && (!field.validationMessage || typeof field.validationMessage !== 'string')) {
                throw new Error(`Input field at index ${index} requires a validation message when required is true`);
            }
        });
    }

    private validateOutputFileFields(fields: OutputFieldConfig[]): void {
        if (!Array.isArray(fields)) {
            throw new Error('Output file fields must be an array');
        }
        fields.forEach((field, index) => {
            if (typeof field.name !== 'string' || !field.name) {
                throw new Error(`Output field at index ${index} must have a name`);
            }
            if (typeof field.position !== 'number' || field.position < 1) {
                throw new Error(`Output field at index ${index} must have a valid position`);
            }
            if (typeof field.length !== 'number' || field.length < 1) {
                throw new Error(`Output field at index ${index} must have a valid length`);
            }
            if (!['Left', 'Right'].includes(field.alignment)) {
                throw new Error(`Output field at index ${index} must have a valid alignment (Left/Right)`);
            }
        });
    }

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PscuLogFileTransformService',
        settings: {
            filters: {
                key: 'PsiServices.PscuLogFileTransformService.Filters',
                type: 'json',
                required: false
            },
            pathConfiguration: {
                key: 'PsiServices.PscuLogFileTransformService.PathConfiguration',
                type: 'json',
                required: false
            },
            inputFileFields: {
                key: 'PsiServices.PscuLogFileTransformService.InputFileFields',
                type: 'json',
                required: false
            },
            outputFileFields: {
                key: 'PsiServices.PscuLogFileTransformService.OutputFileFields',
                type: 'json',
                required: false
            }
        }
    };

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        return [
            {
                key: PscuLogFileTransformServiceSettings.metadata.settings.filters.key,
                value: this._filters || '[]',
                dataType: 'json'
            },
            {
                key: PscuLogFileTransformServiceSettings.metadata.settings.pathConfiguration.key,
                value: this._pathConfiguration || '{}',
                dataType: 'json'
            },
            {
                key: PscuLogFileTransformServiceSettings.metadata.settings.inputFileFields.key,
                value: this._inputFileFields || '[]',
                dataType: 'json'
            },
            {
                key: PscuLogFileTransformServiceSettings.metadata.settings.outputFileFields.key,
                value: this._outputFileFields || '[]',
                dataType: 'json'
            }
        ];
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        for (const setting of settings) {
            switch (setting.key) {
                case PscuLogFileTransformServiceSettings.metadata.settings.filters.key:
                    this._filters = setting.value;
                    break;
                case PscuLogFileTransformServiceSettings.metadata.settings.pathConfiguration.key:
                    this._pathConfiguration = setting.value;
                    break;
                case PscuLogFileTransformServiceSettings.metadata.settings.inputFileFields.key:
                    this._inputFileFields = setting.value;
                    break;
                case PscuLogFileTransformServiceSettings.metadata.settings.outputFileFields.key:
                    this._outputFileFields = setting.value;
                    break;
            }
        }
    }
}
