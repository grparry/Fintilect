namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class PersonTypeSettings : SettingsBaseHelper
    {
        public PersonTypeSettings(ISettingsBase settingsBase) : base(settingsBase) { }

        public string SubUserPersonTypeSerial => "704";

        [SettingKey("FinancialCore.Corelation.PersonTypeSettings.LoginIdFormat")]
        public string LoginIdFormat
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.PersonTypeSettings.PersonCentricLoginIdFormat")]
        public string PersonCentricLoginIdFormat
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}