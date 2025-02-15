import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for draft lookup settings
 */
export interface DraftLookupConfig {
    AccountNumberLength?: number | null;
}

/**
 * Settings for draft lookup configuration
 */
export class DraftLookup implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _accountNumberLength: number | null = null;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DraftLookup',
        settings: {
            accountNumberLength: {
                key: 'DraftLookup.AccountNumberLength',
                type: 'number',
                required: false
            }
        }
    };

    /** Length of the account number for draft lookup */
    get accountNumberLength(): number | null {
        return this._accountNumberLength;
    }
    set accountNumberLength(value: number | null) {
        this._accountNumberLength = value;
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
                key: DraftLookup.metadata.settings.accountNumberLength.key,
                value: this._accountNumberLength?.toString() ?? '',
                dataType: 'number'
            }
        ];
    }

    /**
     * Load settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;

        for (const setting of settings) {
            switch (setting.key) {
                case DraftLookup.metadata.settings.accountNumberLength.key:
                    this._accountNumberLength = setting.value ? Number(setting.value) : null;
                    break;
            }
        }
    }
}