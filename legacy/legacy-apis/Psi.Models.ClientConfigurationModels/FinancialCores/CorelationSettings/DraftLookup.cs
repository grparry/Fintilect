using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class DraftLookup : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;

        public DraftLookup(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("FinancialCore.Corelation.DraftLookup.AccountNumberLength")]
        public int? AccountNumberLength
        {
            get { return GetIntValue(); }
            set { SetValue(value?.ToString()); }
        }
    }
}