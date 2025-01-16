using System.Collections.Generic;
using System.Web.Mvc;
using Psi.Data.Models.Domain.FeaturesManager;

namespace Omega.Presentation.Mvc.Models.FeaturesManager
{
    public class ManagedFeaturesModel : ModelBase
    {
        public List<ManagedFeature> Features { get; set; }
    }

    public class AddUpdateFeatureModel : ModelBase
    {
        public ManagedFeature Feature { get; set; }

        public bool? Licensed { get; set; }

        public int? SelectedClientId { get; set; }
    }

    public class FeatureGroupsModel : ModelBase
    {
        public ManagedFeature Feature { get; set; } = null;

        public List<ManagedFeatureGroup> FeatureGroups { get; set; }
    }

    public class AddUpdateFeatureGroupModel : ModelBase
    {
        public ManagedFeature Feature { get; set; }

        public ManagedFeatureGroup FeatureGroup { get; set; }
    }

    public class SettingsModel : ModelBase
    {
        public ManagedFeature Feature { get; set; }

        public ManagedFeatureGroup FeatureGroup { get; set; }

        public List<FeatureSetting> Settings { get; set; }
    }

    public class AddUpdateSettingModel : ModelBase
    {
        public ManagedFeature Feature { get; set; }

        public ManagedFeatureGroup FeatureGroup { get; set; }

        public FeatureSetting Setting { get; set; }
        
        public List<string> ApplicationConfigurationNames { get; set; }
    }

    public class ManageLicensesModel : ModelBase
    {
        public List<SelectListItem> Clients { get; set; }

        public int SelectedClientId { get; set; } = 0;

        public List<ManagedFeature> ClientFeatures { get; set; } = null;
    }
}