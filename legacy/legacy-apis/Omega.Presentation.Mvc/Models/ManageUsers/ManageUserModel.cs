using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Omega.Presentation.Mvc.Models.ManageUsers
{
    public class AddNewUserViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Permission Level")]
        public int PermissionLevel { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Permission Group")]
        public string SelectedPermissionGroup { get; set; }
    }

    public class EditUserPermissionsViewModel : ModelBase
    {
        [Required]
        [Display(Name = "User To Edit")]
        public OmegaUser UserToEdit { get; set; }
        
        [Display(Name = "Users")]
        public List<OmegaUser> Users { get; set; }
    }

    public class ChangePasswordViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current Password")]
        public string CurrentPassword { get; set; }
        
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("NewPassword", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public bool PasswordIsValid { get; set; } = true;
    }
}