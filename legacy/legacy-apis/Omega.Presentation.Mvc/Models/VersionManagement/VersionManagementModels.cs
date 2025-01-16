using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.VersionManagement
{
    public class VersionManagementViewModel : ModelBase
    {
        [Required]
        public List<AppVersion> iOSVersions { get; set; }

        [Required]
        public List<AppVersion> AndroidVersions { get; set; }

        [Required]
        public List<AppVersion> iOSAppVersions { get; set; }

        [Required]
        public List<AppVersion> AndroidAppVersions { get; set; }

        public int iOSNumberOfDays { get; set; } = 30;

        public int iOSAppNumberOfDays { get; set; } = 30;

        public int AndroidNumberOfDays { get; set; } = 30;

        public int AndroidAppNumberOfDays { get; set; } = 30;
    }
    
    public class ManageMinimumVersionViewModel : ModelBase
    {
        [Required]
        public List<AppVersion> AppVersions { get; set; }
        
        public int NumberOfDays { get; set; } = 90;

        [Display(Name = "Select Minimum Version")]
        public List<SelectListItem> AvailableVersions { get; set; }

        public string CurrentItem { get; set; }
    }

    public class AppVersion
    {
        public string VersionNumber { get; set; }

        public int Count { get; set; }

        public double Percentage { get; set; }
    }


    public class DefaultVersionManagementModel : ModelBase
    {
        public string NewVersion { get; set; }
        [Required]
        public ClientContextDetails ClientContextVersions { get; set; }

        [Required]
        public List<ApplicationVersion> AppVersions { get; set; }
    }

    public class UpdateClientVersionManagementModel : ModelBase
    {
        [Required]
        public ClientContextDetails ClientContext { get; set; }
    }

    public class ClientContextDetails
    {
        public string CurrentContext { get; set; }
        public string CurrentIosAppVersion { get; set; }
        public string CurrentAndroidAppVersion { get; set; }
    }

    public class ApplicationVersion
    {
        public int ApplicationVersionId { get; set; }
        public string Version { get; set; }
    }
}