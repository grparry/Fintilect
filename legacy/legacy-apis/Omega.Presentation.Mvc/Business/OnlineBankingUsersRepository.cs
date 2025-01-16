using System;
using System.Collections.Generic;
using Omega.Presentation.Mvc.Models;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Business.ServiceContracts.RequestResponse.MemberManagement;
using Psi.Data.Models.Domain;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingUser;
using Psi.Business.ServiceContracts.RequestResponse;

namespace Omega.Presentation.Mvc.Business
{
    public class OnlineBankingUsersRepository
    {
	    private readonly PsiServiceHostService _psiServiceHostService;

		public OnlineBankingUsersRepository()
	    {
		    _psiServiceHostService = new PsiServiceHostService();
	    }

	    public List<OnlineBankingUserToDelete> GetListOfMembersToDelete(GetListOfMembersToDeleteRequest request)
        {
	        var response = _psiServiceHostService.ProcessRequestWithResult<List<OnlineBankingUserToDelete>>(PsiMethodType.GetListOfOnlineBankingUsersToDelete, request);

			if (!response.WasSuccessful)
				throw new Exception(response.WhyNotSuccessful);

	        return response.Payload;
        }

	    public DeleteUsersResponseModel DeleteUsers(long[] uuidsToDelete, User user)
		{
            var deleteResult = new DeleteUsersResponseModel();
            var successfulDeletes = new List<long>();

			foreach (var uuid in uuidsToDelete)
			{
				var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new RemoveOnlineBankingUserRequest(uuid, user.Name, true));
                
				if (response.WasSuccessful && response.Payload.Length > 0) {
                    deleteResult.unaffectedTables = response.Payload;
                }
                successfulDeletes.Add(uuid);
                deleteResult.successfulDeletes = successfulDeletes;
            }
            return deleteResult;
		}
	}

    public class DeleteUsersResponseModel
    {
        public List<long> successfulDeletes { get; set; }
        public string unaffectedTables { get; set; }

    }
}