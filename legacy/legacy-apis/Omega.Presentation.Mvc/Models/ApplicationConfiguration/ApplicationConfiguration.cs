using System.Collections.Generic;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;

namespace Omega.Presentation.Mvc.Models.ApplicationConfiguration
{
    public class ApplicationConfiguration
    {
        public ApplicationConfiguration(ClientConfigurationSetting x)
        {
            ClientConfigurationId = x.ClientConfigurationId;
            ClientContextId = x.ClientContextId;
            ParentId = x.ParentId;
            Key = x.Key.Trim();
            Value = x.Value;
            DefaultConfigurationId = x.DefaultConfigurationId;
            ValueType = x.ValueType;
            PossibleValues = x.PossibleValues ?? new List<string>();
            SourceOfValues = x.SourceOfValues;
            DefaultValue = x.DefaultValue;
            IsInternalOnly = x.IsInternalOnly;
            IsEnvironmentSpecific = x.IsEnvironmentSpecific;
            MustProductionValueBeUnique = x.MustProductionValueBeUnique;
        }

        public int ClientConfigurationId { get; set; }
        public System.Guid ClientContextId { get; set; }
        public int? ParentId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public int DefaultConfigurationId { get; set; }
        public string ValueType { get; set; }
        public List<string> PossibleValues { get; set; }
        public string Description { get; set; }
        public SourceOfValues SourceOfValues { get; set; }
        public string DefaultValue { get; set; }
        public bool IsInternalOnly { get; set; }
        public bool IsEnvironmentSpecific { get; set; }
        public bool MustProductionValueBeUnique { get; set; }
    }
}