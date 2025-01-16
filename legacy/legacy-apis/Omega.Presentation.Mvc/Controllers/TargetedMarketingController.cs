using Newtonsoft.Json;
using NLog;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.FeaturesManager;
using Omega.Presentation.Mvc.Models.TargetedMarketing;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.OnlineBankingUserInfo;
using PSI.Models.ClientConfigurationModels.Agatha;
using RestSharp;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using Psi.Data.Models.Domain.OmegaUsers;


namespace Omega.Presentation.Mvc.Controllers
{
    public class TargetedMarketingController : OmegaBaseController
    {
        
        private readonly TargetetMarketingRepository _targetedMarketingRepo = new TargetetMarketingRepository();
        
        // Get ALL promotions for this client.
        public ActionResult Index()
        {
            var model = new TargetedMarketingModel();
            if (!model.User.CanView(OmegaFeatureAccessPermission.TargetedMarketing))
            {
                return View("FeatureNotAvailable");
            }

            ViewBag.BaseModel = model;  // for user authentication

            var promotionList = _targetedMarketingRepo.GetAllPromotions();

            return View("index", promotionList);
        }

        // Get a SINGLE promotion to update ---- this appears in a MODAL
        public ActionResult ManagePromotion(int id, string mode)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            ViewBag.Mode = mode;
            var promo = new Promotion();

            if (mode == "update")
            {
                promo = _targetedMarketingRepo.GetSinglePromotion(id);
            }
            else if (mode == "create")
            {
                promo.PromotionId = 0;
                promo.StartDate = DateTime.Now;
            }

            return PartialView("_PromoDetailModal", promo);
        }

        // Save changes to an existing promotion
        public ActionResult UpdatePromotion(Promotion promo)
        {
            if (!ModelState.IsValid) return Content("error", "text/html");

            var result = _targetedMarketingRepo.UpdateExistingPromotion(promo);

            if (result.ToLower() == "success")
            {
                return Content("success", "text/html");
            }

            return Content("error", "text/html");
        }

        // Create a NEW promotion
        public ActionResult CreatePromotion(Promotion promo)
        {
            if (ModelState.IsValid)
            {
                var newPromo = _targetedMarketingRepo.CreateNewPromotion(promo);

                if (!string.IsNullOrEmpty(newPromo?.Name))
                {
                    return Content("success", "text/html");
                }

                return Content("error", "text/html");
            }

            return Content("error", "text/html");
        }

        // Delete an existing promotion
        public ActionResult DeletePromotion(int id)
        {
            var success = _targetedMarketingRepo.DeletePromotion(id);

            if (success)
            {
                return Content("success", "text/html");
            }

            return Content("error", "text/html");
        }

        public ActionResult ManagePromotionSlot(int id)
        {
            ViewBag.PromoSlotId = id;
            var result = _targetedMarketingRepo.GetPromoImagesForPromoSlot(id);

            var rotateInfo = _targetedMarketingRepo.GetRotationForSlot(id);

            if (rotateInfo != null && rotateInfo.Length > 0)
            {
                var rotateInfoArray = rotateInfo.Split('|');

                ViewBag.IsRotator = rotateInfoArray[0];
                ViewBag.NumberInRotation = rotateInfoArray[1];
            }
            else
            {
                ViewBag.IsRotator = "unknown";
                ViewBag.NumberInRotation = "unknown";
            }

            return PartialView("_ImagesView", result);
        }

        #region PromotionFilter
        public ActionResult ManageImages()
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            var result = _targetedMarketingRepo.GetAllImages();


            return View("ManageImages", result);
        }
        public ActionResult ManageImage(int id, string mode)
        {
            if (mode != "update" && mode != "create") throw new ArgumentException("mode");

            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            ViewBag.Mode = mode;
            var image = new Image();

            if (mode == "update")
            {
                image = _targetedMarketingRepo.GetSingleImage(id);
                image.FileContentBase64 = Convert.ToBase64String(image.FileContent);
            }

            return PartialView("_ImageDetailModal", image);
        }

        // Save changes to an existing Image
        public ActionResult UpdateImage(Image image)
        {
            if (Request.Form.HasKeys() && Request.Files.Count > 0)
            {
                var uploadedFile = Request.Files[0];

                // convert to Byte for saving in a db:
                if (uploadedFile != null && uploadedFile.ContentLength > 0)
                {
                    dynamic fileByte = new byte[uploadedFile.ContentLength];
                    uploadedFile.InputStream.Read(fileByte, 0, (uploadedFile.ContentLength - 1));
                    image.FileContent = fileByte;
                    image.MimeType = uploadedFile.ContentType;
                    image.FileName = uploadedFile.FileName;
                }
            }

            image.ImageURL = image.ImageId.ToString();
            var updatedExistingImage = _targetedMarketingRepo.UpdateExistingImage(image);

            if (!updatedExistingImage)
            {
                return Content("error", "text/html");
            }

            InvalidateCachedImage(image.ImageId);

            return Content("success", "text/html");
        }

        public void InvalidateCachedImage(int imageId)
        {
            try
            {
                var url = $"{SettingsManager.Settings.GetSettingValue("X.App.HomeBanking.gsAppURL").TrimEnd('/')}/api/promotion-images/invalidate-image/{imageId}";
                var request = WebRequest.Create(url);
                request.Method = "GET";
                request.GetResponse();
            }
            catch (Exception ex)
            {
                Logger.Error(ex, $"Could not invalidate cache for image id: {imageId}");
            }
        }

        // Create a NEW Image
        public ActionResult CreateImage(Image image)
        {
            if (Request.Form.HasKeys() && Request.Files.Count > 0)
            {
                var uploadedFile = Request.Files[0];

                // convert to Byte for saving in a db:
                if (uploadedFile != null && uploadedFile.ContentLength > 0)
                {
                    dynamic fileByte = new byte[uploadedFile.ContentLength];
                    uploadedFile.InputStream.Read(fileByte, 0, (uploadedFile.ContentLength - 1));
                    image.FileContent = fileByte;
                    image.MimeType = uploadedFile.ContentType;
                    image.FileName = uploadedFile.FileName;
                }
            }

            image.ImageURL = "0";
            var newImageSuccess = _targetedMarketingRepo.CreateNewImage(image);

            if (newImageSuccess)
            {
                {
                    return Content("success", "text/html");
                }

            }
            return Content("error", "text/html");
        }

        public ActionResult DeleteImage(int id)
        {
            if (id <= 0) throw new ArgumentNullException("Image Id");

            var success = _targetedMarketingRepo.DeleteImage(id);

            if (success)
            {
                return Content("success", "text/html");
            }

            return Content("error", "text/html");
        }

        // Get All Content Items  for Add List in Modal:
        public ActionResult ImagesView()
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            var result = _targetedMarketingRepo.GetAllImages().Select(x => new PromoImage(x)).ToList();

            return PartialView("_ImagesView", result);
        }
        #endregion

        #region AccountGroup
        // Get ALL Promotion Filters for this client
        public ActionResult ManagePromotionFilters()
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            var viewModel = new PromotionFiltersViewModel
            {
                AccountGroupList = _targetedMarketingRepo.GetAllAcountGroups()
            };

            return View("ManagePromotionFilters", viewModel);
        }

        // Get a SINGLE account Group to update
        public ActionResult ManageAccountGroup(int id, string mode)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            ViewBag.Mode = mode;
            var accountGroup = new Criteria_AccountNumberGroup();
            
            if (mode == "update")
            {
                accountGroup = _targetedMarketingRepo.GetSingleAccountGroup(id);

                // analyze account group mathces to see if there are none, one with "ALL" or many
                if ((accountGroup.AccountNumberList.Length == 0) || accountGroup.AccountNumberList.ToUpper() == "ALL")
                {
                    accountGroup.SelectedGroupKind = AccountGroupsKind.All;
                    accountGroup.AccountNumberList = "";
                }
                else
                {
                    accountGroup.SelectedGroupKind = AccountGroupsKind.List;
                }
            }
            else if (mode == "create")
            {
                accountGroup.AccountNumberGroupId = 0;
                accountGroup.SelectedGroupKind = AccountGroupsKind.All;
                accountGroup.AccountNumberList = "";
            }
            accountGroup.CanMapMemberNumberToEAgreementNumber = SettingsManager.Settings.TargetedMarketingSettings.CanMapMemberNumberToEAgreementNumber;

            return PartialView("_AccountGroupDetailModal", accountGroup);
        }

        // Save changes to an existing account group
        public ActionResult UpdateAccountGroup(Criteria_AccountNumberGroup accountGroup)
        {
            if (!ModelState.IsValid) return Content("error", "text/html");

            if (accountGroup.SelectedGroupKind == AccountGroupsKind.All)
            {
                accountGroup.AccountNumberList = "ALL";
            }

            accountGroup.AccountNumberList = accountGroup.AccountNumberList.Replace(" ", "");

            if (SettingsManager.Settings.TargetedMarketingSettings.CanMapMemberNumberToEAgreementNumber && accountGroup.ShouldMapMemberNumbersToEAgreementNumbers)
            {
                accountGroup.AccountNumberList = MapMemberNumbersToEAgreementNumbers(accountGroup.AccountNumberList);
                if (string.IsNullOrEmpty(accountGroup.AccountNumberList))
                {
                    return Content("notfound", "text/html");
                }
            }

            var result = _targetedMarketingRepo.UpdateExistingAccountGroup(accountGroup);
            if (result.ToLower() != "success") result = "error";

            return Content(result, "text/html");
        }

        // Create a NEW account group
        [HttpPost]
        public ActionResult CreateAccountGroup(Criteria_AccountNumberGroup accountGroup)
        {
            if (!ModelState.IsValid) return Content("error", "text/html");

            if (accountGroup.SelectedGroupKind == AccountGroupsKind.All)
            {
                accountGroup.AccountNumberList = "ALL";
            }

            if (accountGroup.SelectedGroupKind == AccountGroupsKind.Upload)
            {
                var csvFile = Request.Files["file"];

                if (csvFile != null && csvFile.ContentLength > 0)
                {
                    string csvString;
                    using (var reader = new StreamReader(csvFile.InputStream))
                    {
                        csvString = reader.ReadToEnd();
                    }

                    csvString = csvString.Replace("\r\n", string.Empty);
                    accountGroup.AccountNumberList = csvString;
                }
            }

            accountGroup.AccountNumberList = accountGroup.AccountNumberList.Replace(" ", "");

            if (SettingsManager.Settings.TargetedMarketingSettings.CanMapMemberNumberToEAgreementNumber && accountGroup.ShouldMapMemberNumbersToEAgreementNumbers)
            {
                accountGroup.AccountNumberList = MapMemberNumbersToEAgreementNumbers(accountGroup.AccountNumberList);
                if (string.IsNullOrEmpty(accountGroup.AccountNumberList))
                {
                    return Content("notfound", "text/html");
                }
            }

            var newAccountGroup = _targetedMarketingRepo.CreateNewAccountGroup(accountGroup);
            var result = string.IsNullOrEmpty(newAccountGroup?.GroupName) ? "error" : "success";

            return Content(result, "text/html");
        }

        
        // Delete an existing account group
        public ActionResult DeleteAccountGroup(int id)
        {
            var success = _targetedMarketingRepo.DeleteAccountGroup(id);

            return Content(success ? "success" : "error", "text/html");
        }

        // Get All Account Groups for Add List in Modal:
        public ActionResult GetAllAccountGroupsForModal(int id)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication
            // Get Account Groups:
            var accountNumberGroups = _targetedMarketingRepo.GetAllAcountGroupsForPromotion(id);
            var accountNumberGroupsIds = accountNumberGroups.Select(x => x.AccountNumberGroupId);
            var accountGroupList = _targetedMarketingRepo.GetAllAcountGroups();
            return PartialView("_AccountGroupsAddListModal", accountGroupList.Where(accountNumberGroup => !accountNumberGroupsIds.Contains(accountNumberGroup.AccountNumberGroupId)).ToList());
        }

        // Set Account Groups for a promotion
        public ActionResult SetAccountGroupsForPromotion(FormCollection collection)
        {
            //Get the checkbox values out of the form for each account group
            var accountGroupIdList = new List<int>();
            var promotionId = 0;
            foreach (string key in collection.Keys)
            {
                if (key.Contains("AG_"))
                {
                    var id = key.Substring(3);
                    accountGroupIdList.Add(int.Parse(id));
                }
                if (key == "promotionId")
                {
                    promotionId = int.Parse(collection[key]);
                }
            }

            _targetedMarketingRepo.CreateQualification_AccountNumberMatch_For_Promotion_AccountGroupList(promotionId, accountGroupIdList);

            return Content("success", "text/html");
        }


        // Get All Account Groups for Add List in Modal:
        public ActionResult GetAccountGroupsForThisPromotion(int id)
        {
            var accountNumberGroups = _targetedMarketingRepo.GetAllAcountGroupsForPromotion(id);
            return PartialView("_AccountGroupsView", accountNumberGroups);
        }

        // Delete an account group for this Promotion
        public ActionResult DeleteAccountGroupForThisPromotion(int id, int promotion)
        {
            _targetedMarketingRepo.DeleteQualification_AccountNumberMatch_For_Promotion_AccountGroup(promotion, id);

            return Content("success", "text/html");
        }
        #endregion

        // Get All Content Items  for Add List in Modal:
        public ActionResult GetContentItemsForModal(int id)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            //Get content items
            var contentItemList = _targetedMarketingRepo.GetAllSlots();

            return PartialView("_ContentItemsAddListModal", contentItemList);
        }

        public ActionResult GetPromotionSlotsForThisPromotion(int id)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            var result = new PromotionSlots { PromoSlots = _targetedMarketingRepo.GetPromoSlotsByPromotionId(id) };
            foreach (var slotId in result.PromoSlots.GroupBy(x => x.SlotId).Select(y => y.First()))
            {
                result.Slots.Add(_targetedMarketingRepo.GetSingleSlot(slotId.SlotId));
            }

            return PartialView("_PromoDetailModelSlotDetail", result);
        }

        // Get features
        // Route Path: /Omega/TargetedMarketing/GetFeaturesForThisPromotion
        public ActionResult GetFeaturesForThisPromotion(int id)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            // set up blank features list:
            var result = new List<Feature>();

            // Get features from meta:
            var allFeatures = new ManagedFeaturesModel { Features = Util.GetManagedFeatures().Where(x => x.IsActive).ToList() };

            // match features to promotion selected features to build COMPLETE check box list for view:
            foreach (var feature in allFeatures.Features)
            {
                var tmFeature = new Feature { Id = feature.Id, Name = feature.Name };
                result.Add(tmFeature);
            }

            // get the previously selected features for this promotion, compare them to the allFeatures list, and if they exist and are active, set them
            // to active in the result list. the checkbox in the view should be checked.
            var promotionFeatureIdsList = _targetedMarketingRepo.GetAllFeaturesForPromotion(id);

            foreach (var feature in result)
            {
                var tempFeature = promotionFeatureIdsList.SingleOrDefault(x => x.Id == feature.Id && x.isActive);
                if (tempFeature != null)
                {
                    feature.isActive = true;    // if a match and is active, set the checkbox by setting this feature to isActive = true
                }
            }

            ViewBag.PromotionId = id.ToString();

            return PartialView("_FeaturesGroupsView", result);
        }

        // Save features
        // Route Path: /Omega/TargetedMarketing/SaveFeaturesForThisPromotion
        [HttpPost]
        public ActionResult SaveFeaturesForThisPromotion(FormCollection collection)
        {
            var result = "failure";
            var promotionId = Request.Form["FeaturesPromotionId"];
            var featuresToUpdate = new List<Feature>();

            if (Request.Form.HasKeys())
            {
                foreach (string key in Request.Form.Keys)
                {
                    if (key.Contains("features_checkbox_"))
                    {
                        var tmFeature = new Feature() { Id = key.Substring(18).ToInt(), isActive = true, PromotionId = promotionId.ToInt() };
                        featuresToUpdate.Add(tmFeature);
                    }
                }

                // if all boxes are de-selected, we still need to update the db to none.
                if (featuresToUpdate.Count == 0)
                {
                    var tmFeature = new Feature() { isActive = false, PromotionId = promotionId.ToInt() };
                    featuresToUpdate.Add(tmFeature);
                }

                result = _targetedMarketingRepo.AddUpdateFeaturesForPromotion(featuresToUpdate);
            }

            return Content(result, "text/html");
        }


        // Set Account Groups for a promotion
        public ActionResult SetContentItemsForPromotion(int promotionId, FormCollection collection)
        {
            foreach (string key in collection.Keys)
            {
                if (key.Contains("CO_"))
                {
                    var id = key.Substring(3);
                    _targetedMarketingRepo.CreateNewPromoSlot(new Xref_PromoSlot()
                    {
                        SlotId = int.Parse(id),
                        PromotionId = promotionId
                    });
                }
            }


            return Content("success", "text/html");
        }
        public ActionResult DeleteSlotForThisPromotion(int id)
        {

            var success = _targetedMarketingRepo.DeletePromoSlot(id);

            return Content(success ? "success" : "failure", "text/html");
        }

        public ActionResult GetAllImagesToAdd(int id)
        {
            var model = new TargetedMarketingModel();
            ViewBag.BaseModel = model;  // for user authentication

            ViewBag.PromotionSlotId = id;
            var result = _targetedMarketingRepo.GetAllImages();

            if (result.Count > 0)
            {
                for (var i = 0; i < result.Count; i++)
                {
                    result[i].FileContentBase64 = Convert.ToBase64String(result[i].FileContent);
                }
            }

            return PartialView("_PromoImageAddSelect", result);
        }


        public ActionResult DeleteImageThisPromotionSlot(int id)
        {

            var success = _targetedMarketingRepo.DeletePromoSlotImage(id);

            return Content(success ? "success" : "error", "text/html");
        }

        public ActionResult SetImageForPromotionSlot(int promotionId, FormCollection collection)
        {
            foreach (string key in collection.Keys)
            {
                if (key.Contains("IM_"))
                {
                    var id = key.Substring(3);
                    _targetedMarketingRepo.CreateNewPromoSlotImage(new Xref_PromoSlotImage()
                    {
                        ImageId = int.Parse(id),
                        PromotionSlotId = promotionId
                    });
                }
            }

            return Content("success", "text/html");
        }

        /// <summary>
        /// set slot as rotator or not:
        /// </summary>
        /// <param name="id"></param>
        /// <param name="rotator"></param>
        /// <returns></returns>
        public ActionResult SetRotationForPromotionSlot(int id, bool rotator, int maxRotatorImages)
        {
            var rotateSlot = new Slot
            {
                IsRotator = rotator,
                SlotId = id,
                MaxRotatorImages = rotator == true ? maxRotatorImages : 1
            };

            bool success = _targetedMarketingRepo.SetRotationForSlot(rotateSlot);

            if (success)
            {
                return Content("success", "text/html");
            };

            return Content("failure", "text/html");
        }

        [HttpPost]
        public void InvalidateAllCachedImages()
        {
            try
            {
                var url = $"{SettingsManager.Settings.GetSettingValue("X.App.HomeBanking.gsAppURL").TrimEnd('/')}/api/promotion-images/invalidate-all-images";
                var request = WebRequest.Create(url);
                request.Method = "GET";
                request.GetResponse();
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "Could not invalidate all cached images.");
            }
        }
        
        private string MapMemberNumbersToEAgreementNumbers(string accountNumberList)
        {
            var memberNumbers = accountNumberList.Split(',').Distinct();

            var accountNumbers = GetAccountNumbers(memberNumbers);

            return string.Join(",", accountNumbers);
        }

        private List<string> GetAccountNumbers(IEnumerable<string> memberNumbers)
        {
            var client = new RestClient(ApplicationConfigHelper.Config.PsiServiceUrlBase);
            var accountNumbers = new ConcurrentBag<string>();

            Parallel.ForEach(memberNumbers, memberNumber =>
            {
                if (string.IsNullOrEmpty(memberNumber))
                {
                    return;
                }

                var request = new RestRequest("api/online-banking-user/members/v1");

                request.AddQueryParameter("memberNumber", memberNumber);

                var response = client.Execute(request);
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    Logger.Trace($"Unable to find EAgreementNumber for MemberNumber: {memberNumber.Trim()}");
                    return;
                }

                var result = JsonConvert.DeserializeObject<OnlineBankingUsersResponse>(response.Content);
                foreach (var account in result.Members.Select(x => x.AccountNumber.ToString()).Where(y => !accountNumbers.Contains(y)))
                {
                    accountNumbers.Add(account); // because concurrentBag doesn't support .AddRange()
                }
            });

            return accountNumbers.ToList();
        }

    }
}