using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.LoanOffers
{
    public class LoanOffers : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Authentication.Authentication _authentication;

        public LoanOffers(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        /// <summary>
        /// Enabled
        /// </summary>
        [SettingKey("Mobile.LoanOffers.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("BA4979E0-024B-4CB5-91F1-EF841231D7E6"))); }
            set { _authentication = value; }
        }

    }
}
