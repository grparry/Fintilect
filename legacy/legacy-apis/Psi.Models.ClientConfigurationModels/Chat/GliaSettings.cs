using System;
using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Chat
{
    public class GliaSettings : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;
        
        public GliaSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new MobileConfigurations.Authentication.Authentication(new Guid("ECAD2DDA-CDED-4EA8-9465-6501EF46C059")));
            set => _authentication = value;
        }

        /// <summary>
        /// Enabled setting
        /// </summary>
        [SettingKey("Chat.Glia.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Minimum Version to run
        /// </summary>
        [SettingKey("Chat.Glia.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Javascript to inject onto page. Provided by Glia.
        /// </summary>
        [SettingKey("Chat.Glia.Javascript")]
        public string Javascript
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Properties to inject into javascript. comma separated list ie: 'Phone,Email,Name'
        /// </summary>
        [SettingKey("Chat.Glia.MemberProperties")]
        public List<string> MemberProperties
        {
            get => GetListValue()?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.ChatIconEnabled")]
        public bool ChatIconEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.HelpChatEnabled")]
        public bool HelpChatEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.ScreenShareEnabled")]
        public bool ScreenShareEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.Username")]
        public string Username
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("Chat.Glia.ApiKey")]
        public string ApiKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.ApiToken")]
        public string ApiToken
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.ApplicationToken")]
        public string ApplicationToken
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.SiteId")]
        public string SiteId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.PastChatHistoryToDisplayInHours")]
        public int PastChatHistoryToDisplayInHours
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Chat.Glia.MobileQueueName")]
        public string MobileQueueName
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
