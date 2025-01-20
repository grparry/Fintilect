// Generated imports
import { CreditCardLocationSettings } from '../CreditCardLocationSettings';
import { DebitCardLocationSettings } from '../DebitCardLocationSettings';

export interface CardControlLocations {
    creditCardLocationSettings: CreditCardLocationSettings;
    debitCardLocationSettings: DebitCardLocationSettings;
    /** @settingKey Mobile.CardControl.Locations.CurrentLocationEnabled */
    currentLocationEnabled: boolean;
    /** @settingKey Mobile.CardControl.Locations.RegionsEnabled */
    regionsEnabled: boolean;
    /** @settingKey Mobile.CardControl.Locations.UsOnlyEnabled */
    usOnlyEnabled: boolean;
    /** @settingKey Mobile.CardControl.Locations.MaxNumberOfRegions */
    maxNumberOfRegions: number;
}
