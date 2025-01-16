using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class PromotionImage : ModelBase
    {
        public int ImageId { get; set; }
        public string URL { get; set; }
        public string OnClickAction { get; set; }
        public string AltText { get; set; }

    }
}