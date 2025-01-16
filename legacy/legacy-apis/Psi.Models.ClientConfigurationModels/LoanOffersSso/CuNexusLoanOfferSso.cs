using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.LoanOffersSso
{
    public class CuNexusLoanOfferSso : SettingsBaseHelper
    {
        public CuNexusLoanOfferSso(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>feature enabled</summary>
        [SettingKey("LoanOffers.CuNexusLoanOfferSso.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LoanOffers.CuNexusLoanOfferSso.ShouldUseMemberNumber")]
        public bool ShouldUseMemberNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>if true, show the CuNexus widget on the dashboard</summary>
        [SettingKey("LoanOffers.CuNexusLoanOfferSso.ShouldShowWidgetOnDashboard")]
        public bool ShouldShowWidgetOnDashboard
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LoanOffers.CuNexusOfferSso.ShouldShowLoanButtonInOlb")]
        public bool ShouldShowLoanButtonInOlb
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LoanOffers.CuNexusLoanOfferSso.RequestUrl")]
        public string CuNexusLoanOfferSsoRequestUrl
        {
            get => GetValue();
            set => SetValue(value);
        }


        [SettingKey("LoanOffers.CuNexusLoanOffer.ResponsiveWidgetIdentifier")]
        public string CuNexusLoanOfferResponsiveWidgetIdentifier
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("LoanOffers.CuNexusLoanOffer.IframeHeightDashboardWidget")]
        public string IframeHeightDashboardWidget
        {
            get => GetValue();
            set => SetValue(value);
        }
		
        [SettingKey("LoanOffers.CuNexusLoanOffer.iFrameHeightOlbView")]
        public string iFrameHeightOlbView
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("LoanOffers.CuNexusLoanOfferSso.ShouldUseCorelationPersonNumber")]
        public bool ShouldUseCorelationPersonNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
