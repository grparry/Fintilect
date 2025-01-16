using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Chat
{
    public class Comm100 : SettingsBaseHelper

    {
        private readonly ISettingsBase _settingsBase;

        public Comm100(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        /// <summary>
        /// Enabled
        /// </summary>
        [SettingKey("Mobile.Chat.Comm100.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Minimum version for this feature to run - Android
        /// </summary>
        [SettingKey("Mobile.Chat.Comm100.AndroidMinimumVersion")]
        public string AndroidMinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Minimum version for this feature to run - ios
        /// </summary>
        [SettingKey("Mobile.Chat.Comm100.IosMinimumVersion")]
        public string IosMinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// URL string
        /// </summary>
        [SettingKey("Mobile.Chat.Comm100.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Site Identifier
        /// </summary>
        [SettingKey("Mobile.Chat.Comm100.SiteId")]
        public string SiteId
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Plan Identifier
        /// </summary>
        [SettingKey("Mobile.Chat.Comm100.PlanId")]
        public string PlanId {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
