using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Omega.Presentation.Mvc.Controllers
{
    public class OmegaBaseController : Controller
    {
        public OmegaBaseController()
        {
            Logger = LogManager.GetLogger(GetType().ToString());
        }

        internal static Logger Logger { get; set; }

        // Hack to force a relogin when user session times out
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var OmegaUser = filterContext.HttpContext.Session["OmegaUser"];

            // if omegauser is gone then the user needs to relogin
            if (OmegaUser is null)
            {
                // handle the partialview responses (Ajax)
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                   
                    filterContext.Result = new HttpStatusCodeResult(HttpStatusCode.Unauthorized);

                }
                // handle normal view requests
                else
                {
                    
                    var redirectTarget = new RouteValueDictionary { { "Controller", "Home" }, { "Action", "Index" } };
                    filterContext.Result = new RedirectToRouteResult(redirectTarget);

                }

            }
            else
                // nothing to see here continue to on as normal
                base.OnActionExecuting(filterContext);
        }
    }
}