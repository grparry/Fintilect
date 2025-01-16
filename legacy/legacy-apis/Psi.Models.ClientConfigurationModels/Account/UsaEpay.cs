namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class UsaEpay : SettingsBaseHelper
    {
        public UsaEpay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Transfers.Ach.UsaEpay.ReverseTransferOnFailure")]
        public bool ReverseTransferOnFailure
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}