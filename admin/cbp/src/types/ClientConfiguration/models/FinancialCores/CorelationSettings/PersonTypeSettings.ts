import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for person type settings
 */
export interface PersonTypeSettingsConfig {
    SubUserPersonTypeSerial: string;
    LoginIdFormat: string;
    PersonCentricLoginIdFormat: string;
}

/**
 * Settings for person type configuration
 */
export class PersonTypeSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _subUserPersonTypeSerial: string = '';
    private _loginIdFormat: string = '';
    private _personCentricLoginIdFormat: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PersonTypeSettings',
        settings: {
            subUserPersonTypeSerial: {
                key: 'PersonTypeSettings.SubUserPersonTypeSerial',
                type: 'string',
                required: true
            },
            loginIdFormat: {
                key: 'PersonTypeSettings.LoginIdFormat',
                type: 'string',
                required: true
            },
            personCentricLoginIdFormat: {
                key: 'PersonTypeSettings.PersonCentricLoginIdFormat',
                type: 'string',
                required: true
            }
        }
    };

    /** Serial number for sub-user person type */
    get subUserPersonTypeSerial(): string {
        return this._subUserPersonTypeSerial;
    }
    set subUserPersonTypeSerial(value: string) {
        this._subUserPersonTypeSerial = value;
    }

    /** Format for login IDs */
    get loginIdFormat(): string {
        return this._loginIdFormat;
    }
    set loginIdFormat(value: string) {
        this._loginIdFormat = value;
    }

    /** Format for person-centric login IDs */
    get personCentricLoginIdFormat(): string {
        return this._personCentricLoginIdFormat;
    }
    set personCentricLoginIdFormat(value: string) {
        this._personCentricLoginIdFormat = value;
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
                key: PersonTypeSettings.metadata.settings.subUserPersonTypeSerial.key,
                value: this._subUserPersonTypeSerial,
                dataType: 'string'
            },
            {
                key: PersonTypeSettings.metadata.settings.loginIdFormat.key,
                value: this._loginIdFormat,
                dataType: 'string'
            },
            {
                key: PersonTypeSettings.metadata.settings.personCentricLoginIdFormat.key,
                value: this._personCentricLoginIdFormat,
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
                case PersonTypeSettings.metadata.settings.subUserPersonTypeSerial.key:
                    this._subUserPersonTypeSerial = setting.value;
                    break;
                case PersonTypeSettings.metadata.settings.loginIdFormat.key:
                    this._loginIdFormat = setting.value;
                    break;
                case PersonTypeSettings.metadata.settings.personCentricLoginIdFormat.key:
                    this._personCentricLoginIdFormat = setting.value;
                    break;
            }
        }
    }
}