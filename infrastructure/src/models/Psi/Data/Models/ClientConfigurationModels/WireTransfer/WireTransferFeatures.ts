import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface WireTransferFeaturesConfig {
    Enabled: boolean;
    MinVersion: number;
    WireTransferDepartmentToEmail: string;
    WireTransferDepartmentFromEmail: string;
}

export class WireTransferFeatures implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'WireTransferFeatures'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _wireTransferDepartmentToEmail: string;
            get wireTransferDepartmentToEmail(): string {
                return this._wireTransferDepartmentToEmail;
            }
            set wireTransferDepartmentToEmail(value: string) {
                this._wireTransferDepartmentToEmail = value;
            }

            private _wireTransferDepartmentFromEmail: string;
            get wireTransferDepartmentFromEmail(): string {
                return this._wireTransferDepartmentFromEmail;
            }
            set wireTransferDepartmentFromEmail(value: string) {
                this._wireTransferDepartmentFromEmail = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "WireTransferFeatures.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "WireTransferFeatures.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "WireTransferFeatures.WireTransferDepartmentToEmail", value: this._wireTransferDepartmentToEmail, dataType: 'string', label: "Wire Transfer Department To Email" },
                { key: "WireTransferFeatures.WireTransferDepartmentFromEmail", value: this._wireTransferDepartmentFromEmail, dataType: 'string', label: "Wire Transfer Department From Email" },
            ];
        }

}