using Psi.Business.ServiceContracts.RequestResponse.ContactUs;
using Psi.Data.Models.Domain.ContactUs;

namespace Omega.Presentation.Mvc.Business
{
    public class CreditUnionContactInfoRepository
    {
        public ContactUsModel GetContactUsInfo()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetContactUsInfoResponse>(new GetContactUsInfoRequest(0));

            return response.ContactUsInformation;
        }

        public bool AddUpdateContactUsInfo(ContactUsModel contactUsInfo, bool addRecord)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateContactUsResponse>(new AddUpdateContactUsRequest(0) {ContactUsModel = contactUsInfo, AddRecord = addRecord});

            return response.Success;
        }

        public bool DeleteContactUsInfo(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteContactUsResponse>(new DeleteContactUsRequest(0) {Id = id});

            return response.Success;
        }

        public bool AddUpdateContactUsGroup(ContactUsGroupModel contactUsGroup, bool addRecord)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateContactUsGroupResponse>(new AddUpdateContactUsGroupRequest(0) {ContactUsGroupModel = contactUsGroup, AddRecord = addRecord});

            return response.Success;
        }

        public bool DeleteContactUsGroup(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteContactUsGroupResponse>(new DeleteContactUsGroupRequest(0) {Id = id});

            return response.Success;
        }

        public bool AddUpdateContactUsPhoneNumber(ContactUsPhoneNumberModel contactUsPhoneNumber, bool addRecord)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateContactUsPhoneNumberResponse>(new AddUpdateContactUsPhoneNumberRequest(0) {ContactUsPhoneNumberModel = contactUsPhoneNumber, AddRecord = addRecord});

            return response.Success;
        }

        public bool DeleteContactUsPhoneNumber(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteContactUsPhoneNumberResponse>(new DeleteContactUsPhoneNumberRequest(0) {Id = id});

            return response.Success;
        }

        public bool AddUpdateContactUsPhoneHour(ContactUsPhoneHourModel contactUsPhoneHour, bool addRecord)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateContactUsPhoneHourResponse>(new AddUpdateContactUsPhoneHourRequest(0) {ContactUsPhoneHourModel = contactUsPhoneHour, AddRecord = addRecord});

            return response.Success;
        }

        public bool DeleteContactUsPhoneHour(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteContactUsPhoneHourResponse>(new DeleteContactUsPhoneHourRequest(0) {Id = id});

            return response.Success;
        }

	    public bool AddUpdateContactUsLink(ContactUsLinkModel contactUsLink, bool addRecord)
	    {
		    var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateContactUsLinkResponse>(new AddUpdateContactUsLinkRequest(0) { ContactUsLinkModel = contactUsLink, AddRecord = addRecord });

		    return response.Success;
	    }

	    public bool DeleteContactUsLink(int id)
	    {
		    var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteContactUsLinkResponse>(new DeleteContactUsLinkRequest(0) { Id = id });

		    return response.Success;
	    }
	}
}