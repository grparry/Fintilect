import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Uri } from '@infrastructure/Uri';
import { Authentication } from '@infrastructure/MobileConfigurations.Authentication.Authentication';
export interface GoToMyCardConfig {
    Enabled: boolean;
    MinVersion: number;
    Url: Uri;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    ServiceUrl: string;
    CertificateName: string;
    CuNumber: string;
    OpenInNewWindow: boolean;
    Authentication: Authentication;
}

export class GoToMyCard implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'GoToMyCard'
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

            private _url: Uri;
            get url(): Uri {
                return this._url;
            }
            set url(value: Uri) {
                this._url = value;
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

            private _serviceUrl: string;
            get serviceUrl(): string {
                return this._serviceUrl;
            }
            set serviceUrl(value: string) {
                this._serviceUrl = value;
            }

            private _certificateName: string;
            get certificateName(): string {
                return this._certificateName;
            }
            set certificateName(value: string) {
                this._certificateName = value;
            }

            private _cuNumber: string;
            get cuNumber(): string {
                return this._cuNumber;
            }
            set cuNumber(value: string) {
                this._cuNumber = value;
            }

            private _openInNewWindow: boolean;
            get openInNewWindow(): boolean {
                return this._openInNewWindow;
            }
            set openInNewWindow(value: boolean) {
                this._openInNewWindow = value;
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
                { key: "GoToMyCard.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "GoToMyCard.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "GoToMyCard.Url", value: this._url, dataType: 'uri', label: "Url" },
                { key: "GoToMyCard.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "GoToMyCard.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "GoToMyCard.ServiceUrl", value: this._serviceUrl, dataType: 'string', label: "Service Url" },
                { key: "GoToMyCard.CertificateName", value: this._certificateName, dataType: 'string', label: "Certificate Name" },
                { key: "GoToMyCard.CuNumber", value: this._cuNumber, dataType: 'string', label: "Cu Number" },
                { key: "GoToMyCard.OpenInNewWindow", value: this._openInNewWindow, dataType: 'boolean', label: "Open In New Window" },
                { key: "GoToMyCard.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
            ];
        }

}