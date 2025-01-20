// Generated imports
import { HarlandLoanEngine } from '../LoanSSO/HarlandLoanEngine';
import { ShowPayoffAmountForTheseCollateralCodes } from '../ShowPayoffAmountForTheseCollateralCodes';

export interface LoanSettings {
    /**
     * /// <summary>get an instance of the HarlandLoanEngine</summary>
     */
    harlandLoanEngine: HarlandLoanEngine;
    /** @settingKey Loans.Payoff.ShowPayoffAmountForTheseCollateralCodes */
    list: ShowPayoffAmountForTheseCollateralCodes;
    /** @settingKey Loans.Payments.DisplayLateCharges */
    displayLateCharges: boolean;
    /** @settingKey Loans.Payments.DisplayTotalAmountBilled */
    displayTotalAmountBilled: boolean;
    /** @settingKey Loans.Payments.Loans.Payments.TotalAmountBilledCategory */
    totalAmountBilledCategory: string;
    /** @settingKey Loans.Payments.DisplayPaymentRemaining */
    displayPaymentRemaining: boolean;
    /** @settingKey Loans.Payments.DisplayRequiredToPayLateCharges */
    displayRequiredToPayLateCharges: boolean;
    /** @settingKey Loans.Payments.HighlightPastDueLoanRowInfo */
    highlightPastDueLoanRowInfo: boolean;
    /** @settingKey Loans.CreditCards.AbilityToOverrideCreditCardTransferDescriptionEnabled */
    abilityToOverrideCreditCardTransferDescriptionEnabled: boolean;
}
