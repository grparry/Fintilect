namespace Psi.Data.Models.ClientConfigurationModels.Application
{
    public class SparkUiConfiguration : SettingsBaseHelper
    {
        public SparkUiConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Application.Spark.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Application.Spark.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}