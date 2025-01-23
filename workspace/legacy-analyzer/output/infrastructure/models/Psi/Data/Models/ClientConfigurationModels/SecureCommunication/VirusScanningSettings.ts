import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface VirusScanningSettingsConfig {
    IsEnabled: boolean;
    Address: string;
    Port: number;
}

export class VirusScanningSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'VirusScanningSettings'
    };


            private _isEnabled: boolean;
            get isEnabled(): boolean {
                return this._isEnabled;
            }
            set isEnabled(value: boolean) {
                this._isEnabled = value;
            }

            private _address: string;
            get address(): string {
                return this._address;
            }
            set address(value: string) {
                this._address = value;
            }

            private _port: number;
            get port(): number {
                return this._port;
            }
            set port(value: number) {
                this._port = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "VirusScanningSettings.IsEnabled", value: this._isEnabled, dataType: 'boolean', label: "Is Enabled" },
                { key: "VirusScanningSettings.Address", value: this._address, dataType: 'string', label: "Address" },
                { key: "VirusScanningSettings.Port", value: this._port, dataType: 'number', label: "Port" },
            ];
        }

}