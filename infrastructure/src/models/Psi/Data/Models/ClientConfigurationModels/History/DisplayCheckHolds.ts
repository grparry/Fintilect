import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DisplayCheckHoldsConfig {
    Enabled: boolean;
    MinVersion: number;
    CheckHoldMemoRange: string;
    GuaranteedFundsMemoRange: string;
    ShouldShowAsNegativeTransactions: boolean;
    DisplayCheckHoldsOutsideDateRange: boolean;
}

export class DisplayCheckHolds implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DisplayCheckHolds'
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

            private _checkHoldMemoRange: string;
            get checkHoldMemoRange(): string {
                return this._checkHoldMemoRange;
            }
            set checkHoldMemoRange(value: string) {
                this._checkHoldMemoRange = value;
            }

            private _guaranteedFundsMemoRange: string;
            get guaranteedFundsMemoRange(): string {
                return this._guaranteedFundsMemoRange;
            }
            set guaranteedFundsMemoRange(value: string) {
                this._guaranteedFundsMemoRange = value;
            }

            private _shouldShowAsNegativeTransactions: boolean;
            get shouldShowAsNegativeTransactions(): boolean {
                return this._shouldShowAsNegativeTransactions;
            }
            set shouldShowAsNegativeTransactions(value: boolean) {
                this._shouldShowAsNegativeTransactions = value;
            }

            private _displayCheckHoldsOutsideDateRange: boolean;
            get displayCheckHoldsOutsideDateRange(): boolean {
                return this._displayCheckHoldsOutsideDateRange;
            }
            set displayCheckHoldsOutsideDateRange(value: boolean) {
                this._displayCheckHoldsOutsideDateRange = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DisplayCheckHolds.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DisplayCheckHolds.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "DisplayCheckHolds.CheckHoldMemoRange", value: this._checkHoldMemoRange, dataType: 'string', label: "Check Hold Memo Range" },
                { key: "DisplayCheckHolds.GuaranteedFundsMemoRange", value: this._guaranteedFundsMemoRange, dataType: 'string', label: "Guaranteed Funds Memo Range" },
                { key: "DisplayCheckHolds.ShouldShowAsNegativeTransactions", value: this._shouldShowAsNegativeTransactions, dataType: 'boolean', label: "Should Show As Negative Transactions" },
                { key: "DisplayCheckHolds.DisplayCheckHoldsOutsideDateRange", value: this._displayCheckHoldsOutsideDateRange, dataType: 'boolean', label: "Display Check Holds Outside Date Range" },
            ];
        }

}