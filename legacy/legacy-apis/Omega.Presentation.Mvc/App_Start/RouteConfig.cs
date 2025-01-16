using System.Web.Mvc;
using System.Web.Routing;
using NLog;

namespace Omega.Presentation.Mvc
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

	        routes.MapRoute("ThemeBrowserTestFile", "Themes/ThemeDownload/{id}/browsertest/{*filename}", new {controller = "ThemeDownload", action = "BrowserTestFile" });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }

    public class CustomViewEngine : RazorViewEngine
    {
        public CustomViewEngine()
        {
            LogManager.GetCurrentClassLogger().Info("building custom view Engine");
            MasterLocationFormats = new[]
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml",

                "~/bin/Areas/Alerts/Views/{1}/{0}.cshtml",
                "~/bin/Areas/Alerts/Views/{1}/{0}.vbhtml",
                "~/bin/Areas/Alerts/Views/Shared/{0}.cshtml",
                "~/bin/Areas/Alerts/Views/Shared/{0}.vbhtml",

                "~/bin/Areas/AlertsAdmin/Views/{1}/{0}.cshtml",
                "~/bin/Areas/AlertsAdmin/Views/{1}/{0}.vbhtml",
                "~/bin/Areas/AlertsAdmin/Views/Shared/{0}.cshtml",
                "~/bin/Areas/AlertsAdmin/Views/Shared/{0}.vbhtml",
            };
            ViewLocationFormats = new[]
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml",

                "~/bin/Areas/Alerts/Views/{1}/{0}.cshtml",
                "~/bin/Areas/Alerts/Views/{1}/{0}.vbhtml",
                "~/bin/Areas/Alerts/Views/Shared/{0}.cshtml",
                "~/bin/Areas/Alerts/Views/Shared/{0}.vbhtml",
                      
                "~/bin/Areas/AlertsAdmin/Views/{1}/{0}.cshtml",
                "~/bin/Areas/AlertsAdmin/Views/{1}/{0}.vbhtml",
                "~/bin/Areas/AlertsAdmin/Views/Shared/{0}.cshtml",
                "~/bin/Areas/AlertsAdmin/Views/Shared/{0}.vbhtml",
            };
            PartialViewLocationFormats = new[]
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml",

                "~/bin/Areas/Alerts/Views/{1}/{0}.cshtml",
                "~/bin/Areas/Alerts/Views/{1}/{0}.vbhtml",
                "~/bin/Areas/Alerts/Views/Shared/{0}.cshtml",
                "~/bin/Areas/Alerts/Views/Shared/{0}.vbhtml",

                "~/bin/Areas/AlertsAdmin/Views/{1}/{0}.cshtml",
                "~/bin/Areas/AlertsAdmin/Views/{1}/{0}.vbhtml",
                "~/bin/Areas/AlertsAdmin/Views/Shared/{0}.cshtml",
                "~/bin/Areas/AlertsAdmin/Views/Shared/{0}.vbhtml",
            };
        }
    }
}
