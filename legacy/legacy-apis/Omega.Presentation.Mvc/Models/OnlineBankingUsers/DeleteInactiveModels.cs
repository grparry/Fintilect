using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingUser;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Models.OnlineBankingUsers
{
	public class DeleteInactiveParametersViewModel : ModelBase
	{
		public DeleteInactiveParametersViewModel()
		{
			NotLoggedInSince = DateTime.Today.AddDays(-SettingsManager.Settings.OmegaConfiguration.Features.DeleteOnlineBankingUsersInitialDaysAgoToList);
		}

		[Required(ErrorMessage = "You must enter a date."), DataType(DataType.Date)]
		[Display(Name = "Haven't Logged In Since")]
		public DateTime NotLoggedInSince { get; set; }

		public bool IncludeWithScheduledTransfers { get; set; }

		public List<OnlineBankingUserToDelete> OnlineBankingUsersToDelete { get; set; }

        public string SortCategory { get; set; }

        public bool AllowCsvExportBeforeDeletingUsers { get; set; }
    }
}