using System;
using Psi.Data.Models.Domain.Integrations.SavvyMoney;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class SavvyMoney : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;

        public SavvyMoney(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.SavvyMoney.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("23B4EDAA-E6A8-4F70-98E5-3344947E2BA8"))); }
            set { _authentication = value; }
        }

        [SettingKey("Mobile.SavvyMoney.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SavvyMoney.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SavvyMoney.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SavvyMoney.ServiceSettings")]
        public ServiceSettingsModel MobileServiceSettings
        {
            get { return GetJsonValueOrNull<ServiceSettingsModel>(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SavvyMoney.CreditScore.Enabled")]
        public bool CreditScoreEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.SavvyMoney.ScoreChange.Enabled")]
        public bool ScoreChangeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.SavvyMoney.AlertBadge.Enabled")]
        public bool AlertBadgeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.SavvyMoney.Banner.Enabled")]
        public bool BannerEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.SavvyMoney.Banner.DismissalDays")]
        public int BannerDismissalDays
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}
