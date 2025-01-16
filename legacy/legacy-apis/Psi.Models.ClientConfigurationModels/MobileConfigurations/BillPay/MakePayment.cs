namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay
{
    public class MakePayment : SettingsBaseHelper
    {
        public MakePayment(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.BillPay.MakePayment.IncludeSendOnAndDeliverByDate.MinimumAndroidVersion")]
        public string IncludeSendOnAndDeliverByDateMinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.MakePayment.IncludeSendOnAndDeliverByDate.MinimumIosVersion")]
        public string IncludeSendOnAndDeliverByDateMinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
