using System;
using System.Web.Mvc;
using NLog;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.AuditLogExport;
using Psi.Data.Models.Domain;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class AuditLogExportController : OmegaBaseController
    {
        public ActionResult Index()
        {
            var model = new AuditLogExportViewModel();
            if (!SettingsManager.Settings.OmegaConfiguration.Features.AuditLogExportToolEnabled || !model.User.PermissionLevel.CanView(PermissionLevel.Support))
            {
                return View("FeatureNotAvailable");
            }
            
            return View(model);
        }

        [HttpPost]
        public ActionResult GenerateAuditLogExportFile(AuditLogExportViewModel model)
        {
            switch (SettingsManager.Settings.OmegaConfiguration.Features.AuditLogExportRemoteLoggingVendor)
            {
                case RemoteLoggingVendorType.None:
                case RemoteLoggingVendorType.GuardianAnalytics:
                    Logger.Error("Unable to generate export file. Remote Logging Vendor type " +
                                                             $"{SettingsManager.Settings.OmegaConfiguration.Features.AuditLogExportRemoteLoggingVendor} is not supported");
                    model.Success = false;
                    break;
                case RemoteLoggingVendorType.Verafin:
                    model.Success = Util.GenerateVerafinAuditLogExportFile(model.StartDate.ToUniversalTime(), model.EndDate.ToUniversalTime());
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            return View("Index", model);
        }
    }
}