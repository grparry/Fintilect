using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using Omega.Presentation.Mvc.Models.RestrictedWords;
using Psi.Data.Models.ClientConfigurationModels;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    // Do not cache the contents of this page
    [OutputCache(Duration = 0)]
    public class RestrictedWordsController : OmegaBaseController
    {

        // GET: RestrictedWords
        public ActionResult Index()
        {
            var model = new RestrictedWordsViewModel();
          
            // Make sure the user is authorized to be here. the model is needed for this check.
            if (!SettingsManager.Settings.CanRun(Feature.RestrictedWords) || !model.User.CanView(OmegaFeatureAccessPermission.RestrictedWords))
            {
                return View("FeatureNotAvailable");
            }

            // retrieve RestrictedWordsList setting without CACHE so it is new each load:
            var restrictedWords = SettingsManager.Settings.GetClientConfigurations(true)
                    .Where(x => x.IsInternalOnly)
                    .Select(x => new ApplicationConfiguration(x)).ToList()
                    .FirstOrDefault(x => x.Key.Equals("RestrictedWords.RestrictedWordList", StringComparison.InvariantCultureIgnoreCase));

            // Add RestrictedWords as a list<string> to the model:
            model.RestrictedWordsList = Util.DecryptSettingValue(restrictedWords.Value).Split(',').ToList();

            return View(model);
        }

        // Add new word to restricted words list. This comes from filling out a word in the text field in the view.
        [HttpPut]
        public ActionResult SubmitRestrictedWord(RestrictedWordRequestObject data)
        {
            try
            {
                // Set up the restricted word string after adding the new word to the list:
                var restrictedWordsList = Util.DecryptSettingValue(SettingsManager.Settings.RestrictedWords.RestrictedWordListEncrypted).Split(',').ToList();
                restrictedWordsList.Add(data.RestrictedWord);
                restrictedWordsList.Sort();
                var restrictedWordListString = string.Join(",", restrictedWordsList.ToArray());
                var encryptedValue = Util.EncryptSettingValue(restrictedWordListString);

                // Save the value to the config setting:
                var setting = SettingsManager.Settings.GetClientConfigurations().First(x => x.Key.Equals("RestrictedWords.RestrictedWordList", StringComparison.InvariantCultureIgnoreCase));
                var repo = new StringResourceRepository(Util.GetUser());
                repo.SaveApplicationConfigurationValue(setting.Key, encryptedValue, setting.X_Application, setting.X_ItemName);

                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Logger.Error($"RestrictedWordsController => SubmitRestrictedWord(); There was an error: {ex.ToString()}");
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }

        // Delete a word from the RestrictedWordsListEncrypted config. This comes from a trash can icon click.
        [HttpDelete]
        public ActionResult DeleteRestrictedWord(RestrictedWordRequestObject data)
        {
            try
            {
                if (data.RestrictedWord.Length > 0)
                {
                    // Set up the restricted word string:
                    var restrictedWordsList = Util.DecryptSettingValue(SettingsManager.Settings.RestrictedWords.RestrictedWordListEncrypted).Split(',').ToList();
                    restrictedWordsList.Remove(data.RestrictedWord);
                    var restrictedWordListString = string.Join(",", restrictedWordsList.ToArray());
                    var encryptedValue = Util.EncryptSettingValue(restrictedWordListString);

                    // Save the value to the config setting:
                    var setting = SettingsManager.Settings.GetClientConfigurations().First(x => x.Key.Equals("RestrictedWords.RestrictedWordList", StringComparison.InvariantCultureIgnoreCase));
                    var repo = new StringResourceRepository(Util.GetUser());
                    repo.SaveApplicationConfigurationValue(setting.Key, encryptedValue, setting.X_Application, setting.X_ItemName);

                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                } 
                else
                {
                    Logger.Trace("RestrictedWordsController => DeleteRestrictedWord(); No word was provided to delete.");
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                Logger.Error($"RestrictedWordsController => DeleteRestrictedWord(); There was an error: {ex.ToString()}");
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }
    }
}