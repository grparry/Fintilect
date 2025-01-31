import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for account type settings
 */
export interface AccountTypeSettingsConfig {
    AccountTypeSerial: string;
    AccountRelationshipSerial: string;
    RestrictAccountOnCreate: boolean;
}

/**
 * Settings for account type configuration
 */
export class AccountTypeSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _accountTypeSerial: string = '';
    private _accountRelationshipSerial: string = '';
    private _restrictAccountOnCreate: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountTypeSettings',
        settings: {
            accountTypeSerial: {
                key: 'AccountTypeSettings.AccountTypeSerial',
                type: 'string',
                required: true
            },
            accountRelationshipSerial: {
                key: 'AccountTypeSettings.AccountRelationshipSerial',
                type: 'string',
                required: true
            },
            restrictAccountOnCreate: {
                key: 'AccountTypeSettings.RestrictAccountOnCreate',
                type: 'boolean',
                required: false
            }
        }
    };

    /** The account type serial */
    get accountTypeSerial(): string {
        return this._accountTypeSerial;
    }
    set accountTypeSerial(value: string) {
        this._accountTypeSerial = value;
    }

    /** The account relationship serial */
    get accountRelationshipSerial(): string {
        return this._accountRelationshipSerial;
    }
    set accountRelationshipSerial(value: string) {
        this._accountRelationshipSerial = value;
    }

    /** Whether to restrict account creation */
    get restrictAccountOnCreate(): boolean {
        return this._restrictAccountOnCreate;
    }
    set restrictAccountOnCreate(value: boolean) {
        this._restrictAccountOnCreate = value;
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
                key: AccountTypeSettings.metadata.settings.accountTypeSerial.key,
                value: this._accountTypeSerial,
                dataType: 'string'
            },
            {
                key: AccountTypeSettings.metadata.settings.accountRelationshipSerial.key,
                value: this._accountRelationshipSerial,
                dataType: 'string'
            },
            {
                key: AccountTypeSettings.metadata.settings.restrictAccountOnCreate.key,
                value: this._restrictAccountOnCreate.toString(),
                dataType: 'boolean'
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
                case AccountTypeSettings.metadata.settings.accountTypeSerial.key:
                    this._accountTypeSerial = setting.value;
                    break;
                case AccountTypeSettings.metadata.settings.accountRelationshipSerial.key:
                    this._accountRelationshipSerial = setting.value;
                    break;
                case AccountTypeSettings.metadata.settings.restrictAccountOnCreate.key:
                    this._restrictAccountOnCreate = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}