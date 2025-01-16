namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class Notes : SettingsBaseHelper
    {
        public Notes(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.Notes.ClearBadAddressFlagOnNoChange")]
        public bool ClearBadAddressFlagOnNoChange
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

    }
}