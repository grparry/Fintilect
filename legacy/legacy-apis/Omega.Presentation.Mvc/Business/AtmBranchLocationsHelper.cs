using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using NLog;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.AtmBranchLocations;
using RestSharp;

namespace Omega.Presentation.Mvc.Business
{
    public class AtmBranchLocationsHelper
    {
        private readonly string _psiServiceUrlBase;
        private static readonly ILogger _logger = LogManager.GetCurrentClassLogger();

        public AtmBranchLocationsHelper()
        {
            _psiServiceUrlBase = ApplicationConfigHelper.Config.PsiServiceUrlBase;
        }
        public bool CreateAtmBranchLocation(AtmBranchLocationsDomainModel location)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/atm-branch-locations/v1");
                var request = new RestRequest
                {
                    Method = Method.POST
                };

                request.AddJsonBody(location);

                var result = client.Execute(request);

                if (result.IsSuccessful)
                {
                    return true;
                }

                _logger.Error("An error occurred when creating an Atm/Branch Location");
                return false;

            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }

        public List<AtmBranchLocationsDomainModel> ReadAtmBranchLocations()
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/atm-branch-locations/v1");
                var request = new RestRequest
                {
                    Method = Method.GET
                };

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    throw new Exception("An error occurred when requesting Atm/Branch Locations");
                }

                var response = JsonConvert.DeserializeObject<List<AtmBranchLocationsDomainModel>>(result.Content);

                return response;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
        }

        public AtmBranchLocationsDomainModel ReadAtmBranchLocation(int id)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/atm-branch-locations/v1/{id}");
                var request = new RestRequest
                {
                    Method = Method.GET
                };

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    throw new Exception($"An error occurred when requesting an Atm/Branch Location with id of {id}");
                }

                return JsonConvert.DeserializeObject<AtmBranchLocationsDomainModel>(result.Content);

            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
        }

        public bool UpdateAtmBranchLocation(AtmBranchLocationsDomainModel location)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/atm-branch-locations/v1");
                var request = new RestRequest
                {
                    Method = Method.PUT
                };

                request.AddJsonBody(location);

                var result = client.Execute(request);

                if (result.IsSuccessful)
                {
                    return true;
                }

                _logger.Error("An error occurred when updating an Atm/Branch Location");
                return false;

            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }

        public bool DeleteAtmBranchLocation(int id)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/atm-branch-locations/v1/{id}");
                var request = new RestRequest
                {
                    Method = Method.DELETE
                };

                var result = client.Execute(request);

                if (!result.IsSuccessful)
                {
                    _logger.Error("An error occurred when deleting an Atm/Branch Location");
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