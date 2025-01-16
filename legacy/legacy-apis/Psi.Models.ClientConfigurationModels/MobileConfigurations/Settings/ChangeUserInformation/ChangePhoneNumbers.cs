using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation
{
    public class ChangePhoneNumbers : SettingsBaseHelper
    {
        public ChangePhoneNumbers(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Settings.ChangePhoneNumbers.RequiredField")]
        public RequiredPhoneNumberField RequiredField
        {
            get
            {
                Enum.TryParse(GetValue(), true, out RequiredPhoneNumberField requiredField);

                return requiredField;
            }

            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangePhoneNumbers.AllowForeignPhoneNumbers")]
        public bool AllowForeignPhoneNumbers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangePhoneNumbers.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangePhoneNumbers.ForeignPhoneNumbersEnabled")]
        public bool ForeignPhoneNumbersEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}