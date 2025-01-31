import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for Notes settings
 */
export interface NotesConfig {
    ClearBadAddressFlagOnNoChange: boolean;
}

/**
 * Settings for Notes configuration
 */
export class Notes implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _clearBadAddressFlagOnNoChange: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Notes',
        settings: {
            clearBadAddressFlagOnNoChange: {
                key: 'Notes.ClearBadAddressFlagOnNoChange',
                type: 'boolean',
                required: true
            }
        }
    };

    /** Whether to clear bad address flag on no change */
    get clearBadAddressFlagOnNoChange(): boolean {
        return this._clearBadAddressFlagOnNoChange;
    }
    set clearBadAddressFlagOnNoChange(value: boolean) {
        this._clearBadAddressFlagOnNoChange = value;
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
                key: Notes.metadata.settings.clearBadAddressFlagOnNoChange.key,
                value: String(this._clearBadAddressFlagOnNoChange),
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
                case Notes.metadata.settings.clearBadAddressFlagOnNoChange.key:
                    this._clearBadAddressFlagOnNoChange = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}