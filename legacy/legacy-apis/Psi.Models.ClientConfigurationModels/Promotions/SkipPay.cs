namespace Psi.Data.Models.ClientConfigurationModels.Promotions
{
    public class SkipPay : SettingsBaseHelper
    {
        public SkipPay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("Promotions.SkipPay.ShouldGetQualifiedLoansFromPermissions")]
        public bool ShouldGetQualifiedLoansFromPermissions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("Promotions.SkipPay.ShouldClearSkipPayQualifyPermissionAfterSuccess")]
        public bool ShouldClearSkipPayQualifyPermissionAfterSuccess
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
