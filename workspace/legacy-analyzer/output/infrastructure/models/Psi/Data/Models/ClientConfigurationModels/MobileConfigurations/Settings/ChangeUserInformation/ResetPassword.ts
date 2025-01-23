import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ResetPasswordConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    IsUsernameRequired: boolean;
}

export class ResetPassword implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ResetPassword'
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

            private _isUsernameRequired: boolean;
            get isUsernameRequired(): boolean {
                return this._isUsernameRequired;
            }
            set isUsernameRequired(value: boolean) {
                this._isUsernameRequired = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ResetPassword.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "ResetPassword.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "ResetPassword.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "ResetPassword.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ResetPassword.IsUsernameRequired", value: this._isUsernameRequired, dataType: 'boolean', label: "Is Username Required" },
            ];
        }

}