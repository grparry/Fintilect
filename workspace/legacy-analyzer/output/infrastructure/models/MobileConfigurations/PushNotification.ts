// Generated imports
import { AvailableDeepLinks } from '../AvailableDeepLinks';

export interface PushNotification {
    /** @settingKey Mobile.PushNotification.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.PushNotification.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.PushNotification.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.PushNotification.AvailableDeepLinks */
    dictionary: AvailableDeepLinks;
}
