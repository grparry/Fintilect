using System.Collections.Generic;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.ConfigurationComparison;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;
using Psi.Data.Models.Domain.FeaturesManager;

namespace Omega.Presentation.Mvc.Models.ApplicationConfiguration
{
    public class ApplicationConfigurationModel : ModelBase
    {
        public List<string> Keys { get; set; }
        public List<ApplicationConfiguration> Settings { get; set; }
    }

    public class ApplicationConfigurationEditModel : ModelBase
    {
        public ApplicationConfiguration Setting { get; set; }
        public bool SettingUpdated { get; set; }
        public Dictionary<string, string> PossibleValuesFromSource { get; set; }
        public string Environment { get; set; }
    }

    public class ApplicationConfigurationUpdateValueModel
    {
        public string Key { get; set; }
        [AllowHtml]
        public string Value { get; set; }

        public string Environment { get; set; }
    }

    public class ApplicationDefaultConfigurationModel : ModelBase
    {
        public bool WasUpdated { get; set; }
        [AllowHtml]
        public string Key { get; set; }
        [AllowHtml]
        public string DefaultValue { get; set; }
        [AllowHtml]
        public SourceOfValues SourceOfValues { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        [AllowHtml]
        public List<string> PossibleValues { get; set; }
        [AllowHtml]
        public string PossibleValuesString { get; set; }
        public string ValueType { get; set; }
        public string Version { get; set; }
        public List<string> AvaiableVersions { get; set; }
        public bool ValueIsNull { get; set; }
        public bool IsEnvironmentSpecific { get; set; }
        public bool MustProductionValueBeUnique { get; set; }
        public bool IsInternalOnly { get; set; }
        public int? FeatureId { get; set; }
        public int? FeatureGroupId { get; set; }
        public List<ManagedFeature> AvailableFeatures { get; set; }
        public List<ManagedFeatureGroup> AvailableFeatureGroups { get; set; }
    }
}