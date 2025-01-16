using System;
using System.Collections.Generic;
using System.Security.Principal;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.StringResources;
using Psi.Data.Models.Domain.OmegaUsers;

namespace Omega.Presentation.Mvc.Models
{
    public abstract class ModelBase
    {
        public User User => Util.GetUser();
    }

    [Serializable]
    public class User
    {
        public User(WindowsIdentity identity)
        {
            Email = identity.Name;
        }

        public User()
        {
            
        }

        public string Email { get; set; }

        public PermissionLevel PermissionLevel { get; set; }

        public Guid PublicId { get; set; }

        public string Name { get; set; }

        public bool PasswordChangeRequired { get; set; }

        public bool IsLockedOut { get; set; }

        public bool PasswordIsValid { get; set; }

        public Guid? ClientPublicId { get; set; }

        public OmegaUserPermissionGroup PermissionGroup { get; set; }
    }

    [Serializable]
    public class UserApplicationSettings
    {
        public List<string> ApplicationVersions { get; set; }
        public List<string> ClientContextNames { get; set; }
    }

    public class HomePageModel : ModelBase
    {
        public string WarningMessage { get; set; }
        public List<Resource> stringResources { get; set;  }
    }

}
