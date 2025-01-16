using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class MobileWebViews : SettingsBaseHelper
    {
        public MobileWebViews(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.MobileWebViews.WhitelistedPages")]
        public List<string> WhitelistedPages
        {
            get { return GetEnumerableValue().Select(x => x.ToUpper()).ToList(); }
            set { SetValue(value); }
        }
    }
}
