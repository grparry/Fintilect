using Omega.Presentation.Mvc.Business;
using Psi.Data.Models.Domain.Themes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using System.Web.SessionState;

namespace Omega.Presentation.Mvc.Controllers
{
	// Disabling session when downloading theme files.  Otherwise can add significant delays, especially when getting individual files from browser.
	[SessionState(SessionStateBehavior.Disabled)]
	public class ThemeDownloadController : OmegaBaseController
    {
	    private readonly ThemesRepository _themesRepository;

	    public ThemeDownloadController()
	    {
			// TODO: Eventually would like to take time to get MVC Unity working properly and inject in constructor
		    _themesRepository = new ThemesRepository();
		}

	    private static readonly Dictionary<string, string> contentTypes = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
	    {
		    {".html", "text/html"},
		    {".jpeg", "image/jpeg"},
		    {".jpg", "image/jpeg"},
		    {".js", "application/x-javascript"},
		    {".json", "application/json"},
		    {".png", "image/png"},
		    {".css", "text/css"},
		};

	    public ActionResult DownloadTheme(Guid publicId)
	    {
		    var themeZip = _themesRepository.GetThemeZip(publicId);
		    return new FileContentResult(themeZip, "application/zip") { FileDownloadName = "Theme.zip" };
		}

	    public ActionResult DownloadAll(ThemeProduct product)
	    {
		    var themeZip = _themesRepository.GetThemeZip(Guid.Empty);
		    return new FileContentResult(themeZip, "application/zip") { FileDownloadName = "AllThemes.zip" };
	    }

	    public ActionResult DownloadSubThemesForSourceControl(ThemeProduct product)
	    {
		    var themeZip = _themesRepository.GetSubThemesForSourceControl();
		    return new FileContentResult(themeZip, "application/zip") { FileDownloadName = "AllThemes.zip" };
	    }

		/// <summary>
		/// Endpoint to browser to reference individual theme files for testing
		/// </summary>
		/// <param name="id">Theme GUID</param>
		/// <param name="filename">Filename desired</param>
		/// <returns>File contents</returns>
		// See RouteConfig.cs for how traffic is routed here.
	    public ActionResult BrowserTestFile(Guid id, string filename)
		{
            var file = _themesRepository.GetThemeFileContent(id, filename);

		    var extension = Path.GetExtension(filename);

		    var contentType = "application/javascript";
		    if (!string.IsNullOrEmpty(extension) && contentTypes.ContainsKey(extension))
			    contentType = contentTypes[extension];

		    if (file.NotFound || file.Contents == null)
				return new HttpNotFoundResult();

			return new FileContentResult(file.Contents, contentType);
	    }
    }
}
