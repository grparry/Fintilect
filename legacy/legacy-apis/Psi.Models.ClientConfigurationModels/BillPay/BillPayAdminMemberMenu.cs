namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class BillPayAdminMemberMenu : SettingsBaseHelper
    {
        public BillPayAdminMemberMenu(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("Admin.BillPay.Show3rdPartyId")]
        public bool Show3rdPartyId
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
