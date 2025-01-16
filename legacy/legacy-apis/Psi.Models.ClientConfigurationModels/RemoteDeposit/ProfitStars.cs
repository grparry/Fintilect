namespace Psi.Data.Models.ClientConfigurationModels.RemoteDeposit
{
    public class ProfitStars : SettingsBaseHelper
    {
        public ProfitStars(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("RemoteDeposit.ProfitStars.StoreId")]
        public long StoreId
        {
            get => GetLongValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.EntityId")]
        public int EntityId
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.StoreKey")]
        public string StoreKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.SharedSecret")]
        public string SharedSecret
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.FiIdentifier")]
        public string FiIdentifier
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.AdminServiceUrl")]
        public string AdminServiceUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.ServiceUrl")]
        public string ServiceUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.VendorName")]
        public string VendorName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.AndroidAppBundleId")]
        public string AndroidAppBundleId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.IosAppBundleId")]
        public string IosAppBundleId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.ProfitStars.SyncAccounts.Enabled")]
        public bool SyncAccountsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}