namespace Psi.Data.Models.ClientConfigurationModels.AuditLogging
{
    public class AuditLoggingFeature : SettingsBaseHelper
    {
        public AuditLoggingFeature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("AuditLogging.ShowReasonFlagsOnLoginFailure")]
        public bool ShouldShowReasonFlagsOnLoginFailure
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AuditLogging.RestrictedFlagsForAuditLoggingDuringLogin")]
        public string RestrictedFlagsForAuditLoggingDuringLogin
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

    }
}
