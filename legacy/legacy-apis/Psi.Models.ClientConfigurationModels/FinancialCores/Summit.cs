
using Psi.Data.Models.ClientConfigurationModels.FinancialCores.SummitSettings;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class Summit : SettingsBaseHelper
    {
        private RegularAchTransfers _regularAchTransfers;

        public Summit(ISettingsBase settingsBase) : base(settingsBase){}

        [SettingKey("FinancialCore.Summit.TransferCommandCode")]
        public string TransferCommandCode
		{
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Summit.UserFields.SegmintMarketingIdEnabled")]
        public string SegmintMarketingIdEnabled
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Summit.UseTwelveDigitTransactionAmount")]
        public bool UseTwelveDigitTransactionAmount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public RegularAchTransfers RegularAchTransfers
		{
            get => _regularAchTransfers ?? (_regularAchTransfers = new RegularAchTransfers(SettingsBase));
            set => _regularAchTransfers = value;
        }
    }
}