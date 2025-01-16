using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class Criteria_AccountNumberGroup : ModelBase
    {
        public long AccountNumberGroupId { get; set; }
        public string GroupName { get; set; }
        public bool IsActive { get; set; }
        public AccountGroupsKind SelectedGroupKind { get; set; }
        public string AccountNumberList { get; set; }
        public bool ShouldMapMemberNumbersToEAgreementNumbers { get; set; }
        public bool CanMapMemberNumberToEAgreementNumber { get; set; }

    }

    public enum AccountGroupsKind
    {
        All,
        List,
        Upload,
        Other
    }
}