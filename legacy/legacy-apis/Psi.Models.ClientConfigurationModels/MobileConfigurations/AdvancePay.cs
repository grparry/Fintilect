using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class AdvancePay : SettingsBaseHelper
    {
        public AdvancePay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.AdvancePay.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AdvancePayLoanCategories")]
        public List<string> AdvancePayLoanCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }
    }
}
