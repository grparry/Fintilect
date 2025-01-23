import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ConnectNativeLoginRedirectChoiceType } from './ConnectNativeLoginRedirectChoiceType';
export interface LoginSettingsConfig {
    LoginFailuresBeforeLockingAccountMinusOne: number;
    ConnectNativeLandingPageUrl: string;
    ConnectNativeLoginRedirectChoiceType: ConnectNativeLoginRedirectChoiceType;
    UsePlainTextPassword: boolean;
    EnableLoginStatusEncryption: boolean;
    CredentialStorageMethod: string;
    AccountNumberAliasRequired: boolean;
    DisableLoginWithAccountNumber: boolean;
    AllowSSNInsteadOfCall24: boolean;
}

export class LoginSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoginSettings'
    };


            private _loginFailuresBeforeLockingAccountMinusOne: number;
            get loginFailuresBeforeLockingAccountMinusOne(): number {
                return this._loginFailuresBeforeLockingAccountMinusOne;
            }
            set loginFailuresBeforeLockingAccountMinusOne(value: number) {
                this._loginFailuresBeforeLockingAccountMinusOne = value;
            }

            private _connectNativeLandingPageUrl: string;
            get connectNativeLandingPageUrl(): string {
                return this._connectNativeLandingPageUrl;
            }
            set connectNativeLandingPageUrl(value: string) {
                this._connectNativeLandingPageUrl = value;
            }

            private _connectNativeLoginRedirectChoiceType: ConnectNativeLoginRedirectChoiceType;
            get connectNativeLoginRedirectChoiceType(): ConnectNativeLoginRedirectChoiceType {
                return this._connectNativeLoginRedirectChoiceType;
            }
            set connectNativeLoginRedirectChoiceType(value: ConnectNativeLoginRedirectChoiceType) {
                this._connectNativeLoginRedirectChoiceType = value;
            }

            private _usePlainTextPassword: boolean;
            get usePlainTextPassword(): boolean {
                return this._usePlainTextPassword;
            }
            set usePlainTextPassword(value: boolean) {
                this._usePlainTextPassword = value;
            }

            private _enableLoginStatusEncryption: boolean;
            get enableLoginStatusEncryption(): boolean {
                return this._enableLoginStatusEncryption;
            }
            set enableLoginStatusEncryption(value: boolean) {
                this._enableLoginStatusEncryption = value;
            }

            private _credentialStorageMethod: string;
            get credentialStorageMethod(): string {
                return this._credentialStorageMethod;
            }
            set credentialStorageMethod(value: string) {
                this._credentialStorageMethod = value;
            }

            private _accountNumberAliasRequired: boolean;
            get accountNumberAliasRequired(): boolean {
                return this._accountNumberAliasRequired;
            }
            set accountNumberAliasRequired(value: boolean) {
                this._accountNumberAliasRequired = value;
            }

            private _disableLoginWithAccountNumber: boolean;
            get disableLoginWithAccountNumber(): boolean {
                return this._disableLoginWithAccountNumber;
            }
            set disableLoginWithAccountNumber(value: boolean) {
                this._disableLoginWithAccountNumber = value;
            }

            private _allowSSNInsteadOfCall24: boolean;
            get allowSSNInsteadOfCall24(): boolean {
                return this._allowSSNInsteadOfCall24;
            }
            set allowSSNInsteadOfCall24(value: boolean) {
                this._allowSSNInsteadOfCall24 = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LoginSettings.LoginFailuresBeforeLockingAccountMinusOne", value: this._loginFailuresBeforeLockingAccountMinusOne, dataType: 'number', label: "Login Failures Before Locking Account Minus One" },
                { key: "LoginSettings.ConnectNativeLandingPageUrl", value: this._connectNativeLandingPageUrl, dataType: 'string', label: "Connect Native Landing Page Url" },
                { key: "LoginSettings.ConnectNativeLoginRedirectChoiceType", value: this._connectNativeLoginRedirectChoiceType, dataType: 'connectnativeloginredirectchoicetype', label: "Connect Native Login Redirect Choice Type" },
                { key: "LoginSettings.UsePlainTextPassword", value: this._usePlainTextPassword, dataType: 'boolean', label: "Use Plain Text Password" },
                { key: "LoginSettings.EnableLoginStatusEncryption", value: this._enableLoginStatusEncryption, dataType: 'boolean', label: "Enable Login Status Encryption" },
                { key: "LoginSettings.CredentialStorageMethod", value: this._credentialStorageMethod, dataType: 'string', label: "Credential Storage Method" },
                { key: "LoginSettings.AccountNumberAliasRequired", value: this._accountNumberAliasRequired, dataType: 'boolean', label: "Account Number Alias Required" },
                { key: "LoginSettings.DisableLoginWithAccountNumber", value: this._disableLoginWithAccountNumber, dataType: 'boolean', label: "Disable Login With Account Number" },
                { key: "LoginSettings.AllowSSNInsteadOfCall24", value: this._allowSSNInsteadOfCall24, dataType: 'boolean', label: "Allow S S N Instead Of Call24" },
            ];
        }

}