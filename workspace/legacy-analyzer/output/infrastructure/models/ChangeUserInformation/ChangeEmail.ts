// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface ChangeEmail {
    /** @settingKey Mobile.Settings.ChangeEmail.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Settings.ChangeEmail.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Settings.ChangeEmail.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Settings.ChangeEmail.Enabled */
    enabled: boolean;
    /** @settingKey X.App.HomeBanking.EmailType */
    emailType: string;
    authentication: Authentication;
}
