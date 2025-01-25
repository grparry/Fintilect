import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface NcpEstatementsConfig {
    Enabled: boolean;
    MinVersion: number;
    UserId: string;
    Password: string;
    SharedSecret: string;
    PostUrl: string;
    SsoUrl: string;
    PadAccountNumberCount: number;
}

export class NcpEstatements implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'NcpEstatements'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _userId: string;
            get userId(): string {
                return this._userId;
            }
            set userId(value: string) {
                this._userId = value;
            }

            private _password: string;
            get password(): string {
                return this._password;
            }
            set password(value: string) {
                this._password = value;
            }

            private _sharedSecret: string;
            get sharedSecret(): string {
                return this._sharedSecret;
            }
            set sharedSecret(value: string) {
                this._sharedSecret = value;
            }

            private _postUrl: string;
            get postUrl(): string {
                return this._postUrl;
            }
            set postUrl(value: string) {
                this._postUrl = value;
            }

            private _ssoUrl: string;
            get ssoUrl(): string {
                return this._ssoUrl;
            }
            set ssoUrl(value: string) {
                this._ssoUrl = value;
            }

            private _padAccountNumberCount: number;
            get padAccountNumberCount(): number {
                return this._padAccountNumberCount;
            }
            set padAccountNumberCount(value: number) {
                this._padAccountNumberCount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "NcpEstatements.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "NcpEstatements.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "NcpEstatements.UserId", value: this._userId, dataType: 'string', label: "User Id" },
                { key: "NcpEstatements.Password", value: this._password, dataType: 'string', label: "Password" },
                { key: "NcpEstatements.SharedSecret", value: this._sharedSecret, dataType: 'string', label: "Shared Secret" },
                { key: "NcpEstatements.PostUrl", value: this._postUrl, dataType: 'string', label: "Post Url" },
                { key: "NcpEstatements.SsoUrl", value: this._ssoUrl, dataType: 'string', label: "Sso Url" },
                { key: "NcpEstatements.PadAccountNumberCount", value: this._padAccountNumberCount, dataType: 'number', label: "Pad Account Number Count" },
            ];
        }

}