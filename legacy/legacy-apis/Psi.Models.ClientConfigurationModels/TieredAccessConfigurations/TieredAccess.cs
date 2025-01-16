namespace Psi.Data.Models.ClientConfigurationModels.TieredAccessConfigurations
{
    public class TieredAccessSettings : SettingsBaseHelper
    {
        public TieredAccessSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("TieredAccess.RestrictAccessbyAccountEnabled")]
        public bool RestrictAccessbyAccountEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("TieredAccess.QuickAccessEnabledForSubUsers")]
        public bool QuickAccessForSubUsersEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Specifies whether cross accounts (accounts that are not under the umbrella of the current member account, whether they be specified on the financial core, or linked
        /// through Online Banking's householding feature) will be included in the list of accounts that tiered access users can grant or deny access for sub users.
        /// If this is not set in the database, it will return false by default.
        /// </summary>
        [SettingKey("TieredAccess.CrossAccountsAreIncludedInSubAccountPermissions")]
        public bool CrossAccountsAreIncludedInSubAccountPermissions
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Specifies whether sub users can use the primary account's cross accounts.
        /// This applies to inquiry, deposit, and withdrawal access.
        /// </summary>
        [SettingKey("TieredAccess.SubUsersCanUseCrossAccounts")]
        public bool SubUsersCanUseCrossAccounts
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
