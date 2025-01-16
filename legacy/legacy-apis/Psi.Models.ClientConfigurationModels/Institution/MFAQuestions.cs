namespace Psi.Data.Models.ClientConfigurationModels.Institution
{
    public class MFAQuestions : SettingsBaseHelper
    {
        public MFAQuestions(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("X.App.HomeBanking.MFASecurityCodeEnabled")]
        public bool MFASecurityCodeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.MFAChallengeOptSecurityCodes")]
        public bool MFAChallengeOptSecurityCodes
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.SetFocusOnFirst")]
        public bool SetFocusOnFirst
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.SecurityCodeRetryCount")]
        public int SecurityCodeRetryCount
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.SecurityCodeShouldUseCaseSensitiveCompare")]
        public bool SecurityCodeShouldUseCaseSensitiveCompare
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.SecurityCodeQuestionID")]
        public int SecurityCodeQuestionID
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.FreeformMFA.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        // if enabled, the user can enter their own answers as plain text instead of choosing from pre-set answers from a drop-down list
        // both to set and to get (in order to check if they are correct during login verification)
        [SettingKey("MFAQuestions.EnablePlainTextAnswers")]
        public int EnablePlainTextAnswers
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.FreeformMFA.Enable")]
        public bool FreeformMFAEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MFAQuestions.FreeformMFA.EncryptionKey")]
        public string FreeformMFAEncryptionKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// On the challenge page (when logging in) how many questions to show to the user. Default is 1 (one). 
        /// For OLD MFA, this is in the db: dbo.MFAConfig.DisplayQuestionCount
        /// </summary>
        [SettingKey("MFAQuestions.FreeformMFA.ChallengeViewQuestionCount")]
        public string ChallengeViewQuestionCount
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines if IP whitelist feature is enabled. 
        /// </summary>
        [SettingKey("MFAQuestions.IPWhitelist.Enabled")]
        public bool IPWhitelistEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// This is an IP whitelist that allows the user to skip MFA questions if the IP is found in the whitelist. 
        /// </summary>
        [SettingKey("MFAQuestions.IPWhitelist")]
        public string IPWhitelist
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///  Used to disable to MFA Questions setup and use, for times when it isn't desired (MFA Security Code is used)
        /// </summary>
        [SettingKey("MFAQuestions.Enrollment.DisableSetup")]
        public bool EnrollmentDisableSetup
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
