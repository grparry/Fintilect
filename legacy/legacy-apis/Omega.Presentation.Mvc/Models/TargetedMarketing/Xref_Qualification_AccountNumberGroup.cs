using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Xref_QualificationAcctNumGroup : ModelBase
    {
        public int XrefId { get; set; }
        public int AccountNumberQualificationId { get; set; }
        public int AccountNumberGroupId { get; set; }
    }
}