import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DeviceSettingsConfig {
    MfaDevicesEnabled: boolean;
    ShowCreateDate: boolean;
}

export class DeviceSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DeviceSettings'
    };


            private _mfaDevicesEnabled: boolean;
            get mfaDevicesEnabled(): boolean {
                return this._mfaDevicesEnabled;
            }
            set mfaDevicesEnabled(value: boolean) {
                this._mfaDevicesEnabled = value;
            }

            private _showCreateDate: boolean;
            get showCreateDate(): boolean {
                return this._showCreateDate;
            }
            set showCreateDate(value: boolean) {
                this._showCreateDate = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DeviceSettings.MfaDevicesEnabled", value: this._mfaDevicesEnabled, dataType: 'boolean', label: "Mfa Devices Enabled" },
                { key: "DeviceSettings.ShowCreateDate", value: this._showCreateDate, dataType: 'boolean', label: "Show Create Date" },
            ];
        }

}