using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using HomeBankingUtilities;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Filters;
using Omega.Presentation.Mvc.Models.SecurityKeys;
using Psi.Data.Models.Domain.Keys;
using Psi.Data.Models.Domain.OmegaUsers;
using RestSharp;

namespace Omega.Presentation.Mvc.Controllers
{
    [PermissionFilter(PermissionLevel = PermissionLevel.SuperUser)]
    public class SecurityKeysController : OmegaBaseController
    {
        public SecurityKeysController()
            : this(new PsiServiceHostClientFactory())
        {
        }

        public SecurityKeysController(IPsiServiceHostClientFactory clientFactory)
        {
            PsiServiceHostClient = clientFactory.CreateRestClient();
        }

        private IRestClient PsiServiceHostClient { get; }

        // GET: SecurityKeys
        public async Task<ActionResult> Index()
        {
            var user = Util.GetUser();
            if (!user.CanView(OmegaFeatureAccessPermission.SecurityKeys))
            {
                return View("FeatureNotAvailable");
            }

            var request = new RestRequest("security-keys/v1", dataFormat: DataFormat.Json);

            var keys = await PsiServiceHostClient.GetAsync<KeyListModel>(request).ConfigureAwait(true);

            return View(keys);
        }

        public ActionResult AddKeyModal()
        {
            return PartialView("_AddKeyModal");
        }

        public async Task<ActionResult> AddKeyVersionModal(Guid id)
        {
            return PartialView("_AddKeyVersionModal", await GetKey(id).ConfigureAwait(true));
        }

        public async Task<ActionResult> ListKeyVersionsModal(Guid id)
        {
            var request = new RestRequest($"security-keys/v1/{id}/versions", dataFormat: DataFormat.Json);

            var keyVersions = await PsiServiceHostClient.GetAsync<KeyVersionListModel>(request).ConfigureAwait(true);

            return PartialView("_ListKeyVersionsModal", keyVersions);
        }

        public async Task<ActionResult> RotateKeyModal(Guid id)
        {
            return PartialView("_RotateKeyModal", await GetKey(id).ConfigureAwait(true));
        }

        public async Task<KeyModel> GetKey(Guid id)
        {
            var request = new RestRequest($"security-keys/v1/{id}", dataFormat: DataFormat.Json);

            var key = await PsiServiceHostClient.GetAsync<KeyModel>(request).ConfigureAwait(true);

            return key;
        }

        [HttpPost]
        public async Task<JsonResult> AddKey(AddKeyRequest request)
        {
            var restRequest = new RestRequest($"security-keys/v1", dataFormat: DataFormat.Json, method: Method.POST) { RequestFormat = DataFormat.Json };
            restRequest.AddBody(request);

            var key = await PsiServiceHostClient.PostAsync<KeyModel>(restRequest).ConfigureAwait(true);

            return Json(key);
        }

        [HttpPost]
        public async Task<JsonResult> AddKeyVersion(AddKeyVersionClientModel request)
        {
            var restRequest = new RestRequest(
                $"security-keys/v1/{request.KeyId}/{(request.MakeCurrent ? "current" : "versions")}",
                dataFormat: DataFormat.Json,
                method: Method.POST)
            {
                RequestFormat = DataFormat.Json
            };
            restRequest.AddBody(new AddKeyVersionRequest
            {
                KeyId = request.KeyId,
                KeyBase64 = HexToBase64(request.KeyHex),
                IVBase64 = HexToBase64(request.IVHex)
            });

            var keyVersion = await PsiServiceHostClient.PostAsync<KeyVersionModel>(restRequest).ConfigureAwait(true);

            return Json(keyVersion);
        }

        [HttpPost]
        public async Task<JsonResult> SetCurrentVersion(Guid id, PatchKeyRequest request)
        {
            var restRequest = new RestRequest(
                $"security-keys/v1/{id}",
                dataFormat: DataFormat.Json,
                method: Method.POST)
            {
                RequestFormat = DataFormat.Json
            };
            restRequest.AddBody(request);

            var key = await PsiServiceHostClient.PostAsync<KeyModel>(restRequest).ConfigureAwait(true);

            return Json(key);
        }

        [HttpPost]
        public async Task RotateKeyVersion(Guid keyId)
        {
            var restRequest = new RestRequest(
                $"security-keys/v1/{keyId}/rotate",
                dataFormat: DataFormat.Json,
                method: Method.POST)
            {
                RequestFormat = DataFormat.Json
            };

            await PsiServiceHostClient.ExecutePostTaskAsync(restRequest).ConfigureAwait(true);
        }

        private static string HexToBase64(string hexString)
        {
            if (string.IsNullOrWhiteSpace(hexString))
            {
                return null;
            }

            return Convert.ToBase64String(HexToByteArray(new string(hexString.ToUpper().ToCharArray().Where(x => x >= '0' && x <= '9' || x >= 'A' && x <= 'F').ToArray())));
        }

        private static byte[] HexToByteArray(string hex)
        {
            var numberChars = hex.Length;
            if (numberChars % 2 != 0)
            {
                throw new ArgumentException("Hex length must be a multiple of 2", nameof(hex));
            }

            var bytes = new byte[numberChars / 2];
            for (var i = 0; i < numberChars; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }

            return bytes;
        }
    }
}