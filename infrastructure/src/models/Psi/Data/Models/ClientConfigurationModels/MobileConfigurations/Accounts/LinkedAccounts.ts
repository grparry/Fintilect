import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication.Authentication';
export interface LinkedAccountsConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    VerifyAccountEnabled: boolean;
    LinkedAccountNameRegex: string;
    ShowDeletedAccountsEnabled: boolean;
    Authentication: Authentication;
}

export class LinkedAccounts implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LinkedAccounts'
    };


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

            private _verifyAccountEnabled: boolean;
            get verifyAccountEnabled(): boolean {
                return this._verifyAccountEnabled;
            }
            set verifyAccountEnabled(value: boolean) {
                this._verifyAccountEnabled = value;
            }

            private _linkedAccountNameRegex: string;
            get linkedAccountNameRegex(): string {
                return this._linkedAccountNameRegex;
            }
            set linkedAccountNameRegex(value: string) {
                this._linkedAccountNameRegex = value;
            }

            private _showDeletedAccountsEnabled: boolean;
            get showDeletedAccountsEnabled(): boolean {
                return this._showDeletedAccountsEnabled;
            }
            set showDeletedAccountsEnabled(value: boolean) {
                this._showDeletedAccountsEnabled = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LinkedAccounts.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "LinkedAccounts.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "LinkedAccounts.VerifyAccountEnabled", value: this._verifyAccountEnabled, dataType: 'boolean', label: "Verify Account Enabled" },
                { key: "LinkedAccounts.LinkedAccountNameRegex", value: this._linkedAccountNameRegex, dataType: 'string', label: "Linked Account Name Regex" },
                { key: "LinkedAccounts.ShowDeletedAccountsEnabled", value: this._showDeletedAccountsEnabled, dataType: 'boolean', label: "Show Deleted Accounts Enabled" },
                { key: "LinkedAccounts.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}