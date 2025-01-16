namespace Psi.Data.Models.ClientConfigurationModels.History
{
    public class DisplayCheckHolds : SettingsBaseHelper
    {
		public DisplayCheckHolds(ISettingsBase settingsBase) : base(settingsBase)
		{
		}

	    [SettingKey("AccountHistoryDisplaySettings.DisplayCheckHolds.Enabled")]
	    public bool Enabled
	    {
		    get { return GetBoolValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("AccountHistoryDisplaySettings.DisplayCheckHolds.MinVersion")]
	    public double MinVersion
	    {
		    get { return GetDoubleValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("AccountHistoryDisplaySettings.DisplayCheckHolds.CheckHoldMemoRange")]
		public string CheckHoldMemoRange
	    {
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("AccountHistoryDisplaySettings.DisplayCheckHolds.GuaranteedFundsMemoRange")]
		public string GuaranteedFundsMemoRange
	    {
		    get { return GetValue(); }
		    set { SetValue(value); }
        }

        [SettingKey("AccountHistoryDisplaySettings.DisplayCheckHolds.ShouldShowAsNegativeTransactions")]
        public bool ShouldShowAsNegativeTransactions
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AccountHistoryDisplaySettings.DisplayCheckHolds.DisplayCheckHoldsOutsideDateRange")]
        public bool DisplayCheckHoldsOutsideDateRange
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
