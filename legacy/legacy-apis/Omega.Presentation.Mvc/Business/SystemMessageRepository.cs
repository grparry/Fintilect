using System.Collections.Generic;
using Psi.Business.ServiceContracts.RequestResponse.Omega;
using Psi.Data.Models.Domain;

namespace Omega.Presentation.Mvc.Business
{
    public class SystemMessageRepository
    {
        public List<SearchedMember> SearchForMember(MemberSearchType searchType, string searchId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<SearchForMemberResponse>(new SearchForMemberRequest(0)
            {
                MemberSearchType = searchType,
                SearchId = searchId
            });

            return response.Members;
        }

        public List<SystemMessage> GetSystemMessagesForMember(long uuid)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetSystemMessagesResponse>(new GetSystemMessagesRequest(uuid));

            return response.Messsages;
        }
    }
}