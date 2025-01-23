import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PasswordSettingsConfig {
    MinVersion: number;
    CanViewPasswordAsPlainTextAtLoginEnabled: boolean;
    ShowForgotUserIdButtonOnInvalidLoginControlEnabled: boolean;
    ShouldUsePlainTextForShowHidePasswordToggle: boolean;
}

export class PasswordSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PasswordSettings'
    };


            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _canViewPasswordAsPlainTextAtLoginEnabled: boolean;
            get canViewPasswordAsPlainTextAtLoginEnabled(): boolean {
                return this._canViewPasswordAsPlainTextAtLoginEnabled;
            }
            set canViewPasswordAsPlainTextAtLoginEnabled(value: boolean) {
                this._canViewPasswordAsPlainTextAtLoginEnabled = value;
            }

            private _showForgotUserIdButtonOnInvalidLoginControlEnabled: boolean;
            get showForgotUserIdButtonOnInvalidLoginControlEnabled(): boolean {
                return this._showForgotUserIdButtonOnInvalidLoginControlEnabled;
            }
            set showForgotUserIdButtonOnInvalidLoginControlEnabled(value: boolean) {
                this._showForgotUserIdButtonOnInvalidLoginControlEnabled = value;
            }

            private _shouldUsePlainTextForShowHidePasswordToggle: boolean;
            get shouldUsePlainTextForShowHidePasswordToggle(): boolean {
                return this._shouldUsePlainTextForShowHidePasswordToggle;
            }
            set shouldUsePlainTextForShowHidePasswordToggle(value: boolean) {
                this._shouldUsePlainTextForShowHidePasswordToggle = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PasswordSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "PasswordSettings.CanViewPasswordAsPlainTextAtLoginEnabled", value: this._canViewPasswordAsPlainTextAtLoginEnabled, dataType: 'boolean', label: "Can View Password As Plain Text At Login Enabled" },
                { key: "PasswordSettings.ShowForgotUserIdButtonOnInvalidLoginControlEnabled", value: this._showForgotUserIdButtonOnInvalidLoginControlEnabled, dataType: 'boolean', label: "Show Forgot User Id Button On Invalid Login Control Enabled" },
                { key: "PasswordSettings.ShouldUsePlainTextForShowHidePasswordToggle", value: this._shouldUsePlainTextForShowHidePasswordToggle, dataType: 'boolean', label: "Should Use Plain Text For Show Hide Password Toggle" },
            ];
        }

}