using System;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Data.Models.Domain.Themes;
using System.Collections.Generic;
using Agatha.Common;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Utilities;
using Psi.Data.Models.Domain.ThemeDeploy;

namespace Omega.Presentation.Mvc.Business
{
	/// <summary>
	/// Repository for all Connect Native and Flex Ui themes
	/// </summary>
	public class ThemesRepository
    {
	    private readonly PsiServiceHostService _psiServiceHostService;

		public ThemesRepository()
	    {
		    _psiServiceHostService = new PsiServiceHostService();
	    }

		// Get all themes for a specific product (Connect Native or Flex Ui)
	    public List<ThemeModel> GetThemes(ThemeProduct product)
	    {
		    return ProcessRequest<List<ThemeModel>>(PsiMethodType.GetThemes, product).Payload;
	    }

	    public ThemeModel SaveTheme(ThemeModel theme)
	    {
		    return ProcessRequest<ThemeModel>(PsiMethodType.UpdateTheme, theme).Payload;
	    }

	    public ThemeModel GetTheme(Guid themeId)
	    {
		    return ProcessRequest<ThemeModel>(PsiMethodType.GetTheme, themeId).Payload;
	    }

	    public ThemeFileModel GetFile(Guid fileId)
	    {
		    return ProcessRequest<ThemeFileModel>(PsiMethodType.GetThemeFile, fileId).Payload;
	    }

	    public ThemeFileModel GetBaseFile(string filename, Guid themePublicId)
	    {
			return ProcessRequest<ThemeFileModel>(PsiMethodType.GetBaseThemeFile, new ThemeFileModel
			{
				ThemePublicId = themePublicId,
				Filename = filename
			}).Payload;
		}


		public byte[] GetThemeFileParentContents(Guid themeId, string filename)
	    {
		    return ProcessRequest<byte[]>(PsiMethodType.GetThemeFileParentContents, new ThemeFileModel
		    {
			    ThemePublicId = themeId,
				Filename = filename
		    }).Payload;
	    }

		public ThemeFileModel SaveFile(ThemeFileModel file)
	    {
			return ProcessRequest<ThemeFileModel>(PsiMethodType.UpdateThemeFile, file).Payload;
	    }

	    public void DeleteFile(ThemeFileModel file)
	    {
			if (!ProcessRequest<PsiBasicResponse>(PsiMethodType.DeleteThemeFile, file).WasSuccessful)
				throw new Exception("Unable to delete theme file.");
	    }

		/// <summary>
		/// If something wasn't successful, let's throw an exception for the controller to handle.
		/// </summary>
		private PsiServiceHostResult<T> ProcessRequest<T>(PsiMethodType method, object payload = null)
		{
			var result = _psiServiceHostService.ProcessRequestWithResult<T>(method, payload);
			if (!result.WasSuccessful)
				throw new UserFacingException(string.IsNullOrWhiteSpace(result.WhyNotSuccessful) ? result.WhyNotSuccessful : "Unable to process request.");

			return result;
		}

	    public void DeprecateTheme(ThemeModel theme)
	    {
			theme.DeprecatedDate = DateTime.Now;
		    if (!ProcessRequest<PsiBasicResponse>(PsiMethodType.UpdateTheme, theme).WasSuccessful)
			    throw new Exception("Unable to deprecate theme.");
	    }

	    public Guid PublishTheme(ThemeModel theme)
	    {
			return ProcessRequest<Guid>(PsiMethodType.PublishTheme, theme).Payload;
		}

		public byte[] GetThemeZip(Guid themePublicId)
	    {
	        var themeArray = new[] {themePublicId};
		    return ProcessRequest<byte[]>(PsiMethodType.GetThemeZip, themeArray).Payload;
	    }

		public byte[] GetSubThemesForSourceControl()
	    {
		    return ProcessRequest<byte[]>(PsiMethodType.GetSubThemesForSourceControl).Payload;
	    }

	    public ThemeFileResponseModel GetThemeFileContent(Guid themePublicId, string filename)
	    {
	        return ProcessRequest<ThemeFileResponseModel>(
	            PsiMethodType.GetThemeFileContent, new ThemeFileRequestModel { ThemePublicId = themePublicId, Filename = filename }).Payload;
		}

	    public List<ThemeModel> GetPublishedThemes(Guid id)
	    {
			return ProcessRequest<List<ThemeModel>>(PsiMethodType.GetPublishedThemes, id).Payload;
		}

		public List<ThemeModel> GetAllThemes()
	    {
		    return ProcessRequest<List<ThemeModel>>(PsiMethodType.GetAllThemes).Payload;
	    }

        public List<ThemeDeployModel> GetAllThemeDeploys()
        {
            return ProcessRequest<List<ThemeDeployModel>>(PsiMethodType.GetAllThemeDeploys).Payload;
        }

        public ThemeDeployModel GetDeploy(Guid id)
        {
            return ProcessRequest<ThemeDeployModel>(PsiMethodType.GetDeploy,id).Payload;
        }
        public ThemeDeployModel SaveDeploy(ThemeDeployModel deploy)
        {
            return ProcessRequest<ThemeDeployModel>(PsiMethodType.UpdateDeploy, deploy).Payload;
        }
    }
}