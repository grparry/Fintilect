using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class Enrollment : SettingsBaseHelper
    {

        public Enrollment(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If set to True, when an admin creates a new member, member will be required to change their password the first time they log in
        /// </summary>
        [SettingKey("Admin.Enrollment.ShouldRequirePasswordChange")]
        public bool ShouldRequirePasswordChange
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
