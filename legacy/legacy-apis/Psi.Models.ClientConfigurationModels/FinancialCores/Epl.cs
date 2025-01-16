namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class Epl : SettingsBaseHelper
    {
        public Epl(ISettingsBase settingsBase) : base(settingsBase)
        {
        }


        /// <summary>
        /// If this setting is true (true is the default), then the epl account inquiry mapper will add account inquiry notes for each cross account.  If it is turned off,
        /// the cross accounts (shares and loans that the logged in member has access to, but that are not part of the logged in member's main account) will all be added to the 
        /// same account inquiry node in the Home Banking Xlate reply.
        /// </summary>
        [SettingKey("FinancialCore.Epl.ShouldAddAccountInquiryRepliesForCrossAccounts")]
        public bool ShouldAddAccountInquiryRepliesForCrossAccounts
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        /// <summary>
        /// If this setting is set to true, cross accounts are able to make deposits to a credit card
        /// </summary>
        [SettingKey("FinancialCore.Epl.CreditCardDepositPermitted")]
        public bool CreditCardDepositPermitted
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If this setting is set to true, cross accounts are able to make Inquiries to a credit card
        /// </summary>
        [SettingKey("FinancialCore.Epl.CreditCardInquiryPermitted")]
        public bool CreditCardInquiryPermitted
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If this setting is set to true, cross accounts are able to make Withdrawals to a credit card
        /// </summary>
        [SettingKey("FinancialCore.Epl.CreditCardWithdrawalPermitted")]
        public bool CreditCardWithdrawalPermitted
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}