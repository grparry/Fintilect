import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RealTimeRedemptionConfig {
    MinVersion: number;
    Enabled: boolean;
    GeneralLedgerAccountNumber: string;
    GeneralLedgerTransactionDescription: string;
}

export class RealTimeRedemption implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RealTimeRedemption'
    };


            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _generalLedgerAccountNumber: string;
            get generalLedgerAccountNumber(): string {
                return this._generalLedgerAccountNumber;
            }
            set generalLedgerAccountNumber(value: string) {
                this._generalLedgerAccountNumber = value;
            }

            private _generalLedgerTransactionDescription: string;
            get generalLedgerTransactionDescription(): string {
                return this._generalLedgerTransactionDescription;
            }
            set generalLedgerTransactionDescription(value: string) {
                this._generalLedgerTransactionDescription = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RealTimeRedemption.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "RealTimeRedemption.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "RealTimeRedemption.GeneralLedgerAccountNumber", value: this._generalLedgerAccountNumber, dataType: 'string', label: "General Ledger Account Number" },
                { key: "RealTimeRedemption.GeneralLedgerTransactionDescription", value: this._generalLedgerTransactionDescription, dataType: 'string', label: "General Ledger Transaction Description" },
            ];
        }

}