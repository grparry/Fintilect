using System.ComponentModel.DataAnnotations;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class ContentItemUImodel
    {
        public int SlotId { get; set; }
        public string SlotContainerName { get; set; }

        [Display(Name = "Promotion Image URL")]
        public string ImageURL { get; set; }

        public string ImageDescription { get; set; }

        [Required]
        [Display(Name = "Promotion Image Name")]
        public string ImageName { get; set; }
        public string ImageAltText { get; set; }
        [Display(Name = "Click Action/URL")]
        public string OnClickAction { get; set; }
    }
}