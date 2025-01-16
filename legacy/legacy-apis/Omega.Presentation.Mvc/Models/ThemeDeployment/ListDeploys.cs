using System;
using Psi.Data.Models.Domain.ThemeDeploy;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Psi.Data.Models.Domain.Themes;

namespace Omega.Presentation.Mvc.Models.ThemeDeployment
{

        public class ListDeployViewModel
        {
            public List<ThemeDeployModel> Deploys { get; set; }
        }
}