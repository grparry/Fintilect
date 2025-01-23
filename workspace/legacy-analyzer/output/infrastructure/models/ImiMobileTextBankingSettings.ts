import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ImiMobileTextBankingSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MaxRecordsToReturn: number;
    HistoryDays: number;
    MaxSendSize: number;
}

export class ImiMobileTextBankingSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ImiMobileTextBankingSettings'
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

            private _maxRecordsToReturn: number;
            get maxRecordsToReturn(): number {
                return this._maxRecordsToReturn;
            }
            set maxRecordsToReturn(value: number) {
                this._maxRecordsToReturn = value;
            }

            private _historyDays: number;
            get historyDays(): number {
                return this._historyDays;
            }
            set historyDays(value: number) {
                this._historyDays = value;
            }

            private _maxSendSize: number;
            get maxSendSize(): number {
                return this._maxSendSize;
            }
            set maxSendSize(value: number) {
                this._maxSendSize = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ImiMobileTextBankingSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ImiMobileTextBankingSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "ImiMobileTextBankingSettings.MaxRecordsToReturn", value: this._maxRecordsToReturn, dataType: 'number', label: "Max Records To Return" },
                { key: "ImiMobileTextBankingSettings.HistoryDays", value: this._historyDays, dataType: 'number', label: "History Days" },
                { key: "ImiMobileTextBankingSettings.MaxSendSize", value: this._maxSendSize, dataType: 'number', label: "Max Send Size" },
            ];
        }

}