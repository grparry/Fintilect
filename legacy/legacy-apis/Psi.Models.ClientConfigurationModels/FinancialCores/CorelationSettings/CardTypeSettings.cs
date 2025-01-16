namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class CardTypeSettings : SettingsBaseHelper
    {
        public CardTypeSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        [SettingKey("FinacialCore.Corelation.CardTypeSettings.AtmSerial")]
        public string AtmSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }



        [SettingKey("FinacialCore.Corelation.CardTypeSettings.AtmDescription")]
        public string AtmDescription
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }



        [SettingKey("FinacialCore.Corelation.CardTypeSettings.CreditSerial")]
        public string CreditSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }



        [SettingKey("FinacialCore.Corelation.CardTypeSettings.CreditDescription")]
        public string CreditDescription
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }



        [SettingKey("FinacialCore.Corelation.CardTypeSettings.DebitSerial")]
        public string DebitSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }



        [SettingKey("FinacialCore.Corelation.CardTypeSettings.DebitDescription")]
        public string DebitDescription
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


    }
}