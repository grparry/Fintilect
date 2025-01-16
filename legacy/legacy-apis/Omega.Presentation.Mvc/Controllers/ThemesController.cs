using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Filters;
using Omega.Presentation.Mvc.Models.Themes;
using Omega.Presentation.Mvc.Views.Themes;
using Psi.Business.ServiceContracts.RequestResponse.Utilities;
using Psi.Data.Models.Domain.Themes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Controllers
{
	[PermissionFilter(PermissionLevel = PermissionLevel.Support)]
	public class ThemesController : OmegaBaseController
    {
	    private readonly ThemesRepository _themesRepository;

	    public ThemesController()
	    {
			// TODO: Eventually would like to take time to get MVC Unity working properly and inject in constructor
		    _themesRepository = new ThemesRepository();
		}

		public ActionResult Index(ThemeProduct product)
        {
			return View(new ListThemesViewModel {
				Themes = _themesRepository.GetThemes(product).OrderBy(x => x.Title).ToList(),
				Product = product
			});
        }

	    public ActionResult PublishThemeModal(Guid id)
	    {
		    return PartialView("_PublishThemeModal", _themesRepository.GetTheme(id));
	    }

		public ActionResult EditThemeModal(Guid id, [System.Web.Http.FromUri] ThemeProduct product = ThemeProduct.ConnectNative, [System.Web.Http.FromUri] Guid? parentId = null)
	    {
		    ThemeModel theme;

	        if (id != Guid.Empty)
	            theme = _themesRepository.GetTheme(id);
	        else
	        {
			    theme = new ThemeModel
			    {
			        Product = product
			    };
	            if (parentId.HasValue)
	            {
	                theme.ParentThemePublicId = parentId.Value;
	                theme.ParentTheme = _themesRepository.GetTheme(parentId.Value);
	            }
            }

            return PartialView("_EditThemeModal", theme);
	    }

		[HttpPost]
	    public JsonResult Theme([Bind(Include = "Title,PublicId,ParentThemePublicId")] ThemeModel theme)
        { 
			if (!ModelState.IsValid)
				return ModelStateErrors();

			theme = _themesRepository.SaveTheme(theme);

			if (theme == null)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return Json(null);
			}

			// Return the link to view this new theme's details.
			var url = Url.Action("Theme", new {id = theme.PublicId});

			return Json(new { url });
		}

	    public ActionResult Theme(Guid id)
	    {
			var theme = _themesRepository.GetTheme(id);

		    theme.Files.Sort();

			return View(theme);
	    }

	    public ActionResult EditFileModal(Guid id, Guid themePublicId, string filename, ThemeInstanceFileParentAction? fileEditAction)
	    {
		    ThemeFileViewModel file = new ThemeFileViewModel();
			var domainThemeFile = id.Equals(Guid.Empty) ? new ThemeFileModel { Filename = filename } : _themesRepository.GetFile(id);

			if (id == Guid.Empty && !fileEditAction.HasValue)
		    {
				// Creating a new file for this theme.
			    file = new ThemeFileViewModel{ ThemePublicId = themePublicId };
			}
			else if (themePublicId.Equals(domainThemeFile.ThemePublicId))
			{
				// Simple edit of a file in this theme or Editing existing modification to a parent file
				file = domainThemeFile.ToViewModel(themePublicId);
			}
			else if (!themePublicId.Equals(domainThemeFile.ThemePublicId) && fileEditAction.HasValue)
			{
				// Adding modification to a parent file

				domainThemeFile.PublicId = Guid.Empty;
				domainThemeFile.ThemePublicId = themePublicId;
				domainThemeFile.ThemeFileParentAction = fileEditAction;
				domainThemeFile.Contents = new byte[0];
				domainThemeFile.ContentString = string.Empty;

				file = domainThemeFile.ToViewModel(themePublicId);
			}

			// Get parent contents if appropriate
		    if (domainThemeFile.ThemeFileParentAction == ThemeInstanceFileParentAction.Modify)
				file.ParentContentString = Encoding.UTF8.GetString(_themesRepository.GetThemeFileParentContents(themePublicId, filename));

			if (domainThemeFile.Contents != null)
				file.ContentString = Encoding.UTF8.GetString(domainThemeFile.Contents);

			return PartialView("_EditFileModal", file);
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

		[HttpPost]
	    public JsonResult ThemeFile(ThemeFileViewModel file)
	    {
		    if (!ModelState.IsValid)
			    return ModelStateErrors();
		    try
		    {
		        var domainThemeFile = _themesRepository.SaveFile(file.ToDomain());

			    if (domainThemeFile == null)
			    {
				    Response.StatusCode = (int) HttpStatusCode.BadRequest;
				    return Json(null);
			    }

			    return Json(domainThemeFile.ToViewModel());
		    }
		    catch (UserFacingException e)
		    {
			    return ErrorMessage(e.Message);
		    }
	    }

	    private JsonResult ErrorMessage(string errorMessage)
	    {
			Response.StatusCode = (int)HttpStatusCode.BadRequest;
		    var errors = new List<string> {errorMessage};
			return Json(new { errors });
		}

		public ActionResult DeleteFileModal(Guid fileId, string filename, Guid themeIdBeingEdited)
		{
			var themeFile = fileId != Guid.Empty
				? _themesRepository.GetFile(fileId)
				: new ThemeFileModel { Filename = filename };

			return PartialView("_DeleteFileModal", themeFile.ToViewModel(themeIdBeingEdited));
	    }

		[HttpPost]
	    public JsonResult DeleteThemeFile(ThemeFileViewModel file)
	    {
	        try
	        {
	            if (!ModelState.IsValid)
	                return ModelStateErrors();

				if (file.ThemeBeingEdited != file.ThemePublicId)
	            {
					// Exclude a parent file
		            _themesRepository.SaveFile(new ThemeFileModel { 
						ThemePublicId = file.ThemeBeingEdited,
						Filename = file.FileName,
						ThemeFileParentAction = ThemeInstanceFileParentAction.Delete
					});
	            }
	            else //Delete a themeFile, or remove the override of a parent themFile.
	            {
	                _themesRepository.DeleteFile(file.ToDomain());
	            }

	            // TODO: What to return?
	            return Json(new { });
	        }
	        catch (UserFacingException ex)
	        {
	            return ErrorMessage(ex.Message);
	        }
		    
	    }

	    public ActionResult DeprecateThemeModal(Guid id)
	    {
		    return PartialView("_DeprecateThemeModal", _themesRepository.GetTheme(id));
	    }

	    [HttpPost]
	    public JsonResult DeprecateTheme(ThemeModel theme)
	    {
		    if (!ModelState.IsValid)
			    return ModelStateErrors();

		    _themesRepository.DeprecateTheme(theme);

		    // TODO: What to return?
		    return Json(new { });
	    }

		public ActionResult UploadFile()
	    {
			// Request.Form["folder"] - check if null, split by comma, that's the folder!
			// Request.Form["theme"] - check if null, split by comma, that's the theme!
		    string folder = string.Empty;
		    if (!string.IsNullOrEmpty(Request.Form["folder"]))
		    {
			    folder = Request.Form["folder"].Split(',')[0].Trim();
			    if (!string.IsNullOrEmpty(folder) && !folder.EndsWith("/"))
				    folder += "/";
		    }

			foreach (string fileName in Request.Files)
		    {
			    var file = Request.Files[fileName];

			    using (var binaryReader = new BinaryReader(file.InputStream))
			    {
				    _themesRepository.SaveFile(new ThemeFileModel
				    {
					    Filename = $"{folder}{file.FileName}",
					    Contents = binaryReader.ReadBytes(file.ContentLength),
						ThemePublicId = new Guid(Request.Form["theme"].Split(',')[0])
					});
			    }
			}

			return Json(new { });
		}

	    public ActionResult UploadFileModal(Guid themePublicId)
	    {
			return PartialView("_UploadFileModal", themePublicId.ToString());
		}

	    public ActionResult ViewFileModal(Guid id, string filename, Guid themePublicId)
	    {
		    ThemeFileModel domainThemeFile;

		    if (id == Guid.Empty)
			    domainThemeFile = _themesRepository.GetBaseFile(filename, themePublicId);
			else
				domainThemeFile = _themesRepository.GetFile(id);

			var viewModel = domainThemeFile.ToViewModel();

		    if (domainThemeFile.Contents != null)
			    viewModel.ContentString = Encoding.UTF8.GetString(domainThemeFile.Contents);

		    return PartialView("_ViewFileModal", viewModel);
	    }

		[HttpPost]
	    public JsonResult ThemePublish(ThemeModel theme)
		{
			var newGuid = _themesRepository.PublishTheme(theme);
			return Json(new {guid = newGuid});
		}

	    public ActionResult PublishDetailsModal(Guid id)
	    {
		    var publishedThemes = _themesRepository.GetPublishedThemes(id).OrderByDescending(x => x.PublishedDate).ToList();

		    return PartialView("_PublishDetailsModal", publishedThemes);
	    }

	    public ActionResult SelectThemesModal()
	    {
		    return PartialView("_SelectThemesModal", _themesRepository.GetAllThemes()
				.OrderBy(x => x.Title).ThenByDescending(x => x.PublishedDate).ToList());
	    }
    }
}
