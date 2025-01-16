namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.LayeredSecurity
{
    public class LayeredSecurity : SettingsBaseHelper
    {
        public LayeredSecurity(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Security.LayeredSecurity.DeleteOnlyInvalidTokens")]
        public bool DeleteOnlyInvalidTokens
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.LayeredSecurity.DisableQuickAccessOnFailedPasswordLogin")]
        public bool DisableQuickAccessOnFailedPasswordLogin
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.LayeredSecurity.MemberCanSkipToFallbackMethod")]
        public bool MemberCanSkipToFallbackMethod
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
