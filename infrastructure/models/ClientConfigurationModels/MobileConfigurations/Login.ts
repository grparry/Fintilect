import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LoginConfig {
    UseAuthenticationStatusReasonCodeMinimumAndroidVersion: string;
    UseAuthenticationStatusReasonCodeMinimumIosVersion: string;
    EncryptedAuthenticationStatusReasonMinimumAndroidVersion: string;
    EncryptedAuthenticationStatusReasonMinimumIosVersion: string;
    ShouldQuickAccessLogSuccessfulLogin: boolean;
    IsUsernameClearTextOnLogin: boolean;
    ShouldShowAccountNumber: boolean;
    ShouldShowSecurityTipsLink: boolean;
    SecurityTipsLinkUrl: string;
    ShouldUsePlainTextForShowHidePasswordToggle: boolean;
}

export class Login implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Login'
    };


            private _useAuthenticationStatusReasonCodeMinimumAndroidVersion: string;
            get useAuthenticationStatusReasonCodeMinimumAndroidVersion(): string {
                return this._useAuthenticationStatusReasonCodeMinimumAndroidVersion;
            }
            set useAuthenticationStatusReasonCodeMinimumAndroidVersion(value: string) {
                this._useAuthenticationStatusReasonCodeMinimumAndroidVersion = value;
            }

            private _useAuthenticationStatusReasonCodeMinimumIosVersion: string;
            get useAuthenticationStatusReasonCodeMinimumIosVersion(): string {
                return this._useAuthenticationStatusReasonCodeMinimumIosVersion;
            }
            set useAuthenticationStatusReasonCodeMinimumIosVersion(value: string) {
                this._useAuthenticationStatusReasonCodeMinimumIosVersion = value;
            }

            private _encryptedAuthenticationStatusReasonMinimumAndroidVersion: string;
            get encryptedAuthenticationStatusReasonMinimumAndroidVersion(): string {
                return this._encryptedAuthenticationStatusReasonMinimumAndroidVersion;
            }
            set encryptedAuthenticationStatusReasonMinimumAndroidVersion(value: string) {
                this._encryptedAuthenticationStatusReasonMinimumAndroidVersion = value;
            }

            private _encryptedAuthenticationStatusReasonMinimumIosVersion: string;
            get encryptedAuthenticationStatusReasonMinimumIosVersion(): string {
                return this._encryptedAuthenticationStatusReasonMinimumIosVersion;
            }
            set encryptedAuthenticationStatusReasonMinimumIosVersion(value: string) {
                this._encryptedAuthenticationStatusReasonMinimumIosVersion = value;
            }

            private _shouldQuickAccessLogSuccessfulLogin: boolean;
            get shouldQuickAccessLogSuccessfulLogin(): boolean {
                return this._shouldQuickAccessLogSuccessfulLogin;
            }
            set shouldQuickAccessLogSuccessfulLogin(value: boolean) {
                this._shouldQuickAccessLogSuccessfulLogin = value;
            }

            private _isUsernameClearTextOnLogin: boolean;
            get isUsernameClearTextOnLogin(): boolean {
                return this._isUsernameClearTextOnLogin;
            }
            set isUsernameClearTextOnLogin(value: boolean) {
                this._isUsernameClearTextOnLogin = value;
            }

            private _shouldShowAccountNumber: boolean;
            get shouldShowAccountNumber(): boolean {
                return this._shouldShowAccountNumber;
            }
            set shouldShowAccountNumber(value: boolean) {
                this._shouldShowAccountNumber = value;
            }

            private _shouldShowSecurityTipsLink: boolean;
            get shouldShowSecurityTipsLink(): boolean {
                return this._shouldShowSecurityTipsLink;
            }
            set shouldShowSecurityTipsLink(value: boolean) {
                this._shouldShowSecurityTipsLink = value;
            }

            private _securityTipsLinkUrl: string;
            get securityTipsLinkUrl(): string {
                return this._securityTipsLinkUrl;
            }
            set securityTipsLinkUrl(value: string) {
                this._securityTipsLinkUrl = value;
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
                { key: "Login.UseAuthenticationStatusReasonCodeMinimumAndroidVersion", value: this._useAuthenticationStatusReasonCodeMinimumAndroidVersion, dataType: 'string', label: "Use Authentication Status Reason Code Minimum Android Version" },
                { key: "Login.UseAuthenticationStatusReasonCodeMinimumIosVersion", value: this._useAuthenticationStatusReasonCodeMinimumIosVersion, dataType: 'string', label: "Use Authentication Status Reason Code Minimum Ios Version" },
                { key: "Login.EncryptedAuthenticationStatusReasonMinimumAndroidVersion", value: this._encryptedAuthenticationStatusReasonMinimumAndroidVersion, dataType: 'string', label: "Encrypted Authentication Status Reason Minimum Android Version" },
                { key: "Login.EncryptedAuthenticationStatusReasonMinimumIosVersion", value: this._encryptedAuthenticationStatusReasonMinimumIosVersion, dataType: 'string', label: "Encrypted Authentication Status Reason Minimum Ios Version" },
                { key: "Login.ShouldQuickAccessLogSuccessfulLogin", value: this._shouldQuickAccessLogSuccessfulLogin, dataType: 'boolean', label: "Should Quick Access Log Successful Login" },
                { key: "Login.IsUsernameClearTextOnLogin", value: this._isUsernameClearTextOnLogin, dataType: 'boolean', label: "Is Username Clear Text On Login" },
                { key: "Login.ShouldShowAccountNumber", value: this._shouldShowAccountNumber, dataType: 'boolean', label: "Should Show Account Number" },
                { key: "Login.ShouldShowSecurityTipsLink", value: this._shouldShowSecurityTipsLink, dataType: 'boolean', label: "Should Show Security Tips Link" },
                { key: "Login.SecurityTipsLinkUrl", value: this._securityTipsLinkUrl, dataType: 'string', label: "Security Tips Link Url" },
                { key: "Login.ShouldUsePlainTextForShowHidePasswordToggle", value: this._shouldUsePlainTextForShowHidePasswordToggle, dataType: 'boolean', label: "Should Use Plain Text For Show Hide Password Toggle" },
            ];
        }

}