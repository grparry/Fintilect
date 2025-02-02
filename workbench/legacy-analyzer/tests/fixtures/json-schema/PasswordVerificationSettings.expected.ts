import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';

/**
 * Settings for password verification functionality
 */
export class PasswordVerificationSettings implements ISettingsGroup {
    /**
     * Whether the password reset functionality should prevent using social security numbers in passwords
     */
    get passwordResetCannotContainSSNumber(): boolean {
        const setting = this.toSettings().find(s => 
            s.key === PasswordVerificationSettings.metadata.settings.passwordResetCannotContainSSNumber.key
        );
        return setting ? setting.value.toLowerCase() === 'true' : false;
    }
    set passwordResetCannotContainSSNumber(value: boolean) {
        this._settings = this.toSettings().map(s => {
            if (s.key === PasswordVerificationSettings.metadata.settings.passwordResetCannotContainSSNumber.key) {
                return { ...s, value: value.toString() };
            }
            return s;
        });
    }

    private _settings: Setting[] = [];

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PasswordVerification',
        settings: {
            passwordResetCannotContainSSNumber: {
                key: 'PasswordVerification.PasswordResetCannotContainSSNumber',
                type: 'boolean',
                required: false
            }
        }
    };

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        return this._settings.length ? this._settings : [
            {
                key: PasswordVerificationSettings.metadata.settings.passwordResetCannotContainSSNumber.key,
                value: 'false',
                dataType: 'boolean'
            }
        ];
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;
    }
}
