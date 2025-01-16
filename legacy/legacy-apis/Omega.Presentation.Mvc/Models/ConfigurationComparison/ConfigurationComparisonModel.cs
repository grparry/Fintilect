using System.Collections.Generic;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.ConfigurationComparison
{
    public class ConfigurationComparisonModel : ModelBase
    {
        public IEnumerable<SelectListItem> Environments { get; set; }
    }

    public class ConfigurationComparisonViewModel : ModelBase
    {
        public string DestinationEnvironment { get; set; }
        public string SourceEnvironment { get; set; }
        public List<ConfigurationComparisonPresentationModel> SettingComparisons { get; set; }
        public string ConfigCompareSearchString { get; set; }
    }

    public class ConfigurationComparisonPresentationModel
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string SourceValue { get; set; }
        public string DestinationValue { get; set; }
        public string Description { get; set; }
        public string DefaultValue { get; set; }
        public bool IsSelected { get; set; }
        public string Application { get; set; }
        public bool IsEnvironmentSpecific { get; set; }
    }
}