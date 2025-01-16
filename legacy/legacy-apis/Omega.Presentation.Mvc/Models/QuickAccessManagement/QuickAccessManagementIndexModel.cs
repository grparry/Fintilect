using System.Collections.Generic;
using Psi.Data.Models.Domain.UserDevices;

namespace Omega.Presentation.Mvc.Models.QuickAccessManagement
{
    public class QuickAccessManagementIndexModel : ModelBase
    {
    }

    public class QuickAccessManagementDisplayDevicesModel
    {
        public List<QuickAccessDevice> Devices { get; set; }
    }
}