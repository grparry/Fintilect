using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using NLog;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.OmegaUsers;
using RestSharp;

namespace Omega.Presentation.Mvc.Business
{
    public class OmegaUserPermissionGroupRepository
    {
        private readonly string _psiServiceUrlBase;
        private static readonly ILogger _logger = LogManager.GetCurrentClassLogger();

        public OmegaUserPermissionGroupRepository()
        {
            _psiServiceUrlBase = ApplicationConfigHelper.Config.PsiServiceUrlBase;
        }

        public List<OmegaUserPermissionGroup> GetPermissionGroups()
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/omega-user-permission-group/v1");
                var request = new RestRequest
                {
                    Method = Method.GET
                };

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    throw new Exception("An error occurred when requesting omega user permission groups");
                }

                var response = JsonConvert.DeserializeObject<GetOmegaUserPermissionGroupsResponse>(result.Content);

                return response.PermissionGroups;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
        }

        public bool CreatePermissionGroup(OmegaUserPermissionGroup permissionGroup)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/omega-user-permission-group/v1");
                var request = new RestRequest
                {
                    Method = Method.POST
                };

                request.AddJsonBody(permissionGroup);

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    _logger.Error("An error occurred when creating an omega user permission groups");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }

        public bool UpdatePermissionGroup(OmegaUserPermissionGroup permissionGroup)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/omega-user-permission-group/v1");
                var request = new RestRequest
                {
                    Method = Method.PUT
                };

                request.AddJsonBody(permissionGroup);

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    _logger.Error("An error occurred when updating an omega user permission groups");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }

        public bool DeletePermissionGroup(int id)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/omega-user-permission-group/v1/{id}");
                var request = new RestRequest
                {
                    Method = Method.DELETE
                };

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    _logger.Error("An error occurred when deleting an omega user permission groups");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }

        public bool SetPermissionGroupForOmegaUser(int groupId, Guid omegaUserPublicId, string modifiedBy)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/omega-user-permission-group/v1/set");
                var request = new RestRequest
                {
                    Method = Method.POST
                };

                var setOmegaUserPermissionGroupRequest = new SetOmegaUserPermissionGroupRequest
                {
                    GroupId = groupId,
                    ModifiedBy = modifiedBy,
                    OmegaUserPublicId = omegaUserPublicId
                };

                request.AddJsonBody(setOmegaUserPermissionGroupRequest);

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    _logger.Error("An error occurred when setting a permission group for an omega user.");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }
    }
}