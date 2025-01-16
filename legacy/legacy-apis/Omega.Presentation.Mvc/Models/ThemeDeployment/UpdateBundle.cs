using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Psi.Data.Models.Domain.ThemeDeploy;
using Psi.Data.Models.Domain.Themes;

namespace Omega.Presentation.Mvc.Models.ThemeDeployment
{
    public class UpdateBundleViewModel
    {

        public ThemeDeployModel Deploy { get; set; }
        public List<ThemeModel> Themes { get; set; }
    }
}