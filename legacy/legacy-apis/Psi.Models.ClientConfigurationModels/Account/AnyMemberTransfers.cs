using System;
using System.Collections.Generic;
using System.Linq;
using Psi.Data.Models.Domain.Transfers;
using Newtonsoft.Json;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class AnyMemberTransfers : SettingsBaseHelper
    {
        public AnyMemberTransfers(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Transfers.AnyMember.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.RequiredFields")]
        public List<AnyMemberTransferField> RequiredFields
        {
            get
            {
                var rawFields = GetListValue();

                var result = new List<AnyMemberTransferField>();
                if (rawFields?.Any() != true)
                {
                    return result;
                }

                foreach (var rawField in rawFields)
                {
                    if (Enum.TryParse(rawField, true, out AnyMemberTransferField field))
                    {
                        result.Add(field);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.OptionalFields")]
        public List<AnyMemberTransferField> OptionalFields
        {
            get
            {
                var rawFields = GetListValue();

                var result = new List<AnyMemberTransferField>();
                if (rawFields?.Any() != true)
                {
                    return result;
                }

                foreach (var rawField in rawFields)
                {
                    if (Enum.TryParse(rawField, true, out AnyMemberTransferField field))
                    {
                        result.Add(field);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.DefaultSuffix")]
        public string DefaultSuffix
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.AccountTypes")]
        public List<string> AccountTypes
        {
            get => GetListValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.MaxFailedTransferAttemptsPerDay")]
        public int MaxFailedTransferAttemptsPerDay
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.MinimumTransferAmount")]
        public int MinimumTransferAmount
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.AccountTypeMappings")]
        public Dictionary<string, string> AccountTypeMappings
        {
            get
            {
                var value = GetValue();
                return string.IsNullOrWhiteSpace(value) ? new Dictionary<string, string>() : JsonConvert.DeserializeObject<Dictionary<string, string>>(value);
            }
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.AccountSuffixMappings")]
        public Dictionary<string, string> AccountSuffixMappings
        {
            get
            {
                var value = GetValue();
                return string.IsNullOrWhiteSpace(value) ? new Dictionary<string, string>() : JsonConvert.DeserializeObject<Dictionary<string, string>>(value);
            }
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.FlagNumber")]
        public int AccessTypeFlagNumber
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.AnyMember.DefaultAccountType")]
        public string DefaultAccountType
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}