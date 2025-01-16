
using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin
{
    public class ReCaptchaSettings : SettingsBaseHelper
    {
        public ReCaptchaSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ReCaptchaSettings.ReCaptchaEnabled")]
        public bool ReCaptchaEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.SiteKey")]
        public string SiteKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.SecretKey")]
        public string SecretKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.UseInvisibleCheckbox")]
        public bool ShouldUseInvisibleCheckbox
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.InvisibleSiteKey")]
        public string InvisibleSiteKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.InvisibleSecretKey")]
        public string InvisibleSecretKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.IpWhitelistEnabled")]
        public bool IpWhitelistEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ReCaptchaSettings.IpWhitelist")]
        public List<string> IpWhitelist
        {
            get { return GetListValue() ?? new List<string>(); }
            set { SetValue(value); }
        }
    }
}
