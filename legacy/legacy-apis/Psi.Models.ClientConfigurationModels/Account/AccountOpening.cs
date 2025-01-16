namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class AccountOpening : SettingsBaseHelper
    {
        public AccountOpening(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If enabled, then credit union can access Views/AccountOpening.cshtml and the features that accompany it.
        /// </summary>
        [SettingKey("Accounts.AccountOpening.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Minimum version for this feature to run
        /// </summary>
        [SettingKey("Accounts.AccountOpening.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Accounts.AccountOpening.OnlySendEmailOnNewAccountCreation")]
        public bool OnlySendEmailOnNewAccountCreation
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If true, enable the hiding of the 'contact info' area on the new sub account opening page in HomeBanking
        /// </summary>
        [SettingKey("Accounts.AccountOpening.HideContactInfoDuringSubAccountOpening")]
        public bool ShouldHideContactInfoDuringSubAccountOpening
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
