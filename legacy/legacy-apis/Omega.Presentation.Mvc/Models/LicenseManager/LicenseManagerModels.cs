using System.Collections.Generic;
using System.Web.Mvc;
using Psi.Data.Models.Domain.LicenseManager;

namespace Omega.Presentation.Mvc.Models.LicenseManager
{
    public class ManageLicensesModel : ModelBase
    {
        public List<SelectListItem> Clients { get; set; }

        public int SelectedClientId { get; set; } = 0;
    }

    public class ClientFeaturesModel : ModelBase
    {
        public List<LicensedFeature> ClientFeatures { get; set; } = null;

        public int SelectedClientId { get; set; }
    }
}