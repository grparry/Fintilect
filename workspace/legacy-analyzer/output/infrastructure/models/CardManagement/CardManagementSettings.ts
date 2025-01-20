// Generated imports
import { CotsSettings } from '../CotsSettings';
import { SupportedCardTypes } from '../SupportedCardTypes';
import { RemoveCvvValidationForTheseCardTypes } from '../RemoveCvvValidationForTheseCardTypes';
import { UnacceptablePins } from '../UnacceptablePins';

export interface CardManagementSettings {
    /** @settingKey CardManagement.IsPinChangeEnabled */
    isPinChangeEnabled: boolean;
    /** @settingKey CardManagement.MinVersion */
    minVersion: number;
    /** @settingKey CardManagement.COTS */
    cotsSettings: CotsSettings;
    /** @settingKey CardManagement.PinChange.SupportedCardTypes */
    iEnumerable: SupportedCardTypes;
    /** @settingKey CardManagement.PinChange.RemoveCvvValidationForTheseCardTypes */
    iEnumerable: RemoveCvvValidationForTheseCardTypes;
    /** @settingKey CardManagement.PinChange.UnacceptablePins */
    iEnumerable: UnacceptablePins;
    /** @settingKey CardManagement.Dna.ShouldCallCoreForCardNumbers */
    dnaShouldCallCoreForCardNumbers: boolean;
    /** @settingKey CardManagement.TransactionDispute.Enabled */
    transactionDisputeEnabled: boolean;
}
