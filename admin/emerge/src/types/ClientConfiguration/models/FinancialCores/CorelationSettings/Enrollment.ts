import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for enrollment settings
 */
export interface EnrollmentConfig {
    AllowEnrollmentWithMailingAddress: boolean;
}

/**
 * Settings for enrollment configuration
 */
export class Enrollment implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _allowEnrollmentWithMailingAddress: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Enrollment',
        settings: {
            allowEnrollmentWithMailingAddress: {
                key: 'Enrollment.AllowEnrollmentWithMailingAddress',
                type: 'boolean',
                required: true
            }
        }
    };

    /** Whether enrollment with mailing address is allowed */
    get allowEnrollmentWithMailingAddress(): boolean {
        return this._allowEnrollmentWithMailingAddress;
    }
    set allowEnrollmentWithMailingAddress(value: boolean) {
        this._allowEnrollmentWithMailingAddress = value;
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
                key: Enrollment.metadata.settings.allowEnrollmentWithMailingAddress.key,
                value: this._allowEnrollmentWithMailingAddress.toString(),
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
                case Enrollment.metadata.settings.allowEnrollmentWithMailingAddress.key:
                    this._allowEnrollmentWithMailingAddress = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}