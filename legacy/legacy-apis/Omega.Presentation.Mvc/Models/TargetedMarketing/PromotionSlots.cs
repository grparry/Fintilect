using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class PromotionSlots
    {
        public List<Xref_PromoSlot> PromoSlots { get; set; }
        public List<Slot> Slots { get; set; }

        public PromotionSlots()
        {
            PromoSlots = new List<Xref_PromoSlot>();
            Slots = new List<Slot>();
        }

    }
}