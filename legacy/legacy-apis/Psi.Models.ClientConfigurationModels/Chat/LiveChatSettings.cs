namespace Psi.Data.Models.ClientConfigurationModels.Chat
{
    public class LiveChatSettings : SettingsBaseHelper
    {
        public LiveChatSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("LiveChat.LiveChatEnabled")]
        public bool LiveChatEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("LiveChat.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        // URL for the popup to enter your name and select Chat Now
        [SettingKey("LiveChat.LiveChatUrl")]
        public string LiveChatUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        // URL for the live chat window
        [SettingKey("LiveChat.StartLiveChatUrl")]
        public string StartLiveChatUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("LiveChat.LiveChatServiceId")]
        public string LiveChatServiceId
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}