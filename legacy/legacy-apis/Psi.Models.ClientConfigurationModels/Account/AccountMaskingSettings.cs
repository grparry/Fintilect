namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class AccountMaskingSettings : SettingsBaseHelper
    {
        public AccountMaskingSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("Account.Masking.LengthToShow")]
        public int MaskingLengthToShow
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        //TODO:  This property to should be converted to a list of String, instead of relying on consumers of this setting to parse the comma delimited string.
        [SettingKey("Account.Masking.HideWelcomeBarDetail")]
        public string HideWelcomeBarDetail
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Account.Masking.AccountHistoryMaskingEnabled")]
        public bool AccountHistoryMaskingEnabled
        {
            get { return GetBoolValue() && !string.IsNullOrWhiteSpace(AccountHistoryMaskingRegexMatchingPatterns); }
            set { SetValue(value); }
        }

        [SettingKey("Account.Masking.AccountHistoryMaskingRegexMatchingPatterns")]
        public string AccountHistoryMaskingRegexMatchingPatterns
        {
            get { return GetValue() ?? string.Empty; }
            set { SetValue(value); }
        }

        [SettingKey("Account.Masking.CheckCopyMaskingEnabled")]
        public bool CheckCopyMaskingEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If true, then show the unmasked Member Number when the user clicks on their Member Number in the PageMemberInfo.ascx member info control.
        /// </summary>
        [SettingKey("Account.Masking.ShowUnmaskedMemberNumberOnUserClick")]
        public bool ShowUnmaskedMemberNumberOnUserClick
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
