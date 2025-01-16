namespace Psi.Data.Models.ClientConfigurationModels.MoneyDesktop
{
    public class MoneyDesktop : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase; 
        private Dashboard _dashboardConfiguration;
        private Summary _summaryConfiguration;
        private Enrollment _enrollment;

        public MoneyDesktop(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("MoneyDesktop.AutoEnrollEnabled")]
        public bool AutoEnrollEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Dashboard DashboardConfiguration
        {
            get => _dashboardConfiguration ?? (_dashboardConfiguration = new Dashboard(_settingsBase));
            set => _dashboardConfiguration = value;
        }

        public Summary SummaryConfiguration
        {
            get => _summaryConfiguration ?? (_summaryConfiguration = new Summary(_settingsBase));
            set => _summaryConfiguration = value;
        }

        public Enrollment Enrollment
        {
            get => _enrollment ?? (_enrollment = new Enrollment(_settingsBase));
            set => _enrollment = value;
        }
    }
}
