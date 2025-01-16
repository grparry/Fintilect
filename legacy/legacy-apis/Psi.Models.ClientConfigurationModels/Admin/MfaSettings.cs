using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class MfaSettings : SettingsBaseHelper
    {
        public MfaSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If set to True, mfa text questions are enabled
        /// </summary>
        [SettingKey("Admin.MFA.MfaTextQuestionsEnabled")]
        public bool MfaTextQuestionsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}