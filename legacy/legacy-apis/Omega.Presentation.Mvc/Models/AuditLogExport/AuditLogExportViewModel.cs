using System;

namespace Omega.Presentation.Mvc.Models.AuditLogExport
{
    public class AuditLogExportViewModel : ModelBase
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool? Success { get; set; }
    }
}