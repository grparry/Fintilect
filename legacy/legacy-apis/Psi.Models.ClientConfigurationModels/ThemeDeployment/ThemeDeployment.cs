using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Deployment
{
    public class ThemeDeployment : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        public ThemeDeployment(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }


        [SettingKey("Mobile.Deployment.LatestIosVersion")]
        public Version LatestIosVersion
        {
            get { return new Version(GetValue()); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deployment.LatestAndroidVersion")]
        public Version LatestAndroidVersion
        {
            get { return new Version(GetValue()); }
            set { SetValue(value); }
        }
    }
}
