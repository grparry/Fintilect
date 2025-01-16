using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using NLog;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models;
using Omega.Presentation.Mvc.Models.Authentication;
using Omega.Presentation.Mvc.Models.ManageUsers;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;
using Psi.ServiceHost.Client.Implementation;
using Psi.ServiceHost.Client.Implementation.Utilities;

namespace Omega.Presentation.Mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly OmegaUserPermissionGroupRepository _omegaUserPermissionGroupRepository;

        public enum Theme
        {
            Dark,
            Light,
            White
        }

        private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        public HomeController()
        {
            _omegaUserPermissionGroupRepository = new OmegaUserPermissionGroupRepository();
        }

        public Theme GetCurrentTheme()
        {
            if (Session["Theme"].ToString() == Theme.Light.ToString())
                return Theme.Light;

            if (Session["Theme"].ToString() == Theme.White.ToString())
                return Theme.White;

            return Theme.Dark;
        }

        public ActionResult Index()
        {
            var repo = new StringResourceRepository(Util.GetUser());
            var stringMessages = repo.GetResources("OmegaMessaging");

            var model = new HomePageModel { stringResources = stringMessages };

            return View(model);
        }

        [AllowAnonymous]
        public PartialViewResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return PartialView(new LoginViewModel());
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = Util.LoginUser(model.Email, model.Password);
            if (user.IsLockedOut)
                return RedirectToAction("ForgotPassword");

            if (user.PasswordChangeRequired)
                return RedirectToAction("ForceChangePassword", new { email = model.Email });

            return string.IsNullOrEmpty(returnUrl)
                ? RedirectToAction("Index", "Home")
                : RedirectToRoute(returnUrl);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult LogOff()
        {
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View(new ForgotPasswordViewModel());
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = Util.ForgotPassword(model.Email);

                var confirmationModel = new ForgotPasswordConfirmationViewModel { Deleted = user.Deleted.HasValue && user.Deleted.Value };

                return RedirectToAction("ForgotPasswordConfirmation", "Home", confirmationModel);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation(bool deleted)
        {
            return View(new ForgotPasswordConfirmationViewModel { Deleted = deleted });
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult ResetPassword(Guid? id)
        {
            if (!id.HasValue)
            {
                return RedirectToAction("Index", "Home");
            }

            var email = Util.GetEmailFromToken(id.Value);
            if (email == null)
            {
                return RedirectToAction("Index", "Home");
            }

            var model = new ResetPasswordViewModel { Email = email, PasswordIsValid = true }; // we reach this from a link sent in an email. There is no pw yet, so set this to true so we can view the page
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = Util.ResetPassword(model.Email, model.Password);

            if (!user.PasswordIsValid)
            {
                model.PasswordIsValid = false;
                return View(model);
            }

            return RedirectToAction("ResetPasswordConfirmation", "Home");
        }

        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult ChangePassword()
        {
            var model = new ChangePasswordViewModel();
            model.Email = model.User.Email;

            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult ForceChangePassword(string email)
        {
            var model = new ChangePasswordViewModel { Email = email };

            return View("ChangePassword", model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            if (!Util.ChangePassword(model.Email, model.CurrentPassword, model.NewPassword))
            {
                model.PasswordIsValid = false;
                return View(model);
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public ActionResult AddNewUser()
        {
            var model = new AddNewUserViewModel();

            if (!model.User.CanView(OmegaFeatureAccessPermission.EditOmegaUsers))
            {
                return View("FeatureNotAvailable");
            }

            ViewBag.PermissionLevelList = GetPermissionLevelList((int)model.User.PermissionLevel);
            ViewBag.PermissionGroupList = GetPermissionGroupList((int)model.User.PermissionLevel, "none");
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> AddNewUser(AddNewUserViewModel model)
        {
            if (!ModelState.IsValid) return RedirectToAction("EditUserPermissions", "Home");

            var user = Util.AddNewUser(model.Email, model.PermissionLevel, model.Name, model.User.Name);

            if (user != null)
            {
                // Set the user's permission group:
                if (model.SelectedPermissionGroup != "none")
                {
                    int permissionId;

                    if (int.TryParse(model.SelectedPermissionGroup, out permissionId))
                    {
                        Guid? publicId = user.PublicId != null ? user.PublicId : Guid.NewGuid();
                        _omegaUserPermissionGroupRepository.SetPermissionGroupForOmegaUser(permissionId, publicId.Value, model.User.Name);
                    }
                }
            }
             
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public ActionResult EditUserPermissions()
        {
            var model = new EditUserPermissionsViewModel
            {
                Users = Util.GetUsers(),
                UserToEdit = new OmegaUser()
            };

            if (!model.User.CanView(OmegaFeatureAccessPermission.ViewOmegaUsers))
            {
                return View("FeatureNotAvailable");
            }

            ViewBag.Button = "Get User";
            ViewBag.PermissionLevelList = GetPermissionLevelList((int)model.User.PermissionLevel);

            var emailList = new List<SelectListItem>
            {
                new SelectListItem { Text = "", Value = "" }
            };

            emailList.AddRange(model.Users.Select(x => new SelectListItem { Text = x.Email, Value = x.Email }));

            ViewBag.EmailList = new SelectList(emailList, "Text", "Value", 0);

            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> EditUserPermissions(EditUserPermissionsViewModel model, string button)
        {
            if (!ModelState.IsValid) return RedirectToAction("EditUserPermissions", "Home");

            switch (button)
            {
                case "Update":
                case "Reactivate User":
                case "Delete User":
                    // Update the user's permission group:
                    if (model.UserToEdit.SelectedPermissionGroup != "none")
                    {
                        int permissionId;

                        if (int.TryParse(model.UserToEdit.SelectedPermissionGroup, out permissionId))
                        {
                            Guid? publicId = model.UserToEdit.PublicId != null ? model.UserToEdit.PublicId : Guid.NewGuid();
                            _omegaUserPermissionGroupRepository.SetPermissionGroupForOmegaUser(permissionId, publicId.Value, model.User.Name);
                        }                        
                    }

                    model.UserToEdit = Util.EditUserPermissions(model.UserToEdit, button, model.User.Name);
                    ViewBag.Button = "Get User";
                    break;
                case "Get User":
                    model.UserToEdit = Util.GetOmegaUserDetails(model.UserToEdit.Email);
                    ViewBag.Button = "Update";
                    break;
                default:
                    return RedirectToAction("EditUserPermissions", "Home");
            }

            var permissionLevel = model.User.PermissionLevel >= model.UserToEdit.PermissionLevel ? model.User.PermissionLevel : model.UserToEdit.PermissionLevel;
            ViewBag.PermissionLevelList = GetPermissionLevelList((int)permissionLevel, model.UserToEdit.PermissionLevel);

            string permissionGroupValue = "none";

            // if the edit user has a permission group, use it to set the drop-down instead:
            if (model.UserToEdit.PermissionGroup != null && model.UserToEdit.PermissionGroup.Id > 0)
            {
                permissionGroupValue = model.UserToEdit.PermissionGroup.Id.ToString();
            }

            ViewBag.PermissionGroupList = GetPermissionGroupList((int)model.User.PermissionLevel, permissionGroupValue);

            model.Users = Util.GetUsers();

            var emailList = new List<SelectListItem>
            {
                new SelectListItem { Text = "", Value = "" }
            };

            emailList.AddRange(model.Users.Select(x => new SelectListItem { Text = x.Email, Value = x.Email }));

            ViewBag.EmailList = new SelectList(emailList, "Text", "Value", model.UserToEdit.Email);

            ViewBag.EditPermissionLevelEnabled = model.User.PermissionLevel >= model.UserToEdit.PermissionLevel ? "enabled" : "disabled";

            return View(model);
        }

        public string ResetConfig()
        {
            try
            {
                var _restClient = RestSharpClientFactory.CreateClient(ApplicationConfigHelper.Config.PsiServiceUrlBase);
                var apiPath = $"api/config/reset/v1";
                var serviceHostRequest = RestClientRequestConstructor.GenerateGetRequest(apiPath);
                var serviceHostResponse = _restClient.Execute(serviceHostRequest);

                var url = SettingsManager.Settings.OmegaConfiguration.HomeBankingResetConfigUrl;
                var request = WebRequest.Create(url);
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    var configsReset = (response.StatusCode == HttpStatusCode.OK && serviceHostResponse.StatusCode == HttpStatusCode.OK);
                    return configsReset ? $"Config reset at {DateTime.UtcNow.ToLocal()}" : $"Error resetting config. Status: {response.StatusCode}";
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return $"Sorry - unable to reset config at this time. \r\n{ex}";
            }
        }

        public ActionResult ChangeTheme(string theme)
        {
            if (theme.EqualsIgnoreCase(Theme.Light.ToString()))
                Session["Theme"] = Theme.Light.ToString();
            else if (theme.EqualsIgnoreCase(Theme.White.ToString()))
                Session["Theme"] = Theme.White.ToString();
            else if (theme.EqualsIgnoreCase(Theme.Dark.ToString()))
                Session["Theme"] = Theme.Dark.ToString();

            return RedirectToAction("Index", "Home");
        }

        public ActionResult FeatureNotAvailable()
        {
            return View("FeatureNotAvailable");
        }

        public void KeepAlive()
        {
            //keep the session variable alive
        }


        // Private methods
        // Get permission levels
        private static SelectList GetPermissionLevelList(int permissionLevel, PermissionLevel userPermissionLevel = PermissionLevel.Basic)
        {
            var levelList = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>(PermissionLevel.Basic.EnumIntToString(), PermissionLevel.Basic.ToString())
            };

            if (permissionLevel >= (int)PermissionLevel.Owner)
            {
                levelList.Add(new KeyValuePair<string, string>(PermissionLevel.Owner.EnumIntToString(), PermissionLevel.Owner.ToString()));
            }

            if (permissionLevel >= (int)PermissionLevel.Support)
            {
                levelList.Add(new KeyValuePair<string, string>(PermissionLevel.Support.EnumIntToString(), PermissionLevel.Support.ToString()));
            }

            if (permissionLevel >= (int)PermissionLevel.Dev)
            {
                levelList.Add(new KeyValuePair<string, string>(PermissionLevel.Dev.EnumIntToString(), PermissionLevel.Dev.ToString()));
            }

            if (permissionLevel >= (int)PermissionLevel.SuperUser)
            {
                levelList.Add(new KeyValuePair<string, string>(PermissionLevel.SuperUser.EnumIntToString(), PermissionLevel.SuperUser.ToString()));
            }

            return new SelectList(levelList, "Key", "Value", userPermissionLevel.EnumIntToString());
        }

        // Get the permission groups:
        private SelectList GetPermissionGroupList(int permissionLevel, string permissionGroupValue)
        {
            var permissionGroupList = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("none", "-- Select --")
            };

            if (permissionLevel >= (int)PermissionLevel.Owner)
            {
                var permissionGroups = _omegaUserPermissionGroupRepository.GetPermissionGroups();

                foreach (OmegaUserPermissionGroup group in permissionGroups)
                {
                    permissionGroupList.Add(new KeyValuePair<string, string>(group.Id.ToString(), group.Name));
                }
            }

            return new SelectList(permissionGroupList, "Key", "Value", permissionGroupValue);
        }
    }
}