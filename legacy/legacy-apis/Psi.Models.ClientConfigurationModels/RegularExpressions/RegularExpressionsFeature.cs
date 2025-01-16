using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.RegularExpressions
{
    public class RegularExpressionsFeature : SettingsBaseHelper
    {
        public RegularExpressionsFeature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("RegularExpressions.Javascript.WordWithCommonSpecialCharacters")]
        public string WordWithCommonSpecialCharacters
        {
            get { return GetValue() ?? @"^[A-Z a-z\\d\\-_.,!\?\\s]+$"; }
            set { SetValue(value); }
        }

        [SettingKey("X.App.HomeBanking.SsnType")]
        public string SsnType
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("X.App.HomeBanking.PhoneType")]
        public string PhoneType
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

    }
}
