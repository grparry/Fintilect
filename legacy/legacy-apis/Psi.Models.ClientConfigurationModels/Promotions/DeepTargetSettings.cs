using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Promotions
{
    public class DeepTargetSettings : SettingsBaseHelper
    {
        public DeepTargetSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Promotions.DeepTarget.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.JsonConfig")]
        public string JsonConfig
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.Javascript")]
        public string Javascript
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.LoginUrl")]
        public string LoginUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Promotions.DeepTarget.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
