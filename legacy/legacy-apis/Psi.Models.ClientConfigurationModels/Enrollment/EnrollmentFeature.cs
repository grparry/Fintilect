
namespace Psi.Data.Models.ClientConfigurationModels.Enrollment
{
    public class EnrollmentFeature : SettingsBaseHelper
    {
        public EnrollmentFeature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Enrollment.RequireTemporaryPasswordDuringEnrollment")]
        public bool RequireTemporaryPasswordDuringEnrollment
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Enrollment.FromEmailAddressForTemporaryPassword")]
        public string FromEmailAddressForTemporaryPassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Enrollment.HideLoginStepsControlDuringEnrollment")]
        public bool ShouldHideLoginStepsControlDuringEnrollment
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Enrollment.MinimumEnrollmentAgeIsRequired")]
        public bool MinimumEnrollmentAgeIsRequired
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Enrollment.MinimumEnrollmentAgeInYears")]
        public int MinimumEnrollmentAgeInYears
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Enrollment.LoginPageUrlForOAO")] 
        public string LoginPageUrlForOao
        {
            get => GetValue();
            set => SetValue(value);
        }


        [SettingKey("Enrollment.Oao.AutoEnrollment.HideConfirmationPage")]
        public bool OaoAutoEnrollmentHideConfirmationPage
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Enrollment.Oao.AutoEnrollment.OaoSendUsernameAndPasswordEnabled")]
        public bool OaoSendUsernameAndPasswordEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
