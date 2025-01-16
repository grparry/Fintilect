using Psi.Data.Models.Domain.Themes;
using System.Collections.Generic;

namespace Omega.Presentation.Mvc.Models.Themes
{
	public class ListThemesViewModel
    {
		public ThemeProduct Product { get; set; }
        public List<ThemeModel> Themes { get; set; }
    }
}