using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class SecurityCodeVerificationSettings : SettingsBaseHelper
    {
        public SecurityCodeVerificationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If set to True, enables sms security code verification
        /// </summary>
        [SettingKey("Admin.SmsSecurityCodeVerification.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If set to True, enables voice message security code delivery
        /// </summary>
        [SettingKey("Admin.SmsSecurityCodeVerification.VoiceMessageEnabled")]
        public bool VoiceMessageEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If set to True, enables security code control on non-old members
        /// </summary>
        [SettingKey("Admin.SmsSecurityCodeVerification.NonOlbMemberEnabled")]
        public bool NonOlbMemberEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
