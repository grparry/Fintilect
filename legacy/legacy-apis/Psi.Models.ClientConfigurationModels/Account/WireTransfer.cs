namespace Psi.Data.Models.ClientConfigurationModels.Account
{
	public class WireTransfer : SettingsBaseHelper
	{
		public WireTransfer(ISettingsBase settingsBase) : base(settingsBase)
		{

		}

        [SettingKey("Transfers.Wire.RoutingNumberRegex")]
        public string RoutingNumberRegex
        {
            get { return GetValue() ?? @"^(\d){9}$"; }
            set { SetValue(value); }
        }

        [SettingKey("Transfers.Wire.AddressRegex")]
        public string AddressRegex
        {
            get { return GetValue() ?? @"^([a-z0-9A-Z ]|\.)+?$"; }
            set { SetValue(value); }
        }

        [SettingKey("Transfers.Wire.RecipientNameRegex")]
        public string RecipientNameRegex
        {
            get { return GetValue() ?? @"^([a-z A-Z]|\.)+?$"; }
            set { SetValue(value); }
        }

		[SettingKey("Transfers.Wire.HideAvailableBalance")]
		public bool HideAvailableBalance
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

        [SettingKey("Transfers.Wire.SignatureRegex")]
        public string SignatureRegex
        {
            get { return GetValue() ?? @"^([a-z A-Z']|\.)+?$"; }
            set { SetValue(value); }
        }

    }
}