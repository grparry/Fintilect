namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class MemberSettings : SettingsBaseHelper
    {
        public MemberSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Admin.Member.AllowAliasLookup.Enabled")]
        public bool IsAliasLookupEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, show escheat date and escheat flag in memberDetail.aspx info table in the admin tool
        /// </summary>
        [SettingKey("Admin.Member.DisplayEscheatDateInfo")]
        public bool ShouldDisplayEscheatDateInfo
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.Member.ConvertCreatedDateToUtc.Enabled")]
        public bool ConvertCreatedDateToUtcEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
