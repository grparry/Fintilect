namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class BillPay2 : SettingsBaseHelper
    {
        public BillPay2(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Billpay.BillPay2.Enabled")]
	    public bool Enabled
	    {
		    get => GetBoolValue();
            set => SetValue(value);
        }

	    [SettingKey("BillPay.BillPay2.MinimumVersion")]
	    public double MinimumVersion
	    {
		    get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillPay2.MaximumPaymentAmountInDollars")]
        public int MaximumPaymentAmountInDollars
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Regex for the 'Name' field when adding or editing a payee.
        /// </summary>
        [SettingKey("BillPay.BillPay2.BillPayeeNameRegex")]
        public string BillPayeeNameRegex
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillPay2.CustomHelpEnabled")]
        public bool CustomHelpEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillPay2.InactivePayeesEnabled")]
        public bool InactivePayeesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillPay2.ShouldShowPayeePaymentType")]
        public bool ShouldShowPayeePaymentType
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
