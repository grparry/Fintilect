using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class Estatements : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public Estatements(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.EStatements.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.EStatements.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.EStatements.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.EStatements.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Doxim Estatements enabled
        /// </summary>
        [SettingKey("Mobile.EStatements.DoximEstatements.Enabled")]
        public bool DoximEstatementsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("A7A7A997-7441-42BC-A85F-5B434652D18E"))); }
            set { _authentication = value; }
        }    
    }
}
