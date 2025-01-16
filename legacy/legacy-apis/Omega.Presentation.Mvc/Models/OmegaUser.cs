using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Omega.Presentation.Mvc.Business;
using Psi.Business.ServiceContracts.RequestResponse.Omega;
using Psi.Data.Models.Domain.OmegaUsers;

namespace Omega.Presentation.Mvc.Models
{
    public class OmegaUser
    {
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Public Id")]
        public Guid PublicId { get; set; }

        [Display(Name = "Permission Level")]
        public PermissionLevel PermissionLevel { get; set; }

        [Display(Name = "Id")]
        public int Id { get; set; }

        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Display(Name = "Deleted")]
        public bool? Deleted { get; set; }

        [Display(Name = "History")]
        public List<OmegaUserHistory> History { get; set; }

        public bool PasswordChangeRequired { get; set; }

        public bool IsLockedOut { get; set; }

        public bool PasswordIsValid { get; set; }

        public Guid? ClientPublicId { get; set; }

        public OmegaUserPermissionGroup PermissionGroup { get; set; }

        [Display(Name = "Permission Group")]
        public string SelectedPermissionGroup { get; set; }
    }
}
