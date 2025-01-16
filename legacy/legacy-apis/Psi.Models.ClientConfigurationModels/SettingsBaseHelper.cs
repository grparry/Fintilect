using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLog;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;

namespace Psi.Data.Models.ClientConfigurationModels
{
    public abstract class SettingsBaseHelper
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private static readonly Lazy<string> Environment = new Lazy<string>(GetEnvironmentString);
        protected readonly ISettingsBase SettingsBase;

        protected SettingsBaseHelper(ISettingsBase settingsBase)
        {
            SettingsBase = settingsBase;
        }

        protected string EnvironmentName => Environment.Value;

        public string GetValue([CallerMemberName] string propertyName = null)
        {
            return GetTheValue(propertyName);
        }

        public List<string> GetListValue(char delimiter = ',', [CallerMemberName] string propertyName = null)
        {
            return GetEnumerableValue(delimiter, propertyName)?.ToList();
        }

        public List<T> GetListValue<T>(char delimiter = ',', [CallerMemberName] string propertyName = null)
        {
            return GetEnumerableValue(delimiter, propertyName)?.Select(ConvertTo<T>).ToList();
        }

        public IEnumerable<string> GetEnumerableValue(char delimiter = ',', [CallerMemberName] string propertyName = null)
        {
            return GetTheValue(propertyName)?.Split(delimiter).Select(x => x.Trim());
        }

        public string[] GetArrayValue(char delimiter = ',', [CallerMemberName] string propertyName = null)
        {
            return GetEnumerableValue(delimiter, propertyName)?.ToArray();
        }

        public bool GetBoolValue([CallerMemberName] string propertyName = null)
        {
            return GetBoolValue(propertyName, false);
        }

        public bool GetBoolValue(bool defaultValue, [CallerMemberName] string propertyName = null)
        {
            return GetBoolValue(propertyName, defaultValue);
        }

        public int GetIntValue([CallerMemberName] string propertyName = null, int defaultValue = 0)
        {
            if (int.TryParse(GetTheValue(propertyName), out var result)) return result;
            LogValueNotFound(propertyName);
            return defaultValue;
        }

        public uint GetUIntValue([CallerMemberName] string propertyName = null)
        {
            if (uint.TryParse(GetTheValue(propertyName), out var result)) return result;
            LogValueNotFound(propertyName);
            return 0;
        }

        public long GetLongValue([CallerMemberName] string propertyName = null)
        {
            if (long.TryParse(GetTheValue(propertyName), out var result)) return result;
            LogValueNotFound(propertyName);
            return 0;
        }

        public double GetDoubleValue([CallerMemberName] string propertyName = null)
        {
            if (double.TryParse(GetTheValue(propertyName), out var result)) return result;
            LogValueNotFound(propertyName);
            return 0;
        }

        public decimal GetDecimalValue([CallerMemberName] string propertyName = null)
        {
            if (decimal.TryParse(GetTheValue(propertyName), out var result)) return result;
            LogValueNotFound(propertyName);
            return 0;
        }

        public DateTime GetDateTimeValue([CallerMemberName] string propertyName = null)
        {
            if (DateTime.TryParse(GetTheValue(propertyName), out var result)) return result;
            LogValueNotFound(propertyName);
            return DateTime.MinValue;
        }

        public AuthenticationMethodType GetAuthenticationMethodTypeValue([CallerMemberName] string propertyName = null)
        {
            var value = GetTheValue(propertyName);
            if (value?.Equals("TokenAndPIN", StringComparison.InvariantCultureIgnoreCase) == true) return AuthenticationMethodType.Pin;
            if (Enum.TryParse(value, true, out AuthenticationMethodType result)) return result;

            LogValueNotFound(propertyName);
            return new AuthenticationMethodType();
        }

        public AppShieldResponseType GetAppShieldResponseTypeValue([CallerMemberName] string propertyName = null)
        {
            if (Enum.TryParse(GetTheValue(propertyName), true, out AppShieldResponseType result)) return result;
            LogValueNotFound(propertyName);
            return new AppShieldResponseType();
        }

        public void SetValue(object value, [CallerMemberName] string propertyName = null)
        {
            var key = GetKey(propertyName);
            SettingsBase.Update(key.ToLower(), value.ToString());
        }

        public T GetJsonValueOrNull<T>([CallerMemberName] string propertyName = null)
        {
            var key = GetKey(propertyName).ToLower();
            var setting = (ClientConfigurationSetting)SettingsBase.ClientConfigurations[key];
            var textValue = setting?.Value;

            if (setting != null && (setting.IsEnvironmentSpecific || setting.MustProductionValueBeUnique))
            {
                if (!TryGetEnvironmentSpecificValue(setting, key, out textValue))
                {
                    textValue = setting.Value;
                }
            }

            if (string.IsNullOrWhiteSpace(textValue))
            {
                LogValueNotFound(propertyName);
                return default(T);
            }
            try
            {
                return JsonConvert.DeserializeObject<T>(textValue);
            }
            catch (Exception ex)
            {
                LogManager.GetCurrentClassLogger().Error(ex);
                LogValueNotValidProperty(propertyName);
                return default(T);
            }
        }

        public T GetValue<T>([CallerMemberName] string propertyName = null)
        {
            return ConvertTo<T>(GetValue(propertyName));
        }

        public void LogValueNotFound(string propertyName)
        {
            var key = GetKey(propertyName);
            Logger.Log(LogLevel.Trace, key + " Not Found. Please add " + key + " Application Configuration via Omega or Sync the Meta Database.");
        }

        public void LogValueNotValidProperty(string propertyName)
        {
            var key = GetKey(propertyName);
            Logger.Log(LogLevel.Trace, key + " Not A Valid Value");
        }

        public void LogValueException(string propertyName, string exception)
        {
            Logger.Log(LogLevel.Trace, "GetValue() for " + propertyName + " exception: " + exception);
        }

        public void LogValueInvalidOperationException(string propertyName, string exception)
        {
            Logger.Log(LogLevel.Trace, "GetValue() for " + propertyName + " exception " + exception + ". Add [SettingKey(" + propertyName + ")]");
        }

        public static string GetApplicationPoolName()
        {
            return System.Environment.GetEnvironmentVariable("APP_POOL_ID", EnvironmentVariableTarget.Process);
        }

        public static string GetEnvironmentString()
        {
            return System.Environment.GetEnvironmentVariable($"ENVIRONMENT_{GetApplicationPoolName()}")
                ?? System.Environment.GetEnvironmentVariable("ENVIRONMENT")
                ?? "Development";
        }

        private static bool TryParseJson(string value, out JObject json)
        {
            try
            {
                json = JsonConvert.DeserializeObject<JObject>(value);
                return true;
            }
            catch
            {
                // ignored
            }

            json = null;
            return false;
        }

        private static bool TryGetEnvironmentSpecificValue(ClientConfigurationSetting setting, string key, out string theValue)
        {
            if (!TryParseJson(setting.Value, out var configByEnvironment))
            {
                if (setting.MustProductionValueBeUnique)
                {
                    throw new InvalidConfigurationException($"Configuration setting {key} must be unique per environment, but the value could not be deserialized.");
                }

                // Value isn't json, must be an old value
                theValue = setting.Value;
                return true;
            }

            var currentEnvironment = GetEnvironmentString();
            if (configByEnvironment.TryGetValue(currentEnvironment, StringComparison.OrdinalIgnoreCase, out var tokenValue))
            {
                if (!currentEnvironment.EqualsIgnoreCase("Production") && setting.MustProductionValueBeUnique)
                {
                    if (!configByEnvironment.TryGetValue("Production", StringComparison.OrdinalIgnoreCase, out var productionValue))
                    {
                        throw new InvalidConfigurationException($"Configuration setting {key} must be unique per environment, but didn't have a value for the Production environment");
                    }

                    if (currentEnvironment.EqualsIgnoreCase("Stage"))
                    {
                        if (configByEnvironment.TryGetValue("StageSameAsProduction", StringComparison.OrdinalIgnoreCase, out var stageSameAsProduction) &&
                            bool.TryParse(stageSameAsProduction.Value<string>().Trim(), out var b) && b)
                        {
                            Logger.Warn($"Using the production value for \"{key}\".");
                            theValue = productionValue.Value<string>();
                            return true;
                        }

                        if (configByEnvironment.TryGetValue("StageUseProduction", StringComparison.OrdinalIgnoreCase, out var stageUseProduction) &&
                            DateTime.TryParse(stageUseProduction.Value<string>().Trim(), out var date) && date > DateTime.Now && (date - DateTime.Now).TotalHours <= 24.0)
                        {
                            Logger.Warn($"Using the production value for \"{key}\".");
                            theValue = productionValue.Value<string>();
                            return true;
                        }
                    }

                    if (tokenValue.Value<string>().Trim().EqualsIgnoreCase(productionValue.Value<string>().Trim()))
                    {
                        throw new InvalidConfigurationException($"Configuration setting {key} must be unique per environment, but the current environment (\"{currentEnvironment}\") value matches the Production environment's value.");
                    }
                }

                theValue = tokenValue.Value<string>();
                return true;
            }

            if (setting.MustProductionValueBeUnique)
            {
                throw new InvalidConfigurationException($"Configuration setting {key} must be unique per environment, but didn't have a value for the current environment \"{currentEnvironment}\"");
            }

            theValue = null;
            return false;
        }

        private string GetTheValue(string propertyName)
        {
            try
            {
                var key = GetKey(propertyName).ToLower();
                var setting = (ClientConfigurationSetting)SettingsBase.ClientConfigurations[key];

                if (setting != null && (setting.IsEnvironmentSpecific || setting.MustProductionValueBeUnique)
                                    && TryGetEnvironmentSpecificValue(setting, key, out var theValue))
                {
                    return theValue;
                }

                return setting?.Value;
            }
            catch (InvalidConfigurationException ex)
            {
                LogValueException(propertyName, ex.Message);
                throw;
            }
            catch (InvalidOperationException iex)
            {
                LogValueInvalidOperationException(propertyName, iex.Message);
            }
            catch (InvalidCastException)
            {
                var key = GetKey(propertyName).ToLower();
                return (string)SettingsBase.ClientConfigurations[key];
            }
            catch (Exception ex)
            {
                LogValueException(propertyName, ex.Message);
            }
            return null;
        }

        private string GetKey(string propertyName)
        {
            var key = GetType().GetProperty(propertyName)?.GetCustomAttributes(typeof(SettingKeyAttribute), true).OfType<SettingKeyAttribute>().First().Key;

            return key ?? propertyName;
        }

        private bool GetBoolValue(string propertyName, bool defaultValue)
        {
            if (bool.TryParse(GetTheValue(propertyName), out bool result)) return result;
            LogValueNotFound(propertyName);
            return defaultValue;
        }

        private T ConvertTo<T>(string value)
        {
            T returnValue;
            try
            {
                //Handling Nullable types i.e, int?, double?, bool? .. etc
                if (Nullable.GetUnderlyingType(typeof(T)) != null)
                {
                    var conv = TypeDescriptor.GetConverter(typeof(T));
                    returnValue = (T)conv.ConvertFrom(value);
                }
                else
                {
                    returnValue = (T)Convert.ChangeType(value, typeof(T));
                }
            }
            catch (Exception)
            {
                returnValue = default(T);
            }

            return returnValue;
        }
    }

    public class SettingKeyAttribute : Attribute
    {
        public string Key { get; set; }

        public SettingKeyAttribute(string key)
        {
            Key = key;
        }
    }

    [Serializable]
    public sealed class InvalidConfigurationException : Exception
    {
        public InvalidConfigurationException(string message)
            : base(message)
        {
        }
    }
}