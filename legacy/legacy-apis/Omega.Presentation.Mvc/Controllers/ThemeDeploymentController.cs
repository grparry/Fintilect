using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ThemeDeployment;
using Omega.Presentation.Mvc.Models.Themes;
using Psi.Data.Models.Domain.ThemeDeploy;
using Psi.Data.Models.Domain.Themes;

namespace Omega.Presentation.Mvc.Controllers
{
    public class ThemeDeploymentController : OmegaBaseController
    {
        private readonly ThemesRepository _themesRepository;
        public ThemeDeploymentController()
        {
            _themesRepository = new ThemesRepository();
        }

        public ActionResult Index()
        {
            //return View("Index");
            return View(new ListDeployViewModel
            {
                Deploys = _themesRepository.GetAllThemeDeploys()
            });
        }

        public ActionResult EditDeployModal(Guid id, Guid? parentId = null)
        {
            ThemeDeployModel deploy;

            if (id != Guid.Empty)
                deploy = _themesRepository.GetDeploy(id);
            else
            {
                deploy = new ThemeDeployModel()
                {
                    MinAndroidVersion = "0.0.0.0",
                    MinIosVersion = "0.0.0.0",
                    DeploymentVersion = "0.0.0.0",
                    DefaultDeploymentVersion = parentId
                };

                if (parentId.HasValue)
                {
                   // deploy.DefaultDeploymentVersion = parentId.Value;
                }
            }

            return PartialView("_EditDeployModal", deploy);
        }

        public ActionResult UpdateBundleModal(Guid id, ThemeProduct product)
        {

            UpdateBundleViewModel addBundleModel = new UpdateBundleViewModel()
            {
                Deploy = _themesRepository.GetDeploy(id),
                Themes = _themesRepository.GetThemes(product).OrderBy(x => x.Title).ToList()

            };


            return PartialView("_UpdateBundleModal", addBundleModel);
        }
        [HttpPost]
        public JsonResult UpdateBundle(UpdateBundleViewModel bundleEdit)
        {
            if (!ModelState.IsValid)
                return ModelStateErrors();

            bundleEdit.Deploy = _themesRepository.SaveDeploy(bundleEdit.Deploy);

            if (bundleEdit.Deploy == null)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(null);
            }

            // Return the link to view this new theme's details.
            var url = Url.Action("Index");

            return Json(new { url });
        }

        [HttpPost]
        public JsonResult Deploy(ThemeDeployModel deploy)
        {
            if (!ModelState.IsValid)
                return ModelStateErrors();

            deploy = _themesRepository.SaveDeploy(deploy);

            if (deploy == null)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(null);
            }

            // Return the link to view this new theme's details.
            var url = Url.Action("Index");

            return Json(new { url });
        }


        private JsonResult ModelStateErrors()
        {
            Response.StatusCode = (int)HttpStatusCode.BadRequest;

            var errors = new List<List<string>>();
            foreach (var error in ModelState.Where(x => x.Value.Errors.Any()))
            {
                errors.Add(new List<string> { error.Key, error.Value.Errors.Select(e => e.ErrorMessage).First() });
            }

            return Json(new { errors });
        }
    }
}