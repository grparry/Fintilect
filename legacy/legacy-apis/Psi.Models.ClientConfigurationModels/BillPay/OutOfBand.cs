namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class OutOfBand : SettingsBaseHelper
    {
        public OutOfBand(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        

        [SettingKey("BillPay.OutOfBand.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.MinimumVersion")]
        public double MinimumVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.RequireWhenAddingPayee")]
        public bool RequireWhenAddingPayee
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.RequireWhenUpdatingPayee")]
        public bool RequireWhenUpdatingPayee
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.RequireWhenMakingLargePayment")]
        public bool RequireWhenMakingLargePayment
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.LargePaymentThreshold")]
        public double LargePaymentThreshold
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.RequireWhenAddingFundingAccount")]
        public bool RequireWhenAddingFundingAccount
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("BillPay.OutOfBand.RequireWhenUpdatingFundingAccount")]
        public bool RequireWhenUpdatingFundingAccount
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
