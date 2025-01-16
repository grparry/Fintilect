using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Newtonsoft.Json;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;
using Psi.Packages.ApplicationConfiguration;

namespace Psi.Data.Models.ClientConfigurationModels
{
    public class ConfigProvider : SettingsBaseHelper, IApplicationConfigurationProvider
    {
        public ConfigProvider(ISettingsBase settingsBase)
            : base(settingsBase)
        {
        }

        string IApplicationConfigurationProvider.GetValue(string settingKey)
        {
            return base.GetValue(settingKey);
        }

        T IApplicationConfigurationProvider.GetAndParseValue<T>(string settingKey)
        {
            var value = base.GetValue(settingKey);
            if (value == null)
            {
                return default(T);
            }

            var valueType = ((ClientConfigurationSetting)base.SettingsBase.ClientConfigurations[settingKey.ToLower()])?.ValueType;

            switch (valueType?.ToUpper() ?? "Unknown")
            {
                case "OBJECT-JSON":
                    return JsonConvert.DeserializeObject<T>(value);
                case "OBJECT-XML":
                    var serializer = new XmlSerializer(typeof(T));
                    var memStream = new MemoryStream(Encoding.UTF8.GetBytes(value));
                    return (T)serializer.Deserialize(memStream);
                default:
                    throw new ArgumentOutOfRangeException(nameof(settingKey), $"Unknown ClrType or Value Type in application configuration for key: {settingKey}");
            }
        }

        bool IApplicationConfigurationProvider.GetBoolValue(string settingKey)
        {
            return base.GetBoolValue(settingKey);
        }

        int IApplicationConfigurationProvider.GetIntegerValue(string settingKey)
        {
            return base.GetIntValue(settingKey);
        }
    }
}