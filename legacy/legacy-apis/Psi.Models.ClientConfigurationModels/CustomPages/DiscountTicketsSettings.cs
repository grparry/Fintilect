using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.CustomPages
{
    public class DiscountTicketsSettings : SettingsBaseHelper
    {
        public DiscountTicketsSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("CustomPages.DiscountTickets.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CustomPages.DiscountTickets.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CustomPages.DiscountTickets.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CustomPages.DiscountTickets.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CustomPages.DiscountTickets.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
