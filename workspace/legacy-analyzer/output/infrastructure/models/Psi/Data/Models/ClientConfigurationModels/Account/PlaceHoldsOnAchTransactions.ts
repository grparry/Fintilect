import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { uint } from '@infrastructure/uint';
export interface PlaceHoldsOnAchTransactionsConfig {
    MinVersion: number;
    Enabled: boolean;
    StartMemoNumber: string;
    StopMemoNumber: string;
    DaysTillHoldExpires: uint;
    AmountToReleaseImmediately: number;
}

export class PlaceHoldsOnAchTransactions implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PlaceHoldsOnAchTransactions'
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

            private _startMemoNumber: string;
            get startMemoNumber(): string {
                return this._startMemoNumber;
            }
            set startMemoNumber(value: string) {
                this._startMemoNumber = value;
            }

            private _stopMemoNumber: string;
            get stopMemoNumber(): string {
                return this._stopMemoNumber;
            }
            set stopMemoNumber(value: string) {
                this._stopMemoNumber = value;
            }

            private _daysTillHoldExpires: uint;
            get daysTillHoldExpires(): uint {
                return this._daysTillHoldExpires;
            }
            set daysTillHoldExpires(value: uint) {
                this._daysTillHoldExpires = value;
            }

            private _amountToReleaseImmediately: number;
            get amountToReleaseImmediately(): number {
                return this._amountToReleaseImmediately;
            }
            set amountToReleaseImmediately(value: number) {
                this._amountToReleaseImmediately = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PlaceHoldsOnAchTransactions.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "PlaceHoldsOnAchTransactions.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PlaceHoldsOnAchTransactions.StartMemoNumber", value: this._startMemoNumber, dataType: 'string', label: "Start Memo Number" },
                { key: "PlaceHoldsOnAchTransactions.StopMemoNumber", value: this._stopMemoNumber, dataType: 'string', label: "Stop Memo Number" },
                { key: "PlaceHoldsOnAchTransactions.DaysTillHoldExpires", value: this._daysTillHoldExpires, dataType: 'uint', label: "Days Till Hold Expires" },
                { key: "PlaceHoldsOnAchTransactions.AmountToReleaseImmediately", value: this._amountToReleaseImmediately, dataType: 'number', label: "Amount To Release Immediately" },
            ];
        }

}