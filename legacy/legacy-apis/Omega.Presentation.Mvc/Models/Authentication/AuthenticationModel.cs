using System.ComponentModel.DataAnnotations;

namespace Omega.Presentation.Mvc.Models.Authentication
{
    public class LoginViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }

    public class ForgotPasswordViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }

    public class ForgotPasswordConfirmationViewModel : ModelBase
    {
        public bool Deleted { get; set; }
    }

    public class ResetPasswordViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
        public bool PasswordIsValid { get; set; }
    }
    public class ResetPasswordConfirmationViewModel : ModelBase
    {

    }
}
