// Generated imports
import { CertificateCategoriesForRates } from '../CertificateCategoriesForRates';
import { AccountCategoriesWithChecks } from '../AccountCategoriesWithChecks';
import { CheckingAccountCategories } from '../CheckingAccountCategories';
import { ShareAccountCategories } from '../ShareAccountCategories';
import { SavingsAccountCategories } from '../SavingsAccountCategories';
import { HomeEquityCheckingAccountCategories } from '../HomeEquityCheckingAccountCategories';
import { Transfers } from '../Transfers';
import { ScheduledTransfers } from '../ScheduledTransfers';
import { AccountOpening } from './AccountOpening';
import { CrossAccountSettings } from '../CrossAccountSettings';
import { DebitCards } from '../DebitCards';
import { JointOwners } from '../JointOwners';
import { Cards } from '../Cards';
import { Escheat } from '../Escheat';
import { LineOfCreditCategories } from '../LineOfCreditCategories';
import { CoreCategoryToDisplayCategoryMappings } from '../CoreCategoryToDisplayCategoryMappings';
import { RemoteDepositAccounts } from '../RemoteDepositAccounts';

export interface AccountSettings {
    /** @settingKey Accounts.GetDebitCardsDuringAccountInquiry */
    getDebitCardsDuringAccountInquiry: boolean;
    /** @settingKey Accounts.ShowClosedAccountsOnDashboard */
    showClosedAccountsOnDashboard: boolean;
    /** @settingKey Accounts.HideLoanSummaryControlWhenMemberHasNoLoans */
    hideLoanSummaryControlWhenMemberHasNoLoans: boolean;
    /** @settingKey Accounts.ShowRateForSharesOnDashboardAndSummary */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, show rate for shares on summary and dashboard views in HomeBanking
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowRateForSharesOnDashboardAndSummary: boolean;
    /** @settingKey Accounts.CertificateCategoriesForRates */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of valid share categories for certificates. default: IRA
     * /// /// </summary>
     * /// </summary>
     */
    list: CertificateCategoriesForRates;
    /** @settingKey Account.UseCoreSuffixNicknamesOnly */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This config is currently only valid for DNA and Spectrum cores
     * /// /// If true, nicknames will be stored in the core
     * /// /// If false, nicknames will be stored in our HomeBankingAccountAlias table
     * /// /// </summary>
     * /// </summary>
     */
    useCoreSuffixNicknamesOnly: boolean;
    /** @settingKey X.App.HomeBanking.AccountHasChecks */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Comma-delimited list of account types that have checks (for check image retrieval)
     * /// /// </summary>
     * /// </summary>
     */
    list: AccountCategoriesWithChecks;
    /** @settingKey X.App.HBBOL.obsCheckingAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of Account categories that are Checking accounts
     * /// /// </summary>
     * /// </summary>
     */
    list: CheckingAccountCategories;
    /** @settingKey X.App.HomeBanking.obsShareAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of Account categories that are share accounts
     * /// /// </summary>
     * /// </summary>
     */
    list: ShareAccountCategories;
    /** @settingKey X.App.HomeBanking.SavingsAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of Account categories that are savings accounts
     * /// /// </summary>
     * /// </summary>
     */
    list: SavingsAccountCategories;
    /** @settingKey X.App.HomeBanking.ShowMMAChecks */
    shouldShowMmaChecks: boolean;
    /** @settingKey X.App.HomeBanking.HECheckCategory */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of Account categories that are loan home equity accounts
     * /// /// </summary>
     * /// </summary>
     */
    list: HomeEquityCheckingAccountCategories;
    transfers: Transfers;
    scheduledTransfers: ScheduledTransfers;
    accountOpening: AccountOpening;
    crossAccountSettings: CrossAccountSettings;
    debitCards: DebitCards;
    jointOwners: JointOwners;
    cards: Cards;
    escheat: Escheat;
    /** @settingKey X.App.HBBOL.obsLineOfCredit */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of line of credit categories
     * /// /// </summary>
     * /// </summary>
     */
    list: LineOfCreditCategories;
    /** @settingKey Account.CoreCategoryToDisplayCategoryMappings */
    dictionary: CoreCategoryToDisplayCategoryMappings;
    /** @settingKey X.App.HomeBanking.UsePreviousMicrNumber */
    usePreviousMicrNumber: boolean;
    /** @settingKey X.App.HomeBanking.RemoteDepositAccounts */
    list: RemoteDepositAccounts;
    /** @settingKey X.App.HomeBanking.AliasType1 */
    aliasType1: string;
    /** @settingKey Account.NicknameValidationRegex */
    nicknameValidationRegex: string;
    /** @settingKey Account.ShowAccountLimitsOnDirectDepositPage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If set to true, show account limits on the direct deposit information page
     * /// /// </summary>
     * /// </summary>
     */
    showAccountLimitsOnDirectDepositPage: boolean;
}
