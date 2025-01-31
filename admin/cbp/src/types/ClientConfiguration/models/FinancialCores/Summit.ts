import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';
import { RegularAchTransfers } from './SummitSettings/RegularAchTransfers';

/**
 * Configuration interface for Summit settings
 */
export interface SummitConfig {
    TransferCommandCode: string;
    SegmintMarketingIdEnabled: string;
    UseTwelveDigitTransactionAmount: boolean;
    RegularAchTransfers: RegularAchTransfers;
}

/**
 * Settings for Summit configuration
 */
export class Summit implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _transferCommandCode: string = '';
    private _segmintMarketingIdEnabled: string = '';
    private _useTwelveDigitTransactionAmount: boolean = false;
    private _regularAchTransfers: RegularAchTransfers = new RegularAchTransfers();

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Summit',
        settings: {
            transferCommandCode: {
                key: 'Summit.TransferCommandCode',
                type: 'string',
                required: true
            },
            segmintMarketingIdEnabled: {
                key: 'Summit.SegmintMarketingIdEnabled',
                type: 'string',
                required: true
            },
            useTwelveDigitTransactionAmount: {
                key: 'Summit.UseTwelveDigitTransactionAmount',
                type: 'boolean',
                required: true
            },
            regularAchTransfers: {
                key: 'Summit.RegularAchTransfers',
                type: 'json',
                required: true
            }
        }
    };

    /** Command code for transfers */
    get transferCommandCode(): string {
        return this._transferCommandCode;
    }
    set transferCommandCode(value: string) {
        this._transferCommandCode = value;
    }

    /** Segmint marketing ID enabled flag */
    get segmintMarketingIdEnabled(): string {
        return this._segmintMarketingIdEnabled;
    }
    set segmintMarketingIdEnabled(value: string) {
        this._segmintMarketingIdEnabled = value;
    }

    /** Use twelve digit transaction amount flag */
    get useTwelveDigitTransactionAmount(): boolean {
        return this._useTwelveDigitTransactionAmount;
    }
    set useTwelveDigitTransactionAmount(value: boolean) {
        this._useTwelveDigitTransactionAmount = value;
    }

    /** Regular ACH transfers settings */
    get regularAchTransfers(): RegularAchTransfers {
        return this._regularAchTransfers;
    }
    set regularAchTransfers(value: RegularAchTransfers) {
        this._regularAchTransfers = value;
    }

    constructor() { }

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        if (this._settings.length) {
            return this._settings;
        }

        return [
            {
                key: Summit.metadata.settings.transferCommandCode.key,
                value: this._transferCommandCode,
                dataType: 'string'
            },
            {
                key: Summit.metadata.settings.segmintMarketingIdEnabled.key,
                value: this._segmintMarketingIdEnabled,
                dataType: 'string'
            },
            {
                key: Summit.metadata.settings.useTwelveDigitTransactionAmount.key,
                value: String(this._useTwelveDigitTransactionAmount),
                dataType: 'boolean'
            },
            {
                key: Summit.metadata.settings.regularAchTransfers.key,
                value: JSON.stringify(this._regularAchTransfers.toSettings()),
                dataType: 'json'
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
                case Summit.metadata.settings.transferCommandCode.key:
                    this._transferCommandCode = setting.value;
                    break;
                case Summit.metadata.settings.segmintMarketingIdEnabled.key:
                    this._segmintMarketingIdEnabled = setting.value;
                    break;
                case Summit.metadata.settings.useTwelveDigitTransactionAmount.key:
                    this._useTwelveDigitTransactionAmount = setting.value.toLowerCase() === 'true';
                    break;
                case Summit.metadata.settings.regularAchTransfers.key:
                    const regularAchTransfersSettings = JSON.parse(setting.value);
                    this._regularAchTransfers.fromSettings(regularAchTransfersSettings);
                    break;
            }
        }
    }
}