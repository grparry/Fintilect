using System;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.StringResources;
using System.Linq;
using Psi.Data.Models.Domain.OmegaUsers;

namespace Omega.Presentation.Mvc.Controllers
{
    public class StringResourceController : OmegaBaseController
    {
        public ActionResult Index()
        {
            var repo = new StringResourceRepository(Util.GetUser());
            var model = new StringResouceModel
            {
                ResourceSets = repo.GetResourceSets()
            };

            if (!model.User.CanView(OmegaFeatureAccessPermission.StringResources))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        public PartialViewResult GetResourceSet(string name)
        {
            var repo = new StringResourceRepository(Util.GetUser());
            var model = new GetResourceSetModel
            {
                Resources = repo.GetResources(name)
            };

            return PartialView("GetResources", model);
        }

        public PartialViewResult GetResourceSets()
        {
            var repo = new StringResourceRepository(Util.GetUser());
            var model = new StringResouceModel
            {
                ResourceSets = repo.GetResourceSets()
            };

            return PartialView("GetResourceSets", model);
        }

        public PartialViewResult GetResourceKey(string key, string set)
        {
            var repo = new StringResourceRepository(Util.GetUser());
            var model = new GetResourceModel
            {
                DefaultKey = repo.GetDefaultKey(key, set),
                Keys = repo.GetKeys(key, set).ToList()
            };
            return PartialView("GetResourceKey", model);
        }

        public string GetResourceKeyValue(string key, string set, int id)
        {
            return new StringResourceRepository(Util.GetUser()).GetKey(key, set, id).Value;
        }

        public string GetDefaultResourceKeyValue(string key, string set, int id)
        {
            return new StringResourceRepository(Util.GetUser()).GetDefaultKey(key, set).Value;
        }

        public int SaveDefaultResource(DefaultResource resource)
        {
            var repo = new StringResourceRepository(Util.GetUser());
            repo.SaveDefaultResource(resource);
            return resource.Id;
        }

        public void SaveResource(FullResouce resource)
        {
            var endAt = resource.EndAt.Utc();
            var startAt = resource.StartAt.Utc();
            if (startAt == DateTime.MinValue.Utc())
                startAt = DateTime.UtcNow;
            var repo = new StringResourceRepository(Util.GetUser());
            repo.SaveResource(new FullResouce
            {
                Culture = resource.Culture,
                Id = resource.Id,
                Key = resource.Key,
                ResourceSet = resource.ResourceSet,
                Value = resource.Value,
                StartAt = startAt,
                EndAt = endAt
            });
        }
    }
}
