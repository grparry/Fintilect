using System;
using Psi.Data.Models.ClientConfigurationModels.Account;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Accounts
{
    public class Accounts : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Authentication.Authentication _authentication;
        private Nicknames _nicknames;
        private AccountHistoryQuickActions _accountHistoryQuickActions;
        private Cards _cards;

        public Accounts(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Accounts.DisplayBalanceAndAvailable")]
        public bool DisplayBalanceAndAvailable
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.CanHideClosedAccounts")]
        public bool CanHideClosedAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.NewAccountsInterfaceEnabled")]
        public bool NewAccountsInterfaceEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.LoadCrossAccounts")]
        public bool LoadCrossAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.AccountHistorySearchBarEnabled")]
        public bool AccountHistorySearchBarEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.ShouldShowCertificateDetails")]
        public bool ShouldShowCertificateDetails
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.ShouldShowApplyForCreditCard")]
        public bool ShouldShowApplyForCreditCard
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.ApplyForCreditCardUrl")]
        public string ApplyForCreditCardUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.ApplyForCreditCardUrlTarget")]
        public string ApplyForCreditCardUrlTarget
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.ShouldShowMicrNumber")]
        public bool ShouldShowMicrNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.UsePreviousMicrNumber")]
        public bool UsePreviousMicrNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AccountInquiryExpirationTime")]
        public int AccountInquiryExpirationTime
        {
            get => GetIntValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.Summary.ShowMaskedAccountSuffixInAccountName")]
        public bool ShowMaskedAccountSuffixInAccountName
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Nicknames Nicknames
        {
            get => _nicknames ?? (_nicknames = new Nicknames(_settingsBase));
            set => _nicknames = value;
        }

        public AccountHistoryQuickActions AccountHistoryQuickActions
        {
            get => _accountHistoryQuickActions ?? (_accountHistoryQuickActions = new AccountHistoryQuickActions(_settingsBase));
            set => _accountHistoryQuickActions = value;
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("BAE6FDDD-4028-4C9A-ABF2-75D351C18A99")));
            set => _authentication = value;
        }

        public Cards Cards {
            get => _cards ?? (_cards = new Cards(_settingsBase));
            set => _cards = value;
        }

    }
}
