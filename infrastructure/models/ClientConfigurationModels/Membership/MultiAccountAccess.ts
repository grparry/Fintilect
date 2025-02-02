import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MultiAccountAccessPermissionSource } from '../MultiAccountAccessPermissionSource';
export interface MultiAccountAccessConfig {
    Enabled: boolean;
    MinVersion: number;
    MobileEnabled: boolean;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    PermissionSource: MultiAccountAccessPermissionSource;
    LastNameMatchingNumberOfCharactersToMatch: number;
    DisclosureShouldShowLink: boolean;
    GlobalFeatureAccessEncrypted: string;
}

export class MultiAccountAccess implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MultiAccountAccess'
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

            private _mobileEnabled: boolean;
            get mobileEnabled(): boolean {
                return this._mobileEnabled;
            }
            set mobileEnabled(value: boolean) {
                this._mobileEnabled = value;
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

            private _permissionSource: MultiAccountAccessPermissionSource;
            get permissionSource(): MultiAccountAccessPermissionSource {
                return this._permissionSource;
            }
            set permissionSource(value: MultiAccountAccessPermissionSource) {
                this._permissionSource = value;
            }

            private _lastNameMatchingNumberOfCharactersToMatch: number;
            get lastNameMatchingNumberOfCharactersToMatch(): number {
                return this._lastNameMatchingNumberOfCharactersToMatch;
            }
            set lastNameMatchingNumberOfCharactersToMatch(value: number) {
                this._lastNameMatchingNumberOfCharactersToMatch = value;
            }

            private _disclosureShouldShowLink: boolean;
            get disclosureShouldShowLink(): boolean {
                return this._disclosureShouldShowLink;
            }
            set disclosureShouldShowLink(value: boolean) {
                this._disclosureShouldShowLink = value;
            }

            private _globalFeatureAccessEncrypted: string;
            get globalFeatureAccessEncrypted(): string {
                return this._globalFeatureAccessEncrypted;
            }
            set globalFeatureAccessEncrypted(value: string) {
                this._globalFeatureAccessEncrypted = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MultiAccountAccess.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MultiAccountAccess.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MultiAccountAccess.MobileEnabled", value: this._mobileEnabled, dataType: 'boolean', label: "Mobile Enabled" },
                { key: "MultiAccountAccess.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "MultiAccountAccess.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "MultiAccountAccess.PermissionSource", value: this._permissionSource, dataType: 'multiaccountaccesspermissionsource', label: "Permission Source" },
                { key: "MultiAccountAccess.LastNameMatchingNumberOfCharactersToMatch", value: this._lastNameMatchingNumberOfCharactersToMatch, dataType: 'number', label: "Last Name Matching Number Of Characters To Match" },
                { key: "MultiAccountAccess.DisclosureShouldShowLink", value: this._disclosureShouldShowLink, dataType: 'boolean', label: "Disclosure Should Show Link" },
                { key: "MultiAccountAccess.GlobalFeatureAccessEncrypted", value: this._globalFeatureAccessEncrypted, dataType: 'string', label: "Global Feature Access Encrypted" },
            ];
        }

}