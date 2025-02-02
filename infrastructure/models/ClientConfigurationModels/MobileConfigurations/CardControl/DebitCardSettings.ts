import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DebitCardSettingsConfig {
    AlertPreferencesEnabled: boolean;
    UserDeviceSetupEnabled: boolean;
    ManagePermissionsEnabled: boolean;
    ShouldUseDynamicTransactionTypes: boolean;
    InternetTransactionControlEnabled: boolean;
    LargeTransactionControlEnabled: boolean;
    TimeOfDayRangeControlEnabled: boolean;
    CardOffUserDefinedTimeEnabled: boolean;
}

export class DebitCardSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DebitCardSettings'
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

            private _internetTransactionControlEnabled: boolean;
            get internetTransactionControlEnabled(): boolean {
                return this._internetTransactionControlEnabled;
            }
            set internetTransactionControlEnabled(value: boolean) {
                this._internetTransactionControlEnabled = value;
            }

            private _largeTransactionControlEnabled: boolean;
            get largeTransactionControlEnabled(): boolean {
                return this._largeTransactionControlEnabled;
            }
            set largeTransactionControlEnabled(value: boolean) {
                this._largeTransactionControlEnabled = value;
            }

            private _timeOfDayRangeControlEnabled: boolean;
            get timeOfDayRangeControlEnabled(): boolean {
                return this._timeOfDayRangeControlEnabled;
            }
            set timeOfDayRangeControlEnabled(value: boolean) {
                this._timeOfDayRangeControlEnabled = value;
            }

            private _cardOffUserDefinedTimeEnabled: boolean;
            get cardOffUserDefinedTimeEnabled(): boolean {
                return this._cardOffUserDefinedTimeEnabled;
            }
            set cardOffUserDefinedTimeEnabled(value: boolean) {
                this._cardOffUserDefinedTimeEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DebitCardSettings.AlertPreferencesEnabled", value: this._alertPreferencesEnabled, dataType: 'boolean', label: "Alert Preferences Enabled" },
                { key: "DebitCardSettings.UserDeviceSetupEnabled", value: this._userDeviceSetupEnabled, dataType: 'boolean', label: "User Device Setup Enabled" },
                { key: "DebitCardSettings.ManagePermissionsEnabled", value: this._managePermissionsEnabled, dataType: 'boolean', label: "Manage Permissions Enabled" },
                { key: "DebitCardSettings.ShouldUseDynamicTransactionTypes", value: this._shouldUseDynamicTransactionTypes, dataType: 'boolean', label: "Should Use Dynamic Transaction Types" },
                { key: "DebitCardSettings.InternetTransactionControlEnabled", value: this._internetTransactionControlEnabled, dataType: 'boolean', label: "Internet Transaction Control Enabled" },
                { key: "DebitCardSettings.LargeTransactionControlEnabled", value: this._largeTransactionControlEnabled, dataType: 'boolean', label: "Large Transaction Control Enabled" },
                { key: "DebitCardSettings.TimeOfDayRangeControlEnabled", value: this._timeOfDayRangeControlEnabled, dataType: 'boolean', label: "Time Of Day Range Control Enabled" },
                { key: "DebitCardSettings.CardOffUserDefinedTimeEnabled", value: this._cardOffUserDefinedTimeEnabled, dataType: 'boolean', label: "Card Off User Defined Time Enabled" },
            ];
        }

}