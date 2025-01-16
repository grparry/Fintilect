using Psi.Data.Models.Domain.QuickAccountInfo;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class QuickAccountInfo : SettingsBaseHelper
    {
        public QuickAccountInfo(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.QuickAccountInfo.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.QuickAccountInfo.MaxNumberOfAccounts")]
        public int MaxNumberOfAccounts
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.QuickAccountInfo.AccountTypesDisplayConfiguration")]
        public QuickAccountInfoDisplayInfoSettings AccountTypesDisplayConfiguration
        {
            get => GetJsonValueOrNull<QuickAccountInfoDisplayInfoSettings>();
            set => SetValue(value);
        }
    }
}
