using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class PromotionImageContainer : ModelBase
    {
        public string ContainerName { get; set; }
        public bool IsRotator { get; set; }
        public int NumberOfImages { get; set; }
        public int MaxXSize { get; set; }
        public int MaxYSize { get; set; }
        public bool IsPopout { get; set; }
        public List<PromotionImage> Images {get;set;}
    }
}