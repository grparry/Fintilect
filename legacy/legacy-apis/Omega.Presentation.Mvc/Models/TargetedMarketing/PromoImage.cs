using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class PromoImage : Image
    {
        public int PromoSlotImageId { get; set; }

        public PromoImage()
        {
            
        }
        public PromoImage(Image img)
        {
            ImageId = img.ImageId;
            ImageAltText = img.ImageAltText;
            ImageDescription = img.ImageDescription;
            ImageName = img.ImageName;
            ImageURL = img.ImageURL;
            OnClickAction = img.OnClickAction;
            FileContentBase64 = Convert.ToBase64String(img.FileContent);
            MimeType = img.MimeType;
        }

    }
}