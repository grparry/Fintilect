using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using NLog;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.BillPayManagement;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class BillPayManagementController : OmegaBaseController
    {
        private readonly BillPayRepository _billPayRepository;

        public BillPayManagementController()
        {
            _billPayRepository = new BillPayRepository();
        }

        public ActionResult Index()
        {
            var viewModel = new BillPayRemoveViewModel
            {
                SearchMode = "Search"
            };

            if (!SettingsManager.Settings.OmegaConfiguration.Features.DeleteBillPayUsersEnabled)
            {
                return View("FeatureNotAvailable");
            }

            return View("BillPayRemoval", viewModel);
        }

        /// <summary>
        /// Get a member(s) via their account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public ActionResult GetUserByaccountNumber(string account)
        {
            var viewModel = new BillPayRemoveViewModel
            {
                SearchMode = "FoundSubscriber"
            };

            // attempt to get all the users that use this account number:
            try
            {
                var billPayUsers = _billPayRepository.GetBillPaySubscribers(Convert.ToInt32(account));
                var users = billPayUsers.Subscribers.ToArray();
                var userData = new List<RemoveUserModel>();

                // we have one user. set it into the array and see if there is any history:
                if (users.Length == 1)
                {
                    var user = new RemoveUserModel
                    {
                        Username = $"{users[0].FirstName} {users[0].LastName}",
                        AccountNumber = users[0].Account,
                        UUID = users[0].Uuid,
                        MemberAddress = users[0].Address,
                        Micr = users[0].MicrNumber
                    };

                    userData.Add(user);
                }
                else if (users.Length > 1) // we have multiple users. Add them all to the array so the ui can show a grid to choose from
                {
                    foreach (var item in users)
                    {
                        var newUser = new RemoveUserModel
                        {
                            Username = $"{item.FirstName} {item.LastName}",
                            AccountNumber = item.Account,
                            UUID = item.Uuid
                        };

                        userData.Add(newUser);
                    }
                }

                // no member found or is empty at first position:
                if (userData == null || userData.Count == 0)
                {
                    return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));
                }

                if ((userData.Count == 1) && (userData.First() == null)) return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));

                // we have user(s). return them to the view:
                var json = JsonConvert.SerializeObject(userData, Formatting.Indented);
                return Content(json, "text/json");
            }
            catch (Exception ex)
            {
                Logger.Trace("Error: BillPayManagementController GetUserByaccountNumber(). The error was: " + ex);
            }

            return Content(JsonConvert.SerializeObject("failure", Formatting.Indented));
        }

        /// <summary>
        ///  Remove a Bill Pay User
        /// </summary>
        /// <param name="account"></param>
        /// <param name="uuid"></param>
        /// <returns></returns>
        public ActionResult DeleteBillPayRecord(string account, string id)
        {
            var viewModel = new BillPayRemoveViewModel
            {
                SearchMode = "Post"
            };

            var success = _billPayRepository.DeleteBillPaySubscriber(Convert.ToInt32(account));

            if (success)
            {
                return Content("success", "text/html");
            }

            return Content("failure", "text/html");
        }
    }
}