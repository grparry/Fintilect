namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.Notifications
{
    public class Notifications : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Travel _travel;

        public Notifications(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public Travel Travel
        {
            get { return _travel ?? (_travel = new Travel(_settingsBase)); }
            set { _travel = value; }
        }
    }
}