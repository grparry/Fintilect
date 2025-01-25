import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OndotDxSettingsConfig {
    ClientId: number;
    Url: string;
    IsMockDataEnabled: boolean;
    MockGetPreferencesData: string;
    EnableAllMerchantTypesOnRegistration: boolean;
    EnableAllTransactionTypesOnRegistration: boolean;
    AlertsDeliveryDeclinedTransactionEnabled: boolean;
    SendAmountAsDollars: boolean;
}

export class OndotDxSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OndotDxSettings'
    };


            private _clientId: number;
            get clientId(): number {
                return this._clientId;
            }
            set clientId(value: number) {
                this._clientId = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _isMockDataEnabled: boolean;
            get isMockDataEnabled(): boolean {
                return this._isMockDataEnabled;
            }
            set isMockDataEnabled(value: boolean) {
                this._isMockDataEnabled = value;
            }

            private _mockGetPreferencesData: string;
            get mockGetPreferencesData(): string {
                return this._mockGetPreferencesData;
            }
            set mockGetPreferencesData(value: string) {
                this._mockGetPreferencesData = value;
            }

            private _enableAllMerchantTypesOnRegistration: boolean;
            get enableAllMerchantTypesOnRegistration(): boolean {
                return this._enableAllMerchantTypesOnRegistration;
            }
            set enableAllMerchantTypesOnRegistration(value: boolean) {
                this._enableAllMerchantTypesOnRegistration = value;
            }

            private _enableAllTransactionTypesOnRegistration: boolean;
            get enableAllTransactionTypesOnRegistration(): boolean {
                return this._enableAllTransactionTypesOnRegistration;
            }
            set enableAllTransactionTypesOnRegistration(value: boolean) {
                this._enableAllTransactionTypesOnRegistration = value;
            }

            private _alertsDeliveryDeclinedTransactionEnabled: boolean;
            get alertsDeliveryDeclinedTransactionEnabled(): boolean {
                return this._alertsDeliveryDeclinedTransactionEnabled;
            }
            set alertsDeliveryDeclinedTransactionEnabled(value: boolean) {
                this._alertsDeliveryDeclinedTransactionEnabled = value;
            }

            private _sendAmountAsDollars: boolean;
            get sendAmountAsDollars(): boolean {
                return this._sendAmountAsDollars;
            }
            set sendAmountAsDollars(value: boolean) {
                this._sendAmountAsDollars = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OndotDxSettings.ClientId", value: this._clientId, dataType: 'number', label: "Client Id" },
                { key: "OndotDxSettings.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "OndotDxSettings.IsMockDataEnabled", value: this._isMockDataEnabled, dataType: 'boolean', label: "Is Mock Data Enabled" },
                { key: "OndotDxSettings.MockGetPreferencesData", value: this._mockGetPreferencesData, dataType: 'string', label: "Mock Get Preferences Data" },
                { key: "OndotDxSettings.EnableAllMerchantTypesOnRegistration", value: this._enableAllMerchantTypesOnRegistration, dataType: 'boolean', label: "Enable All Merchant Types On Registration" },
                { key: "OndotDxSettings.EnableAllTransactionTypesOnRegistration", value: this._enableAllTransactionTypesOnRegistration, dataType: 'boolean', label: "Enable All Transaction Types On Registration" },
                { key: "OndotDxSettings.AlertsDeliveryDeclinedTransactionEnabled", value: this._alertsDeliveryDeclinedTransactionEnabled, dataType: 'boolean', label: "Alerts Delivery Declined Transaction Enabled" },
                { key: "OndotDxSettings.SendAmountAsDollars", value: this._sendAmountAsDollars, dataType: 'boolean', label: "Send Amount As Dollars" },
            ];
        }

}