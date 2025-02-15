import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for pull credit settings
 */
export interface PullCreditSettingsConfig {
    ProductValue: string;
    BureauValue: string;
    TypeSerialValue: string;
}

/**
 * Settings for credit pull configuration
 */
export class PullCreditSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _productValue: string = '';
    private _bureauValue: string = '';
    private _typeSerialValue: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PullCreditSettings',
        settings: {
            productValue: {
                key: 'PullCreditSettings.ProductValue',
                type: 'string',
                required: true
            },
            bureauValue: {
                key: 'PullCreditSettings.BureauValue',
                type: 'string',
                required: true
            },
            typeSerialValue: {
                key: 'PullCreditSettings.TypeSerialValue',
                type: 'string',
                required: true
            }
        }
    };

    /** Product value for credit pull */
    get productValue(): string {
        return this._productValue;
    }
    set productValue(value: string) {
        this._productValue = value;
    }

    /** Bureau value for credit pull */
    get bureauValue(): string {
        return this._bureauValue;
    }
    set bureauValue(value: string) {
        this._bureauValue = value;
    }

    /** Type serial value for credit pull */
    get typeSerialValue(): string {
        return this._typeSerialValue;
    }
    set typeSerialValue(value: string) {
        this._typeSerialValue = value;
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
                key: PullCreditSettings.metadata.settings.productValue.key,
                value: this._productValue,
                dataType: 'string'
            },
            {
                key: PullCreditSettings.metadata.settings.bureauValue.key,
                value: this._bureauValue,
                dataType: 'string'
            },
            {
                key: PullCreditSettings.metadata.settings.typeSerialValue.key,
                value: this._typeSerialValue,
                dataType: 'string'
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
                case PullCreditSettings.metadata.settings.productValue.key:
                    this._productValue = setting.value;
                    break;
                case PullCreditSettings.metadata.settings.bureauValue.key:
                    this._bureauValue = setting.value;
                    break;
                case PullCreditSettings.metadata.settings.typeSerialValue.key:
                    this._typeSerialValue = setting.value;
                    break;
            }
        }
    }
}