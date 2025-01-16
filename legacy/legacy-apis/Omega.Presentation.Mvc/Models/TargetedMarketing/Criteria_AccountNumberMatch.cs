using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Criteria_AccountNumberMatch : ModelBase
    {
        public long AccountNumberMatchConditionId { get; set; }
        [Required]
        public long AccountNumberGroupId { get; set; }
        [Required]
        public string AccountNumber { get; set; }
        public bool IsActive { get; set; }
    }
}