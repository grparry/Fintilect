using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.PublicApi
{
    public class PublicApiSettings : SettingsBaseHelper
    {
        public PublicApiSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("PublicApi.Account.DefaultHistoryDays")]
        public int DefaultAccountHistoryDays
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }


        [SettingKey("PublicApi.Account.UseCoreGetCardsCall")]
        public bool ConnectPublicApiUseCards
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
