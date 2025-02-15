import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for card type settings
 */
export interface CardTypeSettingsConfig {
    AtmSerial: string;
    AtmDescription: string;
    CreditSerial: string;
    CreditDescription: string;
    DebitSerial: string;
    DebitDescription: string;
}

/**
 * Settings for card type configuration
 */
export class CardTypeSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _atmSerial: string = '';
    private _atmDescription: string = '';
    private _creditSerial: string = '';
    private _creditDescription: string = '';
    private _debitSerial: string = '';
    private _debitDescription: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardTypeSettings',
        settings: {
            atmSerial: {
                key: 'CardTypeSettings.AtmSerial',
                type: 'string',
                required: true
            },
            atmDescription: {
                key: 'CardTypeSettings.AtmDescription',
                type: 'string',
                required: true
            },
            creditSerial: {
                key: 'CardTypeSettings.CreditSerial',
                type: 'string',
                required: true
            },
            creditDescription: {
                key: 'CardTypeSettings.CreditDescription',
                type: 'string',
                required: true
            },
            debitSerial: {
                key: 'CardTypeSettings.DebitSerial',
                type: 'string',
                required: true
            },
            debitDescription: {
                key: 'CardTypeSettings.DebitDescription',
                type: 'string',
                required: true
            }
        }
    };

    /** Serial number for ATM card type */
    get atmSerial(): string {
        return this._atmSerial;
    }
    set atmSerial(value: string) {
        this._atmSerial = value;
    }

    /** Description for ATM card type */
    get atmDescription(): string {
        return this._atmDescription;
    }
    set atmDescription(value: string) {
        this._atmDescription = value;
    }

    /** Serial number for credit card type */
    get creditSerial(): string {
        return this._creditSerial;
    }
    set creditSerial(value: string) {
        this._creditSerial = value;
    }

    /** Description for credit card type */
    get creditDescription(): string {
        return this._creditDescription;
    }
    set creditDescription(value: string) {
        this._creditDescription = value;
    }

    /** Serial number for debit card type */
    get debitSerial(): string {
        return this._debitSerial;
    }
    set debitSerial(value: string) {
        this._debitSerial = value;
    }

    /** Description for debit card type */
    get debitDescription(): string {
        return this._debitDescription;
    }
    set debitDescription(value: string) {
        this._debitDescription = value;
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
                key: CardTypeSettings.metadata.settings.atmSerial.key,
                value: this._atmSerial,
                dataType: 'string'
            },
            {
                key: CardTypeSettings.metadata.settings.atmDescription.key,
                value: this._atmDescription,
                dataType: 'string'
            },
            {
                key: CardTypeSettings.metadata.settings.creditSerial.key,
                value: this._creditSerial,
                dataType: 'string'
            },
            {
                key: CardTypeSettings.metadata.settings.creditDescription.key,
                value: this._creditDescription,
                dataType: 'string'
            },
            {
                key: CardTypeSettings.metadata.settings.debitSerial.key,
                value: this._debitSerial,
                dataType: 'string'
            },
            {
                key: CardTypeSettings.metadata.settings.debitDescription.key,
                value: this._debitDescription,
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
                case CardTypeSettings.metadata.settings.atmSerial.key:
                    this._atmSerial = setting.value;
                    break;
                case CardTypeSettings.metadata.settings.atmDescription.key:
                    this._atmDescription = setting.value;
                    break;
                case CardTypeSettings.metadata.settings.creditSerial.key:
                    this._creditSerial = setting.value;
                    break;
                case CardTypeSettings.metadata.settings.creditDescription.key:
                    this._creditDescription = setting.value;
                    break;
                case CardTypeSettings.metadata.settings.debitSerial.key:
                    this._debitSerial = setting.value;
                    break;
                case CardTypeSettings.metadata.settings.debitDescription.key:
                    this._debitDescription = setting.value;
                    break;
            }
        }
    }
}