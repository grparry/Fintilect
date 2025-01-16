using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class DocumentCenter : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public DocumentCenter(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("Mobile.DocumentCenter.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

    }
}
