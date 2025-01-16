using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.ErrorMessages;
using Omega.Presentation.Mvc.Models.Members;
using Omega.Presentation.Mvc.Business;
using Psi.Data.Models.Domain;
using Psi.Business.ServiceContracts.RequestResponse.Omega;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class ErrorMessagesController : OmegaBaseController
    {
        // GET: ErrorMessages
        public ActionResult Index()
        {
            var model = new ErrorMessagesModel();
            if (!model.User.CanView(OmegaFeatureAccessPermission.ThirdPartySystemMessages))
            {
                return View("FeatureNotAvailable");
            }

            ViewBag.BaseModel = model;  // for user authentication

            switch (SettingsManager.Settings.FinancialCore.CoreType)
            {
                case FinancialCoreTypes.DNA:
                    ViewBag.CoreType = "dna";
                    break;
                default:
                    ViewBag.CoreType = "other";
                    break;
            }

            return View("index");
        }

        // Refresh Meaningful error messages
        // GET: 
        public ActionResult RefreshMessages(string mode)
        {
            var messageList = new List<SystemMessage>();
            messageList = Util.GetSystemMessagesForMember(Convert.ToInt64(Session["OmegaMeaningfulMessagesCurrentMember"]));

            return PartialView("_MeaningfulErrorMessagesList", messageList);
        }

        // Search Regular Members. Return ActionResult with list of members as model or with the single member's meaningful error messages
        // GET
        public ActionResult GetMember(string MemberNumberTextbox)
        {
            var memberSearchKind = new MemberSearchType();
            memberSearchKind = MemberSearchType.AccountNumber;

            MemberSearchViewModel viewModel = new MemberSearchViewModel();
            List<MemberPresentationModel> membersList = new List<MemberPresentationModel>();
            List<SearchedMember> searchedMemberList = Util.SearchForMember(memberSearchKind, MemberNumberTextbox);

            if (searchedMemberList.Count > 1)
            {
                foreach (SearchedMember memberInstance in searchedMemberList)
                {
                    var presentationMember = new MemberPresentationModel()
                    {
                        AccountNumber = memberInstance.Account.ToString(),
                        AccountNumberAlias = memberInstance.Alias,
                        MemberName = memberInstance.Alias
                    };
                    membersList.Add(presentationMember);
                }
                viewModel.memberPresentationModelList = membersList;
                return PartialView("_MemberSearchResult", viewModel);
            }
            else if (searchedMemberList.Count == 1)
            {
                return GetMessagesForMember(searchedMemberList[0].Account.ToString());         // return the _MeaningfulErrorMessageList partial view with this members messages
            }

            return PartialView("_MemberSearchResult", viewModel);  // if there are Zero members, still pass it to the view. it will handle it and show a 'no members found' type message.
        }



        // Search DNA Members. Return ActionResult with list of members as model or with the single member's meaningful error messages
        // GET
        public ActionResult GetDnaMember(string DnaMemberNumberTextbox, string DnaPersonRecordNumberTextbox,
            string DnaEAgreementTextbox, string DnaUserIdTextbox)
        {
            var memberSearchKind = new MemberSearchType();
            string searchString = "";

            if (DnaMemberNumberTextbox.Length > 0)
            {
                memberSearchKind = MemberSearchType.MemberNumber;
                searchString = DnaMemberNumberTextbox;
            }

            if (DnaPersonRecordNumberTextbox.Length > 0)
            {
                memberSearchKind = MemberSearchType.PersonNumber;
                searchString = DnaPersonRecordNumberTextbox;
            }

            if (DnaEAgreementTextbox.Length > 0)
            {
                memberSearchKind = MemberSearchType.AccountNumber;
                searchString = DnaEAgreementTextbox;
            }

            if (DnaUserIdTextbox.Length > 0)
            {
                memberSearchKind = MemberSearchType.AccountAlias;
                searchString = DnaUserIdTextbox;
            }

            MemberSearchViewModel viewModel = new MemberSearchViewModel();
            List<DnaMemberPresentationModel> dnaMembersList = new List<DnaMemberPresentationModel>();
            List<SearchedMember> searchedMemberList = Util.SearchForMember(memberSearchKind, searchString);

            if (searchedMemberList.Count > 1)   // we have more than one member, show the list in the _MemberSearchResult partial view
            {
                foreach (SearchedMember memberInstance in searchedMemberList)
                {
                    var presentationMember = new DnaMemberPresentationModel()
                    {
                        EAgreementNumber = memberInstance.Account.ToString(),
                        MemberNumber = memberInstance.MemberNumber.ToString(),
                        PersonRecordNumber = memberInstance.PersonNumber.ToString(),
                        UserId = memberInstance.Alias
                    };
                    dnaMembersList.Add(presentationMember);
                }
                viewModel.dnaMemberPresentationModelList = dnaMembersList;
                return PartialView("_MemberSearchResult", viewModel);
            }
            else if (searchedMemberList.Count == 1)
            {     // only one member, do a message search instead
                return GetMessagesForMember(searchedMemberList[0].Account.ToString());      // return the _MeaningfulErrorMessageList partial view with this members messages
            };

            return PartialView("_MemberSearchResult", viewModel);  // if there are Zero members, still pass it to the view. it will handle it and show a 'no members found' type message.
        }


        // Get the messages for the member selected from a presented list of several Members.
        // GET
        public ActionResult GetMessagesForMember(string id)
        {
            long memberId = Convert.ToInt32(id);
            Session["OmegaMeaningfulMessagesCurrentMember"] = id;   // store in session if 'refresh' button is clicked

            var messageList = new List<SystemMessage>();
            messageList = Util.GetSystemMessagesForMember(memberId);

            return PartialView("_MeaningfulErrorMessagesList", messageList);
        }
    }
}
