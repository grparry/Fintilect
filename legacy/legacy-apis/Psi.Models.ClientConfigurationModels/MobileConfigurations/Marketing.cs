namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class Marketing : SettingsBaseHelper
    {

        public Marketing(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Marketing.TargetedMarketingUrl")]
        public string TargetedMarketingUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

	    [SettingKey("Mobile.Marketing.TargetedMarketingRotationInterval")]
	    public int RotationInterval {
		    get { return GetIntValue(); }
		    set { SetValue(value); }
	    }
	}
}
