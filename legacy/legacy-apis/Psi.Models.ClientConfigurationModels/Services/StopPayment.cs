namespace Psi.Data.Models.ClientConfigurationModels.Services
{
    public class StopPayment : SettingsBaseHelper
    {
        public StopPayment(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("StopPayment.ShowStopPaymentReason")]
        public bool ShowStopPaymentReason
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("StopPayment.ShowTimeOnConfirmationScreen")]
        public bool ShowTimeOnConfirmationScreen
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

		[SettingKey("X.App.HomeBanking.StopPayRequireAmountField")]
		public bool StopPayRequireAmountField {
		    get { return GetBoolValue(); }
		    set { SetValue(value); }
	    }

		[SettingKey("X.App.HomeBanking.StopPayEnableAmountField")]
		public bool StopPayEnableAmountField {
		    get { return GetBoolValue(); }
		    set { SetValue(value); }
	    }

	}
}
