using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Psi.Data.Models.Domain.History;

namespace Psi.Data.Models.ClientConfigurationModels.History
{
    public class HistoryShare : SettingsBaseHelper
    {
        public HistoryShare(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("History.Share.ShowRates")]
        public bool ShowRates
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }


        [SettingKey("History.Share.DescriptionOverlayEnabled")]
        public bool DescriptionOverlayEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("History.Share.DescriptionOverlayConfigurationJson")]
        public List<HistoryOverLayConfig> DescriptionOverlays
        {
            get { return GetJsonValueOrNull<List<HistoryOverLayConfig>>()?.OrderBy(x=>x.Priority).ToList(); }
            set { SetValue(JsonConvert.SerializeObject(value)); }
        }

        [SettingKey("History.Share.IfAdditionalDescriptionIsNotSetSetWithDescription2")]
        public bool IfAdditionalDescriptionIsNotSetSetWithDescription2
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
