using System.Collections.Generic;
using Psi.Data.Models.Domain.History;

namespace Psi.Data.Models.ClientConfigurationModels.ConnectNative
{
    public class ConnectNativeAccountHistory : SettingsBaseHelper
    {
        public ConnectNativeAccountHistory(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ConnectNative.AccountHistory.AccountDetailsByAccountCategory")]
        public List<AccountDetailsByAccountCategorySetting> AccountDetailsByAccountCategory
        {
            get => GetJsonValueOrNull<List<AccountDetailsByAccountCategorySetting>>();
            set => SetValue(value);
        }
    }
}