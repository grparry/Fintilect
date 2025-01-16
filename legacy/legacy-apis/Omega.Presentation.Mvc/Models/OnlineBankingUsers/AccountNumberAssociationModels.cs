using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingUser;
using Psi.Data.Models;
using Psi.Data.Models.ImsClient;

namespace Omega.Presentation.Mvc.Models.OnlineBankingUsers
{
    public class AccountNumberAssociationViewModel : ModelBase
    {
        public AccountNumberAssociationViewModel()
        {            
        }

        public string SearchMode { get; set; }
    }

    public class OnlineBankingUser
    {
        public int AccountNumber;
        public long UUID;
        public string Username;
        public DateTime? LastLogin;
        public DateTime? CreateDate;
        public DateTime? LastModified;
        public AccountNumberHistory[] History;
    }
}