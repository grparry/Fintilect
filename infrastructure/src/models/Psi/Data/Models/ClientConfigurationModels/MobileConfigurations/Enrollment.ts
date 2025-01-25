import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EnrollmentConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    IsPinRequired: boolean;
    IsZipCodeRequired: boolean;
}

export class Enrollment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Enrollment'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _isPinRequired: boolean;
            get isPinRequired(): boolean {
                return this._isPinRequired;
            }
            set isPinRequired(value: boolean) {
                this._isPinRequired = value;
            }

            private _isZipCodeRequired: boolean;
            get isZipCodeRequired(): boolean {
                return this._isZipCodeRequired;
            }
            set isZipCodeRequired(value: boolean) {
                this._isZipCodeRequired = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Enrollment.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "Enrollment.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Enrollment.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Enrollment.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Enrollment.IsPinRequired", value: this._isPinRequired, dataType: 'boolean', label: "Is Pin Required" },
                { key: "Enrollment.IsZipCodeRequired", value: this._isZipCodeRequired, dataType: 'boolean', label: "Is Zip Code Required" },
            ];
        }

}