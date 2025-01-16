using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Image : ModelBase
    {
        public int ImageId { get; set; }

        [Required]
        [Display(Name = "Promotion Image URL")]
        public string ImageURL { get; set; }

        [AllowHtml]
        public string ImageDescription { get; set; }

        [Required]
        [Display(Name = "Promotion Image Name")]

        public string ImageName { get; set; }

        public string ImageAltText { get; set; }

        public string OnClickAction { get; set; }
       
        public int Weight { get; set; }

        public string MimeType { get; set; }

        public string FileName { get; set; }

        public byte[] FileContent { get; set; }

        public string FileContentBase64 { get; set; }
    }
}