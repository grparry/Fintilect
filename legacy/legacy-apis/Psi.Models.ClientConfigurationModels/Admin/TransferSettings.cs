namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class TransferSettings : SettingsBaseHelper
    {
        public TransferSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If set to True, allow weekend transfers in the admin tool.
        /// </summary>
        [SettingKey("Admin.Transfer.AllowWeekendTransfers")]
        public bool AllowWeekendTransfers
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
