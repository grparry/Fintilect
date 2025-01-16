namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class PullCreditSettings : SettingsBaseHelper
    {
        public PullCreditSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinacialCore.Corelation.PullCreditSettings.ProductValue")]
        public string ProductValue
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.PullCreditSettings.BureauValue")]
        public string BureauValue
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.PullCreditSettings.TypeSerialValue")]
        public string TypeSerialValue
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

    }
}