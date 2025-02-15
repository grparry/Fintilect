import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';
import { RemoteDepositCheckHold } from './RemoteDepositCheckHold';

/**
 * Configuration interface for remote deposit check hold settings
 */
export interface RemoteDepositCheckHoldSettingsConfig {
    RemoteDepositCheckHold: RemoteDepositCheckHold;
}

/**
 * Settings for remote deposit check hold configuration
 */
export class RemoteDepositCheckHoldSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _remoteDepositCheckHold: RemoteDepositCheckHold = new RemoteDepositCheckHold();

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RemoteDepositCheckHoldSettings',
        settings: {
            remoteDepositCheckHold: {
                key: 'RemoteDepositCheckHoldSettings.RemoteDepositCheckHold',
                type: 'json',
                required: true
            }
        }
    };

    /** Remote deposit check hold settings */
    get remoteDepositCheckHold(): RemoteDepositCheckHold {
        return this._remoteDepositCheckHold;
    }
    set remoteDepositCheckHold(value: RemoteDepositCheckHold) {
        this._remoteDepositCheckHold = value;
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
                key: RemoteDepositCheckHoldSettings.metadata.settings.remoteDepositCheckHold.key,
                value: JSON.stringify(this._remoteDepositCheckHold.toSettings()),
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
            if (setting.key === RemoteDepositCheckHoldSettings.metadata.settings.remoteDepositCheckHold.key) {
                const remoteDepositCheckHoldSettings = JSON.parse(setting.value);
                this._remoteDepositCheckHold.fromSettings(remoteDepositCheckHoldSettings);
            }
        }
    }
}