using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.PermissionGroups;
using Omega.Presentation.Mvc.Business;
using Psi.Data.Models.Domain.OmegaUsers;
using System.Linq;
using PSI.Models.ClientConfigurationModels.Agatha;
using System.Collections.Generic;
using System.Net;

namespace Omega.Presentation.Mvc.Controllers
{
    public class PermissionGroupsController : OmegaBaseController
    {
        private readonly OmegaUserPermissionGroupRepository _omegaUserPermissionGroupRepository;

        public PermissionGroupsController()
        {
            _omegaUserPermissionGroupRepository = new OmegaUserPermissionGroupRepository();
        }

        // show the initial view:
        [HttpGet]
        public ActionResult Index()
        {
            var model = new PermissionGroupsViewModel();

            if (!model.User.PermissionLevel.CanView(PermissionLevel.Owner) ||
				!model.User.CanView(OmegaFeatureAccessPermission.EditOmegaUsers) ||
				!SettingsManager.Settings.OmegaConfiguration.Features.PermissionGroupsEnabled)
            {
                return View("FeatureNotAvailable");
            }

            model.PermissionGroups = _omegaUserPermissionGroupRepository.GetPermissionGroups();

			// store the group names for later. When adding, we don't want to allow duplicate names:
			foreach (var item in model.PermissionGroups)
			{
				model.ExistingGroupNames.Add(item.Name);
			}

			return View("index", model);
        }

		// GET a SINGLE permission group to update or create a new permission group ---- this appears in a MODAL
		[HttpGet]
		public ActionResult ManagePermissionGroup(int id, string mode)
		{
			var model = new PermissionGroupsViewModel();
			ViewBag.BaseModel = model;  // for user authentication
			ViewBag.Mode = mode;
			var permissionGroup = new OmegaUserPermissionGroup();

			if (mode == "update")
			{
                var permissionGroups = _omegaUserPermissionGroupRepository.GetPermissionGroups();
                permissionGroup = permissionGroups.FirstOrDefault(x => x.Id == id);

				// Set the selected permissions for the permission group for the checkboxes
				foreach (var permissionName in permissionGroup.Permissions)
				{
					model.SelectedPermissions.Add(permissionName.ToString());
				}
			}
			else if (mode == "create")
			{
                permissionGroup.Id = 0;
			}

			model.SelectedPermissionGroup = permissionGroup;

			return PartialView("_AddEditModal", model);
		}

		// CREATE a new Permission Group
		[HttpPost]
		public ActionResult CreatePermissionGroup(PermissionGroupsViewModel model)
		{
			if (!ModelState.IsValid) return Content("error", "text/html");

			model.SelectedPermissionGroup.LastModifiedBy = model.User.Name;

			// Send the permission group just created to the back end to ADD it:
			var result = _omegaUserPermissionGroupRepository.CreatePermissionGroup(model.SelectedPermissionGroup);

			if (result == true)
			{
				return new HttpStatusCodeResult(HttpStatusCode.OK);
			}

			return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
		}

		// UPDATE changes to an existing permission group
		[HttpPost]
		public ActionResult UpdatePermissionGroup(PermissionGroupsViewModel model)
		{
			if (!ModelState.IsValid) return Content("error", "text/html");

			model.SelectedPermissionGroup.LastModifiedBy = model.User.Name;

			// Send the permission group just created to the back end to UPDATE it:
			var result = _omegaUserPermissionGroupRepository.UpdatePermissionGroup(model.SelectedPermissionGroup);

			if (result == true)
			{
				return new HttpStatusCodeResult(HttpStatusCode.OK);
			}

			return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
		}

		// DELETE an existing permission group
		[HttpGet]
		public ActionResult DeletePermissionGroup(int id)
		{
			if (_omegaUserPermissionGroupRepository.DeletePermissionGroup(id))
			{
				return new HttpStatusCodeResult(HttpStatusCode.OK);
			}

			return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
		}
	}
}