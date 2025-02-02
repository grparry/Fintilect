import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';

/**
 * Settings for password-related UI functionality
 */
export class PasswordSettings implements ISettingsGroup {
    private _minVersion: number = 1.0;
    private _canViewPasswordAsPlainTextAtLoginEnabled: boolean = false;
    private _showForgotUserIdButtonOnInvalidLoginControlEnabled: boolean = false;
    private _shouldUsePlainTextForShowHidePasswordToggle: boolean = false;

    /**
     * The minimum version required for password functionality
     */
    get minVersion(): number {
        return this._minVersion;
    }
    set minVersion(value: number) {
        this._minVersion = value;
    }

    /**
     * Whether users can view their password as plain text at login
     */
    get canViewPasswordAsPlainTextAtLoginEnabled(): boolean {
        return this._canViewPasswordAsPlainTextAtLoginEnabled;
    }
    set canViewPasswordAsPlainTextAtLoginEnabled(value: boolean) {
        this._canViewPasswordAsPlainTextAtLoginEnabled = value;
    }

    /**
     * Whether to show the forgot user ID button on the invalid login control
     */
    get showForgotUserIdButtonOnInvalidLoginControlEnabled(): boolean {
        return this._showForgotUserIdButtonOnInvalidLoginControlEnabled;
    }
    set showForgotUserIdButtonOnInvalidLoginControlEnabled(value: boolean) {
        this._showForgotUserIdButtonOnInvalidLoginControlEnabled = value;
    }

    /**
     * If true, then use 'Show' or 'Hide' as plain text instead of the eye-ball icon
     * on the login page in the group-addon span
     */
    get shouldUsePlainTextForShowHidePasswordToggle(): boolean {
        return this._shouldUsePlainTextForShowHidePasswordToggle;
    }
    set shouldUsePlainTextForShowHidePasswordToggle(value: boolean) {
        this._shouldUsePlainTextForShowHidePasswordToggle = value;
    }

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PasswordSettings',
        settings: {
            minVersion: {
                key: 'Features.Login.Password.MinVersion',
                type: 'number',
                required: false
            },
            canViewPasswordAsPlainTextAtLoginEnabled: {
                key: 'PasswordSettings.CanViewPasswordAsPlainTextAtLoginEnabled',
                type: 'boolean',
                required: false
            },
            showForgotUserIdButtonOnInvalidLoginControlEnabled: {
                key: 'PasswordSettings.ShowForgotUserIdButtonOnInvalidLoginControlEnabled',
                type: 'boolean',
                required: false
            },
            shouldUsePlainTextForShowHidePasswordToggle: {
                key: 'PasswordSettings.UsePlainTextForShowHidePasswordToggle',
                type: 'boolean',
                required: false
            }
        }
    };

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        return [
            {
                key: PasswordSettings.metadata.settings.minVersion.key,
                value: this._minVersion.toString(),
                dataType: 'number'
            },
            {
                key: PasswordSettings.metadata.settings.canViewPasswordAsPlainTextAtLoginEnabled.key,
                value: this._canViewPasswordAsPlainTextAtLoginEnabled.toString(),
                dataType: 'boolean'
            },
            {
                key: PasswordSettings.metadata.settings.showForgotUserIdButtonOnInvalidLoginControlEnabled.key,
                value: this._showForgotUserIdButtonOnInvalidLoginControlEnabled.toString(),
                dataType: 'boolean'
            },
            {
                key: PasswordSettings.metadata.settings.shouldUsePlainTextForShowHidePasswordToggle.key,
                value: this._shouldUsePlainTextForShowHidePasswordToggle.toString(),
                dataType: 'boolean'
            }
        ];
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        for (const setting of settings) {
            switch (setting.key) {
                case PasswordSettings.metadata.settings.minVersion.key:
                    this._minVersion = parseFloat(setting.value);
                    break;
                case PasswordSettings.metadata.settings.canViewPasswordAsPlainTextAtLoginEnabled.key:
                    this._canViewPasswordAsPlainTextAtLoginEnabled = setting.value.toLowerCase() === 'true';
                    break;
                case PasswordSettings.metadata.settings.showForgotUserIdButtonOnInvalidLoginControlEnabled.key:
                    this._showForgotUserIdButtonOnInvalidLoginControlEnabled = setting.value.toLowerCase() === 'true';
                    break;
                case PasswordSettings.metadata.settings.shouldUsePlainTextForShowHidePasswordToggle.key:
                    this._shouldUsePlainTextForShowHidePasswordToggle = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}
