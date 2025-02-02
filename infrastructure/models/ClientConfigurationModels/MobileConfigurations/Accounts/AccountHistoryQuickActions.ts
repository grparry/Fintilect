import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountHistoryQuickActionsConfig {
    QuickActions: string;
    Enabled: boolean;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
}

export class AccountHistoryQuickActions implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountHistoryQuickActions'
    };


            private _quickActions: string;
            get quickActions(): string {
                return this._quickActions;
            }
            set quickActions(value: string) {
                this._quickActions = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountHistoryQuickActions.QuickActions", value: this._quickActions, dataType: 'string', label: "Quick Actions" },
                { key: "AccountHistoryQuickActions.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AccountHistoryQuickActions.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "AccountHistoryQuickActions.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
            ];
        }

}