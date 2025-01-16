namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class TransferTimeouts : SettingsBaseHelper
    {
        public TransferTimeouts(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Transfers.Timeouts.SendSecureMessage.Enabled")]
        public bool SendSecureMessageEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Timeouts.SecureMessageCategory")]
        public string SecureMessageCategory
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Timeouts.SendEmail.Enabled")]
        public bool SendEmailEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Timeouts.RecipientEmail")]
        public string RecipientEmail
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Timeouts.SenderEmail")]
        public string SenderEmail
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Timeouts.SecureMessageSenderMembershipUserId")]
        public long SecureMessageSenderMembershipUserId
        {
            get => GetLongValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Timeouts.EmailSenderName")]
        public string EmailSenderName
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}