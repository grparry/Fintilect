import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TieredAccessAdminConfig {
    LandingPageUrl: string;
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
}

export class TieredAccessAdmin implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TieredAccessAdmin'
    };


            private _landingPageUrl: string;
            get landingPageUrl(): string {
                return this._landingPageUrl;
            }
            set landingPageUrl(value: string) {
                this._landingPageUrl = value;
            }

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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TieredAccessAdmin.LandingPageUrl", value: this._landingPageUrl, dataType: 'string', label: "Landing Page Url" },
                { key: "TieredAccessAdmin.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "TieredAccessAdmin.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "TieredAccessAdmin.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "TieredAccessAdmin.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
            ];
        }

}