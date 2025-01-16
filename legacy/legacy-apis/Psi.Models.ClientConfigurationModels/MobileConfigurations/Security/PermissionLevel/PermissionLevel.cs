using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.PermissionLevel
{
	public class PermissionLevel : SettingsBaseHelper
    {
	    public PermissionLevel(ISettingsBase settingsBase) : base(settingsBase)
        {
	    }

        [SettingKey("Mobile.Security.PermissionLevel.TransactionHistory")]
        public AuthenticationMethodType TransactionHistory
		{
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("Mobile.Security.PermissionLevel.AccountSummary")]
        public AuthenticationMethodType AccountSummary
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.BillPay")]
        public AuthenticationMethodType BillPay
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.CardControl")]
        public AuthenticationMethodType CardControl
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.Cardlytics")]
        public AuthenticationMethodType Cardlytics
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.EStatements")]
        public AuthenticationMethodType Estatements
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.LoanApplication")]
        public AuthenticationMethodType LoanApplication
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.CheckDeposit")]
        public AuthenticationMethodType CheckDeposit
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.MoneyDesktop")]
        public AuthenticationMethodType MoneyDesktop
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.RelevantSolutions")]
        public AuthenticationMethodType RelevantSolutions
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.QuickAccess")]
        public AuthenticationMethodType QuickAccess
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.SendMoney")]
        public AuthenticationMethodType SendMoney
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.Settings")]
        public AuthenticationMethodType Settings
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.Transfer")]
        public AuthenticationMethodType Transfer
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.CheckingRewards")]
        public AuthenticationMethodType CheckingRewards
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.AutoLoanCalculator")]
        public AuthenticationMethodType AutoLoanCalculator
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.PermissionLevel.LoanPayment")]
        public AuthenticationMethodType LoanPayment
        {
            get { return GetAuthenticationMethodTypeValue(); }
            set { SetValue(value);}
		}
	}
}
