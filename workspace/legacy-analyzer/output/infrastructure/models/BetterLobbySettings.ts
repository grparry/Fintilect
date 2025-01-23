import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Uri } from './Uri';
import { Authentication } from './Authentication';
export interface BetterLobbySettingsConfig {
    Enabled: boolean;
    SsoBaseUrl: Uri;
    ClientId: string;
    SecretKey: string;
    KeySize: number;
    DerivationIterations: number;
    Authentication: Authentication;
}

export class BetterLobbySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BetterLobbySettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _ssoBaseUrl: Uri;
            get ssoBaseUrl(): Uri {
                return this._ssoBaseUrl;
            }
            set ssoBaseUrl(value: Uri) {
                this._ssoBaseUrl = value;
            }

            private _clientId: string;
            get clientId(): string {
                return this._clientId;
            }
            set clientId(value: string) {
                this._clientId = value;
            }

            private _secretKey: string;
            get secretKey(): string {
                return this._secretKey;
            }
            set secretKey(value: string) {
                this._secretKey = value;
            }

            private _keySize: number;
            get keySize(): number {
                return this._keySize;
            }
            set keySize(value: number) {
                this._keySize = value;
            }

            private _derivationIterations: number;
            get derivationIterations(): number {
                return this._derivationIterations;
            }
            set derivationIterations(value: number) {
                this._derivationIterations = value;
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
                { key: "BetterLobbySettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BetterLobbySettings.SsoBaseUrl", value: this._ssoBaseUrl, dataType: 'uri', label: "Sso Base Url" },
                { key: "BetterLobbySettings.ClientId", value: this._clientId, dataType: 'string', label: "Client Id" },
                { key: "BetterLobbySettings.SecretKey", value: this._secretKey, dataType: 'string', label: "Secret Key" },
                { key: "BetterLobbySettings.KeySize", value: this._keySize, dataType: 'number', label: "Key Size" },
                { key: "BetterLobbySettings.DerivationIterations", value: this._derivationIterations, dataType: 'number', label: "Derivation Iterations" },
                { key: "BetterLobbySettings.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
            ];
        }

}