namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class SmsSettings : SettingsBaseHelper
    {
        private SecurityCodeVerificationSettings _securityCodeVerificationSettings;

        public SmsSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        public SecurityCodeVerificationSettings SecurityCodeVerification
        {
            get => _securityCodeVerificationSettings ?? (_securityCodeVerificationSettings = new SecurityCodeVerificationSettings(SettingsBase));
            set => _securityCodeVerificationSettings = value;
        }

        /// <summary>
        /// If set to True, show Send SMS control on member search page in Admin
        /// </summary>
        [SettingKey("Admin.SMS.SmsCodeOneTimeEnabled")]
        public bool SmsCodeOneTimeEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If set to True, show Send SMS control prior to member being retrieved
        /// </summary>

        [SettingKey("Admin.SMS.SmsCodeOneTime.ShowPriorToGetMember")]
        public bool ShowSMSPrior
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}