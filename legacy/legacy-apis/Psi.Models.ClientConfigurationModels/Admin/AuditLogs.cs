namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class AuditLogs : SettingsBaseHelper
    {
        public AuditLogs(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Admin.AuditLogs.ShowUsernameOnEventDetails")]
        public bool ShowUsernameOnEventDetails
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}