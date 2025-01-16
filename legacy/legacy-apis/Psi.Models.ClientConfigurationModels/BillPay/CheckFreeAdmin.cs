namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class CheckFreeAdmin : SettingsBaseHelper
    {
        public CheckFreeAdmin(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("CheckFreeBillPay.Admin.BankAccountListCallEnabled")]
        public bool BankAccountListCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPay.Admin.BankAccountInactivateCallEnabled")]
        public bool BankAccountInactivateCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPay.Admin.SubscriberModifyCallEnabled")]
        public bool SubscriberModifyCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPay.Admin.SubscriberInactivateCallEnabled")]
        public bool SubscriberInactivateCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPay.Admin.BankAccountModifyCallEnabled")]
        public bool BankAccountModifyCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPay.Admin.SubscriberReactivateCallEnabled")]
        public bool SubscriberReactivateCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}