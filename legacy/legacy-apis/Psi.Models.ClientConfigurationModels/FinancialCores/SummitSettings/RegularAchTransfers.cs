namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.SummitSettings
{
    public class RegularAchTransfers : SettingsBaseHelper
    {
        public RegularAchTransfers(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.Summit.RegularAchTransfers.TransferCommandCode")]
        public string TransferCommandCode
		{
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Summit.RegularAchTransfers.FTCode")]
        public string FTCode
		{
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Summit.RegularAchTransfers.Description")]
        public string Description
		{
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Summit.RegularAchTransfers.DescriptionInHistoryDisplay")]
        public string DescriptionInHistoryDisplay
		{
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}