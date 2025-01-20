// Generated imports
import { uint } from '../uint';

export interface PlaceHoldsOnAchTransactions {
    /** @settingKey Transfers.Ach.PlaceHoldsOnAchTransactions.MinVersion */
    minVersion: number;
    /** @settingKey Transfers.Ach.PlaceHoldsOnAchTransactions.Enabled */
    enabled: boolean;
    /** @settingKey Transfers.Ach.PlaceHoldsOnAchTransactions.StartMemoNumber */
    startMemoNumber: string;
    /** @settingKey Transfers.Ach.PlaceHoldsOnAchTransactions.StopMemoNumber */
    stopMemoNumber: string;
    /** @settingKey Transfers.Ach.PlaceHoldsOnAchTransactions.DaysTillHoldExpires */
    daysTillHoldExpires: uint;
    /** @settingKey Transfers.Ach.PlaceHoldsOnAchTransactions.AmountToReleaseImmediately */
    amountToReleaseImmediately: number;
}
