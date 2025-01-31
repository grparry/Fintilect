import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for funding settings
 */
export interface FundingConfig {
    FundingIsEnabled: boolean;
    FromMemberAccountNumber: string;
    FromAccountNumber: string;
    Description: string;
}

/**
 * Settings for funding configuration
 */
export class Funding implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _fundingIsEnabled: boolean = false;
    private _fromMemberAccountNumber: string = '';
    private _fromAccountNumber: string = '';
    private _description: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Funding',
        settings: {
            fundingIsEnabled: {
                key: 'Funding.FundingIsEnabled',
                type: 'boolean',
                required: true
            },
            fromMemberAccountNumber: {
                key: 'Funding.FromMemberAccountNumber',
                type: 'string',
                required: true
            },
            fromAccountNumber: {
                key: 'Funding.FromAccountNumber',
                type: 'string',
                required: true
            },
            description: {
                key: 'Funding.Description',
                type: 'string',
                required: false
            }
        }
    };

    /** Whether funding is enabled */
    get fundingIsEnabled(): boolean {
        return this._fundingIsEnabled;
    }
    set fundingIsEnabled(value: boolean) {
        this._fundingIsEnabled = value;
    }

    /** Member account number for funding source */
    get fromMemberAccountNumber(): string {
        return this._fromMemberAccountNumber;
    }
    set fromMemberAccountNumber(value: string) {
        this._fromMemberAccountNumber = value;
    }

    /** Account number for funding source */
    get fromAccountNumber(): string {
        return this._fromAccountNumber;
    }
    set fromAccountNumber(value: string) {
        this._fromAccountNumber = value;
    }

    /** Description of the funding configuration */
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
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
                key: Funding.metadata.settings.fundingIsEnabled.key,
                value: this._fundingIsEnabled.toString(),
                dataType: 'boolean'
            },
            {
                key: Funding.metadata.settings.fromMemberAccountNumber.key,
                value: this._fromMemberAccountNumber,
                dataType: 'string'
            },
            {
                key: Funding.metadata.settings.fromAccountNumber.key,
                value: this._fromAccountNumber,
                dataType: 'string'
            },
            {
                key: Funding.metadata.settings.description.key,
                value: this._description,
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
                case Funding.metadata.settings.fundingIsEnabled.key:
                    this._fundingIsEnabled = setting.value.toLowerCase() === 'true';
                    break;
                case Funding.metadata.settings.fromMemberAccountNumber.key:
                    this._fromMemberAccountNumber = setting.value;
                    break;
                case Funding.metadata.settings.fromAccountNumber.key:
                    this._fromAccountNumber = setting.value;
                    break;
                case Funding.metadata.settings.description.key:
                    this._description = setting.value;
                    break;
            }
        }
    }
}