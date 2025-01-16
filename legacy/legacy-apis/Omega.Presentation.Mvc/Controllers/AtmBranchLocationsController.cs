using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.AtmBranchLocations;
using Psi.Data.Models.Domain.AtmBranchLocations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Controllers
{
    public class AtmBranchLocationsController : OmegaBaseController
    {
        // GET: AtmBranchLocations
        public ActionResult Index()
        {
            var model = new AtmBranchLocationsViewModel();
            var helper = new AtmBranchLocationsHelper();

            model.Locations = helper.ReadAtmBranchLocations();
            model.SingleLocation = new AtmBranchLocationsDomainModel();

            // We are putting these in the ViewBag so that the _AddEditForm partial view can render the dropdowns, since it's model is the domain model AtmBranchLocationsDomainModel
            ViewBag.StatesDropDown = Util.GetUnitedStatesStatesForMvcDropdown();
            ViewBag.LocationTypeDropDown = GetLocationTypes();

            return View(model);
        }

        // Add new location to the database. This comes from filling out the form in the index view.
        [HttpPost]
        public ActionResult AddLocation(AtmBranchLocationsDomainModel data)
        {
            if (!ModelState.IsValid) { return RedirectToAction("Index"); }

            try
            {
                var helper = new AtmBranchLocationsHelper();
                var success = helper.CreateAtmBranchLocation(data);

                if (success)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                } 
                else
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "AtmBranchLocationsController => AddLocation(); There was an error.");
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }

        // update existing location in the database. This comes from filling out the form in the index view.
        [HttpPost]
        public ActionResult UpdateLocation(AtmBranchLocationsDomainModel data)
        {
            if (!ModelState.IsValid) { return RedirectToAction("Index"); }

            try
            {
                var helper = new AtmBranchLocationsHelper();
                var success = helper.UpdateAtmBranchLocation(data);

                if (success)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "AtmBranchLocationsController => AddLocation(); There was an error.");
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }

        // Delete a location from the database. This comes from a trash can icon click.
        [HttpDelete]
        public ActionResult DeleteLocation(string id)
        {
            try
            {
                var helper = new AtmBranchLocationsHelper();
                var success = helper.DeleteAtmBranchLocation(Int32.Parse(id));

                if (success)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "AtmBranchLocationsController => AddLocation(); There was an error.");
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }

        // Get a single location from the database to show in the form so the user can edit it
        public ActionResult GetLocation(string id)
        {
            var helper = new AtmBranchLocationsHelper();
            var singleLocation = helper.ReadAtmBranchLocation(Int32.Parse(id));

            ViewBag.StatesDropDown = Util.GetUnitedStatesStatesForMvcDropdown();
            ViewBag.LocationTypeDropDown = GetLocationTypes();

            return PartialView("_AddEditForm", singleLocation);
        }

        // Get a the location types for the drop-down: ATM || Branch
        private List<SelectListItem> GetLocationTypes()
        {
            var locationTypeItems = new List<SelectListItem>();

            var atm = new SelectListItem() { Text = "ATM", Value = "ATM" };
            var branch = new SelectListItem() { Text = "Branch", Value = "Branch" };
            locationTypeItems.Add(atm);
            locationTypeItems.Add(branch);

            return locationTypeItems;
        }
    }
}