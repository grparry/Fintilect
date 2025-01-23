import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TieredAccessSettingsConfig {
    RestrictAccessbyAccountEnabled: boolean;
    QuickAccessForSubUsersEnabled: boolean;
    CrossAccountsAreIncludedInSubAccountPermissions: boolean;
    SubUsersCanUseCrossAccounts: boolean;
}

export class TieredAccessSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TieredAccessSettings'
    };


            private _restrictAccessbyAccountEnabled: boolean;
            get restrictAccessbyAccountEnabled(): boolean {
                return this._restrictAccessbyAccountEnabled;
            }
            set restrictAccessbyAccountEnabled(value: boolean) {
                this._restrictAccessbyAccountEnabled = value;
            }

            private _quickAccessForSubUsersEnabled: boolean;
            get quickAccessForSubUsersEnabled(): boolean {
                return this._quickAccessForSubUsersEnabled;
            }
            set quickAccessForSubUsersEnabled(value: boolean) {
                this._quickAccessForSubUsersEnabled = value;
            }

            private _crossAccountsAreIncludedInSubAccountPermissions: boolean;
            get crossAccountsAreIncludedInSubAccountPermissions(): boolean {
                return this._crossAccountsAreIncludedInSubAccountPermissions;
            }
            set crossAccountsAreIncludedInSubAccountPermissions(value: boolean) {
                this._crossAccountsAreIncludedInSubAccountPermissions = value;
            }

            private _subUsersCanUseCrossAccounts: boolean;
            get subUsersCanUseCrossAccounts(): boolean {
                return this._subUsersCanUseCrossAccounts;
            }
            set subUsersCanUseCrossAccounts(value: boolean) {
                this._subUsersCanUseCrossAccounts = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TieredAccessSettings.RestrictAccessbyAccountEnabled", value: this._restrictAccessbyAccountEnabled, dataType: 'boolean', label: "Restrict Accessby Account Enabled" },
                { key: "TieredAccessSettings.QuickAccessForSubUsersEnabled", value: this._quickAccessForSubUsersEnabled, dataType: 'boolean', label: "Quick Access For Sub Users Enabled" },
                { key: "TieredAccessSettings.CrossAccountsAreIncludedInSubAccountPermissions", value: this._crossAccountsAreIncludedInSubAccountPermissions, dataType: 'boolean', label: "Cross Accounts Are Included In Sub Account Permissions" },
                { key: "TieredAccessSettings.SubUsersCanUseCrossAccounts", value: this._subUsersCanUseCrossAccounts, dataType: 'boolean', label: "Sub Users Can Use Cross Accounts" },
            ];
        }

}