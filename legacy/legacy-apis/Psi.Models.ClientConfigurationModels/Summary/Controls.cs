using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.Summary
{
    public class Controls : SettingsBaseHelper
    {
        private CreditCards _creditCards;

        public Controls(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("Summary.SummarySidePanelEnabled")]
        public bool SummarySidePanelEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        //InsuredAccountSummary,AccountLimits,UninsuredInvestmentSummary,LoanSummary,CreditCardSummary,CardlyticsContainer,ChangeMember,UrgentAlertsModal
        [SettingKey("Summary.PanelOrder")]
        public string PanelOrderString
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public List<string> PanelOrderList()
        {
            var orderstring = PanelOrderString;
            if (string.IsNullOrWhiteSpace(orderstring)) return null;
            return !orderstring.Contains(",") ? new List<string> {orderstring} : orderstring.Split(',').ToList();
        }

        public CreditCards CreditCards
        {
            get { return _creditCards ?? (_creditCards = new CreditCards(SettingsBase)); }
            set { _creditCards = value; }
        }

       
    }
}