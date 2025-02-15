import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for identification settings
 */
export interface IdentificationConfig {
    MothersMaidenNameCategoryOption: string;
    DriverLicenseCategoryOption: string;
}

/**
 * Settings for identification configuration
 */
export class Identification implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _mothersMaidenNameCategoryOption: string = '';
    private _driverLicenseCategoryOption: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Identification',
        settings: {
            mothersMaidenNameCategoryOption: {
                key: 'Identification.MothersMaidenNameCategoryOption',
                type: 'string',
                required: true
            },
            driverLicenseCategoryOption: {
                key: 'Identification.DriverLicenseCategoryOption',
                type: 'string',
                required: true
            }
        }
    };

    /** Mother's maiden name category option */
    get mothersMaidenNameCategoryOption(): string {
        return this._mothersMaidenNameCategoryOption;
    }
    set mothersMaidenNameCategoryOption(value: string) {
        this._mothersMaidenNameCategoryOption = value;
    }

    /** Driver's license category option */
    get driverLicenseCategoryOption(): string {
        return this._driverLicenseCategoryOption;
    }
    set driverLicenseCategoryOption(value: string) {
        this._driverLicenseCategoryOption = value;
    }

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        if (this._settings.length) {
            return this._settings;
        }

        return [
            {
                key: Identification.metadata.settings.mothersMaidenNameCategoryOption.key,
                value: this._mothersMaidenNameCategoryOption,
                dataType: 'string'
            },
            {
                key: Identification.metadata.settings.driverLicenseCategoryOption.key,
                value: this._driverLicenseCategoryOption,
                dataType: 'string'
            }
        ];
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;

        for (const setting of settings) {
            switch (setting.key) {
                case Identification.metadata.settings.mothersMaidenNameCategoryOption.key:
                    this._mothersMaidenNameCategoryOption = setting.value;
                    break;
                case Identification.metadata.settings.driverLicenseCategoryOption.key:
                    this._driverLicenseCategoryOption = setting.value;
                    break;
            }
        }
    }
}