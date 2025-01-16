using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Xref_PromoSlotImage : ModelBase
    {
        public int XrefId { get; set; }
        public int PromotionSlotId { get; set; }
        public int ImageId { get; set; }
    }
}