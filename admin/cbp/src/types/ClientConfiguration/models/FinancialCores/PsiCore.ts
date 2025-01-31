import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for PSI Core settings
 */
export interface PsiCoreConfig {
    SetDateOfBirth: boolean;
}

/**
 * Settings for PSI Core configuration
 */
export class PsiCore implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _setDateOfBirth: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PsiCore',
        settings: {
            setDateOfBirth: {
                key: 'PsiCore.SetDateOfBirth',
                type: 'boolean',
                required: true
            }
        }
    };

    /** Whether to set date of birth */
    get setDateOfBirth(): boolean {
        return this._setDateOfBirth;
    }
    set setDateOfBirth(value: boolean) {
        this._setDateOfBirth = value;
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
                key: PsiCore.metadata.settings.setDateOfBirth.key,
                value: String(this._setDateOfBirth),
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
                case PsiCore.metadata.settings.setDateOfBirth.key:
                    this._setDateOfBirth = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}