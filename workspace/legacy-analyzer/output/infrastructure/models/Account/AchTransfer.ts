// Generated imports
import { UsaEpay } from '../UsaEpay';
import { PlaceHoldsOnAchTransactions } from '../PlaceHoldsOnAchTransactions';
import { UseInformationalNoteInsteadOfTransferForAchTransactions } from '../UseInformationalNoteInsteadOfTransferForAchTransactions';

export interface AchTransfer {
    /** @settingKey Transfers.Ach.SameDayCutoffInLocalTime */
    sameDayCutoffInLocalTime: string;
    /** @settingKey Transfers.Ach.NextDayCutoffInLocalTime */
    nextDayCutoffInLocalTime: string;
    /** @settingKey Transfers.Messages.ShowCurrentAvailable */
    showCurrentAvailable: boolean;
    /** @settingKey Transfers.Messages.ShowCurrentBalance */
    showCurrentBalance: boolean;
    /** @settingKey Transfers.Ach.TransactionServiceIdentifier */
    guid: string;
    /** @settingKey Transfers.Ach.CheckDepositPermission.Enabled */
    checkDepositPermissionEnabled: boolean;
    /** @settingKey Transfers.Ach.CheckDepositPermission.DisableTransfersWithoutPermission */
    checkDepositPermissionDisableTransfersWithoutPermission: boolean;
    /** @settingKey Transfers.Ach.Admin.ReadTransfersToProcessFromDatabase */
    adminReadTransfersToProcessFromDatabase: boolean;
    usaEpay: UsaEpay;
    placeHoldsOnAchTransactions: PlaceHoldsOnAchTransactions;
    useInformationalNoteInsteadOfTransferForAchTransactions: UseInformationalNoteInsteadOfTransferForAchTransactions;
}
