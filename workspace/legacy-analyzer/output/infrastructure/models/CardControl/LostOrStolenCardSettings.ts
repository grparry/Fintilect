// Generated imports
import { EligibleCardTypes } from '../EligibleCardTypes';
import { Locations } from '../Locations';

export interface LostOrStolenCardSettings {
    /** @settingKey Mobile.CardControl.LostOrStolen.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.CardControl.LostOrStolen.SendSecureMessageEnabled */
    sendSecureMessageEnabled: boolean;
    /** @settingKey Mobile.CardControl.LostOrStolen.EligibleCardTypes */
    list: EligibleCardTypes;
    /** @settingKey Mobile.CardControl.LostOrStolen.Locations */
    list: Locations;
}
