namespace Psi.Data.Models.ClientConfigurationModels.Beneficiary
{
    public class BeneficiarySettings : SettingsBaseHelper
    {
        public BeneficiarySettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        // If true, show birthday fields on the 'change beneficiary' form in Formatted Secure Messaging 1:
        [SettingKey("Beneficiary.ShouldRequireBirthday")]
        public bool ShouldRequireBirthday
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        // If true, validate birthday fields (if visible) on the 'change beneficiary' form in Formatted Secure Messaging 1. Default: FALSE:
        [SettingKey("Beneficiary.ShouldValidateBirthdayFields")]
        public bool ShouldValidateBirthdayFields
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
