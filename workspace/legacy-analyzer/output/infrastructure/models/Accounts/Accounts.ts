// Generated imports
import { Nicknames } from '../Nicknames';
import { AccountHistoryQuickActions } from '../MobileConfigurations/Accounts/AccountHistoryQuickActions';
import { Authentication } from '../Authentication';
import { Cards } from '../Account/Cards';

export interface Accounts {
    /** @settingKey Mobile.Accounts.DisplayBalanceAndAvailable */
    displayBalanceAndAvailable: boolean;
    /** @settingKey Mobile.Accounts.CanHideClosedAccounts */
    canHideClosedAccounts: boolean;
    /** @settingKey Mobile.Accounts.NewAccountsInterfaceEnabled */
    newAccountsInterfaceEnabled: boolean;
    /** @settingKey Mobile.Accounts.LoadCrossAccounts */
    loadCrossAccounts: boolean;
    /** @settingKey Mobile.Accounts.AccountHistorySearchBarEnabled */
    accountHistorySearchBarEnabled: boolean;
    /** @settingKey Mobile.Accounts.ShouldShowCertificateDetails */
    shouldShowCertificateDetails: boolean;
    /** @settingKey Mobile.Accounts.ShouldShowApplyForCreditCard */
    shouldShowApplyForCreditCard: boolean;
    /** @settingKey Mobile.Accounts.ApplyForCreditCardUrl */
    applyForCreditCardUrl: string;
    /** @settingKey Mobile.Accounts.ApplyForCreditCardUrlTarget */
    applyForCreditCardUrlTarget: string;
    /** @settingKey Mobile.Accounts.ShouldShowMicrNumber */
    shouldShowMicrNumber: boolean;
    /** @settingKey Mobile.Accounts.UsePreviousMicrNumber */
    usePreviousMicrNumber: boolean;
    /** @settingKey X.App.HomeBanking.AccountInquiryExpirationTime */
    accountInquiryExpirationTime: number;
    /** @settingKey Mobile.Summary.ShowMaskedAccountSuffixInAccountName */
    showMaskedAccountSuffixInAccountName: boolean;
    nicknames: Nicknames;
    accountHistoryQuickActions: AccountHistoryQuickActions;
    authentication: Authentication;
    cards: Cards;
}
