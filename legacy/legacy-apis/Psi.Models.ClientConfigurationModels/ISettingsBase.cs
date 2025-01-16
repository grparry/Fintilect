using System.Collections;
using System.Collections.Generic;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;

namespace Psi.Data.Models.ClientConfigurationModels
{
    public interface ISettingsBase
    {
        Hashtable ClientConfigurations { get; }
        void Update(string settingKey, string newValue);
        void RefreshSettings();
        List<ClientConfigurationSetting> GetSettings(string connectionString, string clientContext, string metaConnectionString);
    }
}
