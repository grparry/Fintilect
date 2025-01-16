using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.NewMobileFeatures;
using Psi.Data.Models.Domain.NewMobileFeatures;


namespace Omega.Presentation.Mvc.Controllers
{
	public class NewMobileFeaturesController : OmegaBaseController
    {
		private readonly NewMobileFeaturesRepository _newMobileFeaturesRepository;

		public NewMobileFeaturesController()
		{
			// TODO: Eventually would like to take time to get MVC Unity working properly.
			_newMobileFeaturesRepository = new NewMobileFeaturesRepository();
		}

		[HttpGet]
		public ActionResult Index()
		{
			var model = new NewMobileFeaturesModel();
			ViewBag.BaseModel = model;  // for user authentication
            if (!model.User.PermissionLevel.CanView(PermissionLevel.Support))
            {
                return View("FeatureNotAvailable");
            }

			var newMobileFeaturesList = GetNewMobileFeatures();

			return View("Index", newMobileFeaturesList);
		}

		// Get a SINGLE feature to update or create a new feature ---- this appears in a MODAL
		[HttpGet]
		public ActionResult ManageFeature(int id, string mode)
		{
			var model = new NewMobileFeaturesModel();
			ViewBag.BaseModel = model;  // for user authentication

			ViewBag.Mode = mode;
			var mobileFeature = new NewMobileFeatureModel();

			if (mode == "update")
			{
				mobileFeature = GetSingleMobileFeature(id);

				// Get the byte array[] out of the image prop  
				var featureImage = mobileFeature.Image;

				if(featureImage != null ) {
					// Get the mime type (.png, .gif, .jpg or .jpeg) minus the dot
					string fileName = mobileFeature.FileName;
					string mimeTypeString = fileName.Substring(fileName.LastIndexOf(".") + 1); 
				 
					// Convert the byte[] array image data to base 64 for HTML viewing capability
					var base64Image = Convert.ToBase64String(featureImage);

					// Construct a base64 src string that the <img> tag will recognize on the front end:
					var srcString = "data:image/" + mimeTypeString + ";base64," + base64Image;

					// Put it into the viewbag so we can set the 'src' attribute in the view:
					ViewBag.FeatureImageSrc = srcString;  
				}

			}
			else if (mode == "create")
			{
				mobileFeature.Id = 0;
			}

			return PartialView("_MobileFeatureDetailModal", mobileFeature);
		}

		// Create a NEW feature
		[HttpPost]
		public ActionResult CreateFeature(NewMobileFeatureModel feature)
		{
			if (ModelState.IsValid)
			{
				// Get the image upload if there is any:
				if (Request.Form.HasKeys() && Request.Files.Count > 0)
				{
					// for db:
					dynamic fileContent = null;
					var filename = string.Empty;

					// convert file to byte to assign to the model
					var uploadedFile = Request.Files[0];

					// convert to Byte for saving in a db:
					if (uploadedFile != null && uploadedFile.ContentLength > 0)
					{
						dynamic fileByte = new byte[uploadedFile.ContentLength];
						uploadedFile.InputStream.Read(fileByte, 0, (uploadedFile.ContentLength - 1));
						fileContent = fileByte;
						filename = uploadedFile.FileName;
					}  
				 
					if (filename != string.Empty && fileContent != null)
					{
						feature.Image = fileContent;
						feature.FileName = filename;
					}
				}

				// Build the new object and ADD it:
				var newFeature = _newMobileFeaturesRepository.AddOrUpdateFeature(new NewMobileFeatureModel
				{
					Description = feature.Description,
					DeepLinkUrl = feature.DeepLinkUrl,
					Name = feature.Name,
					FileName = feature.FileName,
					Image = feature.Image
				});


				if (!string.IsNullOrEmpty(newFeature.Name))
				{
					return Content("success", "text/html");
				}

				return Content("error", "text/html");
			}

			return Content("error", "text/html");
		}

		// Save changes to an existing feature
		[HttpPost]
		public ActionResult UpdateFeature(NewMobileFeatureModel feature)
		{
			if (!ModelState.IsValid) return Content("error", "text/html");

            //  We must get the existing one first, because it has the file upload information:
            var mobileFeature = new NewMobileFeatureModel();
            mobileFeature = GetSingleMobileFeature(Convert.ToInt32(feature.Id));

            // Check if "remove image" is checked. if so, remove image from model:
            if (Request["RemoveImageHidden"] == "yes")
            {
                mobileFeature.Image = null;
                mobileFeature.FileName = null;
            }

                // Get the image upload if there is any:
            if (Request.Form.HasKeys() && Request.Files.Count > 0) {
				// for db:
				dynamic fileContent = null;
				var filename = string.Empty;

				// convert file to byte to assign to the model
				var uploadedFile = Request.Files[0];

				// convert to Byte for saving in a db:
				if (uploadedFile != null && uploadedFile.ContentLength > 0)
				{
					dynamic fileByte = new byte[uploadedFile.ContentLength];
					uploadedFile.InputStream.Read(fileByte, 0, (uploadedFile.ContentLength - 1));
					fileContent = fileByte;
					filename = uploadedFile.FileName;
				}


				if (filename != string.Empty && fileContent != null)
				{
                    mobileFeature.Image = fileContent;
                    mobileFeature.FileName = filename;
				}
			}

			_newMobileFeaturesRepository.AddOrUpdateFeature(new NewMobileFeatureModel
			{
				Id = mobileFeature.Id,
				Description = feature.Description,
				DeepLinkUrl = feature.DeepLinkUrl,
				Name = feature.Name,
				FileName = mobileFeature.FileName,
				Image = mobileFeature.Image
			});

			var result = "success";

			if (result.ToLower() == "success")
			{
				return Content("success", "text/html");
			}

			return Content("error", "text/html");
		}

		// Delete an existing feature
		[HttpGet]
		public ActionResult DeleteFeature(int id)
		{
			if (_newMobileFeaturesRepository.DeleteFeature(new NewMobileFeatureModel { Id = id }))
			{
				return Content("success", "text/html");
			}

			return Content("error", "text/html");
		}

		// conveniance methods:
		//
		// Get a single feature
		public NewMobileFeatureModel GetSingleMobileFeature(int id)
		{
			var feature = _newMobileFeaturesRepository.GetNewMobileFeatures(id);
 
			return feature.FirstOrDefault();
		}

		// Get all new mobile features
		public List<NewMobileFeatureModel> GetNewMobileFeatures()
		{
			var newMobileFeaturesList = _newMobileFeaturesRepository.GetNewMobileFeatures();

			return newMobileFeaturesList;
		}

	}
}