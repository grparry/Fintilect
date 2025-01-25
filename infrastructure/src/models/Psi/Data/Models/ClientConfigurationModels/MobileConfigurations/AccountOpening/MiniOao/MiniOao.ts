import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication.Authentication';
export interface MiniOaoConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    PurchaseCdUrl: string;
    OpenSubAccountUrl: string;
    ShouldVirusScanFiles: boolean;
    ShouldShowMenuItem: boolean;
    Authentication: Authentication;
}

export class MiniOao implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MiniOao'
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

            private _purchaseCdUrl: string;
            get purchaseCdUrl(): string {
                return this._purchaseCdUrl;
            }
            set purchaseCdUrl(value: string) {
                this._purchaseCdUrl = value;
            }

            private _openSubAccountUrl: string;
            get openSubAccountUrl(): string {
                return this._openSubAccountUrl;
            }
            set openSubAccountUrl(value: string) {
                this._openSubAccountUrl = value;
            }

            private _shouldVirusScanFiles: boolean;
            get shouldVirusScanFiles(): boolean {
                return this._shouldVirusScanFiles;
            }
            set shouldVirusScanFiles(value: boolean) {
                this._shouldVirusScanFiles = value;
            }

            private _shouldShowMenuItem: boolean;
            get shouldShowMenuItem(): boolean {
                return this._shouldShowMenuItem;
            }
            set shouldShowMenuItem(value: boolean) {
                this._shouldShowMenuItem = value;
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
                { key: "MiniOao.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "MiniOao.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "MiniOao.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "MiniOao.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MiniOao.PurchaseCdUrl", value: this._purchaseCdUrl, dataType: 'string', label: "Purchase Cd Url" },
                { key: "MiniOao.OpenSubAccountUrl", value: this._openSubAccountUrl, dataType: 'string', label: "Open Sub Account Url" },
                { key: "MiniOao.ShouldVirusScanFiles", value: this._shouldVirusScanFiles, dataType: 'boolean', label: "Should Virus Scan Files" },
                { key: "MiniOao.ShouldShowMenuItem", value: this._shouldShowMenuItem, dataType: 'boolean', label: "Should Show Menu Item" },
                { key: "MiniOao.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}