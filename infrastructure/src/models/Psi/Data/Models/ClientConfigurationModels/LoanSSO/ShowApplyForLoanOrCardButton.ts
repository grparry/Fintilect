import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ShowApplyForLoanOrCardButtonConfig {
    ShowApplyForLoanOrCardButtonOnSummary: boolean;
    MinVersion: number;
}

export class ShowApplyForLoanOrCardButton implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ShowApplyForLoanOrCardButton'
    };


            private _showApplyForLoanOrCardButtonOnSummary: boolean;
            get showApplyForLoanOrCardButtonOnSummary(): boolean {
                return this._showApplyForLoanOrCardButtonOnSummary;
            }
            set showApplyForLoanOrCardButtonOnSummary(value: boolean) {
                this._showApplyForLoanOrCardButtonOnSummary = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ShowApplyForLoanOrCardButton.ShowApplyForLoanOrCardButtonOnSummary", value: this._showApplyForLoanOrCardButtonOnSummary, dataType: 'boolean', label: "Show Apply For Loan Or Card Button On Summary" },
                { key: "ShowApplyForLoanOrCardButton.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
            ];
        }

}