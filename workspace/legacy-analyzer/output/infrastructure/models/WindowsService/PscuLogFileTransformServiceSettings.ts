import { SettingKey } from '../../decorators/settingKey';
import { 
    PscuFiltersSetting,
    PscuInputFieldsSetting,
    PscuOutputFieldsSetting,
    PscuPathsSetting
} from './PscuSettings';

// Generated interfaces for JSON schema types
export interface FilterConfig {
    Name: string;
    ValuesCausingInclusion: string;
    ValuesCausingExclusion: string;
    RequiresValue: boolean;
    ErrorMessage: string;
}

export interface InputFieldConfig {
    Name: string;
    DataType: string;
    EmptyAllowed: boolean;
}

export interface OutputFieldConfig {
    Position: number;
    WhitespaceLength: number;
    Name: string;
    CustomFormatter: string | null;
    TruncateToLength: number;
    TruncateFromPosition: string;
    MinimumOutputLength: number;
    MinimumOutputPadFromPosition: string;
    OutputFormatString: string;
    StaticTextValue: string;
}

export interface PathConfig {
    InputPath: string;
    InputFilenamePattern: string;
    OutputPath: string;
    ErrorPath: string;
    ProcessedPath: string;
    CompletedPath: string;
    OutputFilePrefix: string;
    InputFileExclusiveAccessTimeout: string;
}

/**
 * Settings for the PSCU Log File Transform Service
 */
export class PscuLogFileTransformServiceSettings {
    private readonly _filters = new PscuFiltersSetting();
    private readonly _inputFields = new PscuInputFieldsSetting();
    private readonly _outputFields = new PscuOutputFieldsSetting();
    private readonly _paths = new PscuPathsSetting();

    /**
     * Filter configurations for the transform service.
     */
    get filters(): FilterConfig[] {
        return this._filters.value;
    }

    set filters(value: FilterConfig[]) {
        this._filters.value = value;
    }

    /**
     * Input field configurations for the transform service.
     */
    get inputFileFields(): InputFieldConfig[] {
        return this._inputFields.value;
    }

    set inputFileFields(value: InputFieldConfig[]) {
        this._inputFields.value = value;
    }

    /**
     * Output field configurations for the transform service.
     */
    get outputFileFields(): OutputFieldConfig[] {
        return this._outputFields.value;
    }

    set outputFileFields(value: OutputFieldConfig[]) {
        this._outputFields.value = value;
    }

    /**
     * Path configurations for the transform service.
     */
    get paths(): PathConfig {
        return this._paths.value;
    }

    set paths(value: PathConfig) {
        this._paths.value = value;
    }

    /**
     * Get all settings as an array of Setting objects
     */
    toSettings() {
        return [
            this._filters.toSetting(),
            this._inputFields.toSetting(),
            this._outputFields.toSetting(),
            this._paths.toSetting()
        ];
    }

    /**
     * Update settings from an array of Setting objects
     */
    fromSettings(settings: Setting[]) {
        for (const setting of settings) {
            switch (setting.key) {
                case this._filters.toSetting().key:
                    this._filters.fromSetting(setting);
                    break;
                case this._inputFields.toSetting().key:
                    this._inputFields.fromSetting(setting);
                    break;
                case this._outputFields.toSetting().key:
                    this._outputFields.fromSetting(setting);
                    break;
                case this._paths.toSetting().key:
                    this._paths.fromSetting(setting);
                    break;
            }
        }
    }
}
