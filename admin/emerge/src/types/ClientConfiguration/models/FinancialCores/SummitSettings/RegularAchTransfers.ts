import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for regular ACH transfers
 */
export interface RegularAchTransfersConfig {
    TransferCommandCode: string;
    FTCode: string;
    Description: string;
    DescriptionInHistoryDisplay: string;
}

/**
 * Settings for regular ACH transfers configuration
 */
export class RegularAchTransfers implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _transferCommandCode: string = '';
    private _fTCode: string = '';
    private _description: string = '';
    private _descriptionInHistoryDisplay: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RegularAchTransfers',
        settings: {
            transferCommandCode: {
                key: 'RegularAchTransfers.TransferCommandCode',
                type: 'string',
                required: true
            },
            fTCode: {
                key: 'RegularAchTransfers.FTCode',
                type: 'string',
                required: true
            },
            description: {
                key: 'RegularAchTransfers.Description',
                type: 'string',
                required: true
            },
            descriptionInHistoryDisplay: {
                key: 'RegularAchTransfers.DescriptionInHistoryDisplay',
                type: 'string',
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

    /** FT code */
    get fTCode(): string {
        return this._fTCode;
    }
    set fTCode(value: string) {
        this._fTCode = value;
    }

    /** Description */
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }

    /** Description shown in history display */
    get descriptionInHistoryDisplay(): string {
        return this._descriptionInHistoryDisplay;
    }
    set descriptionInHistoryDisplay(value: string) {
        this._descriptionInHistoryDisplay = value;
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
                key: RegularAchTransfers.metadata.settings.transferCommandCode.key,
                value: this._transferCommandCode,
                dataType: 'string'
            },
            {
                key: RegularAchTransfers.metadata.settings.fTCode.key,
                value: this._fTCode,
                dataType: 'string'
            },
            {
                key: RegularAchTransfers.metadata.settings.description.key,
                value: this._description,
                dataType: 'string'
            },
            {
                key: RegularAchTransfers.metadata.settings.descriptionInHistoryDisplay.key,
                value: this._descriptionInHistoryDisplay,
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
                case RegularAchTransfers.metadata.settings.transferCommandCode.key:
                    this._transferCommandCode = setting.value;
                    break;
                case RegularAchTransfers.metadata.settings.fTCode.key:
                    this._fTCode = setting.value;
                    break;
                case RegularAchTransfers.metadata.settings.description.key:
                    this._description = setting.value;
                    break;
                case RegularAchTransfers.metadata.settings.descriptionInHistoryDisplay.key:
                    this._descriptionInHistoryDisplay = setting.value;
                    break;
            }
        }
    }
}