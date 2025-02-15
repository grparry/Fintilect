import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for DNA settings
 */
export interface DNAConfig {
    SuccessfulLoginCoreField: string;
    ExtraStatementAccountsCoreUserField: string;
    MapDormantAccounts: boolean;
    ValidDebitCardStatusCodes: string;
}

/**
 * Settings for DNA configuration
 */
export class DNA implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _successfulLoginCoreField: string = '';
    private _extraStatementAccountsCoreUserField: string = '';
    private _mapDormantAccounts: boolean = false;
    private _validDebitCardStatusCodes: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DNA',
        settings: {
            successfulLoginCoreField: {
                key: 'DNA.SuccessfulLoginCoreField',
                type: 'string',
                required: true
            },
            extraStatementAccountsCoreUserField: {
                key: 'DNA.ExtraStatementAccountsCoreUserField',
                type: 'string',
                required: true
            },
            mapDormantAccounts: {
                key: 'DNA.MapDormantAccounts',
                type: 'boolean',
                required: true
            },
            validDebitCardStatusCodes: {
                key: 'DNA.ValidDebitCardStatusCodes',
                type: 'string',
                required: true
            }
        }
    };

    /** Successful login core field */
    get successfulLoginCoreField(): string {
        return this._successfulLoginCoreField;
    }
    set successfulLoginCoreField(value: string) {
        this._successfulLoginCoreField = value;
    }

    /** Extra statement accounts core user field */
    get extraStatementAccountsCoreUserField(): string {
        return this._extraStatementAccountsCoreUserField;
    }
    set extraStatementAccountsCoreUserField(value: string) {
        this._extraStatementAccountsCoreUserField = value;
    }

    /** Map dormant accounts flag */
    get mapDormantAccounts(): boolean {
        return this._mapDormantAccounts;
    }
    set mapDormantAccounts(value: boolean) {
        this._mapDormantAccounts = value;
    }

    /** Valid debit card status codes */
    get validDebitCardStatusCodes(): string {
        return this._validDebitCardStatusCodes;
    }
    set validDebitCardStatusCodes(value: string) {
        this._validDebitCardStatusCodes = value;
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
                key: DNA.metadata.settings.successfulLoginCoreField.key,
                value: this._successfulLoginCoreField,
                dataType: 'string'
            },
            {
                key: DNA.metadata.settings.extraStatementAccountsCoreUserField.key,
                value: this._extraStatementAccountsCoreUserField,
                dataType: 'string'
            },
            {
                key: DNA.metadata.settings.mapDormantAccounts.key,
                value: String(this._mapDormantAccounts),
                dataType: 'boolean'
            },
            {
                key: DNA.metadata.settings.validDebitCardStatusCodes.key,
                value: this._validDebitCardStatusCodes,
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
                case DNA.metadata.settings.successfulLoginCoreField.key:
                    this._successfulLoginCoreField = setting.value;
                    break;
                case DNA.metadata.settings.extraStatementAccountsCoreUserField.key:
                    this._extraStatementAccountsCoreUserField = setting.value;
                    break;
                case DNA.metadata.settings.mapDormantAccounts.key:
                    this._mapDormantAccounts = setting.value.toLowerCase() === 'true';
                    break;
                case DNA.metadata.settings.validDebitCardStatusCodes.key:
                    this._validDebitCardStatusCodes = setting.value;
                    break;
            }
        }
    }
}