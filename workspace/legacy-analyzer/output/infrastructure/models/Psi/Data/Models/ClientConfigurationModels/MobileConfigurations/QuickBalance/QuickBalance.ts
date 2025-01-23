import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Preferences } from './Preferences';
export interface QuickBalanceConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    RefreshTime: number;
    MaxNumberOfAccounts: number;
    Preferences: Preferences;
}

export class QuickBalance implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'QuickBalance'
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

            private _refreshTime: number;
            get refreshTime(): number {
                return this._refreshTime;
            }
            set refreshTime(value: number) {
                this._refreshTime = value;
            }

            private _maxNumberOfAccounts: number;
            get maxNumberOfAccounts(): number {
                return this._maxNumberOfAccounts;
            }
            set maxNumberOfAccounts(value: number) {
                this._maxNumberOfAccounts = value;
            }

            private _preferences: Preferences;
            get preferences(): Preferences {
                return this._preferences;
            }
            set preferences(value: Preferences) {
                this._preferences = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "QuickBalance.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "QuickBalance.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "QuickBalance.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "QuickBalance.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "QuickBalance.RefreshTime", value: this._refreshTime, dataType: 'number', label: "Refresh Time" },
                { key: "QuickBalance.MaxNumberOfAccounts", value: this._maxNumberOfAccounts, dataType: 'number', label: "Max Number Of Accounts" },
                { key: "QuickBalance.Preferences", value: this._preferences, dataType: 'preferences', label: "Preferences" },
            ];
        }

}