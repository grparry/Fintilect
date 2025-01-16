using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Channel : ModelBase
    {
        public int ChannelId { get; set; }
        [Required]
        [Display(Name = "Channel Name")]
        public string Name { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
}