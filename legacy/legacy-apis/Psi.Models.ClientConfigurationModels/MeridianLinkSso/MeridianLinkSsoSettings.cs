using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Psi.Data.Models.Domain.MeridianLinkSso;

namespace Psi.Data.Models.ClientConfigurationModels.MeridianLinkSso
{
    public class MeridianLinkSsoSettings : SettingsBaseHelper
    {
        public MeridianLinkSsoSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("MeridianLinkSso.ShouldUseMemberNumber")]
        public bool ShouldUseMemberNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MeridianLinkSso.SendMemberInfoEnabled")]
        public bool ShouldSendMemberInfo
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MeridianLinkSso.Version3.Enabled")]
        public bool ShouldUseVersion3
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MeridianLinkSso.SendMemberInfo.FieldsToSend")]
        public Dictionary<MeridianLinkFields, bool> MemberInfo
        {
            get
            {
                var fields = Enum.GetValues(typeof(MeridianLinkFields))
                    .Cast<MeridianLinkFields>()
                    .ToDictionary(key => key, value => false);

                var list = GetListValue();

                list.ForEach((x) =>
                {
                    if (Enum.TryParse(x, out MeridianLinkFields field))
                    {
                        fields[field] = true;
                    }
                });

                return fields;
            }
            set => SetValue(value);
        }
    }
}
