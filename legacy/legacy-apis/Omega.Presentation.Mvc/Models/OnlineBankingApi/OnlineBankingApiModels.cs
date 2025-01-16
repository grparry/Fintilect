using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Psi.Data.Models.Domain.OnlineBankingApi;

namespace Omega.Presentation.Mvc.Models.OnlineBankingApi
{
    public class OnlineBankingApiViewModel : ModelBase
    {
        public List<ApiCredentials> Credentials { get; set; }
    }

    public class EditApiCredentialsViewModel : ModelBase
    {
        public ApiCredentials Credentials { get; set; }

        [Display(Name = @"New Password")]
        public string NewSharedKey { get; set; }
    }
}