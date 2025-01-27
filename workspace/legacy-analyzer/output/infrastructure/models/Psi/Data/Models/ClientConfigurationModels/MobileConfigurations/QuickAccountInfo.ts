import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { QuickAccountInfoDisplayInfoSettings } from '@infrastructure/QuickAccountInfoDisplayInfoSettings';
export interface QuickAccountInfoConfig {
    Enabled: boolean;
    MaxNumberOfAccounts: number;
    AccountTypesDisplayConfiguration: QuickAccountInfoDisplayInfoSettings;
}

export class QuickAccountInfo implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'QuickAccountInfo'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _maxNumberOfAccounts: number;
            get maxNumberOfAccounts(): number {
                return this._maxNumberOfAccounts;
            }
            set maxNumberOfAccounts(value: number) {
                this._maxNumberOfAccounts = value;
            }

            private _accountTypesDisplayConfiguration: QuickAccountInfoDisplayInfoSettings;
            get accountTypesDisplayConfiguration(): QuickAccountInfoDisplayInfoSettings {
                return this._accountTypesDisplayConfiguration;
            }
            set accountTypesDisplayConfiguration(value: QuickAccountInfoDisplayInfoSettings) {
                this._accountTypesDisplayConfiguration = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "QuickAccountInfo.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "QuickAccountInfo.MaxNumberOfAccounts", value: this._maxNumberOfAccounts, dataType: 'number', label: "Max Number Of Accounts" },
                { key: "QuickAccountInfo.AccountTypesDisplayConfiguration", value: this._accountTypesDisplayConfiguration, dataType: 'quickaccountinfodisplayinfosettings', label: "Account Types Display Configuration" },
            ];
        }

}