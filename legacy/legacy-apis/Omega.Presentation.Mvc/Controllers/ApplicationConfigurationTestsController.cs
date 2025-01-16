using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using Psi.Data.Models.ClientConfigurationModels;
using PSI.Models.ClientConfigurationModels.Agatha;
using Newtonsoft.Json;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;
using Psi.Data.Models.Domain.ErrorMessages;

namespace Omega.Presentation.Mvc.Controllers
{
    public class ApplicationConfigurationTestsController : OmegaBaseController
    {
        // GET: PassThroughMessageRules
        public ActionResult PassThroughMessageRules()
        {
            return PartialView("PassThroughMessagesModal");
        }

        [HttpPost]
        public JsonResult PassThroughMessageRules(PassThroughMessageRulesTestRequest input)
        {
            try
            {
                PassThroughErrorMessageConfiguration config;

                try
                {
                    config = JsonConvert.DeserializeObject<PassThroughErrorMessageConfiguration>(input.RulesJson);
                }
                catch (Exception)
                {
                    return Json(new { error = "Not a valid Json object.  Should be in a format like this: {  rules:[   {    \"match\": \"(51\\\\^)\",    \"trim\" : \"[^51\\^]+$\"   }, {    \"match\": \"(51:)\",    \"trim\" : \"[^51\\\\^]+$\"   }  ] } " });
                }

                if (config.Rules.Count() == 0)
                    return Json(new { message = "It's valid, but you didn't include any rules." });

                if (input.TestText.IsNullOrWhiteSpace())
                    return Json(new { error = "You didn't include error text to be parsed by the rules." });

                var result = HomeBankingUtilities.ErrorMessageUtilities.GetPassthroughMessageIfAny(new Exception(input.TestText), config);

                if (result.IsNullOrWhiteSpace())
                    return Json(new { error = "It was able to apply the rules, but resulted in a blank message." });

                return Json(new { message = "Resulted in this message: ", result });
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });
            }
        }
    }

    public class PassThroughMessageRulesTestRequest
    {
        public string RulesJson { get; set; }
        public string TestText { get; set; }
    }
}