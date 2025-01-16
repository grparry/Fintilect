namespace Psi.Data.Models.ClientConfigurationModels.Address
{
    public class ChangeAddress : SettingsBaseHelper
    {
        public ChangeAddress(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ChangeAddress.SendEmailOnUpdate")]
        public bool SendEmailOnUpdate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeAddress.PrimaryMemberCanUpdateJointOwnersAddress")]
        public bool PrimaryMemberCanUpdateJointOwnersAddress
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// When this setting is enabled, user will be given a list of possible country codes and subdivision (state/province etc.) codes when changing their address if it is a foreign address.
        /// </summary>
        [SettingKey("ChangeAddress.ForeignAddressCountryCodeAndSubdivisionsEnabled")]
        public bool ForeignAddressCountryCodeAndSubdivisionsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Controls the length of the address line input fields on the change address page.
        /// </summary>
        [SettingKey("ChangeAddress.MaximumAddressLineLength")]
        public int MaximumAddressLineLength
        {
            get => GetIntValue(defaultValue: 26);
            set => SetValue(value);
        }


        [SettingKey("ChangeEmail.UpdateBitAddressForPrimaryStatementAccountNumbers")]
        public bool UpdateBitAddressForPrimaryStatementAccountNumbers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeAddress.CityRegex")]
        public string CityRegex
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeAddress.ShouldUpdateCoreWhenNoChanges")]
        public bool ShouldUpdateAddressOnCoreWhenNoChanges
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeAddress.ShouldRedirectAfterUpdate")]
        public bool ShouldRedirectAfterUpdate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeAddress.VerifyAddressEnabled")]
        public bool VerifyAddressEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
