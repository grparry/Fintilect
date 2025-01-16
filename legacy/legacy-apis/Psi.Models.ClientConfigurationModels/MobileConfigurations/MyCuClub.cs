namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class MyCuClub : SettingsBaseHelper
    {

        public MyCuClub(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.MyCuClub.SummaryNoteName")]
        public string SummaryNoteName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MyCuClub.IsUrl")]
        public bool IsUrl
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
