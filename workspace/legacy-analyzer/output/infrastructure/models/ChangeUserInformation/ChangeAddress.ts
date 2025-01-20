// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface ChangeAddress {
    /** @settingKey Mobile.Settings.ChangeAddress.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Settings.ChangeAddress.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Settings.ChangeAddress.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Settings.ChangeAddress.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Settings.ChangeAddress.MaximumAddressLineLength */
    maximumAddressLineLength: number;
    /** @settingKey Mobile.Settings.ChangeAddress.ForeignAddress.Enabled */
    foreignAddressEnabled: boolean;
    authentication: Authentication;
}
