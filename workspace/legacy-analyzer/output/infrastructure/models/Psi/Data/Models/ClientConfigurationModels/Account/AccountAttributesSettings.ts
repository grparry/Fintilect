import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountAttributesSettingsConfig {
    AccountAttributesEnabled: boolean;
    CheckingRewardsShareDescriptions: string[];
    CheckingRewardsShareCategories: string[];
    ShowZeroPrefixOfSuffix: boolean;
}

export class AccountAttributesSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountAttributesSettings'
    };


            private _accountAttributesEnabled: boolean;
            get accountAttributesEnabled(): boolean {
                return this._accountAttributesEnabled;
            }
            set accountAttributesEnabled(value: boolean) {
                this._accountAttributesEnabled = value;
            }

            private _checkingRewardsShareDescriptions: string[];
            get checkingRewardsShareDescriptions(): string[] {
                return this._checkingRewardsShareDescriptions;
            }
            set checkingRewardsShareDescriptions(value: string[]) {
                this._checkingRewardsShareDescriptions = value;
            }

            private _checkingRewardsShareCategories: string[];
            get checkingRewardsShareCategories(): string[] {
                return this._checkingRewardsShareCategories;
            }
            set checkingRewardsShareCategories(value: string[]) {
                this._checkingRewardsShareCategories = value;
            }

            private _showZeroPrefixOfSuffix: boolean;
            get showZeroPrefixOfSuffix(): boolean {
                return this._showZeroPrefixOfSuffix;
            }
            set showZeroPrefixOfSuffix(value: boolean) {
                this._showZeroPrefixOfSuffix = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountAttributesSettings.AccountAttributesEnabled", value: this._accountAttributesEnabled, dataType: 'boolean', label: "Account Attributes Enabled" },
                { key: "AccountAttributesSettings.CheckingRewardsShareDescriptions", value: this._checkingRewardsShareDescriptions, dataType: 'list<string>', label: "Checking Rewards Share Descriptions" },
                { key: "AccountAttributesSettings.CheckingRewardsShareCategories", value: this._checkingRewardsShareCategories, dataType: 'list<string>', label: "Checking Rewards Share Categories" },
                { key: "AccountAttributesSettings.ShowZeroPrefixOfSuffix", value: this._showZeroPrefixOfSuffix, dataType: 'boolean', label: "Show Zero Prefix Of Suffix" },
            ];
        }

}