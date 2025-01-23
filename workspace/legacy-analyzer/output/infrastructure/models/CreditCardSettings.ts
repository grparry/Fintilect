import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CreditCardSettingsConfig {
    AlertPreferencesEnabled: boolean;
    UserDeviceSetupEnabled: boolean;
    ManagePermissionsEnabled: boolean;
    ShouldUseDynamicTransactionTypes: boolean;
    MerchantTypesEnabled: boolean;
    SpendingLimitsEnabled: boolean;
    TransactionTypesEnabled: boolean;
}

export class CreditCardSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CreditCardSettings'
    };


            private _alertPreferencesEnabled: boolean;
            get alertPreferencesEnabled(): boolean {
                return this._alertPreferencesEnabled;
            }
            set alertPreferencesEnabled(value: boolean) {
                this._alertPreferencesEnabled = value;
            }

            private _userDeviceSetupEnabled: boolean;
            get userDeviceSetupEnabled(): boolean {
                return this._userDeviceSetupEnabled;
            }
            set userDeviceSetupEnabled(value: boolean) {
                this._userDeviceSetupEnabled = value;
            }

            private _managePermissionsEnabled: boolean;
            get managePermissionsEnabled(): boolean {
                return this._managePermissionsEnabled;
            }
            set managePermissionsEnabled(value: boolean) {
                this._managePermissionsEnabled = value;
            }

            private _shouldUseDynamicTransactionTypes: boolean;
            get shouldUseDynamicTransactionTypes(): boolean {
                return this._shouldUseDynamicTransactionTypes;
            }
            set shouldUseDynamicTransactionTypes(value: boolean) {
                this._shouldUseDynamicTransactionTypes = value;
            }

            private _merchantTypesEnabled: boolean;
            get merchantTypesEnabled(): boolean {
                return this._merchantTypesEnabled;
            }
            set merchantTypesEnabled(value: boolean) {
                this._merchantTypesEnabled = value;
            }

            private _spendingLimitsEnabled: boolean;
            get spendingLimitsEnabled(): boolean {
                return this._spendingLimitsEnabled;
            }
            set spendingLimitsEnabled(value: boolean) {
                this._spendingLimitsEnabled = value;
            }

            private _transactionTypesEnabled: boolean;
            get transactionTypesEnabled(): boolean {
                return this._transactionTypesEnabled;
            }
            set transactionTypesEnabled(value: boolean) {
                this._transactionTypesEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CreditCardSettings.AlertPreferencesEnabled", value: this._alertPreferencesEnabled, dataType: 'boolean', label: "Alert Preferences Enabled" },
                { key: "CreditCardSettings.UserDeviceSetupEnabled", value: this._userDeviceSetupEnabled, dataType: 'boolean', label: "User Device Setup Enabled" },
                { key: "CreditCardSettings.ManagePermissionsEnabled", value: this._managePermissionsEnabled, dataType: 'boolean', label: "Manage Permissions Enabled" },
                { key: "CreditCardSettings.ShouldUseDynamicTransactionTypes", value: this._shouldUseDynamicTransactionTypes, dataType: 'boolean', label: "Should Use Dynamic Transaction Types" },
                { key: "CreditCardSettings.MerchantTypesEnabled", value: this._merchantTypesEnabled, dataType: 'boolean', label: "Merchant Types Enabled" },
                { key: "CreditCardSettings.SpendingLimitsEnabled", value: this._spendingLimitsEnabled, dataType: 'boolean', label: "Spending Limits Enabled" },
                { key: "CreditCardSettings.TransactionTypesEnabled", value: this._transactionTypesEnabled, dataType: 'boolean', label: "Transaction Types Enabled" },
            ];
        }

}