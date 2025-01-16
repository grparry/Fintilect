using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Promotion : ModelBase
    {
        public int PromotionId { get; set; }
        [Required]
        [Display(Name = "Promotion Name")]
        public string Name { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public bool ExcludeNonQualifiers { get; set; }
        /// <summary>
        /// A list of channels is populated on single instances (Not on get all) of Promotions, just to make for handy access...
        /// </summary>
        public List<Channel> Channels { get; set; }

        public List<Slot> Slots { get; set; }
        public List<Xref_PromoSlot> PromoSlots { get; set; }
        public List<Image> Images { get; set; }
        public List<Xref_PromoSlotImage> PromoSlotImages { get; set; }
    }
}