namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class RateAndReview : SettingsBaseHelper{

        public RateAndReview(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.RateAndReview.MinimumAndroidVersion")]
        public string MinimumAndroidVersion {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.RateAndReview.MinimumIosVersion")]
        public string MinimumIosVersion {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.RateAndReview.Enabled")]
        public bool Enabled {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.RateAndReview.PromptsPerYear")]
        public int PromptsPerYear {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.RateAndReview.PromptsPerVersion")]
        public int PromptsPerVersion {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.RateAndReview.MinimumActionCount")]
        public int MinimumActionCount {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }
    }
}
