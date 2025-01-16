using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.Biometrics
{
    public class FaceUnlock : SettingsBaseHelper

    {
        private readonly ISettingsBase _settingsBase;

        public FaceUnlock(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Security.Biometrics.FaceUnlock.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// if true, then use Face Recognition on Android to gain quick access. default: False
        /// </summary>
        [SettingKey("Mobile.Security.Biometrics.FaceUnlock.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
