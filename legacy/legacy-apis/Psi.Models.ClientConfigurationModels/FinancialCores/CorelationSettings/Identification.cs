namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class Identification : SettingsBaseHelper
    {

        public Identification(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.Corelation.Identification.MothersMaidenNameCategoryOption")]
        public string MothersMaidenNameCategoryOption
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Corelation.Identification.DriverLicenseCategoryOption")]
        public string DriverLicenseCategoryOption
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
