using Gma.QrCodeNet.Encoding;
using Newtonsoft.Json;
using Omega.Presentation.Mvc.Models;
using Omega.Presentation.Mvc.Models.LayeredSecurity;
using Omega.Presentation.Mvc.Models.QrCodeGenerator;
using Omega.Presentation.Mvc.Models.StringResources;
using Omega.Presentation.Mvc.Models.VersionManagement;
using OnlineBanking.Business.Utils;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Business.ServiceContracts.RequestResponse.Logging;
using Psi.Business.ServiceContracts.RequestResponse.Omega;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingApi;
using Psi.Business.ServiceContracts.RequestResponse.QrCodeGenerator;
using Psi.Business.ServiceContracts.RequestResponse.VersionManagement;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.ContactUs;
using Psi.Data.Models.Domain.FeaturesManager;
using Psi.Data.Models.Domain.LicenseManager;
using Psi.Data.Models.Domain.Membership.MultiAccountAccess;
using Psi.Data.Models.Domain.OnlineBankingApi;
using Psi.Data.Models.Domain.UserDevices;
using Psi.Utilities;
using PSI.Models.ClientConfigurationModels.Agatha;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Omega.Presentation.Mvc.Business
{
    public static class Util
    {
        private static readonly OmegaUserRepository OmegaUserRepo = new OmegaUserRepository();
        private static readonly LayeredSecurityRepository LayeredSecurityRepo = new LayeredSecurityRepository();
        private static readonly VersionManagementRepository VersionManagementRepo = new VersionManagementRepository();
        private static readonly QrCodeGeneratorRepository QrCodeGeneratorRepo = new QrCodeGeneratorRepository();
        private static readonly LicenseManagerRepository LicenseManagerRepository = new LicenseManagerRepository();
        private static readonly FeaturesManagerRepository ManagedFeatureRepository = new FeaturesManagerRepository();
        private static readonly CreditUnionContactInfoRepository CreditUnionContactInfoRepository = new CreditUnionContactInfoRepository();
        private static readonly OnlineBankingApiRepository OnlineBankingApiRepository = new OnlineBankingApiRepository();
        private static readonly SystemMessageRepository SystemMessageRepository = new SystemMessageRepository();
        private static readonly QuickAccessManagementRepository QuickAccessManagementRepository = new QuickAccessManagementRepository();

        public static bool CanEdit(ModelBase modelBase, FullResouce key)
        {
            return modelBase.User.PermissionLevel.CanView(key.PermissionLevel);
        }

        public static User GetUser()
        {
            var user = (User)HttpContext.Current.Session["OmegaUser"];

            if (user == null && !string.IsNullOrEmpty(HttpContext.Current?.User?.Identity?.Name))
            {
                var identity = HttpContext.Current.User.Identity;
                var x = OmegaUserRepo.GetUser(identity.Name);
                if (x != null)
                {
                    user = new User
                    {
                        PermissionLevel = x.PermissionLevel,
                        Email = x.Email,
                        PublicId = x.PublicId,
                        PasswordChangeRequired = x.PasswordChangeRequired,
                        IsLockedOut = x.IsLockedOut,
                        ClientPublicId = x.ClientPublicId,
                        PermissionGroup = x.PermissionGroup
                    };
                    UsersApplicationSettings = OmegaUserRepo.GetOmegaSettingForUser(user.PermissionLevel);
                    HttpContext.Current.Session["OmegaUser"] = user;
                    return user;
                }
            }
            
            return user;
        }

        public static List<OmegaUser> GetUsers()
        {
            return OmegaUserRepo.GetUsers(GetUser().ClientPublicId);
        }

        public static User LoginUser(string email, string password)
        {
            User user;
            var encryptedPassword = Encrypt(password);

            var x = OmegaUserRepo.LoginUser(email, password, encryptedPassword);
            if (x != null)
            {
                user = new User
                {
                    PermissionLevel = x.PermissionLevel,
                    Email = x.Email,
                    PublicId = x.PublicId,
                    Name = x.Name,
                    PasswordChangeRequired = x.PasswordChangeRequired,
                    IsLockedOut = x.IsLockedOut,
                    ClientPublicId = x.ClientPublicId,
                    PermissionGroup = x.PermissionGroup
                };
                if (user.PasswordChangeRequired || user.IsLockedOut) return user;
                
                UsersApplicationSettings = OmegaUserRepo.GetOmegaSettingForUser(user.PermissionLevel);
            }
            else
            {
                user = new User
                {
                    Email = HttpContext.Current.User.Identity.ToString(),
                    PermissionLevel = (int)PermissionLevel.Basic,
                    PublicId = Guid.NewGuid()
                };
            }

            HttpContext.Current.Session["OmegaUser"] = user;
            return user;
        }

        internal static string GetEmailFromToken(Guid token)
        {
            var email = OmegaUserRepo.GetEmailFromToken(token);

            return email;
        }

        internal static User ResetPassword(string email, string password)
        {
            User user;
            password = Encrypt(password);

            var x = OmegaUserRepo.ResetPassword(email, password);
            if (x != null)
            {
                user = new User
                {
                    PermissionLevel = x.PermissionLevel,
                    Email = x.Email,
                    PublicId = x.PublicId,
                    PasswordIsValid = x.PasswordIsValid,
                    PermissionGroup = x.PermissionGroup
                };
                UsersApplicationSettings = OmegaUserRepo.GetOmegaSettingForUser(user.PermissionLevel);
            }
            else
            {
                user = new User
                {
                    Email = HttpContext.Current.User.Identity.ToString(),
                    PermissionLevel = (int)PermissionLevel.Basic,
                    PublicId = Guid.NewGuid()
                };
            }
            
            HttpContext.Current.Session["OmegaUser"] = user;
            return user;
        }

        public static bool ChangePassword(string email, string currentPassword, string newPassword)
        {
            currentPassword = Encrypt(currentPassword);
            var encryptedNewPassword = Encrypt(newPassword);

            var success = OmegaUserRepo.ChangePassword(email, currentPassword, encryptedNewPassword);
            if (success)
                LoginUser(email, newPassword); //Make sure that the user is now logged in after the password change.

            return success;
        }

        private static string Encrypt(string input)
        {
            const string key = "M=Dl!v0r+aGTQj4dSH7mO@vo";
            const string hexInitVector = "5BB4E553B68AE410";
            return Cryptography.TripleDesEncrypt(input, key, CipherMode.CBC, PaddingMode.PKCS7, Cryptography.SecretKeyEncoding.Ascii, Cryptography.EncryptedStringFormat.Hex, hexInitVector);
        }

        public static UserApplicationSettings UsersApplicationSettings
        {
            get
            {
                var x = (UserApplicationSettings)HttpContext.Current.Session["UsersApplicationSettings"] ??
                        new UserApplicationSettings { ApplicationVersions = new List<string>(), ClientContextNames = new List<string>() };
                return x;
            }
            set { HttpContext.Current.Session["UsersApplicationSettings"] = value; }
        }

        public static OmegaUser ForgotPassword(string email)
        {
            return OmegaUserRepo.ForgotPassword(email);
        }

        public static OmegaUser AddNewUser(string email, int permissionLevel, string name, string modifiedBy)
        {
            var user = OmegaUserRepo.AddNewUser(email, permissionLevel, name, modifiedBy);
            return user;
        }

        public static OmegaUser EditUserPermissions(OmegaUser userToEdit, string button, string modifiedBy)
        {
            switch (button)
            {
                case "Reactivate User":
                    userToEdit.Deleted = false;
                    break;
                case "Delete User":
                    userToEdit.Deleted = true;
                    break;
            }

            var user = OmegaUserRepo.EditUserPermissions(userToEdit, modifiedBy);
            return user;
        }

        public static OmegaUser GetOmegaUserDetails(string email)
        {
            var user = OmegaUserRepo.GetOmegaUserDetails(email);
            return user;
        }

        public static List<Feature> GetFeatures(string applicationKey)
        {
            return LayeredSecurityRepo.GetFeatures(applicationKey);
        }

        public static Feature AddFeature(Feature feature)
        {
            return LayeredSecurityRepo.AddFeature(feature);
        }

        public static Feature UpdateFeature(Feature feature)
        {
            return LayeredSecurityRepo.UpdateFeature(feature);
        }

        public static bool DeleteFeature(Feature feature)
        {
            return LayeredSecurityRepo.DeleteFeature(feature);
        }

        public static List<FeatureAction> GetActions(int featureId)
        {
            return LayeredSecurityRepo.GetActions(featureId);
        }

        public static FeatureAction AddNewFeatureAction(FeatureAction newAction)
        {
            return LayeredSecurityRepo.AddNewAction(newAction);
        }

        public static FeatureAction UpdateFeatureAction(FeatureAction updateAction)
        {
            return LayeredSecurityRepo.UpdateAction(updateAction);
        }

        public static bool DeleteAction(FeatureAction featureAction)
        {
            return LayeredSecurityRepo.DeleteAction(featureAction);
        }

        public static List<AuthenticationMethod> GetAuthenticationMethods(bool excludePasswordMethod = false)
        {
            return LayeredSecurityRepo.GetAuthenticationMethods(excludePasswordMethod);
        }

        public static AuthenticationMethod AddAuthenticationMethod(AuthenticationMethod newAuthenticationMethod)
        {
            return LayeredSecurityRepo.AddAuthenticationMethod(newAuthenticationMethod);
        }

        public static AuthenticationMethod UpdateAuthenticationMethod(AuthenticationMethod authenticationMethod)
        {
            return LayeredSecurityRepo.UpdateAuthenticationMethod(authenticationMethod);
        }

        public static bool DeleteMethod(AuthenticationMethod authenticationMethod)
        {
            return LayeredSecurityRepo.DeleteMethod(authenticationMethod);
        }

        public static List<AuthenticationRule> GetAuthenticationRules(int actionId)
        {
            return LayeredSecurityRepo.GetAuthenticationRules(actionId);
        }

        public static AuthenticationRule AddAuthenticationRule(AuthenticationRule newAuthenticationRule)
        {
            return LayeredSecurityRepo.AddAuthenticationRule(newAuthenticationRule);
        }

        public static AuthenticationRule UpdateAuthenticationRule(AuthenticationRule authenticationRule)
        {
            return LayeredSecurityRepo.UpdateAuthenticationRule(authenticationRule);
        }

        public static List<AuthenticationRule> SaveAuthenticationRulePriority(List<AuthenticationRule> authenticationRules)
        {
            return LayeredSecurityRepo.SaveAuthenticationRulePriority(authenticationRules);
        }

        public static bool DeleteAuthenticationRule(AuthenticationRule authenticationRule)
        {
            return LayeredSecurityRepo.DeleteAuthenticationRule(authenticationRule);
        }

        public static string FormatIsUserFacing(string currentValue)
        {
            if (currentValue.Equals("False", StringComparison.InvariantCultureIgnoreCase) ||
                currentValue.Equals("F", StringComparison.InvariantCultureIgnoreCase) ||
                currentValue.Equals("No", StringComparison.InvariantCultureIgnoreCase) ||
                currentValue.Equals("N", StringComparison.InvariantCultureIgnoreCase))
            {
                return "False";
            }
            return "True"; //default value is true
        }

        public static VersionManagementViewModel GetVersionManagementViewModel(VersionManagementViewModel model)
        {
            return VersionManagementRepo.GetVersionManagementViewModel(model);
        }
        public static DefaultVersionManagementModel GetDefaultVersionManagementModel(DefaultVersionManagementModel model)
        {
            return VersionManagementRepo.GetDefaultVersionManagementModel(model);
        }
        public static Boolean UpdateClientContextVersionViewModel(DefaultVersionManagementModel model)
        {
            return VersionManagementRepo.UpdateClientContextVersionViewModel(model);
        }
        public static Boolean AddNewVersionViewModel(DefaultVersionManagementModel model)
        {
            return VersionManagementRepo.AddNewVersionViewModel(model);
        }
        public static ManageMinimumVersionViewModel GetManageMinimumVersionViewModel(int numberOfDays, string defaultValue)
        {
            return VersionManagementRepo.GetManageMinimumVersionViewModel(numberOfDays, defaultValue);
        }

        public static List<SelectListItem> GetClients()
        {
            return LicenseManagerRepository.GetClients();
        }

        public static List<LicensedFeature> GetLicensedFeaturesForClient(int clientId)
        {
            return LicenseManagerRepository.GetLicensedFeaturesForClient(clientId);
        }

        public static bool EditLicense(int featureId, int clientId, bool license)
        {
            return LicenseManagerRepository.EditLicense(featureId, clientId, license);
        }

        public static List<ManagedFeature> GetManagedFeatures()
        {
            return ManagedFeatureRepository.GetFeatures();
        }

        public static List<ManagedFeature> GetManagedFeatureById(string id)
        {
            return ManagedFeatureRepository.GetFeatureById(id);
        }

        public static bool AddUpdateManagedFeature(ManagedFeature feature)
        {
            return ManagedFeatureRepository.AddUpdateFeature(feature);
        }

        public static bool DeleteManagedFeature(ManagedFeature feature)
        {
            return ManagedFeatureRepository.DeleteFeature(feature);
        }

        public static bool ActivateManagedFeature(ManagedFeature feature)
        {
            return ManagedFeatureRepository.ActivateFeature(feature);
        }

        public static List<ManagedFeatureGroup> GetManagedFeatureGroups(int featureGroupId = 0)
        {
            return ManagedFeatureRepository.GetFeatureGroups(featureGroupId);
        }

        public static bool AddUpdateManagedFeatureGroup(ManagedFeatureGroup featureGroup)
        {
            return ManagedFeatureRepository.AddUpdateFeatureGroup(featureGroup);
        }

        public static List<FeatureSetting> GetFeatureSettings(int settingId = 0)
        {
            return ManagedFeatureRepository.GetSettings(settingId);
        }

        public static bool AddUpdateFeatureSetting(FeatureSetting setting)
        {
            return ManagedFeatureRepository.AddUpdateSetting(setting);
        }

        public static List<SelectListItem> GetWebServiceUrlsSelectList()
        {
            return QrCodeGeneratorRepo.GetWebServiceUrlsSelectList();
        }

        public static List<WebServiceUrl> GetWebServiceUrls()
        {
            return QrCodeGeneratorRepo.GetWebServiceUrls();
        }

        public static bool AddUpdateWebServiceUrl(WebServiceUrl webServiceUrl)
        {
            return QrCodeGeneratorRepo.AddUpdateWebServiceUrl(webServiceUrl);
        }

        public static bool DeleteWebServiceUrl(long urlId)
        {
            return QrCodeGeneratorRepo.DeleteWebServiceUrl(urlId);
        }

        public static byte[] GenerateAuthorizationCode()
        {
            var request = new GetClientContextRequest(0)
            {
                CurrentContext = ApplicationConfigHelper.Config.ClientContextName
            };
            var clientResponse = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetClientContextResponse>(request);

            string json;

            if (SettingsManager.Settings.Application.OnlineBanking.Version < 2017.2)
            {
                var model = new QrAuthorizationCode
                {
                    ClientId = clientResponse.ClientContextAppVersions.ClientId,
                    ExpirationDate = DateTime.Now.AddHours(24).ToString(),
                    HashedCode = GetSha256Hash(clientResponse.ClientContextAppVersions.ClientId + "wqb3utryxi034b")
                };

                json = new JavaScriptSerializer().Serialize(model);
            }
            else
            {
                var model = new QrAuthCode
                {
                    ExpirationDate = DateTime.Now.AddHours(24).ToString(),
                    HashedCode = GetSha256Hash(clientResponse.ClientContextAppVersions.ClientId + "wqb3utryxi034b")
                };

                json = new JavaScriptSerializer().Serialize(model);
            }

            return GenerateQrCode(json);
        }


        public static byte[] GenerateQrCode(string text)
        {
            var encoder = new QrEncoder(ErrorCorrectionLevel.H);
            var code = encoder.Encode(text);
            var temp = new Bitmap(code.Matrix.Width, code.Matrix.Height);
            for (var x = 0; x <= code.Matrix.Width - 1; x++)
            {
                for (var y = 0; y <= code.Matrix.Height - 1; y++)
                {
                    temp.SetPixel(x, y, code.Matrix.InternalArray[x, y] ? Color.Black : Color.WhiteSmoke);
                }
            }
            var resized = new Bitmap(temp, new Size(250, 250));

            using (var stream = new MemoryStream())
            {
                resized.Save(stream, ImageFormat.Png);
                return stream.ToArray();
            }
        }

        public static ContactUsModel GetContactUsInfo()
        {
            return CreditUnionContactInfoRepository.GetContactUsInfo();
        }

        public static bool AddUpdateContactUsInfo(ContactUsModel contactUsInfo, bool addRecord)
        {
            return CreditUnionContactInfoRepository.AddUpdateContactUsInfo(contactUsInfo, addRecord);
        }

        public static bool DeleteContactUsInfo(int id)
        {
            return CreditUnionContactInfoRepository.DeleteContactUsInfo(id);
        }

        public static bool AddUpdateContactUsGroup(ContactUsGroupModel contactUsGroup, bool addRecord)
        {
            return CreditUnionContactInfoRepository.AddUpdateContactUsGroup(contactUsGroup, addRecord);
        }

        public static bool DeleteContactUsGroup(int id)
        {
            return CreditUnionContactInfoRepository.DeleteContactUsGroup(id);
        }

        public static bool AddUpdateContactUsPhoneNumber(ContactUsPhoneNumberModel contactUsPhoneNumber, bool addRecord)
        {
            return CreditUnionContactInfoRepository.AddUpdateContactUsPhoneNumber(contactUsPhoneNumber, addRecord);
        }

        public static bool DeleteContactUsPhoneNumber(int id)
        {
            return CreditUnionContactInfoRepository.DeleteContactUsPhoneNumber(id);
        }

		public static bool AddUpdateContactUsPhoneHour(ContactUsPhoneHourModel contactUsPhoneHour, bool addRecord)
        {
            return CreditUnionContactInfoRepository.AddUpdateContactUsPhoneHour(contactUsPhoneHour, addRecord);
        }

        public static bool DeleteContactUsPhoneHour(int id)
        {
            return CreditUnionContactInfoRepository.DeleteContactUsPhoneHour(id);
        }

	    public static bool AddUpdateContactUsLink(ContactUsLinkModel contactUsLink, bool addRecord)
	    {
		    return CreditUnionContactInfoRepository.AddUpdateContactUsLink(contactUsLink, addRecord);
	    }

	    public static bool DeleteContactUsLink(int id)
	    {
		    return CreditUnionContactInfoRepository.DeleteContactUsLink(id);
	    }

		public static List<ApiCredentials> GetApiCredentials()
        {
            return OnlineBankingApiRepository.GetApiCredentials();
        }

        public static bool UpdateApiCredentials(AddUpdateApiCredentialsRequest credentials)
        {
            return OnlineBankingApiRepository.UpdateApiCredentials(credentials);
        }

        public static bool DeleteApiCredentials(ApiCredentials credentials)
        {
            return OnlineBankingApiRepository.DeleteApiCredentials(credentials);
        }

        /// <summary>
        /// Returns a SHA-256 hash on the input.
        /// </summary>
        /// <param name="plainText">The plaintext to hash.</param>
        /// <returns>A hex-encoded SHA-256 hash.</returns>
        /// <remarks></remarks>
        public static string GetSha256Hash(string plainText)
        {
            var oSHA256 = SHA256Managed.Create();

            var byaHashedData = oSHA256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(plainText));

            return BitConverter.ToString(byaHashedData).Replace("-", string.Empty);
        }

        public static List<string> GetAvailableApplicationConfigurationNames()
        {
            return ManagedFeatureRepository.GetAvailableApplicationConfigurationNames();
        }

        public static List<SearchedMember> SearchForMember(MemberSearchType searchType, string searchId)
        {
            return SystemMessageRepository.SearchForMember(searchType, searchId);
        }

        public static List<SystemMessage> GetSystemMessagesForMember(long uuid)
        {
            return SystemMessageRepository.GetSystemMessagesForMember(uuid);
        }

        public static List<QuickAccessDevice> GetQuickAccessDevices(long uuid)
        {
            return QuickAccessManagementRepository.GetQuickAccessDevices(uuid);
        }

        public static bool DeleteQuickAccessTokens(QuickAccessDevice device)
        {
            return QuickAccessManagementRepository.DeleteQuickAccessTokens(device);
        }

        public static string EncryptSettingValue(string settingValue)
        {
            return StringCipher.Encrypt(settingValue);
        }

        public static string DecryptSettingValue(string settingValue)
        {
            return StringCipher.Decrypt(settingValue);
        }

        public static string SerializeMAAFeatures(List<MultiAccountAccessFeature> features)
        {
            return JsonConvert.SerializeObject(features);
        }

        public static List<MultiAccountAccessFeature> DeserializeMAAFeatures(string configValue)
        {
            return JsonConvert.DeserializeObject<List<MultiAccountAccessFeature>>(configValue);
        }

        public static bool UpdateMAAFeature(MultiAccountAccessFeature updatedFeature, List<MultiAccountAccessFeature> allFeatures)
        {
            var existingFeature = allFeatures.FirstOrDefault(x => x.Type == updatedFeature.Type);
            if (existingFeature == null)
            {
                allFeatures.Add(updatedFeature);
            }
            else
            {
                existingFeature.Access = updatedFeature.Access;
            }

            var allFeaturesEncryptedValue = EncryptSettingValue(SerializeMAAFeatures(allFeatures));

            var request = new UpdateMultiAccountAccessFeatureRequest
            {
                AllFeaturesEncryptedValue = allFeaturesEncryptedValue,
                Feature = updatedFeature
            };

            var client = new RestClient($"{ApplicationConfigHelper.Config.PsiServiceUrlBase}/api/multi-account-access-feature");
            var restRequest = new RestRequest("v1", Method.POST);

            var response = client.Execute(restRequest);
            if (!response.IsSuccessful)
            {
                return false;
            }

            return true;
        }

        public static bool GenerateVerafinAuditLogExportFile(DateTime startDateUtc, DateTime endDateUtc)
        {
            var generateVerafinAuditLogExportFileRequest = new GenerateVerafinAuditLogExportFileRequest
            {
                StartTimeUtc = startDateUtc,
                EndTimeUtc = endDateUtc
            };

            var request = new PsiRequest(0)
            {
                JsonPayload = JsonConvert.SerializeObject(generateVerafinAuditLogExportFileRequest),
                MethodKey = PsiMethodType.GenerateVerafinAuditLogExportFile
            };

            var success = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(request).WasSuccessful;

            return success;
        }

        public static List<SelectListItem> GetUnitedStatesStatesForMvcDropdown()
        {
            var stateList = new List<SelectListItem>();

            stateList.Add(new SelectListItem() { Value = "none", Text = "--" });
            stateList.Add(new SelectListItem() { Value = "AL", Text = "AL" });
            stateList.Add(new SelectListItem() { Value = "AK", Text = "AK" });
            stateList.Add(new SelectListItem() { Value = "AZ", Text = "AZ" });
            stateList.Add(new SelectListItem() { Value = "AR", Text = "AR" });
            stateList.Add(new SelectListItem() { Value = "CA", Text = "CA" });
            stateList.Add(new SelectListItem() { Value = "CO", Text = "CO" });
            stateList.Add(new SelectListItem() { Value = "CT", Text = "CT" });
            stateList.Add(new SelectListItem() { Value = "DE", Text = "DE" });
            stateList.Add(new SelectListItem() { Value = "DC", Text = "DC" });
            stateList.Add(new SelectListItem() { Value = "FL", Text = "FL" });
            stateList.Add(new SelectListItem() { Value = "GA", Text = "GA" });
            stateList.Add(new SelectListItem() { Value = "HI", Text = "HI" });
            stateList.Add(new SelectListItem() { Value = "ID", Text = "ID" });
            stateList.Add(new SelectListItem() { Value = "IL", Text = "IL" });
            stateList.Add(new SelectListItem() { Value = "IN", Text = "IN" });
            stateList.Add(new SelectListItem() { Value = "IA", Text = "IA" });
            stateList.Add(new SelectListItem() { Value = "KS", Text = "KS" });
            stateList.Add(new SelectListItem() { Value = "KY", Text = "KY" });
            stateList.Add(new SelectListItem() { Value = "LA", Text = "LA" });
            stateList.Add(new SelectListItem() { Value = "ME", Text = "ME" });
            stateList.Add(new SelectListItem() { Value = "MD", Text = "MD" });
            stateList.Add(new SelectListItem() { Value = "MA", Text = "MA" });
            stateList.Add(new SelectListItem() { Value = "MI", Text = "MI" });
            stateList.Add(new SelectListItem() { Value = "MN", Text = "MN" });
            stateList.Add(new SelectListItem() { Value = "MS", Text = "MS" });
            stateList.Add(new SelectListItem() { Value = "MO", Text = "MO" });
            stateList.Add(new SelectListItem() { Value = "MT", Text = "MT" });
            stateList.Add(new SelectListItem() { Value = "NE", Text = "NE" });
            stateList.Add(new SelectListItem() { Value = "NV", Text = "NV" });
            stateList.Add(new SelectListItem() { Value = "NH", Text = "NH" });
            stateList.Add(new SelectListItem() { Value = "NJ", Text = "NJ" });
            stateList.Add(new SelectListItem() { Value = "NM", Text = "NM" });
            stateList.Add(new SelectListItem() { Value = "NY", Text = "NY" });
            stateList.Add(new SelectListItem() { Value = "NC", Text = "NC" });
            stateList.Add(new SelectListItem() { Value = "ND", Text = "ND" });
            stateList.Add(new SelectListItem() { Value = "OH", Text = "OH" });
            stateList.Add(new SelectListItem() { Value = "OK", Text = "OK" });
            stateList.Add(new SelectListItem() { Value = "OR", Text = "OR" });
            stateList.Add(new SelectListItem() { Value = "PA", Text = "PA" });
            stateList.Add(new SelectListItem() { Value = "RI", Text = "RI" });
            stateList.Add(new SelectListItem() { Value = "SC", Text = "SC" });
            stateList.Add(new SelectListItem() { Value = "SD", Text = "SD" });
            stateList.Add(new SelectListItem() { Value = "TN", Text = "TN" });
            stateList.Add(new SelectListItem() { Value = "TX", Text = "TX" });
            stateList.Add(new SelectListItem() { Value = "UT", Text = "UT" });
            stateList.Add(new SelectListItem() { Value = "VT", Text = "VT" });
            stateList.Add(new SelectListItem() { Value = "VA", Text = "VA" });
            stateList.Add(new SelectListItem() { Value = "WA", Text = "WA" });
            stateList.Add(new SelectListItem() { Value = "WV", Text = "WV" });
            stateList.Add(new SelectListItem() { Value = "WI", Text = "WI" });
            stateList.Add(new SelectListItem() { Value = "WY", Text = "WY" });

            return stateList;     
        }
    }
}
