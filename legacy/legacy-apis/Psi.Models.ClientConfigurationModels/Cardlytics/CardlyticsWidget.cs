namespace Psi.Data.Models.ClientConfigurationModels.Cardlytics
{
    public class CardlyticsWidget : SettingsBaseHelper
    {
        public CardlyticsWidget(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Cardlytics.ShowWidgetOnWelcomeSummaryPages")]
        public bool ShowWidgetOnWelcomeSummaryPages
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
