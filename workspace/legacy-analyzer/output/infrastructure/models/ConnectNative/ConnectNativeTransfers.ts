// Generated imports
import { AllowExtraToPrincipalPaymentLoanCategories } from '../AllowExtraToPrincipalPaymentLoanCategories';
import { AllowPrincipalOnlyPaymentLoanCategories } from '../AllowPrincipalOnlyPaymentLoanCategories';
import { AllowedAchTransferToAccountCategories } from '../AllowedAchTransferToAccountCategories';
import { AllowedAchTransferFromAccountCategories } from '../AllowedAchTransferFromAccountCategories';
import { AllowedTransferToAccountCategories } from '../AllowedTransferToAccountCategories';
import { AllowedTransferFromAccountCategories } from '../AllowedTransferFromAccountCategories';
import { ShareRestrictedInquireFlags } from '../ShareRestrictedInquireFlags';
import { ShareRestrictedWithdrawFlags } from '../ShareRestrictedWithdrawFlags';
import { ShareRestrictedDepositFlags } from '../ShareRestrictedDepositFlags';
import { LoanRestrictedInquireFlags } from '../LoanRestrictedInquireFlags';
import { LoanRestrictedWithdrawFlags } from '../LoanRestrictedWithdrawFlags';
import { LoanRestrictedDepositFlags } from '../LoanRestrictedDepositFlags';
import { Money } from '../Money';
import { [AchAllowedType](../../../AchAllowedType.md) } from '../[AchAllowedType](../../../AchAllowedType.md)';
import { DefaultTransferAmounts } from '../DefaultTransferAmounts';
import { PrefilledTransferAmountsSortOrder } from '../PrefilledTransferAmountsSortOrder';
import { CashAdvanceWarningLoanCategories } from '../CashAdvanceWarningLoanCategories';

export interface ConnectNativeTransfers {
    /** @settingKey ConnectNative.Transfers.EnableTransfersFromShares */
    enableTransfersFromShares: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersToShares */
    enableTransfersToShares: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersShareToShare */
    enableTransfersShareToShare: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersFromLoans */
    enableTransfersFromLoans: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersToLoans */
    enableTransfersToLoans: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersLoanToShare */
    enableTransfersLoanToShare: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersShareToLoan */
    enableTransfersShareToLoan: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersLoanToLoan */
    enableTransfersLoanToLoan: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersToLinkedAccounts */
    enableTransfersToLinkedAccounts: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersFromLinkedAccounts */
    enableTransfersFromLinkedAccounts: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersShareToLinkedAccount */
    enableTransfersShareToLinkedAccount: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersLoanToLinkedAccount */
    enableTransfersLoanToLinkedAccount: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersLinkedAccountToShare */
    enableTransfersLinkedAccountToShare: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersLinkedAccountToLoan */
    enableTransfersLinkedAccountToLoan: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersToCrossAccounts */
    enableTransfersToCrossAccounts: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersFromCrossAccounts */
    enableTransfersFromCrossAccounts: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersCrossAccountToShare */
    enableTransfersCrossAccountToShare: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersCrossAccountToLoan */
    enableTransfersCrossAccountToLoan: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersShareToCrossAccount */
    enableTransfersShareToCrossAccount: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersLoanToCrossAccount */
    enableTransfersLoanToCrossAccount: boolean;
    /** @settingKey ConnectNative.Transfers.EnableTransfersCrossAccountToCrossAccount */
    enableTransfersCrossAccountToCrossAccount: boolean;
    /** @settingKey ConnectNative.Transfers.EnablePrincipalOnlyOption */
    enablePrincipalOnlyOption: boolean;
    /** @settingKey ConnectNative.Transfers.EnableExtraToPrincipalOption */
    enableExtraToPrincipalOption: boolean;
    /** @settingKey ConnectNative.Transfers.ShouldDisplayPayoffAmount */
    shouldDisplayPayoffAmount: boolean;
    /** @settingKey X.App.HomeBanking.obsMortgages */
    list: AllowExtraToPrincipalPaymentLoanCategories;
    /** @settingKey X.App.HomeBanking.obsLoanAccounts */
    list: AllowPrincipalOnlyPaymentLoanCategories;
    /** @settingKey X.App.Homebanking.obsACHTransferToAccounts */
    list: AllowedAchTransferToAccountCategories;
    /** @settingKey X.App.HomeBanking.obsACHTransferFromAccounts */
    list: AllowedAchTransferFromAccountCategories;
    /** @settingKey X.App.Homebanking.obsTransferToAccounts */
    list: AllowedTransferToAccountCategories;
    /** @settingKey X.App.HomeBanking.obsTransferFromAccounts */
    list: AllowedTransferFromAccountCategories;
    /** @settingKey X.App.HBBOL.obsShareRestrictedInquire */
    list: ShareRestrictedInquireFlags;
    /** @settingKey X.App.HomeBanking.obsShareRestrictedWithdraw */
    list: ShareRestrictedWithdrawFlags;
    /** @settingKey X.App.HBBOL.obsShareRestrictedDeposit */
    list: ShareRestrictedDepositFlags;
    /** @settingKey X.App.HBBOL.obsLoanRestrictedInquire */
    list: LoanRestrictedInquireFlags;
    /** @settingKey X.App.HomeBanking.obsLoanRestrictedWithdraw */
    list: LoanRestrictedWithdrawFlags;
    /** @settingKey X.App.HomeBanking.obsLoanRestrictedDeposit */
    list: LoanRestrictedDepositFlags;
    /** @settingKey ConnectNative.Transfers.ShouldDisplayAccountNicknames */
    shouldDisplayAccountNicknames: boolean;
    /** @settingKey ConnectNative.Transfers.ShouldDisplayRemainingRegDCount */
    shouldDisplayRemainingRegDCount: boolean;
    /** @settingKey X.App.HBBOL.LinkedACHInboundFreePerMonth */
    maxFreeInboundAchTransfersPerMonth: number;
    /** @settingKey X.App.HBBOL.LinkedACHOutboundFreePerMonth */
    maxFreeOutboundAchTransfersPerMonth: number;
    /** @settingKey X.App.HomeBanking.IntraBankTransfersOnlyAllowed */
    intraBankTransfersOnlyAllowed: boolean;
    /** @settingKey X.App.HBBOL.LinkedACHInboundFee */
    money: Money;
    /** @settingKey X.App.HBBOL.LinkedACHOutboundFee */
    money: Money;
    /** @settingKey X.App.HomeBanking.ACHAllowedTypes */
    achAllowedType: [AchAllowedType](../../../AchAllowedType.md);
    /** @settingKey ConnectNative.Transfers.PrefilledTransferAmountsEnabled */
    prefilledTransferAmountsEnabled: boolean;
    /** @settingKey ConnectNative.Transfers.PrefilledTransferAmountDefaults */
    defaultTransferAmounts: DefaultTransferAmounts;
    /** @settingKey ConnectNative.Transfers.PrefilledTransferAmountsSortOrder */
    list: PrefilledTransferAmountsSortOrder;
    /** @settingKey ConnectNative.Transfers.MaxNumberOfPrefilledTransferAmounts */
    maxNumberOfPrefilledTransferAmounts: number;
    /** @settingKey X.App.HomeBanking.CashAdvanceWarningLoanCategories */
    list: CashAdvanceWarningLoanCategories;
    /** @settingKey X.App.HomeBanking.CashAdvanceFromCreditCardsEnabled */
    cashAdvanceFromCreditCardsEnabled: boolean;
    /** @settingKey X.App.HomeBanking.MICRNumberFirstFourDigits */
    /**
     * /// <summary> The first four digits of a MICR number for bill pay </summary>
     */
    micrNumberFirstFourDigitsForBillPay: string;
    /** @settingKey ConnectNative.Transfers.EnableTransfersToCreditCards */
    enableTransfersToCreditCards: boolean;
}
