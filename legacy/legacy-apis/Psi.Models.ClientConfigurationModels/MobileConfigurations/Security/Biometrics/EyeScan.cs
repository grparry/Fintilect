using System;
using System.Linq;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.Biometrics
{
    public class EyeScan : SettingsBaseHelper

    {
        private readonly ISettingsBase _settingsBase;

        public EyeScan(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Security.Biometrics.EyeScan.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Biometrics.EyeScan.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Biometrics.EyeScan.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Biometrics.EyeScan.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Biometrics.EyeScan.Vendor")]
        public EyeScanVendor Vendor
        {
            get
            {
                EyeScanVendor type;
                Enum.TryParse(GetValue(), out type);
                return type;
            }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Biometrics.EyeScan.ApiKey")]
        public string ApiKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
