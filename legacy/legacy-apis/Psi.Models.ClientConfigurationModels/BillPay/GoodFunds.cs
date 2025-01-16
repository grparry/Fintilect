namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class GoodFunds : SettingsBaseHelper
    {
        public GoodFunds(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Billpay.BillPaySettings.GoodFunds.MicrNumberStart")]
        public string MicrNumberStart
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.BillPaySettings.GoodFunds.BillPayFundingType")]
        public string BillPayFundingType
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.BillPaySettings.GoodFunds.AccountAndSuffixUseSuffixFromFile")]
        public bool AccountAndSuffixUseSuffixFromFile
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
