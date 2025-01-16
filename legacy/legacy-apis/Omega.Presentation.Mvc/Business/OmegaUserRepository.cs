using System;
using System.Collections.Generic;
using System.Linq;
using Omega.Presentation.Mvc.Models;
using Psi.Business.ServiceContracts.RequestResponse.Omega;

namespace Omega.Presentation.Mvc.Business
{
    public class OmegaUserRepository
    {
        public OmegaUser GetUser(string email)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetOmegaUserResponse>(new GetOmegaUserRequest(0) { Email = email, PlaintextPassword = string.Empty });
            if (response.Exception != null) return null;

            return new OmegaUser
            {
                PermissionLevel = (PermissionLevel)response.PermissionLevel,
                PublicId = response.PublicId,
                Email = response.Email,
                Id = response.Id,
                PasswordChangeRequired = response.PasswordChangeRequired,
                IsLockedOut = response.UserIsLockedOut,
                ClientPublicId = response.ClientPublicId,
                PermissionGroup = response.PermissionGroup
            };
        }

        public List<OmegaUser> GetUsers(Guid? clientPublicId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetOmegaUsersResponse>(new GetOmegaUsersRequest(0) { ClientPublicId = clientPublicId });

            if (response.Users.Count == 0) return new List<OmegaUser>();

            return response.Users.Select(x => new OmegaUser
            {
                Email = x.Email,
                Name = x.Name,
                PermissionLevel = (PermissionLevel)x.PermissionLevel,
                UserName = x.UserName,
                PublicId = x.PublicId,
                Deleted = x.Deleted,
                Id = x.Id,
                PermissionGroup = x.PermissionGroup
            }).ToList();
        }

        public UserApplicationSettings GetOmegaSettingForUser(PermissionLevel permissionLevel)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<OmegaStartupResponse>(new OmegaStartupRequest(0) { IsSuperUser = permissionLevel == PermissionLevel.Dev });
            return new UserApplicationSettings { ApplicationVersions = response.Versions, ClientContextNames = response.ContextNames };
        }

        public OmegaUser LoginUser(string email, string password, string encryptedPassword)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetOmegaUserResponse>(new GetOmegaUserRequest(0) { Email = email, PlaintextPassword = password, EncryptedPassword = encryptedPassword });
            if (response.Exception != null) return null;

            return new OmegaUser
            {
                PermissionLevel = (PermissionLevel)response.PermissionLevel,
                PublicId = response.PublicId,
                Email = response.Email,
                Id = response.Id,
                Name = response.Name,
                PasswordChangeRequired = response.PasswordChangeRequired,
                IsLockedOut = response.UserIsLockedOut,
                ClientPublicId = response.ClientPublicId,
                PermissionGroup = response.PermissionGroup
            };
        }

        public OmegaUser ResetPassword(string email, string password)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<OmegaUserResetPasswordResponse>(new OmegaUserResetPasswordRequest(0) { Email = email, Password = password });
            if (response.Exception != null) return null;

            return new OmegaUser
            {
                PermissionLevel = (PermissionLevel)response.PermissionLevel,
                PublicId = response.PublicId,
                Email = response.Email,
                Id = response.Id,
                Name = response.Name,
                Deleted = response.Deleted,
                PasswordIsValid = response.PasswordIsValid,
                PermissionGroup = response.PermissionGroup
            };
        }

        public bool ChangePassword(string email, string currentPassword, string newPassword)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<OmegaUserChangePasswordResponse>(new OmegaUserChangePasswordRequest(0) { Email = email, CurrentPassword = currentPassword, NewPassword = newPassword });
            return response.PasswordIsValid;
        }

        public string GetEmailFromToken(Guid token)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<OmegaUserEmailResetTokenResponse>(new OmegaUserEmailResetTokenRequest(0) { Token = token });
            if (response.Exception != null) return null;

            return response.Email.IsNullOrEmpty() ? null : response.Email;
        }

        public OmegaUser ForgotPassword(string email)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<OmegaUserForgotPasswordResponse>(new OmegaUserForgotPasswordRequest(0) { Email = email });

            return new OmegaUser
            {
                PublicId = response.PublicId,
                Email = response.Email,
                Id = response.Id,
                Deleted = response.Deleted
            };
        }

        public OmegaUser AddNewUser(string email, int permissionLevel, string name, string modifiedBy)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddNewOmegaUserResponse>(new AddNewOmegaUserRequest(0) { Email = email, PermissionLevel = permissionLevel, Name = name, ModifiedBy = modifiedBy });
            if (response.Exception != null) return null;

            return response.PublicId.IsNotEmpty() ? new OmegaUser
            {
                PermissionLevel = (PermissionLevel)response.PermissionLevel,
                PublicId = response.PublicId,
                Id = response.Id,
                Password = response.Password,
                Email = response.Email,
                Name = response.Name
            } : null;
        }

        public OmegaUser EditUserPermissions(OmegaUser userToEdit, string modifiedBy)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<EditOmegaUserResponse>(new EditOmegaUserRequest(0) { Email = userToEdit.Email, PermissionLevel = (int)userToEdit.PermissionLevel, Name = userToEdit.Name, UserName = userToEdit.UserName, PublicId = userToEdit.PublicId, Id = userToEdit.Id, Deleted = userToEdit.Deleted, Password = userToEdit.Password, ModifiedBy = modifiedBy });
            if (response.Exception != null) return null;

            return new OmegaUser
            {
                PermissionLevel = (PermissionLevel)response.PermissionLevel,
                PublicId = response.PublicId,
                Id = response.Id,
                Password = response.Password,
                Email = response.Email,
                Name = response.Name,
                UserName = response.UserName,
                Deleted = response.Deleted,
                PermissionGroup = response.PermissionGroup
            };
        }

        public OmegaUser GetOmegaUserDetails(string email)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetOmegaUserDetailsResponse>(new GetOmegaUserDetailsRequest(0) { Email = email });
            if (response.Exception != null) return null;

            return new OmegaUser
            {
                PermissionLevel = (PermissionLevel)response.PermissionLevel,
                PublicId = response.PublicId,
                Id = response.Id,
                Password = response.Password,
                Email = response.Email,
                Name = response.Name,
                Deleted = response.Deleted,
                UserName = response.UserName,
                History = response.History,
                PermissionGroup = response.PermissionGroup
            };
        }
    }
}
