namespace Psi.Data.Models.ClientConfigurationModels.Application.Omega
{
    public class AccountNumberAssociation : SettingsBaseHelper
    {

        public AccountNumberAssociation(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// Account number association enabled as bool
        /// </summary>
        [SettingKey("Omega.Features.AccountNumberAssociationEnabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If true, then deactivate external scheduled transfers during account number re-association, rather than re-associating them.
        /// </summary>
        [SettingKey("Omega.Features.AccountNumberAssociation.DeactivateExternalScheduledTransfers")]
        public bool DeactivateExternalScheduledTransfers
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
