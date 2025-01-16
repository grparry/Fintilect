using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Psi.Data.Models.Domain.Themes;

namespace Omega.Presentation.Mvc.Views.Themes
{
    public static class ThemeFileViewModelExtensions
    {
        public static ThemeFileModel ToDomain(this ThemeFileViewModel from)
        {
            var domainThemeFile = new ThemeFileModel
            {
                PublicId = from.PublicId,
                Filename = from.FileName,
                ContentString = from.ContentString,
                OutputContentString = from.OutputContentString,

                ThemePublicId = from.ThemePublicId,
                ThemeFileParentAction = from.ThemeFileParentAction

            };
            if (from.ContentString.IsNotNullOrEmptyAfterTrim())
            {
                //TODO:  Get rid of or combine content string or contents.  If we keep both properties, one of them should be readonly.
                domainThemeFile.Contents = Encoding.UTF8.GetBytes(domainThemeFile.ContentString);
            }
            if (domainThemeFile.OutputContentString.IsNotNullOrEmptyAfterTrim())
            {
                domainThemeFile.OutputContents = Encoding.UTF8.GetBytes(domainThemeFile.OutputContentString);
            }

            return domainThemeFile;
        }

        public static ThemeFileViewModel ToViewModel(this ThemeFileModel x)
        {
            return ToViewModel(x, x.ThemePublicId);
        }


        public static ThemeFileViewModel ToViewModel(this ThemeFileModel x, Guid themeBeingEdited)
        {
            return new ThemeFileViewModel
            {
                PublicId = x.PublicId,
                ThemePublicId = x.ThemePublicId,
                ContentString = x.ContentString,
                OutputContentString = x.OutputContentString,
                FileName = x.Filename,
                CreatedDate = x.CreatedDate,
                ModifiedDate = x.ModifiedDate,
                //                FileSizeString = //TODO: Find out if we need to worry about filesizestring
                Path = x.Path,
                ThemeFileParentAction = x.ThemeFileParentAction,
                ThemeBeingEdited = themeBeingEdited
            };
        }

        public static List<ThemeFileViewModel> AllFiles(this ThemeModel theme)
        {
            theme.Files.Sort();
            return theme.Files.Select(ToViewModel).ToList();
        }
    }
}