using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.LayeredSecurity;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class LayeredSecurityController : OmegaBaseController
    {
        private const string ApplicationKey = "Mobile";

        public ActionResult Index(Feature feature, FeatureAction featureAction)
        {
            var tempDataFeatureAndAction = TempData["FeatureAndAction"];
            if (tempDataFeatureAndAction is string json)
            {
                FeatureAndAction featureAndAction = JsonConvert.DeserializeObject<FeatureAndAction>(json.ToString());
                feature = featureAndAction.FeatureAndActionFeature;
                featureAction = featureAndAction.FeatureAndActionFeatureAction;
            }


            var model = new LayeredSecurityViewModel
            {
                Features = Util.GetFeatures(ApplicationKey),
                Feature = feature?.FeatureId == 0 ? null : feature,
                FeatureAction = featureAction.ActionId == 0 ? null : featureAction
            };

            if (!model.User.PermissionLevel.CanView(PermissionLevel.Support))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        [HttpGet]
        public ActionResult AddUpdateFeature(Feature feature)
        {
            var model = new LayeredSecurityViewModel
            {
                Features = Util.GetFeatures(ApplicationKey),
                Feature = feature
            };

            return PartialView("AddUpdateFeature", model);
        }

        [HttpPost]
        public async Task<ActionResult> AddUpdateFeature(LayeredSecurityViewModel model)
        {
            if (!ModelState.IsValid)
            {
                //TODO: Error handling
                return RedirectToAction("Index");
            }
            model.Feature.ApplicationId = model.Features.FirstOrDefault()?.ApplicationId ?? 1;
            model.Feature.IsUserFacing = Util.FormatIsUserFacing(model.Feature.IsUserFacing);

            if (model.Feature.FeatureId == 0)
            {
                Util.AddFeature(model.Feature);
            }
            else
            {
                Util.UpdateFeature(model.Feature);
            }

            //TODO: Error handling
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteFeature(Feature feature)
        {
            if (feature.FeatureId != 0)
            {
                Util.DeleteFeature(feature);
                //TODO: error handling
            }
            return RedirectToAction("Index");
        }

        public ActionResult Feature(Feature feature)
        {
            var model = new LayeredSecurityFeaturesViewModel
            {
                Feature = feature,
                FeatureActions = Util.GetActions(feature.FeatureId)
            };
            return PartialView("Feature", model);
        }

        [HttpGet]
        public ActionResult AddUpdateAction(Feature feature, FeatureAction featureAction)
        {
            var model = new LayeredSecurityFeaturesViewModel
            {
                Feature = feature,
                FeatureAction = featureAction
            };

            return PartialView("AddUpdateAction", model);
        }

        [HttpPost]
        public async Task<ActionResult> AddUpdateAction(LayeredSecurityFeaturesViewModel model)
        {
            if (!ModelState.IsValid)
            {
                //TODO: Error handling
                return RedirectToAction("Index");
            }

            model.FeatureAction.FeatureId = model.Feature.FeatureId;

            if (model.FeatureAction.ActionId == 0)
            {
                var newAction = Util.AddNewFeatureAction(model.FeatureAction);
            }
            else
            {
                var updatedAction = Util.UpdateFeatureAction(model.FeatureAction);
            }

            //TODO: Error handling
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult DeleteAction(FeatureAction featureAction)
        {
            if (featureAction.PublicId.IsNotEmpty())
            {
                Util.DeleteAction(featureAction);
                //TODO: error handling / reload the feature
            }

            return RedirectToAction("Index");
        }

        public PartialViewResult Action(Feature feature, FeatureAction featureAction)
        {
            var model = new LayeredSecurityActionsViewModel
            {
                Feature = feature,
                FeatureAction = featureAction,
                AuthenticationRules = Util.GetAuthenticationRules(featureAction.ActionId),
                AuthenticationMethods = Util.GetAuthenticationMethods(SettingsManager.Settings.OmegaConfiguration.Features.LayeredSecurityExcludePasswordRule)
            };

            model.FeatureAction.FeatureId = model.Feature.FeatureId;

            model.AuthenticationRules = model.AuthenticationRules.OrderBy(x => x.Priority).ToList();

            return PartialView("Action", model);
        }

        [HttpPost]
        public async Task<ActionResult> Action(LayeredSecurityActionsViewModel model)
        {
            var indexModel = new LayeredSecurityViewModel
            {
                Features = Util.GetFeatures(ApplicationKey),
                Feature = model.Feature,
                FeatureAction = model.FeatureAction
            };

            if (!ModelState.IsValid)
            {
                //TODO: Error handling
                //the call to the function UpdateRulePriority also calls this function. Adding the model here will reload the action view.
                return View("Index", indexModel);
            }

            model.FeatureAction.FeatureId = model.Feature.FeatureId;
            var updatedAction = Util.UpdateFeatureAction(model.FeatureAction);

            //if (updatedAction.PublicId.IsEmpty()) ViewBag.Message = "Action to update not found.";
            //TODO: Error handling

            return View("Index", indexModel);
        }

        [HttpGet]
        public ActionResult AddUpdateMethod(AuthenticationMethod authenticationMethod)
        {
            var model = new AuthenticationMethodViewModel
            {
                AuthenticationMethods = Util.GetAuthenticationMethods(),
                AuthenticationMethod = authenticationMethod
            };

            return PartialView("AddUpdateAuthenticationMethod", model);
        }

        [HttpGet]
        public ActionResult DeleteMethod(AuthenticationMethod authenticationMethod)
        {
            if (authenticationMethod.PublicId.IsNotEmpty())
            {
                Util.DeleteMethod(authenticationMethod);
                //TODO: error handling
            }
            return RedirectToAction("AuthenticationMethod");
        }

        public ActionResult AuthenticationMethod(AuthenticationMethod authenticationMethod)
        {
            var model = new AuthenticationMethodViewModel
            {
                AuthenticationMethods = Util.GetAuthenticationMethods(),
                AuthenticationMethod = authenticationMethod
            };

            return View("AuthenticationMethod", model);
        }

        [HttpPost]
        public async Task<ActionResult> AuthenticationMethod(AuthenticationMethodViewModel model)
        {
            if (!ModelState.IsValid)
            {
                //TODO: Error handling
                return RedirectToAction("AuthenticationMethod");
            }

            if (model.AuthenticationMethod.Id == 0)
            {
                var newMethod = Util.AddAuthenticationMethod(model.AuthenticationMethod);
            }
            else
            {
                var updatedMethod = Util.UpdateAuthenticationMethod(model.AuthenticationMethod);
            }

            //if (!updatedAuthenticationMethod.PublicId.IsEmpty()) ViewBag.Message = "Method to update not found.";
            //TODO: Error handling
            return RedirectToAction("AuthenticationMethod");
        }

        [HttpGet]
        public ActionResult DeleteRule(AuthenticationRule authenticationRule)
        {
            if (authenticationRule.PublicId.IsNotEmpty())
            {
                Util.DeleteAuthenticationRule(authenticationRule);
                //TODO: error handling / reload the action
            }

            var feature = Util.GetFeatures(ApplicationKey).FirstOrDefault(x => x.FeatureId == authenticationRule.FeatureId);
            var featureAction = Util.GetActions(authenticationRule.FeatureId).FirstOrDefault(x => x.ActionId == authenticationRule.ActionId);
            var featureAndAction = new FeatureAndAction
            {
                FeatureAndActionFeature = feature,
                FeatureAndActionFeatureAction = featureAction
            };

            TempData["FeatureAndAction"] = JsonConvert.SerializeObject(featureAndAction); 
            return RedirectToAction("Index");
        }

        public PartialViewResult AuthenticationRule(FeatureAction featureAction, AuthenticationRule authenticationRule)
        {
            var model = new AuthenticationRuleViewModel
            {
                FeatureAction = featureAction,
                AuthenticationRule = authenticationRule,
                AuthenticationMethods = Util.GetAuthenticationMethods(SettingsManager.Settings.OmegaConfiguration.Features.LayeredSecurityExcludePasswordRule),
                NewRule = authenticationRule.PublicId.IsEmpty() // true if a new rule, false if updating/viewing a rule
            };

            var maximumRequiredMethods = SettingsManager.Settings.OmegaConfiguration.Features.LayeredSecurityMaximumRequiredMethods;

            var requiredMethodsList = new List<SelectListItem> { new SelectListItem { Value = "1", Text = "1" } };
            if (maximumRequiredMethods > 1) { requiredMethodsList.Add(new SelectListItem { Value = "2", Text = "2" }); }
            if (maximumRequiredMethods > 2) { requiredMethodsList.Add(new SelectListItem { Value = "3", Text = "3" }); }

            ViewBag.RequiredMethodsList = requiredMethodsList;

            return PartialView("AuthenticationRule", model);
        }

        [HttpPost]
        public async Task<ActionResult> AuthenticationRule(AuthenticationRuleViewModel model, FormCollection collection)
        {
            if (!ModelState.IsValid)
            {
                //TODO: Error handling
                return RedirectToAction("Index");
            }

            model.AuthenticationMethods = Util.GetAuthenticationMethods(SettingsManager.Settings.OmegaConfiguration.Features.LayeredSecurityExcludePasswordRule); // get the authentication methods

            // Get the AuthenticationMethods for the rule:
            var allKeys = "";

            if (Request.Form.HasKeys())
            {
                foreach (String key in Request.Form.Keys)
                {
                    if (key.Contains("checkbox_auth_"))
                    {
                        allKeys += key.Substring(14) + ",";
                    }
                }
            }

            model.AuthenticationRule.AuthenticationMethods = allKeys.TrimEnd(',');
            model.AuthenticationRule.TotalWeight = 0; //clear total weight so it can be properly set
            model.AuthenticationRule.ActionId = model.FeatureAction.ActionId;

            var authenticationMethodIds = model.AuthenticationRule.AuthenticationMethods.Split(',').ToList();
            foreach (var authenticationMethodId in authenticationMethodIds)
            {
                var method = model.AuthenticationMethods.Select(x => new AuthenticationMethod
                { Id = x.Id, PublicId = x.PublicId, Name = x.Name, MinimumApplicationVersion = x.MinimumApplicationVersion, Description = x.Description, Weight = x.Weight })
                    .FirstOrDefault(x => x.Id == authenticationMethodId.ToInt());
                model.AuthenticationRule.TotalWeight += method?.Weight ?? 0;
            }

            if (model.AuthenticationRule.AuthenticationMethods.Split(',').ToList().Count < model.AuthenticationRule.NumberOfRequiredMethods)
            {
                //A rule can't require more methods to be checked than are available
                model.AuthenticationRule.NumberOfRequiredMethods = model.AuthenticationRule.AuthenticationMethods.Split(',').ToList().Count;
            }

            //If a rule is created that contains Token, no other methods can be added
            var tokenRule = model.AuthenticationMethods.Select(x => new AuthenticationMethod { PublicId = x.PublicId, Id = x.Id })
                        .FirstOrDefault(x => x.PublicId.ToString().Equals("21D6376C-854C-4A87-8980-F4773A2B1DA5", StringComparison.InvariantCultureIgnoreCase))
                        ?.Id.ToString() ?? "-1";

            if (model.AuthenticationRule.AuthenticationMethods.Contains(tokenRule))
            {
                model.AuthenticationRule.AuthenticationMethods = tokenRule;
                model.AuthenticationRule.NumberOfRequiredMethods = 1;
            }

            //The default rule (password) is created automatically. Don't allow a duplicate to be created.
            var defaultRule = model.AuthenticationMethods.Select(x => new AuthenticationMethod { PublicId = x.PublicId, Id = x.Id })
                        .FirstOrDefault(x => x.PublicId.ToString().Equals("2221C2CC-DA80-462C-9356-9DB3477AEB59", StringComparison.InvariantCultureIgnoreCase))
                        ?.Id.ToString();

            if (model.NewRule && model.AuthenticationRule.AuthenticationMethods != defaultRule)
            {
                var newAuthenticationRule = Util.AddAuthenticationRule(model.AuthenticationRule);
                //if (newAuthenticationRule.PublicId.IsEmpty()) ViewBag.Message = "Couldn't create a new rule.";
                //TODO: Error handling
            }
            else if (model.AuthenticationRule.AuthenticationMethods != defaultRule)
            {
                var updatedAuthenticationRule = Util.UpdateAuthenticationRule(model.AuthenticationRule);
                //if (updatedAuthenticationRule.PublicId.IsEmpty()) ViewBag.Message = "Rule to update not found.";
                //TODO: Error handling
            }

            var feature = Util.GetFeatures(ApplicationKey).FirstOrDefault(x => x.FeatureId == model.FeatureAction.FeatureId);
            var featureAction = Util.GetActions(model.FeatureAction.FeatureId).FirstOrDefault(x => x.ActionId == model.FeatureAction.ActionId);
            var featureAndAction = new FeatureAndAction
            {
                FeatureAndActionFeature = feature,
                FeatureAndActionFeatureAction = featureAction
            };

            TempData["FeatureAndAction"] = JsonConvert.SerializeObject(featureAndAction); 
            return RedirectToAction("Index");
        }

        public bool UpdateRulePriority(string[] ruleIds)
        {
            var ids = ruleIds.ToList();
            var actionId = ids.LastOrDefault(); //the actionId was added to the array last.
            var authenticationRules = Util.GetAuthenticationRules(actionId.ToInt());
            var updatedRules = new List<AuthenticationRule>();
            for (var i = 0; i < ids.Count - 1; i++)
            {
                var rule = authenticationRules.Select(x => new AuthenticationRule { ActionId = x.ActionId, Id = x.Id, PublicId = x.PublicId, Priority = x.Priority, AuthenticationMethods = x.AuthenticationMethods, NumberOfRequiredMethods = x.NumberOfRequiredMethods, TotalWeight = x.TotalWeight }).First(x => x.Id == ids[i].ToInt());
                rule.Priority = i + 1;
                updatedRules.Add(rule);
            }

            var result = Util.SaveAuthenticationRulePriority(updatedRules);

            return result.Count > 0;
        }
    }
}