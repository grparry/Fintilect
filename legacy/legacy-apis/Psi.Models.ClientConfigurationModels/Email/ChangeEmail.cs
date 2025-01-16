using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Email
{
    public class ChangeEmail : SettingsBaseHelper
    {
        public ChangeEmail(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("ChangeEmail.PrimaryMemberCanUpdateJointOwnersEmail")]
        public bool PrimaryMemberCanUpdateJointOwnersEmail
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeEmail.SendSecurityCodeToNewEmailOnlyOnEmailChange")]
        public bool SendSecurityCodeToNewEmailOnlyOnEmailChange
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        
        [SettingKey("ChangeEmail.UpdateBitEmailForPrimaryStatementAccountNumbers")]
        public bool UpdateBitEmailForPrimaryStatementAccountNumbers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Enables Admin email domain checking in order to refuse certain email domains when HomeBanking users attempt to change their email to domains on the not included list
        /// </summary>
        [SettingKey("ChangeEmail.EmailDomainRegistrationCheckEnabled")]
        public bool EmailDomainRegistrationCheckEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// list of restricted email domains that users can NOT change their email to in HomeBanking. eg: mac.com (like mikeb@mac.com). This must be a comma-delimited string.
        /// </summary>
        [SettingKey("ChangeEmail.RestrictedEmailDomainRegistrationList")]
        public List<string> RestrictedEmailDomainRegistrationList
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// If true, update the core regardless of whether there are updates or not
        /// </summary>
        [SettingKey("ChangeEmail.ShouldUpdateCoreWhenNoChanges")]
        public bool ShouldUpdateCoreWhenNoChanges
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeEmail.ShouldReturnSuccessWithNoChanges")]
        public bool ShouldReturnSuccessWithNoChanges
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeEmail.VerifyEmailEnabled")]
        public bool VerifyEmailEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ChangeEmail.Zelle.UpdateEmailEnabled")]
        public bool ZelleUpdateEmailEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}