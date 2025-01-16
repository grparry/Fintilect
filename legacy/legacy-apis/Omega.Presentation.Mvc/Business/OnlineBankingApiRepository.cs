using System.Collections.Generic;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingApi;
using Psi.Data.Models.Domain.OnlineBankingApi;

namespace Omega.Presentation.Mvc.Business
{
    public class OnlineBankingApiRepository
    {
        public List<ApiCredentials> GetApiCredentials()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetApiCredentialsResponse>(new GetApiCredentialsRequest(0));

            return response.Credentials;
        }

        public bool UpdateApiCredentials(AddUpdateApiCredentialsRequest credentials)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(credentials);

            return response.WasSuccessful;
        }

        public bool DeleteApiCredentials(ApiCredentials credentials)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new DeleteApiCredentialsRequest(0) { Credentials = credentials });

            return response.WasSuccessful;
        }
    }
}