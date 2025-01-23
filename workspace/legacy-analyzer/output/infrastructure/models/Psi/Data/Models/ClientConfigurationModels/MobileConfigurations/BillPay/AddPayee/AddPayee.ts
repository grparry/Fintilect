import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AddPayeeConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    IsAccountNumberRequired: boolean;
}

export class AddPayee implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AddPayee'
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

            private _isAccountNumberRequired: boolean;
            get isAccountNumberRequired(): boolean {
                return this._isAccountNumberRequired;
            }
            set isAccountNumberRequired(value: boolean) {
                this._isAccountNumberRequired = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AddPayee.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "AddPayee.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "AddPayee.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "AddPayee.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AddPayee.IsAccountNumberRequired", value: this._isAccountNumberRequired, dataType: 'boolean', label: "Is Account Number Required" },
            ];
        }

}