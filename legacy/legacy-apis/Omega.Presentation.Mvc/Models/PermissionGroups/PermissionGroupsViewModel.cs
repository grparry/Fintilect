using System;
using Psi.Data.Models.Domain.OmegaUsers;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.PermissionGroups
{
    public class PermissionGroupsViewModel : ModelBase
    {
        public PermissionGroupsViewModel()
        {
            AvailablePermissions = new List<string>();
            SelectedPermissions = new List<string>();
            ExistingGroupNames = new List<string>();

            // Make a list of strings from the Enum values. Needed for checkbox contains() method
            foreach (string permissionName in Enum.GetNames(typeof(OmegaFeatureAccessPermission)))
            {
                AvailablePermissions.Add(permissionName);
            }
        }

        public List<OmegaUserPermissionGroup> PermissionGroups { get; set; }

        public OmegaUserPermissionGroup SelectedPermissionGroup { get; set; }

        public List<string> AvailablePermissions { get; set; }

        public List<string> SelectedPermissions { get; set; }

        public List<string> ExistingGroupNames { get; set; }
    }
}