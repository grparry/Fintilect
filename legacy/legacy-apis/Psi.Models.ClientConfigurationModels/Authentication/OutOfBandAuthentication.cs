using System;
using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.Authentication
{
    public class OutOfBandAuthentication : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;

        public OutOfBandAuthentication(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("OutOfBandAuthentication.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("OutOfBandAuthentication.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("OutOfBandAuthentication.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("OutOfBandAuthentication.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("OutOfBandAuthentication.OutOfBandActionSettings")]
        public List<OutOfBandActionSetting> OutOfBandActionSettings
        {
            get => GetJsonValueOrNull<List<OutOfBandActionSetting>>() ?? new List<OutOfBandActionSetting>();
            set => SetValue(value);
        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            get
            {
                if (_authentication != null)
                {
                    return _authentication;
                }

                // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
                var authentication = new MobileConfigurations.Authentication.Authentication(new Guid("B5D3F2CE-E226-4430-A986-1C3429BD3F08"));
                var outOfBandActionSettings = OutOfBandActionSettings;
                foreach (var action in ClientConfigurationRepository.OutOfBandActions)
                {
                    var setting = outOfBandActionSettings.FirstOrDefault(x => x.ActionType == action);
                    if (setting?.Enabled == true)
                    {
                        // don't remove enabled actions (missing is assumed to mean disabled)
                        continue;
                    }
                    
                    // remove the disabled actions
                    var featureAction = authentication.FeatureActions.FirstOrDefault(x => x.ActionType == action);
                    if (featureAction != null)
                    {
                        authentication.FeatureActions.Remove(featureAction);
                    }
                }

                _authentication = authentication;

                return _authentication;
            }
            set => _authentication = value;
        }
    }
}