using Psi.Data.Models.Domain.Integrations.SavvyMoney;

namespace Psi.Data.Models.ClientConfigurationModels.SavvyMoney
{
	public class SavvyMoneySettings : SettingsBaseHelper
	{
		public SavvyMoneySettings(ISettingsBase settingsBase) : base(settingsBase)
        {

		}

		[SettingKey("SavvyMoney.ServiceSettings")]
		public ServiceSettingsModel ServiceSettings
        {
            get => GetJsonValueOrNull<ServiceSettingsModel>();
            set => SetValue(value);
        }

        [SettingKey("SavvyMoney.ServiceSettings.Iframe")]
        public ServiceSettingsModel ServiceSettingsIframe
        {
            get => GetJsonValueOrNull<ServiceSettingsModel>();
            set => SetValue(value);
        }


        [SettingKey("HomeBanking.SavvyMoney.Enabled")]
        public bool HomeBankingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("HomeBanking.SavvyMoney.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("SavvyMoney.Api.AuthId")]
        public string ApiAuthId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SavvyMoney.Api.AuthKey")]
        public string ApiAuthKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SavvyMoney.Api.Domain")]
        public string ApiDomain
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SavvyMoney.Api.PartnerId")]
        public string ApiPartnerId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SavvyMoney.Api.BaseUrl")]
        public string ApiBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
