namespace Psi.Data.Models.ClientConfigurationModels.MoneyDesktop
{
    public class Enrollment : SettingsBaseHelper
    {
        public Enrollment(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("MoneyDesktop.Enrollment.ShouldUseDefaultPhoneNumber")]
        public bool ShouldUseDefaultPhoneNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
