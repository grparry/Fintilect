using System.Web.Mvc;
using System.Web.Routing;
using Omega.Presentation.Mvc.Business;

namespace Omega.Presentation.Mvc.Filters
{
	/// <summary>
	/// Set a controller or action to be available only to a specific permission level.
	/// </summary>
	public class PermissionFilterAttribute : AuthorizeAttribute
	{
		public PermissionLevel PermissionLevel { get; set; }

		public override void OnAuthorization(AuthorizationContext filterContext)
		{
			base.OnAuthorization(filterContext);

			var user = Util.GetUser();
			if (user == null || !user.PermissionLevel.CanView(PermissionLevel))
				filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { Controller = "Home", Action = "FeatureNotAvailable" }));

			// Our Omega authorization needs a little bit of work.  When we use an AuthorizeAttribute, sometimes it returns a 401 message which brings up
			// windows authentication request (enter username/password) in the browser.
			if (filterContext.Result is HttpUnauthorizedResult)
				filterContext.Result = null;
		}
	}
}