namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class RecurringBillPay : SettingsBaseHelper
    {
        public RecurringBillPay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        

        [SettingKey("BillPay.RecurringBillPay.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.RecurringBillPay.MinimumVersion")]
        public double MinimumVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}
