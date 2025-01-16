using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.Membership
{
    public class MemberProfile : SettingsBaseHelper
    {
        public MemberProfile(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("MemberProfile.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        // regex for us phone number -  
        // eg: ^\d{3}\-\d{3}\-\d{4}$
        [SettingKey("MemberProfile.UsPhoneRegex")]
        public string UsPhoneRegex
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        // Get BEN1 and BEN2 UserFields boolean
        [SettingKey("MemberProfile.GetBeneficiaryFields")]
        public bool ShouldGetBeneficiaryFields
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        // If true, do not show 'address 3' entry in the memberprofile.vbhtml view in HomeBanking
        [SettingKey("X.App.HomeBanking.HideAddressLineThreeOnChangeAddressControl")]
        public bool ShouldHideAddressLineThree
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
        
    }
}
