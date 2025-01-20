// Generated imports
import { OutOfBandActionSettings } from '../OutOfBandActionSettings';
import { Authentication } from '../Authentication';

export interface OutOfBandAuthentication {
    /** @settingKey OutOfBandAuthentication.Enabled */
    enabled: boolean;
    /** @settingKey OutOfBandAuthentication.MinVersion */
    minVersion: number;
    /** @settingKey OutOfBandAuthentication.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey OutOfBandAuthentication.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey OutOfBandAuthentication.OutOfBandActionSettings */
    list: OutOfBandActionSettings;
    mobileConfigurations: Authentication;
}
