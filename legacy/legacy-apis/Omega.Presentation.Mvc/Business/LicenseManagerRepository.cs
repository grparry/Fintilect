using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Psi.Business.ServiceContracts.RequestResponse.LicenseManager;
using Psi.Data.Models.Domain.LicenseManager;

namespace Omega.Presentation.Mvc.Business
{
    public class LicenseManagerRepository
    {
        public List<SelectListItem> GetClients()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetClientsResponse>(new GetClientsRequest(0));

            return response.Clients.Select(client => new SelectListItem
            {
                Value = client.Id.ToString(),
                Text = client.Name
            }).ToList();
        }

        public List<LicensedFeature> GetLicensedFeaturesForClient(int clientId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetLicensedFeaturesForClientResponse>(new GetLicensedFeaturesForClientRequest(0) {ClientId = clientId});

            return response.Features;
        }

        public bool EditLicense(int featureId, int clientId, bool license)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<EditLicensedFeatureForClientResponse>(new EditLicensedFeatureForClientRequest(0) { FeatureId = featureId, ClientId = clientId, License = license });

            return response.Success;
        }
    }
}