// Generated imports
import { SavedTransfers } from '../MobileConfigurations/Transfers/SavedTransfers';
import { ScheduledTransfersSettings } from '../MobileConfigurations/Transfers/ScheduledTransfersSettings';
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface Transfers {
    /** @settingKey Mobile.Transfers.ShouldShowConfirmDialog */
    shouldShowConfirmDialog: boolean;
    /** @settingKey X.App.HomeBanking.UserTransferDescriptionType */
    userTransferDescriptionType: string;
    /** @settingKey X.App.HBBOL.EnableUserTransferDescription */
    enableUserTransferDescription: boolean;
    /** @settingKey X.App.HomeBanking.PastDueNumberOfDaysUntilLate */
    pastDueNumberOfDaysUntilLate: number;
    /** @settingKey X.App.HomeBanking.HighlightPastDueLoans */
    highlightPastDueLoans: boolean;
    /** @settingKey Mobile.Transfer.ShowMaskedAccountSuffixInAccountName */
    showMaskedAccountSuffixInAccountName: boolean;
    savedTransfers: SavedTransfers;
    scheduledTransfersSettings: ScheduledTransfersSettings;
    authentication: Authentication;
}
