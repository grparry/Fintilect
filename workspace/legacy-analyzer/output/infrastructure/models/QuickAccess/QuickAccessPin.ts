// Generated imports
import { ResetDate } from '../ResetDate';

export interface QuickAccessPin {
    /** @settingKey Mobile.Security.QuickAccess.Pin.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Security.QuickAccess.Pin.Type */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Pin type can be numeric or alphanumeric
     * /// /// </summary>
     * /// </summary>
     */
    type: string;
    /** @settingKey Mobile.Security.QuickAccess.Pin.Length */
    length: number;
    /** @settingKey Mobile.Security.QuickAccess.Pin.ResetDate */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If a user has not created a pin since before this date, the user must create a new pin.
     * /// /// </summary>
     * /// </summary>
     */
    system: ResetDate;
}
