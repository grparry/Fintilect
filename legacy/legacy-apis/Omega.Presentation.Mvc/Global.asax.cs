using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            JsonFormatterConfig.ConfigureJsonFormatting();
            SettingsManager.Settings.RefreshSettings();
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new CustomViewEngine());
            HomeBankingAdmin.Global.Wireup(false);
        }

        protected void Application_EndRequest()
        { //Put a breakpoint here to find hidden error messages.
            //When debugging, if you have an error you can view this.Context.AllErrors in the watch window to see an array of all the current errors from the request.
        }
        
    }
}
