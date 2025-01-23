import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { HarlandLoanEngine } from './HarlandLoanEngine';
export interface LoanSettingsConfig {
    HarlandLoanEngine: HarlandLoanEngine;
    ShowPayoffAmountForTheseCollateralCodes: string[];
    DisplayLateCharges: boolean;
    DisplayTotalAmountBilled: boolean;
    TotalAmountBilledCategory: string;
    DisplayPaymentRemaining: boolean;
    DisplayRequiredToPayLateCharges: boolean;
    HighlightPastDueLoanRowInfo: boolean;
    AbilityToOverrideCreditCardTransferDescriptionEnabled: boolean;
}

export class LoanSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanSettings'
    };


            private _harlandLoanEngine: HarlandLoanEngine;
            get harlandLoanEngine(): HarlandLoanEngine {
                return this._harlandLoanEngine;
            }
            set harlandLoanEngine(value: HarlandLoanEngine) {
                this._harlandLoanEngine = value;
            }

            private _showPayoffAmountForTheseCollateralCodes: string[];
            get showPayoffAmountForTheseCollateralCodes(): string[] {
                return this._showPayoffAmountForTheseCollateralCodes;
            }
            set showPayoffAmountForTheseCollateralCodes(value: string[]) {
                this._showPayoffAmountForTheseCollateralCodes = value;
            }

            private _displayLateCharges: boolean;
            get displayLateCharges(): boolean {
                return this._displayLateCharges;
            }
            set displayLateCharges(value: boolean) {
                this._displayLateCharges = value;
            }

            private _displayTotalAmountBilled: boolean;
            get displayTotalAmountBilled(): boolean {
                return this._displayTotalAmountBilled;
            }
            set displayTotalAmountBilled(value: boolean) {
                this._displayTotalAmountBilled = value;
            }

            private _totalAmountBilledCategory: string;
            get totalAmountBilledCategory(): string {
                return this._totalAmountBilledCategory;
            }
            set totalAmountBilledCategory(value: string) {
                this._totalAmountBilledCategory = value;
            }

            private _displayPaymentRemaining: boolean;
            get displayPaymentRemaining(): boolean {
                return this._displayPaymentRemaining;
            }
            set displayPaymentRemaining(value: boolean) {
                this._displayPaymentRemaining = value;
            }

            private _displayRequiredToPayLateCharges: boolean;
            get displayRequiredToPayLateCharges(): boolean {
                return this._displayRequiredToPayLateCharges;
            }
            set displayRequiredToPayLateCharges(value: boolean) {
                this._displayRequiredToPayLateCharges = value;
            }

            private _highlightPastDueLoanRowInfo: boolean;
            get highlightPastDueLoanRowInfo(): boolean {
                return this._highlightPastDueLoanRowInfo;
            }
            set highlightPastDueLoanRowInfo(value: boolean) {
                this._highlightPastDueLoanRowInfo = value;
            }

            private _abilityToOverrideCreditCardTransferDescriptionEnabled: boolean;
            get abilityToOverrideCreditCardTransferDescriptionEnabled(): boolean {
                return this._abilityToOverrideCreditCardTransferDescriptionEnabled;
            }
            set abilityToOverrideCreditCardTransferDescriptionEnabled(value: boolean) {
                this._abilityToOverrideCreditCardTransferDescriptionEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LoanSettings.HarlandLoanEngine", value: this._harlandLoanEngine, dataType: 'harlandloanengine', label: "Harland Loan Engine" },
                { key: "LoanSettings.ShowPayoffAmountForTheseCollateralCodes", value: this._showPayoffAmountForTheseCollateralCodes, dataType: 'list<string>', label: "Show Payoff Amount For These Collateral Codes" },
                { key: "LoanSettings.DisplayLateCharges", value: this._displayLateCharges, dataType: 'boolean', label: "Display Late Charges" },
                { key: "LoanSettings.DisplayTotalAmountBilled", value: this._displayTotalAmountBilled, dataType: 'boolean', label: "Display Total Amount Billed" },
                { key: "LoanSettings.TotalAmountBilledCategory", value: this._totalAmountBilledCategory, dataType: 'string', label: "Total Amount Billed Category" },
                { key: "LoanSettings.DisplayPaymentRemaining", value: this._displayPaymentRemaining, dataType: 'boolean', label: "Display Payment Remaining" },
                { key: "LoanSettings.DisplayRequiredToPayLateCharges", value: this._displayRequiredToPayLateCharges, dataType: 'boolean', label: "Display Required To Pay Late Charges" },
                { key: "LoanSettings.HighlightPastDueLoanRowInfo", value: this._highlightPastDueLoanRowInfo, dataType: 'boolean', label: "Highlight Past Due Loan Row Info" },
                { key: "LoanSettings.AbilityToOverrideCreditCardTransferDescriptionEnabled", value: this._abilityToOverrideCreditCardTransferDescriptionEnabled, dataType: 'boolean', label: "Ability To Override Credit Card Transfer Description Enabled" },
            ];
        }

}