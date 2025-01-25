import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AddressVerificationSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    AuthId: string;
    AuthToken: string;
    Url: string;
    MaxCandidates: number;
    Vendor: string;
}

export class AddressVerificationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AddressVerificationSettings'
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

            private _authId: string;
            get authId(): string {
                return this._authId;
            }
            set authId(value: string) {
                this._authId = value;
            }

            private _authToken: string;
            get authToken(): string {
                return this._authToken;
            }
            set authToken(value: string) {
                this._authToken = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _maxCandidates: number;
            get maxCandidates(): number {
                return this._maxCandidates;
            }
            set maxCandidates(value: number) {
                this._maxCandidates = value;
            }

            private _vendor: string;
            get vendor(): string {
                return this._vendor;
            }
            set vendor(value: string) {
                this._vendor = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AddressVerificationSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AddressVerificationSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "AddressVerificationSettings.AuthId", value: this._authId, dataType: 'string', label: "Auth Id" },
                { key: "AddressVerificationSettings.AuthToken", value: this._authToken, dataType: 'string', label: "Auth Token" },
                { key: "AddressVerificationSettings.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "AddressVerificationSettings.MaxCandidates", value: this._maxCandidates, dataType: 'number', label: "Max Candidates" },
                { key: "AddressVerificationSettings.Vendor", value: this._vendor, dataType: 'string', label: "Vendor" },
            ];
        }

}