using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using NLog;

namespace Psi.Data.Models.ClientConfigurationModels.Application
{
    public class OnlineBankingConfiguration : SettingsBaseHelper
    {

        public OnlineBankingConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
        }


        [SettingKey("Application.OnlineBanking.IgnoreCanRun")]
        public bool IgnoreCanRun
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Application.OnlineBanking.Version")]
        public double Version
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.FeeAccounts.ShareCategories")]
        public List<string> FeeAccountsShareCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("Transfers.FeeAccounts.LoanCategories")]
        public List<string> FeeAccountsLoanCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, this setting will change Corelation core integration to be person centric rather than account (member account) centric.
        /// For example, if this setting is true, notes (also known as permissions or flags), will be set on the person level rather than the 
        /// account (member account) level.
        /// </summary>
        [SettingKey("Application.OnlineBanking.IsPersonCentricModeEnabled")]
        [SuppressMessage("ReSharper", "ExplicitCallerInfoArgument")]
        public bool IsPersonCentricModeEnabled
        {
            get
            {
                var isPersonCentricMode = GetBoolValue();
                if (isPersonCentricMode && !GetBoolValue("HomeBankingLogin.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount") && !GetBoolValue("HomeBankingLogin.UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount") && GetValue("FinancialCore.Corelation.LoginChannelDescription").IsNullOrEmptyAfterTrim())
                {
                    var exception = new Exception($"HomeBankingLogin.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount and HomeBankingLogin.UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount must be enabled; FinancialCore.Corelation.LoginChannelDescription must also have a value; if Application.OnlineBanking.IsPersonCentricModeEnabled is enabled.");
                    LogManager.GetCurrentClassLogger().Error(exception);
                    throw exception;
                }
                return GetBoolValue();
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.KeepAliveInterval")]
        public int KeepAliveInterval
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.TimeoutWarningMessage")]
        public string TimeoutWarningMessage
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ForceLoginByAccountAlias")]
        public bool ForceLoginByAccountAlias
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AccountIDRegEx")]
        public string AccountIDRegEx
        {
            get => GetValue();
            set => SetValue(value);
        }

    }
}