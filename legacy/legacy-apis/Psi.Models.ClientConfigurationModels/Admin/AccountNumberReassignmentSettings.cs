namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class AccountNumberReassignmentSettings : SettingsBaseHelper
    {
        public AccountNumberReassignmentSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If the Uuid should be changed during an account number reassignment
        /// </summary>
        [SettingKey("Admin.Account.AccountNumberReassignment.ChangeUuidWhenAccountNumberMatches")]
        public bool ChangeUuidWhenAccountNumberMatches
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If Mfa questions should be removed upon account number reassignment
        /// </summary>
        [SettingKey("Admin.Account.AccountNumberReassignment.RemoveMfaQuestion")]
        public bool RemoveMfaQuestion
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If scheduled transfers using account number should be disabled
        /// </summary>
        [SettingKey("Admin.Account.AccountNumberReassignment.DisableScheduledTransfersUsingAccount")]
        public bool DisableScheduledTransfersUsingAccount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
