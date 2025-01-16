using System;

namespace Psi.Data.Models.ClientConfigurationModels.PageDisplay
{
    public class jQuerySettings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;

		public jQuerySettings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

		[SettingKey("HomeBanking.jQuery.MigratePluginEnabled")]
	    public bool MigratePluginEnabled
		{
		    get { return GetBoolValue(); }
		    set { SetValue(value); }
	    }


	    [SettingKey("HomeBanking.jQuery.Version")]
	    public string Version
	    {
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }
	}
}