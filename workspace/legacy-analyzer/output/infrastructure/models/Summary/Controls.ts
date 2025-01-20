// Generated imports
import { CreditCards } from '../CreditCards';

export interface Controls {
    /** @settingKey Summary.SummarySidePanelEnabled */
    summarySidePanelEnabled: boolean;
    /** @settingKey Summary.PanelOrder */
    /**
     * //InsuredAccountSummary,AccountLimits,UninsuredInvestmentSummary,LoanSummary,CreditCardSummary,CardlyticsContainer,ChangeMember,UrgentAlertsModal
     */
    panelOrderString: string;
    creditCards: CreditCards;
}
