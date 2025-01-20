// Generated imports
import { ShareRestrictedCheckWithdraw } from '../ShareRestrictedCheckWithdraw';
import { LoanClosedFlags } from '../LoanClosedFlags';
import { LoanRestrictedAlerts } from '../LoanRestrictedAlerts';
import { LoanRestrictedInquire } from '../LoanRestrictedInquire';
import { obsMemberRestrictedAllTrans } from '../obsMemberRestrictedAllTrans';
import { obsMemberRestrictedDeposit } from '../obsMemberRestrictedDeposit';
import { obsMemberRestrictedInquire } from '../obsMemberRestrictedInquire';
import { obsShareRestrictedDeposit } from '../obsShareRestrictedDeposit';
import { LoanRestrictedDepositFlags } from '../LoanRestrictedDepositFlags';
import { obsShareRestrictedInquire } from '../obsShareRestrictedInquire';
import { obsShareRestrictedWithdraw } from '../obsShareRestrictedWithdraw';
import { ShareClosedFlags } from '../ShareClosedFlags';
import { ShareRestrictedAlerts } from '../ShareRestrictedAlerts';

export interface Flags {
    /** @settingKey X.App.HBBol.HBFlagNumber */
    hBFlagNumber: string;
    /** @settingKey X.App.HBBOL.BillPayFlagNumber */
    billPayFlagNumber: string;
    /** @settingKey X.App.HomeBanking.BusinessAccountFlag */
    businessAccountFlag: string;
    /** @settingKey X.App.HBBOL.EStatementFlagNumber */
    eStatementFlagNumber: string;
    /** @settingKey X.App.HomeBanking.ShareRestrictedCheckWithdraw */
    list: ShareRestrictedCheckWithdraw;
    /** @settingKey X.App.HBBOL.EDocumentsFlagNumber */
    eDocumentsFlagNumber: string;
    /** @settingKey Escheat.UpdateEscheatDate.FlagNumber */
    escheatDateFlag: string;
    /** @settingKey X.App.HomeBanking.FreeCheckReorderFlag */
    freeCheckReorderFlag: string;
    /** @settingKey X.App.HBBOL.HasCCFlagNumber */
    hasCCFlagNumber: string;
    /** @settingKey X.App.HBBOL.IsDebitCardFlagNumber */
    isDebitCardFlagNumber: string;
    /** @settingKey X.App.HomeBanking.IsEmployeeFlagNumber */
    isEmployeeFlagNumber: string;
    /** @settingKey X.App.HomeBanking.LoanClosedFlags */
    list: LoanClosedFlags;
    /** @settingKey X.App.HomeBanking.LoanRestrictedAlerts */
    list: LoanRestrictedAlerts;
    /** @settingKey X.App.HBBOL.LoanRestrictedInquire */
    list: LoanRestrictedInquire;
    /** @settingKey X.App.HomeBanking.MidwestLoansFlag */
    midwestLoansFlag: string;
    /** @settingKey X.App.HBBOL.MobileDepositAllowedFlag */
    mobileDepositAllowedFlag: string;
    /** @settingKey X.App.HBBOL.MobileDepositRestrictedFlag */
    mobileDepositRestrictedFlag: string;
    /** @settingKey X.App.HBBOL.MobileDepositDisclosureFlag */
    mobileDepositDisclosureFlag: string;
    /** @settingKey X.App.HBBOL.obsMemberRestrictedAllTrans */
    list: obsMemberRestrictedAllTrans;
    /** @settingKey X.App.HomeBanking.obsMemberRestrictedDeposit */
    list: obsMemberRestrictedDeposit;
    /** @settingKey X.App.HomeBanking.obsMemberRestrictedInquire */
    list: obsMemberRestrictedInquire;
    /** @settingKey X.App.HBBOL.obsShareRestrictedDeposit */
    list: obsShareRestrictedDeposit;
    /** @settingKey X.App.HomeBanking.obsLoanRestrictedDeposit */
    list: LoanRestrictedDepositFlags;
    /** @settingKey X.App.HBBOL.obsShareRestrictedInquire */
    list: obsShareRestrictedInquire;
    /** @settingKey X.App.HomeBanking.obsShareRestrictedWithdraw */
    list: obsShareRestrictedWithdraw;
    /** @settingKey X.App.HBBOL.RestrictViewingCardFlagNumber */
    restrictViewingCardFlagNumber: string;
    /** @settingKey X.App.HomeBanking.ShareClosedFlags */
    list: ShareClosedFlags;
    /** @settingKey X.App.HomeBanking.ShareRestrictedAlerts */
    list: ShareRestrictedAlerts;
    /** @settingKey X.App.HBBOL.SkipPayQualifyFlag */
    skipPayQualifyFlag: string;
    /** @settingKey X.App.HBBOL.ValidAddressFlagNumber */
    validAddressFlagNumber: string;
    /** @settingKey X.App.HBBOL.ValidEmailFlag */
    validEmailFlag: string;
    /** @settingKey X.App.HBBOL.NSFFlags */
    nsfFlags: string;
    /** @settingKey MemberShip.ShouldUpdateOnlineBankingRegisteredFlag */
    shouldUpdateOnlineBankingRegisteredFlag: boolean;
    /** @settingKey MemberShip.OnlineBankingRegisteredFlag */
    onlineBankingRegisteredFlag: string;
}
