using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Slot : ModelBase
    {
        public int SlotId { get; set; }
        public int ChannelId { get; set; }
        public string SlotContainerName { get; set; }
        public int MaxXSize { get; set; }
        public int MaxYSize { get; set; }
        public bool IsRotator { get; set; }
        public bool IsPopout { get; set; }
        public int MaxRotatorImages { get; set; }
    }
}