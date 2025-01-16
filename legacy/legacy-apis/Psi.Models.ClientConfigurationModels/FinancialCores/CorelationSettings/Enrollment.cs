namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class Enrollment : SettingsBaseHelper
    {
        public Enrollment(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.Corelation.Enrollment.AllowEnrollmentWithMailingAddress")]
        public bool AllowEnrollmentWithMailingAddress
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
