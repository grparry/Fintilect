using System;
using System.Collections.Generic;
using System.Linq;
using Psi.Data.Models.ClientConfigurationModels.LoanOffersSso;

namespace Psi.Data.Models.ClientConfigurationModels.LoanOffers
{
    public class LoanOfferSettings : SettingsBaseHelper
    {
        private CuNexusLoanOfferSso _cuNexusLoanOfferSso;

        public LoanOfferSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }


        public CuNexusLoanOfferSso CuNexusLoanOfferSso
        {
            get { return _cuNexusLoanOfferSso ?? (_cuNexusLoanOfferSso = new CuNexusLoanOfferSso(SettingsBase)); }
            set { _cuNexusLoanOfferSso = value; }
        }

    }
}
