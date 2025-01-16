namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay
{
    public class CheckFree : SettingsBaseHelper
    {
        public CheckFree(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("Mobile.BillPay.CheckFree.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.BillPay.CheckFree.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.BillPay.CheckFree.ShouldRedirectToSsoUrl")]
        public bool ShouldRedirectToSsoUrl
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}