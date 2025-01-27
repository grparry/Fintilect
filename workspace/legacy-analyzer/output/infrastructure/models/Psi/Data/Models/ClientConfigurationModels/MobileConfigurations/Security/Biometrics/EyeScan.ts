import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { EyeScanVendor } from '@infrastructure/EyeScanVendor';
export interface EyeScanConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Vendor: EyeScanVendor;
    ApiKey: string;
}

export class EyeScan implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'EyeScan'
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

            private _vendor: EyeScanVendor;
            get vendor(): EyeScanVendor {
                return this._vendor;
            }
            set vendor(value: EyeScanVendor) {
                this._vendor = value;
            }

            private _apiKey: string;
            get apiKey(): string {
                return this._apiKey;
            }
            set apiKey(value: string) {
                this._apiKey = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "EyeScan.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "EyeScan.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "EyeScan.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "EyeScan.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "EyeScan.Vendor", value: this._vendor, dataType: 'eyescanvendor', label: "Vendor" },
                { key: "EyeScan.ApiKey", value: this._apiKey, dataType: 'string', label: "Api Key" },
            ];
        }

}