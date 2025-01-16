using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Omega.Presentation.Mvc.Models.Members
{
    public class MemberSearchViewModel
    {
        public List<MemberPresentationModel> memberPresentationModelList { get; set; }
        public List<DnaMemberPresentationModel> dnaMemberPresentationModelList { get; set; }

    }
}