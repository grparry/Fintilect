using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Qualification : ModelBase
    {

        public int QualificationId { get; set; }
        public int PromotionId { get; set; }
        public string HandlerName { get; set; }
        public int CreateBy { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
       


    }
}