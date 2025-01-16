using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class PromotionRequest : ModelBase
    {
        /// <summary>
        /// Member's account number. May be empty, if the user is not logged in yet. Used for decisioning around what promotions are to be delivered.
        /// </summary>
        public string MemberAccount { get; set; }
        /// <summary>
        /// Client side time of request, used for decisioning around what promotions are to be delivered.
        /// </summary>
        public DateTime LocalTime { get; set; }
        /// <summary>
        /// WKT format string for geographical point. E.g. : POINT(-122.34900 47.65100)
        /// </summary>
        public string GeoLocation { get; set; }
        /// <summary>
        /// i.e. "Web not logged in", "Mobile logged in", etc...
        /// </summary>
        [Required]
        public string ChannelName { get; set; }
        /// <summary>
        /// The URL of the page requesting promotions
        /// </summary>
        public string ReferrerURL { get; set; }
        /// <summary>
        /// List of Image Container Names to be filled (Optional - When supplied, ChannelName is ignored)
        /// </summary>
        public List<string> ImageContainerNames { get; set; }

    }
}