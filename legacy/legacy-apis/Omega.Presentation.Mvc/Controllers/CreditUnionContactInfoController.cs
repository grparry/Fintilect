using System;
using System.Linq;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.CreditUnionContactInfo;
using Psi.Data.Models.Domain.ContactUs;
using Psi.Data.Models.Domain.OmegaUsers;

namespace Omega.Presentation.Mvc.Controllers
{
    public class CreditUnionContactInfoController : OmegaBaseController
    {
        [HttpGet]
        public ActionResult Index(CreditUnionContactInfoViewModel model = null)
        {
            if (model?.ContactUsInfo == null) model = new CreditUnionContactInfoViewModel { ContactUsInfo = Util.GetContactUsInfo() };

            if (!model.User.CanView(OmegaFeatureAccessPermission.ChangeCreditUnionContactInformation))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        [HttpPost]
        public ActionResult CreateContactUsInfo()
        {
            var success = Util.AddUpdateContactUsInfo(new ContactUsModel(), true);

            if (!success)
            {
                throw new Exception("There was an error adding the contact information.");
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult UpdateContactUsInfo(CreditUnionContactInfoViewModel model)
        {
            var success = Util.AddUpdateContactUsInfo(model.ContactUsInfo, false);

            if (!success)
            {
                throw new Exception("There was an error updating the contact information.");
            }

            return RedirectToAction("Index", model);
        }

        [HttpPost]
        public ActionResult DeleteContactUsInfo(int id)
        {
            var success = Util.DeleteContactUsInfo(id);

            if (!success)
            {
                throw new Exception("There was an error deleting the contact information.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult GetContactUsGroup(int id)
        {
            var model = new AddUpdateContactUsGroupModel
            {
                ContactUsGroup = Util.GetContactUsInfo().ContactUsGroups.First(x => x.Id == id)
            };

            return PartialView("EditContactUsGroup", model);
        }

        [HttpGet]
        public ActionResult CreateContactUsGroup(int contactUsId)
        {
            var model = new AddUpdateContactUsGroupModel
            {
                ContactUsGroup = new ContactUsGroupModel { ContactUsId = contactUsId }
            };

            return PartialView("EditContactUsGroup", model);
        }

        [HttpPost]
        public ActionResult UpdateContactUsGroup(AddUpdateContactUsGroupModel model)
        {
            var success = Util.AddUpdateContactUsGroup(model.ContactUsGroup, model.ContactUsGroup.Id <= 0);

            if (!success)
            {
                throw new Exception("There was an error creating or updating the contact group.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteContactUsGroup(int groupId)
        {
            var success = Util.DeleteContactUsGroup(groupId);

            if (!success)
            {
                throw new Exception("There was an error deleting the contact group.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult GetContactUsPhoneNumber(int groupId, int id)
        {
            var model = new AddUpdateContactUsPhoneNumberModel
            {
                ContactUsPhoneNumber = Util.GetContactUsInfo().ContactUsGroups.First(x => x.Id == groupId).ContactUsPhoneNumbers.First(x => x.Id == id)
            };

            return PartialView("EditContactUsPhoneNumbers", model);
        }

        [HttpGet]
        public ActionResult CreateContactUsPhoneNumber(int groupId)
        {
            var model = new AddUpdateContactUsPhoneNumberModel
            {
                ContactUsPhoneNumber = new ContactUsPhoneNumberModel { ContactUsGroupId = groupId }
            };

            return PartialView("EditContactUsPhoneNumbers", model);
        }

        [HttpPost]
        public ActionResult UpdateContactUsPhoneNumber(AddUpdateContactUsPhoneNumberModel model)
        {
            var success = Util.AddUpdateContactUsPhoneNumber(model.ContactUsPhoneNumber, model.ContactUsPhoneNumber.Id <= 0);

            if (!success)
            {
                throw new Exception("There was an error creating or updating the phone number.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteContactUsPhoneNumber(int numberId)
        {
            var success = Util.DeleteContactUsPhoneNumber(numberId);

            if (!success)
            {
                throw new Exception("There was an error deleting the phone number.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult GetContactUsPhoneHour(int? groupId, int? numberId, int id)
        {
            if (!groupId.HasValue && !numberId.HasValue)
            {
                throw new Exception("Getting the phone hour to edit failed. Missing both the group id and the number id.");
            }

            AddUpdateContactUsPhoneHourModel model;

            if (!groupId.HasValue)
            {
                model = new AddUpdateContactUsPhoneHourModel
                {
                    ContactUsPhoneHour = Util.GetContactUsInfo()
                        .ContactUsGroups.First(x => x.ContactUsPhoneNumbers.Any(y => y.Id == numberId))
                        .ContactUsPhoneNumbers.First(x => x.Id == numberId)
                        .ContactUsPhoneHours.First(x => x.Id == id)
                };
            }
            else
            {
                model = new AddUpdateContactUsPhoneHourModel
                {
                    ContactUsPhoneHour = Util.GetContactUsInfo().ContactUsGroups.First(x => x.Id == groupId).ContactUsPhoneHours.First(x => x.Id == id)
                };
            }

            return PartialView("EditContactUsPhoneHours", model);
        }

        [HttpGet]
        public ActionResult CreateContactUsPhoneHour(int? groupId, int? numberId)
        {
            var model = new AddUpdateContactUsPhoneHourModel
            {
                ContactUsPhoneHour = new ContactUsPhoneHourModel { ContactUsGroupId = groupId, ContactUsPhoneNumberId = numberId }
            };

            return PartialView("EditContactUsPhoneHours", model);
        }

        [HttpPost]
        public ActionResult UpdateContactUsPhoneHour(AddUpdateContactUsPhoneHourModel model)
        {
            var success = Util.AddUpdateContactUsPhoneHour(model.ContactUsPhoneHour, model.ContactUsPhoneHour.Id <= 0);

            if (!success)
            {
                throw new Exception("There was an error creating or updating the phone hours.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteContactUsPhoneHour(int hoursId)
        {
            var success = Util.DeleteContactUsPhoneHour(hoursId);

            if (!success)
            {
                throw new Exception("There was an error deleting the phone hours.");
            }

            return RedirectToAction("Index");
        }

	    [HttpGet]
	    public ActionResult GetContactUsLink(int groupId, int id)
	    {
		    var model = new AddUpdateContactUsLinkModel
		    {
			    ContactUsLink = Util.GetContactUsInfo().ContactUsGroups.First(x => x.Id == groupId).ContactUsLinks.First(x => x.Id == id)
		    };

		    return PartialView("EditContactUsLinks", model);
	    }

	    [HttpGet]
	    public ActionResult CreateContactUsLink(int groupId)
	    {
		    var model = new AddUpdateContactUsLinkModel
		    {
			    ContactUsLink = new ContactUsLinkModel { ContactUsGroupId = groupId }
		    };

		    return PartialView("EditContactUsLinks", model);
	    }

		[HttpPost]
		public ActionResult UpdateContactUsLink(AddUpdateContactUsLinkModel model)
		{
			var success = Util.AddUpdateContactUsLink(model.ContactUsLink, model.ContactUsLink.Id <= 0);

			if (!success)
			{
				throw new Exception("There was an error creating or updating the link.");
			}

			return RedirectToAction("Index");
		}

		[HttpGet]
		public ActionResult DeleteContactUsLink(int linkId)
		{
			var success = Util.DeleteContactUsLink(linkId);

			if (!success)
			{
				throw new Exception("There was an error deleting the link.");
			}

			return RedirectToAction("Index");
		}
	}
}