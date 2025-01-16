using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class AccountSettings : SettingsBaseHelper
    {
        private Transfers _transfer;
        private ScheduledTransfers _scheduledTransfers;
        private AccountOpening _accountOpening;
        private CrossAccountSettings _crossAccount;
        private DebitCards _debitCards;
        private JointOwners _jointOwners;
        private Cards _cards;
        private Escheat _escheat;

        public AccountSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Accounts.GetDebitCardsDuringAccountInquiry")]
        public bool GetDebitCardsDuringAccountInquiry
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Accounts.ShowClosedAccountsOnDashboard")]
        public bool ShowClosedAccountsOnDashboard
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Accounts.HideLoanSummaryControlWhenMemberHasNoLoans")]
        public bool HideLoanSummaryControlWhenMemberHasNoLoans
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, show rate for shares on summary and dashboard views in HomeBanking
        /// </summary>
        [SettingKey("Accounts.ShowRateForSharesOnDashboardAndSummary")]
        public bool ShouldShowRateForSharesOnDashboardAndSummary
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// list of valid share categories for certificates. default: IRA
        /// </summary>
        [SettingKey("Accounts.CertificateCategoriesForRates")]
        public List<string> CertificateCategoriesForRates
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// This config is currently only valid for DNA and Spectrum cores
        /// If true, nicknames will be stored in the core
        /// If false, nicknames will be stored in our HomeBankingAccountAlias table
        /// </summary>
        [SettingKey("Account.UseCoreSuffixNicknamesOnly")]
        public bool UseCoreSuffixNicknamesOnly
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Comma-delimited list of account types that have checks (for check image retrieval)
        /// </summary>
        [SettingKey("X.App.HomeBanking.AccountHasChecks")]
        public List<string> AccountCategoriesWithChecks
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// list of Account categories that are Checking accounts
        /// </summary>
        [SettingKey("X.App.HBBOL.obsCheckingAccounts")]
        public List<string> CheckingAccountCategories
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// list of Account categories that are share accounts
        /// </summary>
        [SettingKey("X.App.HomeBanking.obsShareAccounts")]
        public List<string> ShareAccountCategories
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// list of Account categories that are savings accounts
        /// </summary>
        [SettingKey("X.App.HomeBanking.SavingsAccounts")]
        public List<string> SavingsAccountCategories
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("X.App.HomeBanking.ShowMMAChecks")]
        public bool ShouldShowMmaChecks
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// list of Account categories that are loan home equity accounts
        /// </summary>
        [SettingKey("X.App.HomeBanking.HECheckCategory")]
        public List<string> HomeEquityCheckingAccountCategories
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        public Transfers Transfers
        {
            get => _transfer ?? (_transfer = new Transfers(SettingsBase));
            set => _transfer = value;
        }

        public ScheduledTransfers ScheduledTransfers
        {
            get => _scheduledTransfers ?? (_scheduledTransfers = new ScheduledTransfers(SettingsBase));
            set => _scheduledTransfers = value;
        }

        public AccountOpening AccountOpening
        {
            get => _accountOpening ?? (_accountOpening = new AccountOpening(SettingsBase));
            set => _accountOpening = value;
        }

        public CrossAccountSettings CrossAccount
        {
            get => _crossAccount ?? (_crossAccount = new CrossAccountSettings(SettingsBase));
            set => _crossAccount = value;
        }

        public DebitCards DebitCards
        {
            get => _debitCards ?? (_debitCards = new DebitCards(SettingsBase));
            set => _debitCards = value;
        }

        public JointOwners JointOwners
        {
            get => _jointOwners ?? (_jointOwners = new JointOwners(SettingsBase));
            set => _jointOwners = value;
        }

        public Cards Cards
        {
            get => _cards ?? (_cards = new Cards(SettingsBase));
            set => _cards = value;
        }

        public Escheat Escheat
        {
            get => _escheat ?? (_escheat = new Escheat(SettingsBase));
            set => _escheat = value;
        }

        /// <summary>
        /// list of line of credit categories  
        /// </summary>
        [SettingKey("X.App.HBBOL.obsLineOfCredit")]
        public List<string> LineOfCreditCategories
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();     //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("Account.CoreCategoryToDisplayCategoryMappings")]
        public Dictionary<string, string> CoreCategoryToDisplayCategoryMappings
        {
            get
            {
                var value = GetValue();
                return string.IsNullOrWhiteSpace(value) ? new Dictionary<string, string>() : JsonConvert.DeserializeObject<Dictionary<string, string>>(value);
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.UsePreviousMicrNumber")]
        public bool UsePreviousMicrNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.RemoteDepositAccounts")]
        public List<string> RemoteDepositAccounts
        {
            get
            {
                var categories = GetListValue();

                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("X.App.HomeBanking.AliasType1")]
        public string AliasType1
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Account.NicknameValidationRegex")]
        public string NicknameValidationRegex
        {
            get
            {
                var value = GetValue();
                return string.IsNullOrWhiteSpace(value) ? AliasType1 : value;
            }
            set => SetValue(value);
        }

        /// <summary>
        /// If set to true, show account limits on the direct deposit information page
        /// </summary>
        [SettingKey("Account.ShowAccountLimitsOnDirectDepositPage")]
        public bool ShowAccountLimitsOnDirectDepositPage
        {
            get => GetBoolValue();
            set => SetValue(value);
        }     
    }
}
