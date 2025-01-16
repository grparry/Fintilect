using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.QrCodeGenerator
{
    public class QrCodeGeneratorViewModel : ModelBase
    {
        [Display(Name = "Select Environment:")]
        public List<SelectListItem> WebServiceUrls { get; set; }

        // Current selected url
        public string CurrentItem { get; set; } = "";

        public byte[] QrCode { get; set; } = null;
    }
}
