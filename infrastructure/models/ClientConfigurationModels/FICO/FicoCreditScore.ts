import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FicoCreditScoreConfig {
    Enabled: boolean;
    MinVersion: number;
    StepSsoUrl: string;
    HostIpAddress: string;
    CertificateFilename: string;
    CertificatePassword: string;
    SiteId: string;
    ClientId: string;
    OptOutFlagNumber: number;
    IssuerNameId: string;
}

export class FicoCreditScore implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FicoCreditScore'
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

            private _stepSsoUrl: string;
            get stepSsoUrl(): string {
                return this._stepSsoUrl;
            }
            set stepSsoUrl(value: string) {
                this._stepSsoUrl = value;
            }

            private _hostIpAddress: string;
            get hostIpAddress(): string {
                return this._hostIpAddress;
            }
            set hostIpAddress(value: string) {
                this._hostIpAddress = value;
            }

            private _certificateFilename: string;
            get certificateFilename(): string {
                return this._certificateFilename;
            }
            set certificateFilename(value: string) {
                this._certificateFilename = value;
            }

            private _certificatePassword: string;
            get certificatePassword(): string {
                return this._certificatePassword;
            }
            set certificatePassword(value: string) {
                this._certificatePassword = value;
            }

            private _siteId: string;
            get siteId(): string {
                return this._siteId;
            }
            set siteId(value: string) {
                this._siteId = value;
            }

            private _clientId: string;
            get clientId(): string {
                return this._clientId;
            }
            set clientId(value: string) {
                this._clientId = value;
            }

            private _optOutFlagNumber: number;
            get optOutFlagNumber(): number {
                return this._optOutFlagNumber;
            }
            set optOutFlagNumber(value: number) {
                this._optOutFlagNumber = value;
            }

            private _issuerNameId: string;
            get issuerNameId(): string {
                return this._issuerNameId;
            }
            set issuerNameId(value: string) {
                this._issuerNameId = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "FicoCreditScore.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "FicoCreditScore.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "FicoCreditScore.StepSsoUrl", value: this._stepSsoUrl, dataType: 'string', label: "Step Sso Url" },
                { key: "FicoCreditScore.HostIpAddress", value: this._hostIpAddress, dataType: 'string', label: "Host Ip Address" },
                { key: "FicoCreditScore.CertificateFilename", value: this._certificateFilename, dataType: 'string', label: "Certificate Filename" },
                { key: "FicoCreditScore.CertificatePassword", value: this._certificatePassword, dataType: 'string', label: "Certificate Password" },
                { key: "FicoCreditScore.SiteId", value: this._siteId, dataType: 'string', label: "Site Id" },
                { key: "FicoCreditScore.ClientId", value: this._clientId, dataType: 'string', label: "Client Id" },
                { key: "FicoCreditScore.OptOutFlagNumber", value: this._optOutFlagNumber, dataType: 'number', label: "Opt Out Flag Number" },
                { key: "FicoCreditScore.IssuerNameId", value: this._issuerNameId, dataType: 'string', label: "Issuer Name Id" },
            ];
        }

}