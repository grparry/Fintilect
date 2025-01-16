namespace Psi.Data.Models.ClientConfigurationModels.PhoneNumber
{
    public class ChangePhone : SettingsBaseHelper
    {
        public ChangePhone(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ChangePhone.Zelle.UpdatePhoneEnabled")]
        public bool ZelleUpdatePhoneEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}