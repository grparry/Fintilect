import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OverdraftProtectionSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    ShouldUseSerialTypesForCourtesyPay: boolean;
    SerialTypesForCourtesyPay: string[];
    CourtesyPayEnabled: boolean;
}

export class OverdraftProtectionSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OverdraftProtectionSettings'
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

            private _shouldUseSerialTypesForCourtesyPay: boolean;
            get shouldUseSerialTypesForCourtesyPay(): boolean {
                return this._shouldUseSerialTypesForCourtesyPay;
            }
            set shouldUseSerialTypesForCourtesyPay(value: boolean) {
                this._shouldUseSerialTypesForCourtesyPay = value;
            }

            private _serialTypesForCourtesyPay: string[];
            get serialTypesForCourtesyPay(): string[] {
                return this._serialTypesForCourtesyPay;
            }
            set serialTypesForCourtesyPay(value: string[]) {
                this._serialTypesForCourtesyPay = value;
            }

            private _courtesyPayEnabled: boolean;
            get courtesyPayEnabled(): boolean {
                return this._courtesyPayEnabled;
            }
            set courtesyPayEnabled(value: boolean) {
                this._courtesyPayEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OverdraftProtectionSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "OverdraftProtectionSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "OverdraftProtectionSettings.ShouldUseSerialTypesForCourtesyPay", value: this._shouldUseSerialTypesForCourtesyPay, dataType: 'boolean', label: "Should Use Serial Types For Courtesy Pay" },
                { key: "OverdraftProtectionSettings.SerialTypesForCourtesyPay", value: this._serialTypesForCourtesyPay, dataType: 'list<string>', label: "Serial Types For Courtesy Pay" },
                { key: "OverdraftProtectionSettings.CourtesyPayEnabled", value: this._courtesyPayEnabled, dataType: 'boolean', label: "Courtesy Pay Enabled" },
            ];
        }

}