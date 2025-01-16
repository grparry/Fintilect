using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Criteria_GeoLocationMatch : ModelBase
    {
        public int GeolocationMatchCriteriaId { get; set; }
        /// <summary>
        /// WKT format string for geographical point, area, etc... E.g. : POINT(-122.34900 47.65100)
        /// </summary>
        public string GeoArea { get; set; }
        public string Description { get; set; }

        public bool IsActive { get; set; }
        public int Qualification_GeolocationMatchId { get; set; }

    }
}