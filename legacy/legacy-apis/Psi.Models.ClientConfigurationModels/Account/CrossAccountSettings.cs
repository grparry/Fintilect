namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class CrossAccountSettings : SettingsBaseHelper
    {
        public CrossAccountSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// Whether or not the name of the owner of a cross account will be used as the description of the cross account.  If false, the masked cross account number will be displayed.
        /// If true, the name of the owner will be mapped to online banking.
        /// </summary>
        [SettingKey("Account.CrossAccount.ShouldUseCrossAccountOwnerNameAsCrossAccountDescription")]
        public bool ShouldUseCrossAccountOwnerNameAsCrossAccountDescription
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("Account.CrossAccount.HouseHoldingCreditCardHistoryEnabled")]
        public bool HouseHoldingCreditCardHistoryEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        ///<summary>
        /// Cross Accounts (HouseHolding) disclosure acceptance feature enabled
        /// </summary>
        [SettingKey("Account.CrossAccount.DisclosureAcceptanceEnabled")]
        public bool DisclosureAcceptanceEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Cross Accounts (HouseHolding) disclosure acceptance flag name (on core)
        /// </summary>
        [SettingKey("Account.CrossAccount.DisclosureAcceptanceFlag")]
        public string DisclosureAcceptanceFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Cross Accounts (HouseHolding) hide request permissions button / page for another account   TRUE | FALSE
        /// </summary>
        [SettingKey("Account.CrossAccount.HideAbilityToRequestPermissionsForAnotherAccount")]
        public bool HideAbilityToRequestPermissionsForAnotherAccount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Controls whether to show a link to SSO for cross account Loans
        /// True: Show SSO Link for Cross Account Loans
        /// False: Do Not Show SSO Link for Cross Account Loans
        /// </summary>
        [SettingKey("Account.CrossAccount.ShouldShowSsoLinkForCrossAccountLoans")]
        public bool ShouldShowSsoLinkForCrossAccountLoans
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, disallow withdrawals from credit cards on the cross-account access screens
        /// </summary>
        [SettingKey("Account.CrossAccount.DisallowWithdrawalsFromCreditCards")]
        public bool DisallowWithdrawalsFromCreditCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, disable the 'more details' button next to credit cards in the card summary section of the Welcome/Summary page in Home Banking
        /// </summary>
        [SettingKey("Account.CrossAccount.DisableCreditCardMoreDetailButton")]
        public bool DisableCreditCardMoreDetailButton
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        /// <summary>
        /// If true, will use the CrossAccountNode that has already been mapped to set the HouseHoldingAccess
        /// </summary>
        [SettingKey("Account.CrossAccount.GetHouseholdingPermissionsFromCrossAccountNode")]
        public bool GetHouseholdingPermissionsFromCrossAccountNode
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("Account.CrossAccount.ReadCreditCardsFromCore")]
        public bool ReadCreditCardsFromCore
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, will use the TIN when performing account inquiry
        /// </summary>
        [SettingKey("X.App.HBBOL.IsCrossAccountInquiryByTin")]
        public bool IsCrossAccountInquiryByTin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Householding.GrantInquiryPermissionDelayTime")]
        public int GrantInquiryPermissionDelayTime
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Householding.GrantDepositPermissionDelayTime")]
        public int GrantDepositPermissionDelayTime
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Householding.GrantWithdrawalPermissionDelayTime")]
        public int GrantWithdrawalPermissionDelayTime
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Householding.CheckHouseHoldingValuesFromDatabase")]
        public bool CheckHouseHoldingValuesFromDatabase
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.HouseholdingPermissionSource")]
        public string HouseholdingPermissionSource
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.DeleteSubAccountNoHouseholding")]
        public bool DeleteSubAccountNoHouseholding
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
