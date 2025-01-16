using System.Collections.Generic;
using Newtonsoft.Json;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Business.ServiceContracts.RequestResponse.QuickAccess;
using Psi.Business.ServiceContracts.RequestResponse.UserDevices;
using Psi.Data.Models.Domain.UserDevices;

namespace Omega.Presentation.Mvc.Business
{
    public class QuickAccessManagementRepository
    {
        public List<QuickAccessDevice> GetQuickAccessDevices(long uuid)
        {
            var request = new GetQuickAccessDevicesRequest { Uuid = uuid };
            var jsonRequest = JsonConvert.SerializeObject(request);

            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new PsiRequest(0) { JsonPayload = jsonRequest, MethodKey = PsiMethodType.GetQuickAccessDevices });

            return response.Payload.IsNullOrEmpty() ? new List<QuickAccessDevice>() : JsonConvert.DeserializeObject<List<QuickAccessDevice>>(response.Payload);
        }

        public bool DeleteQuickAccessTokens(QuickAccessDevice device)
        {
            var request = new DisableQuickAccessRequest
            {
                Account = device.Account,
                Uuid = device.Uuid,
                DeviceIdentifier = device.DeviceGuid,
                RequestType = DisableQuickAccessMethodRequestType.All
            };

            var jsonRequest = JsonConvert.SerializeObject(request);

            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new PsiRequest(0) { JsonPayload = jsonRequest, MethodKey = PsiMethodType.DisableQuickAccessMethod });

            var reply = JsonConvert.DeserializeObject<DisableQuickAccessReply>(response.Payload);

            return reply.Success;
        }
    }
}