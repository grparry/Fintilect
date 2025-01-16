namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class AccountTypeSettings : SettingsBaseHelper
    {
        public AccountTypeSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        [SettingKey("FinacialCore.Corelation.AccountTypeSettings.AccountTypeSerial")]
        public string AccountTypeSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.AccountTypeSettings.AccountRelationshipSerial")]
        public string AccountRelationshipSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.AccountTypeSettings.RestrictAccountOnCreate")]
        public bool RestrictAccountOnCreate
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

    }
}