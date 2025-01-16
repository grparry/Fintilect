using System;

namespace Psi.Data.Models.ClientConfigurationModels.Chat
{
    public class TalkativeChatSettings : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;

        public TalkativeChatSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new MobileConfigurations.Authentication.Authentication(new Guid("6DB366CF-590E-4FF8-8470-EC0E8AF29054")));
            set => _authentication = value;
        }
        

        [SettingKey("Chat.Talkative.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Talkative.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Talkative.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Talkative.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("Chat.Talkative.MenuItemEnabled")]
        public bool MenuItemEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Talkative.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Talkative.HelpOptionEnabled")]
        public bool HelpOptionEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Javascript to inject onto page. Provided by Talkative.
        /// </summary>
        [SettingKey("Chat.Talkative.Javascript")]
        public string Javascript
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}