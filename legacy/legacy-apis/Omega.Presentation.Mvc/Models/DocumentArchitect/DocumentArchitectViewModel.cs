using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.DocumentArchitect
{
    public class DocumentArchitectViewModel : ModelBase
    {
        public string Url { get; set; }
        public bool UseIframe { get; set; }

        public string ErrorMessage { get; set; }
    }
}