using System.Collections.Generic;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Data.Models.Domain.NewMobileFeatures;

namespace Omega.Presentation.Mvc.Business
{
    public class NewMobileFeaturesRepository
	{
	    private readonly PsiServiceHostService _psiServiceHostService;

		public NewMobileFeaturesRepository()
		{
			_psiServiceHostService = new PsiServiceHostService();
		}

		public NewMobileFeaturesRepository(PsiServiceHostService psiServiceHostService)
		{
			_psiServiceHostService = psiServiceHostService;
		}

		public List<NewMobileFeatureModel> GetNewMobileFeatures(long id = 0)
        {
	        var response = _psiServiceHostService.ProcessRequestWithResult<List<NewMobileFeatureModel>>(PsiMethodType.NewMobileFeaturesGet, id);
	        return response.Payload;
        }

		public NewMobileFeatureModel AddOrUpdateFeature(NewMobileFeatureModel feature)
	    {
		    var response = _psiServiceHostService.ProcessRequestWithResult<NewMobileFeatureModel>(PsiMethodType.NewMobileFeaturesUpdate, feature);
		    return response.Payload;
	    }

	    public bool DeleteFeature(NewMobileFeatureModel feature)
	    {
		    var response = _psiServiceHostService.ProcessRequestWithResult<PsiBasicResponse>(PsiMethodType.NewMobileFeaturesDelete, feature);
		    return response.WasSuccessful;
	    }
	}
}