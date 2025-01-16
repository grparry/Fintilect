namespace Psi.Data.Models.ClientConfigurationModels
{
    public class PersonPaymentSecuritySettings : SettingsBaseHelper
    {
        public PersonPaymentSecuritySettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("PersonPayment.Security.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.DaysAfterSensitiveInfoChangeAccessRestriction")]
        public double DaysAfterSensitiveInfoChangeAccessRestriction
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.SpectrumMemoNumber")]
        public string SpectrumMemoNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.RestrictAccessFlagNumber")]
        public string RestrictAccessFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.SymitarRestrictAccessFlagNumber")]
        public int SymitarRestrictAccessFlagNumber
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.DnaRestrictAccessFlagNumber")]
        public string DnaRestrictAccessFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.CoreRestrictAccessFlagNumber")]
        public string CoreRestrictAccessFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.ShouldRestrictAccessAfterAddressChange")]
        public bool ShouldRestrictAccessAfterAddressChange
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.ShouldRestrictAccessAfterEmailChange")]
        public bool ShouldRestrictAccessAfterEmailChange
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.ShouldRestrictAccessAfterForgotPassword")]
        public bool ShouldRestrictAccessAfterForgotPassword
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Security.ShouldRestrictAccessAfterMobileDeviceRegistration")]
        public bool ShouldRestrictAccessAfterMobileDeviceRegistration
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
