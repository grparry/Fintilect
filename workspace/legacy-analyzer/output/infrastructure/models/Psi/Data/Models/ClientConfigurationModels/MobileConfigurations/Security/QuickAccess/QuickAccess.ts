import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { QuickAccessPin } from './QuickAccessPin';
export interface QuickAccessConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    ReturnPage: string;
    DeleteTokensFromWebEnabled: boolean;
    LoginScreenButtonEnabled: boolean;
    EnrollOnLoginEnabled: boolean;
    Pin: QuickAccessPin;
}

export class QuickAccess implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'QuickAccess'
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

            private _returnPage: string;
            get returnPage(): string {
                return this._returnPage;
            }
            set returnPage(value: string) {
                this._returnPage = value;
            }

            private _deleteTokensFromWebEnabled: boolean;
            get deleteTokensFromWebEnabled(): boolean {
                return this._deleteTokensFromWebEnabled;
            }
            set deleteTokensFromWebEnabled(value: boolean) {
                this._deleteTokensFromWebEnabled = value;
            }

            private _loginScreenButtonEnabled: boolean;
            get loginScreenButtonEnabled(): boolean {
                return this._loginScreenButtonEnabled;
            }
            set loginScreenButtonEnabled(value: boolean) {
                this._loginScreenButtonEnabled = value;
            }

            private _enrollOnLoginEnabled: boolean;
            get enrollOnLoginEnabled(): boolean {
                return this._enrollOnLoginEnabled;
            }
            set enrollOnLoginEnabled(value: boolean) {
                this._enrollOnLoginEnabled = value;
            }

            private _pin: QuickAccessPin;
            get pin(): QuickAccessPin {
                return this._pin;
            }
            set pin(value: QuickAccessPin) {
                this._pin = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "QuickAccess.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "QuickAccess.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "QuickAccess.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "QuickAccess.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "QuickAccess.ReturnPage", value: this._returnPage, dataType: 'string', label: "Return Page" },
                { key: "QuickAccess.DeleteTokensFromWebEnabled", value: this._deleteTokensFromWebEnabled, dataType: 'boolean', label: "Delete Tokens From Web Enabled" },
                { key: "QuickAccess.LoginScreenButtonEnabled", value: this._loginScreenButtonEnabled, dataType: 'boolean', label: "Login Screen Button Enabled" },
                { key: "QuickAccess.EnrollOnLoginEnabled", value: this._enrollOnLoginEnabled, dataType: 'boolean', label: "Enroll On Login Enabled" },
                { key: "QuickAccess.Pin", value: this._pin, dataType: 'quickaccesspin', label: "Pin" },
            ];
        }

}