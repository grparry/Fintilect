using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.ADACompliance
{
    public class ADAComplianceSettings : SettingsBaseHelper
    {
        public ADAComplianceSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ADAComplianceSettings.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("ADAComplianceSettings.EnableADACompliancePageForHomeBanking")]
        public bool EnableADACompliancePageForHomeBanking
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
