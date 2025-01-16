using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web.Mvc;
using Newtonsoft.Json;
using NLog;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.OnlineBankingUsers;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingUser;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.AccountNumberReassignment;
using Psi.Data.Models.Domain.OmegaUsers;
using Psi.Data.Models.Domain.OnlineBankingUserInfo;
using Psi.ServiceHost.Client.Implementation;
using Psi.ServiceHost.Client.Implementation.Utilities;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class OnlineBankingUsersController : OmegaBaseController
    {
        private readonly OnlineBankingUsersRepository _onlineBankingUsersRepository;

        public OnlineBankingUsersController()
        {
            // TODO: Eventually would like to take time to get MVC Unity working properly and inject in constructor
            _onlineBankingUsersRepository = new OnlineBankingUsersRepository();
        }

        #region Delete Inactive Users

        public ActionResult DeleteInactive()
        {
            var viewModel = new DeleteInactiveParametersViewModel
            {
                AllowCsvExportBeforeDeletingUsers = SettingsManager.Settings.OmegaConfiguration.Features.DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers
            };

            if (!SettingsManager.Settings.OmegaConfiguration.Features.DeleteOnlineBankingUsersEnabled || !viewModel.User.CanView(OmegaFeatureAccessPermission.DeleteInactiveOlbUsers))
            {
                return View("FeatureNotAvailable");
            }

            return View("DeleteInactive", viewModel);
        }

        // Gets a list of users within the date range
        public ActionResult GetList(DeleteInactiveParametersViewModel reportParameters)
        {
            if (!ModelState.IsValid) return View("DeleteInactive", reportParameters);

            // Generate report
            try
            {
                const int maxUsersToList = 500;

                reportParameters.OnlineBankingUsersToDelete = _onlineBankingUsersRepository.GetListOfMembersToDelete(
                    new GetListOfMembersToDeleteRequest
                    {
                        NotLoggedInSince = reportParameters.NotLoggedInSince,
                        IncludeWithScheduledTransfers = reportParameters.IncludeWithScheduledTransfers,
                        MaximumUsersToList = maxUsersToList
                    });

                if (reportParameters.OnlineBankingUsersToDelete.Count == maxUsersToList)
                    TempData["resultMessage"] = $"NOTE: Showing the first {maxUsersToList} results.";
            }
            catch (Exception e)
            {
                Logger.Error(e);
                TempData["resultMessage"] = "There was a problem getting the list of users.  Try again?";
                TempData["resultClass"] = "danger";
            }

            if (!string.IsNullOrEmpty(reportParameters.SortCategory))
                switch (reportParameters.SortCategory)
                {
                    case "Account Descending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderByDescending(x => x.AccountNumber).ToList();
                        break;
                    case "LastLogin Descending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderByDescending(x => x.LastLogin).ToList();
                        break;
                    case "CreateDate Descending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderByDescending(x => x.CreateDate).ToList();
                        break;
                    case "LastModified Descending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderByDescending(x => x.LastModified).ToList();
                        break;
                    case "UserName Descending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderByDescending(x => x.Username).ToList();
                        break;
                    case "Account Ascending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderBy(x => x.AccountNumber).ToList();
                        break;
                    case "LastLogin Ascending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderBy(x => x.LastLogin).ToList();
                        break;
                    case "CreateDate Ascending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderBy(x => x.CreateDate).ToList();
                        break;
                    case "LastModified Ascending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderBy(x => x.LastModified).ToList();
                        break;
                    case "UserName Ascending":
                        reportParameters.OnlineBankingUsersToDelete = reportParameters.OnlineBankingUsersToDelete.OrderBy(x => x.Username).ToList();
                        break;
                }

            reportParameters.AllowCsvExportBeforeDeletingUsers = SettingsManager.Settings.OmegaConfiguration.Features.DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers;

            return View("DeleteInactive", reportParameters);
        }

        public ActionResult DeleteSelected(long[] UuidsToDelete)
        {
            _onlineBankingUsersRepository.DeleteUsers(UuidsToDelete, Util.GetUser());

            TempData["resultMessage"] = $"{UuidsToDelete.Length} user{(UuidsToDelete.Length == 1 ? "" : "s")} successfully deleted.";
            return Redirect("DeleteInactive");
        }

        // delete inactive user. created for one-at-a-time AJAX
        public ActionResult DeleteSingleUser(long[] UuidsToDelete)
        {
            Thread.Sleep(500);
            var response = _onlineBankingUsersRepository.DeleteUsers(UuidsToDelete, Util.GetUser());

            var json = JsonConvert.SerializeObject(response, Formatting.Indented);
            return Content(json, "text/json");
        }

        #endregion


        #region Account Number Association

        /// <summary>
        ///     Get initial view for account number association
        /// </summary>
        /// <returns></returns>
        public ActionResult AccountNumberAssociation()
        {
            var viewModel = new AccountNumberAssociationViewModel
            {
                SearchMode = "Search"
            };

            if (!SettingsManager.Settings.OmegaConfiguration.Features.AccountNumberAssociation.Enabled || !viewModel.User.CanView(OmegaFeatureAccessPermission.AccountNumberAssociation))
            {
                return View("FeatureNotAvailable");
            }
            
            return View("AccountNumberAssociation", viewModel);
        }


        /// <summary>
        ///     get a single member via their user id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetUserByUserId(string id)
        {
            var viewModel = new AccountNumberAssociationViewModel
            {
                SearchMode = "FoundSingle"
            };
            var _restClient = RestSharpClientFactory.CreateClient(ApplicationConfigHelper.Config.PsiServiceUrlBase);

            try
            {
                var memberPath = $"api/online-banking-user/member/v1/{id}";
                var memberRequest = RestClientRequestConstructor.GenerateGetRequest(memberPath);
                var memberResponse = _restClient.Execute(memberRequest);

                var user = JsonConvert.DeserializeObject<MemberInfoResponse>(memberResponse.Content);

                // we have a user. populate the object for the ui:
                var userData = new OnlineBankingUser
                {
                    Username = user.AccountNumberAlias,
                    AccountNumber = user.AccountNumber,
                    UUID = user.Uuid
                };

                // for this user, try to see if their are history items in the db:
                var path = $"api/account-number-reassignment/account-number-history/{user.Uuid}/v1";
                var request = RestClientRequestConstructor.GenerateGetRequest(path);
                var response = _restClient.Execute(request);

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var res = JsonConvert.DeserializeObject<AccountNumberHistoryResponse>(response.Content);
                    userData.History = res.AccountNumberHistories;
                }

                // if no member found:
                if (userData == null) return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));

                var json = JsonConvert.SerializeObject(userData, Formatting.Indented);
                return Content(json, "text/json");
            }
            catch (Exception ex)
            {
                Logger.Trace("Error: OnlineBankingUsersController account-number-history. The error was: " + ex);
            }

            return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));
        }


        /// <summary>
        ///     get a member(s) via their account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public ActionResult GetUserByaccountNumber(string account)
        {
            var viewModel = new AccountNumberAssociationViewModel
            {
                SearchMode = "FoundMultiple"
            };

            var _restClient = RestSharpClientFactory.CreateClient(ApplicationConfigHelper.Config.PsiServiceUrlBase);

            // attempt to get all the users that use this account number:
            try
            {
                var memberPath = $"api/online-banking-user/members/v1?accountNumber={account}";
                var memberRequest = RestClientRequestConstructor.GenerateGetRequest(memberPath);
                var memberResponse = _restClient.Execute(memberRequest);

                var onlineBankingUsers = JsonConvert.DeserializeObject<OnlineBankingUsersResponse>(memberResponse.Content);
                var users = onlineBankingUsers.Members.ToArray();
                var userData = new List<OnlineBankingUser>();

                // we have one user. set it into the array and see if there is any history:
                if (users.Length == 1)
                {
                    var user = new OnlineBankingUser
                    {
                        Username = users[0].AccountNumberAlias,
                        AccountNumber = users[0].AccountNumber,
                        UUID = users[0].Uuid
                    };

                    // since we have a single user, try to see if their are history items in the db:
                    var path = $"api/account-number-reassignment/account-number-history/{users[0].Uuid}/v1";
                    var request = RestClientRequestConstructor.GenerateGetRequest(path);
                    var response = _restClient.Execute(request);

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        var res = JsonConvert.DeserializeObject<AccountNumberHistoryResponse>(response.Content);
                        user.History = res.AccountNumberHistories;
                    }

                    userData.Add(user);

                    // we have multiple users. Add them all to the array so the ui can show a grid to choose from:
                }
                else if (users.Length > 1)
                {
                    foreach (var item in users)
                    {
                        var newUser = new OnlineBankingUser
                        {
                            Username = item.AccountNumberAlias,
                            AccountNumber = item.AccountNumber,
                            UUID = item.Uuid
                        };

                        userData.Add(newUser);
                    }
                }

                // no member found or is empty at first position:
                if (userData == null || userData.Count == 0)
                    return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));
                if ((userData.Count == 1) && (userData.First() == null)) return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));

                // we have user(s). return them to the view:
                var json = JsonConvert.SerializeObject(userData, Formatting.Indented);
                return Content(json, "text/json");
            }
            catch (Exception ex)
            {
                Logger.Trace("Error: OnlineBankingUsersController GetUserByaccountNumber(). The error was: " + ex);
            }

            return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));
        }


        /// <summary>
        ///     Set an account association
        /// </summary>
        /// <param name="account"></param>
        /// <param name="uuid"></param>
        /// <returns></returns>
        public ActionResult SetOldAccountNumber(string oldAccount, string currAccount, string id)
        {
            if (!SettingsManager.Settings.OmegaConfiguration.Features.AccountNumberAssociation.Enabled)
            {
                return Content(JsonConvert.SerializeObject("not_enabled", Formatting.Indented));
            }

            var oldAccountNumber = Convert.ToInt32(oldAccount);
            var currentAccountNumber = Convert.ToInt32(currAccount);
            var uuid = Convert.ToInt64(id);

            var viewModel = new AccountNumberAssociationViewModel
            {
                SearchMode = "Post"
            };

            var _restClient = RestSharpClientFactory.CreateClient(ApplicationConfigHelper.Config.PsiServiceUrlBase);

            try
            {
                var requestData = new AccountNumberHistoryUpdateRequest
                {
                    OldAccountNumber = oldAccountNumber,
                    NewAccountNumber = currentAccountNumber,
                    Uuid = uuid
                };

                var request = RestClientRequestConstructor.GeneratePostRequest("api/account-number-reassignment/account-number-history/v1");
                request.AddObject(requestData);
                var response = _restClient.Execute(request);

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return Content(response.Content, "text/json");
                }

                Logger.Trace("Error: OnlineBankingUsersController SetOldAccountNumber(). The error was: " + response.Content);
                return Content(response.Content, "text/json");
            }
            catch (Exception ex)
            {
                Logger.Trace("Error: OnlineBankingUsersController SetOldAccountNumber(). The error was: " + ex);
                return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));
            }
        }

        #endregion
    }
}