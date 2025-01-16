namespace Psi.Data.Models.ClientConfigurationModels.CheckImages
{
    public class Validation : SettingsBaseHelper
    {
        public Validation(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("CheckImages.NoResultImage")]
        public string NoResultImage
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
