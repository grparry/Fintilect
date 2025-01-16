using Newtonsoft.Json;
using NLog;
using Psi.Data.Models.Domain;
using RestSharp;
using System;
using System.Web.Http;
using Psi.ServiceHost.Client.Implementation.Utilities;
using PSI.Models.ClientConfigurationModels.Agatha;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Newtonsoft.Json.Linq;
using Omega.Presentation.Mvc.Models.Forms;
using Psi.Data.Models.Domain.SecureCommunication;
using Psi.Data.Models.Domain.Forms;

namespace Omega.Presentation.Mvc.Controllers
{
    [RoutePrefix("api/forms")]
    public class FormsController : ApiController
    {
        public FormsController()
        {
            Logger = LogManager.GetLogger(GetType().ToString());
        }

        [Route("v1/secure-message-queues")]
        [HttpGet]
        public IHttpActionResult GetSecureMessageQueues()
        {
            if (SettingsManager.Settings.SecureMessages.ServiceSettings?.Categories == null)
            {
                return Ok(new SecureMessageQueuesResponse { Queues = new List<string>() });
            }

            return Ok(new SecureMessageQueuesResponse { Queues = SettingsManager.Settings.SecureMessages.ServiceSettings.Categories.ToList() });

        }


        [Route("v1/pdf-templates")]
        [HttpGet]
        public IHttpActionResult GetPdfTemplates()
        {

            var client = new RestClient($"{ApplicationConfigHelper.Config.PsiServiceUrlBase}/api/secure-forms/v1/pdf-templates");

            var request = new RestRequest
            {
                Method = Method.GET
            };

            try
            {
                
                var response = client.Execute(request);

                if (response.IsSuccessful)
                {
                    return Ok(JsonConvert.DeserializeObject(response.Content));
                }
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return BadRequest();
        }

        [HttpPut]
        [Route("v1/template/{name}")]
        public IHttpActionResult StoreFormTemplate(string name, FormTemplatetJobjectRequest request)
        {

            var client = new RestClient($"{ApplicationConfigHelper.Config.PsiServiceUrlBase}/api/forms/v1/template/{name}");

            var restRequest = new RestRequest
            {
                Method = Method.PUT,
                RequestFormat = DataFormat.Json
            };

            var requestTransform = new FormTemplateRequest
            {
                Template = JsonConvert.SerializeObject(request.Template)
            };

            restRequest.AddBody(requestTransform);

            var response = client.Execute(restRequest);

            if (!response.IsSuccessful)
            {
                return BadRequest();
            }

            return Ok();

        }

        [HttpGet]
        [Route("v1/templates")]
        public IHttpActionResult GetFormTemplates()
        {
            var client = new RestClient($"{ApplicationConfigHelper.Config.PsiServiceUrlBase}/api/forms/v1/templates");

            var restRequest = new RestRequest
            {
                Method = Method.GET,
            };


            var response = client.Execute(restRequest);

            if (!response.IsSuccessful)
            {
                return BadRequest();
            }

            var formTemplatesResponse = JsonConvert.DeserializeObject<FormTemplatesResponse>(response.Content);

            var formTemplates = new List<FormTemplateJobject>();

            foreach (var template in formTemplatesResponse.FormTemplates)
            {
                var responseTemplate = new FormTemplateJobject
                {
                    Name = template.Name,
                    Path = template.Name,
                    Template = JObject.Parse(template.Template)
                };

                formTemplates.Add(responseTemplate);

            }

            var responseTemplates = new ResponseFormTemplatesJobject
            {
                FormTemplates = formTemplates
            };
            
            return Ok(responseTemplates);
        }

        [HttpDelete]
        [Route("v1/template/{name}")]
        public IHttpActionResult RemoveFormTemplate(string name)
        {
            var client = new RestClient($"{ApplicationConfigHelper.Config.PsiServiceUrlBase}/api/forms/v1/template/{name}");

            var request = new RestRequest
            {
                Method = Method.DELETE
            };

            var response = client.Execute(request);

            if (!response.IsSuccessful)
            {
                return BadRequest();
            }

            return Ok();
        }


        internal static Logger Logger { get; set; }


    }
}
