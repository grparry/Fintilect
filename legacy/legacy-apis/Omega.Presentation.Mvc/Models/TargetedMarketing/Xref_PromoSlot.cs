using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Xref_PromoSlot : ModelBase
    {
        public int XrefId { get; set; }
        public int PromotionId { get; set; }
        public int SlotId { get; set; }

    }
}