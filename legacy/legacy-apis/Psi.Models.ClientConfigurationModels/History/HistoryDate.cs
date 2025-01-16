namespace Psi.Data.Models.ClientConfigurationModels.History
{
    public class HistoryDate : SettingsBaseHelper
    {
        public HistoryDate(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("History.Date.DateRangeDropDownSettingOptions")]
        public string DateRangeDropDownSettingOptions
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("History.Date.DateRangeDropDownSettingLabelValue")]
        public string DateRangeDropDownSettingLabelValue
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("History.Date.DatePickerPositionOptions")]
        public string DatePickerPositionOptions
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
