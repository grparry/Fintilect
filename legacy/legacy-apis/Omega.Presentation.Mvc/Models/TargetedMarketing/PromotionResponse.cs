using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class PromotionResponse : ModelBase
    {
        public string ChannelName { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public List<PromotionImageContainer> Containers { get; set; }
    }
}