using Psi.Data.Models.Domain.AtmBranchLocations;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.AtmBranchLocations
{
    public class AtmBranchLocationsViewModel : ModelBase
    {
        public List<AtmBranchLocationsDomainModel> Locations { get; set; }

        public AtmBranchLocationsDomainModel SingleLocation { get; set; }
    }
}