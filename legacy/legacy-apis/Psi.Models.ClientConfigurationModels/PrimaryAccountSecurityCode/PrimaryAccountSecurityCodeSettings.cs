namespace Psi.Data.Models.ClientConfigurationModels.PrimaryAccountSecurityCode
{
    public class PrimaryAccountSecurityCode : SettingsBaseHelper
    {

        public PrimaryAccountSecurityCode(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("PrimaryAccountSecurityCode.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("PrimaryAccountSecurityCode.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If true, then show the reference number in the email subject line in the "Security Code for Online Banking" email that is sent to members
        /// </summary>
        [SettingKey("PrimaryAccountSecurityCode.ShowReferenceNumberInEmailSubjectLine")]
        public bool ShouldShowReferenceNumberInEmailSubjectLine
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
