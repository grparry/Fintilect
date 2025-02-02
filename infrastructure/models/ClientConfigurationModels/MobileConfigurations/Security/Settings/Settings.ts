import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AppShieldResponseType } from '../AppShieldResponseType';
export interface SettingsConfig {
    AdbResponse: AppShieldResponseType;
    BluetoothControlResponse: AppShieldResponseType;
    BluetoothEnabledResponse: AppShieldResponseType;
    DeveloperResponse: AppShieldResponseType;
    GpsEnabledResponse: AppShieldResponseType;
    HardwareKeyboardResponse: AppShieldResponseType;
    NfcEnabledResponse: AppShieldResponseType;
    NonSystemKeyboardResponse: AppShieldResponseType;
    RootedResponse: AppShieldResponseType;
    WiFiEnabledResponse: AppShieldResponseType;
}

export class Settings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Settings'
    };


            private _adbResponse: AppShieldResponseType;
            get adbResponse(): AppShieldResponseType {
                return this._adbResponse;
            }
            set adbResponse(value: AppShieldResponseType) {
                this._adbResponse = value;
            }

            private _bluetoothControlResponse: AppShieldResponseType;
            get bluetoothControlResponse(): AppShieldResponseType {
                return this._bluetoothControlResponse;
            }
            set bluetoothControlResponse(value: AppShieldResponseType) {
                this._bluetoothControlResponse = value;
            }

            private _bluetoothEnabledResponse: AppShieldResponseType;
            get bluetoothEnabledResponse(): AppShieldResponseType {
                return this._bluetoothEnabledResponse;
            }
            set bluetoothEnabledResponse(value: AppShieldResponseType) {
                this._bluetoothEnabledResponse = value;
            }

            private _developerResponse: AppShieldResponseType;
            get developerResponse(): AppShieldResponseType {
                return this._developerResponse;
            }
            set developerResponse(value: AppShieldResponseType) {
                this._developerResponse = value;
            }

            private _gpsEnabledResponse: AppShieldResponseType;
            get gpsEnabledResponse(): AppShieldResponseType {
                return this._gpsEnabledResponse;
            }
            set gpsEnabledResponse(value: AppShieldResponseType) {
                this._gpsEnabledResponse = value;
            }

            private _hardwareKeyboardResponse: AppShieldResponseType;
            get hardwareKeyboardResponse(): AppShieldResponseType {
                return this._hardwareKeyboardResponse;
            }
            set hardwareKeyboardResponse(value: AppShieldResponseType) {
                this._hardwareKeyboardResponse = value;
            }

            private _nfcEnabledResponse: AppShieldResponseType;
            get nfcEnabledResponse(): AppShieldResponseType {
                return this._nfcEnabledResponse;
            }
            set nfcEnabledResponse(value: AppShieldResponseType) {
                this._nfcEnabledResponse = value;
            }

            private _nonSystemKeyboardResponse: AppShieldResponseType;
            get nonSystemKeyboardResponse(): AppShieldResponseType {
                return this._nonSystemKeyboardResponse;
            }
            set nonSystemKeyboardResponse(value: AppShieldResponseType) {
                this._nonSystemKeyboardResponse = value;
            }

            private _rootedResponse: AppShieldResponseType;
            get rootedResponse(): AppShieldResponseType {
                return this._rootedResponse;
            }
            set rootedResponse(value: AppShieldResponseType) {
                this._rootedResponse = value;
            }

            private _wiFiEnabledResponse: AppShieldResponseType;
            get wiFiEnabledResponse(): AppShieldResponseType {
                return this._wiFiEnabledResponse;
            }
            set wiFiEnabledResponse(value: AppShieldResponseType) {
                this._wiFiEnabledResponse = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Settings.AdbResponse", value: this._adbResponse, dataType: 'appshieldresponsetype', label: "Adb Response" },
                { key: "Settings.BluetoothControlResponse", value: this._bluetoothControlResponse, dataType: 'appshieldresponsetype', label: "Bluetooth Control Response" },
                { key: "Settings.BluetoothEnabledResponse", value: this._bluetoothEnabledResponse, dataType: 'appshieldresponsetype', label: "Bluetooth Enabled Response" },
                { key: "Settings.DeveloperResponse", value: this._developerResponse, dataType: 'appshieldresponsetype', label: "Developer Response" },
                { key: "Settings.GpsEnabledResponse", value: this._gpsEnabledResponse, dataType: 'appshieldresponsetype', label: "Gps Enabled Response" },
                { key: "Settings.HardwareKeyboardResponse", value: this._hardwareKeyboardResponse, dataType: 'appshieldresponsetype', label: "Hardware Keyboard Response" },
                { key: "Settings.NfcEnabledResponse", value: this._nfcEnabledResponse, dataType: 'appshieldresponsetype', label: "Nfc Enabled Response" },
                { key: "Settings.NonSystemKeyboardResponse", value: this._nonSystemKeyboardResponse, dataType: 'appshieldresponsetype', label: "Non System Keyboard Response" },
                { key: "Settings.RootedResponse", value: this._rootedResponse, dataType: 'appshieldresponsetype', label: "Rooted Response" },
                { key: "Settings.WiFiEnabledResponse", value: this._wiFiEnabledResponse, dataType: 'appshieldresponsetype', label: "Wi Fi Enabled Response" },
            ];
        }

}