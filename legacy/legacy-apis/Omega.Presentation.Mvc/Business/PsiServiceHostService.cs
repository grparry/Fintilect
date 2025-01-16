using Newtonsoft.Json;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;

namespace Omega.Presentation.Mvc.Business
{
    public class PsiServiceHostService
    {
        public PsiServiceHostResult<T> ProcessRequestWithResult<T>(PsiMethodType method, object payload = null)
        {
            var x = JsonConvert.SerializeObject(payload);

            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new PsiRequest(0)
            {
                JsonPayload = x,
                MethodKey = method,
            });

            var result = new PsiServiceHostResult<T>()
            {
                WasSuccessful = response.WasSuccessful,
                WhyNotSuccessful = response.WhyNotSuccessful,
                OutOfBandRequired = response.OutOfBandRequired,
            };

            if (!string.IsNullOrEmpty(response.Payload))
                result.Payload = JsonConvert.DeserializeObject<T>(response.Payload);

            return result;
        }
    }
}
