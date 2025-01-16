using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Chat
{
    public class Comm100 : SettingsBaseHelper
    {
        public Comm100(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// Enabled setting
        /// </summary>
        [SettingKey("Chat.Comm100.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Minimum version for this feature to run
        /// </summary>
        [SettingKey("Chat.Comm100.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// javascript code to place on the page
        /// </summary>
        [SettingKey("Chat.Comm100.Javascript")]
        public string Javascript
        {
            get { return GetValue();  }
            set { SetValue(value);  }
        }
    }
}
