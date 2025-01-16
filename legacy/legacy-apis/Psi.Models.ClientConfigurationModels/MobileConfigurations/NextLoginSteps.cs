namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class NextLoginSteps : SettingsBaseHelper
    {

        public NextLoginSteps(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.NextLoginSteps.LoginDisclosureCanSkipOnFailure")]
        public bool LoginDisclosureCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.ChangePasswordCanSkipOnFailure")]
        public bool ChangePasswordCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.ChangePinCanSkipOnFailure")]
        public bool ChangePinCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.MFAQuestionsCanSkipOnFailure")]
        public bool MfaQuestionsCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.LoginPromotionsCanSkipOnFailure")]
        public bool LoginPromotionsCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.UrgentAlertsCanSkipOnFailure")]
        public bool UrgentAlertsCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.ForceChangeEmail")]
        public bool ForceChangeEmailEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("Mobile.NextLoginSteps.ForceChangeAddress")]
        public bool ForceChangeAddressEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.ForceChangeEmailCanSkipOnFailure")]
        public bool ForceChangeEmailCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.ForceChangeAddressCanSkipOnFailure")]
        public bool ForceChangeAddressCanSkipOnFailure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.NextLoginSteps.SynergyEstatementsEnrollmentEnabled")]
        public bool SynergyEstatementsEnrollmentEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
