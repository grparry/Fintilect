using System;


namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class AdminAccountSettings : SettingsBaseHelper
    {
        private AccountNumberReassignmentSettings _accountNumberReassignmentSettings;

        public AdminAccountSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        public AccountNumberReassignmentSettings AccountNumberReassignment
        {
            get => _accountNumberReassignmentSettings ?? (_accountNumberReassignmentSettings = new AccountNumberReassignmentSettings(SettingsBase));
            set => _accountNumberReassignmentSettings = value;
        }

        /// <summary>
        /// Enable Account Number Reassignment feature in Admin
        /// </summary>
        [SettingKey("Admin.Account.AllowAccountNumberReassignment.Enabled")]
        public bool AllowAccountNumberReassignmentEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If true, prompt Admin user to disable or to reassign external scheduled transfers
        /// </summary>
        [SettingKey("Admin.Account.AllowAccountNumberReassignment.PromptDeactivateExternalScheduledTransfers")]
        public bool PromptDeactivateExternalScheduledTransfers
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If true replace old account number with new account number
        /// If false delete records in HouseHoldingUsers and HouseHolding permissions
        /// also mark cross account scheduled transfers as inactive
        /// </summary>
        [SettingKey("Admin.AccountNumberReassignment.ShouldConvertHouseholding")]
        public bool ShouldConvertHouseholding
        {
            get => GetBoolValue();
            set => SetValue(value);
        }


    }
}
