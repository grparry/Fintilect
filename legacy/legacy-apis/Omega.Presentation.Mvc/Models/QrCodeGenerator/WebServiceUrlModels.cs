using System.Collections.Generic;
using Psi.Business.ServiceContracts.RequestResponse.QrCodeGenerator;

namespace Omega.Presentation.Mvc.Models.QrCodeGenerator
{
    public class EditUrlsModel : ModelBase
    {
        public List<WebServiceUrl> WebServiceUrls { get; set; }
    }

    public class AddUpdateUrlModel : ModelBase
    {
        public WebServiceUrl WebServiceUrl { get; set; }
    }
}