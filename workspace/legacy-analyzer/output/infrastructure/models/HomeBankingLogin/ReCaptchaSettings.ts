// Generated imports
import { IpWhitelist } from '../IpWhitelist';

export interface ReCaptchaSettings {
    /** @settingKey ReCaptchaSettings.ReCaptchaEnabled */
    reCaptchaEnabled: boolean;
    /** @settingKey ReCaptchaSettings.MinVersion */
    minVersion: number;
    /** @settingKey ReCaptchaSettings.SiteKey */
    siteKey: string;
    /** @settingKey ReCaptchaSettings.SecretKey */
    secretKey: string;
    /** @settingKey ReCaptchaSettings.UseInvisibleCheckbox */
    shouldUseInvisibleCheckbox: boolean;
    /** @settingKey ReCaptchaSettings.InvisibleSiteKey */
    invisibleSiteKey: string;
    /** @settingKey ReCaptchaSettings.InvisibleSecretKey */
    invisibleSecretKey: string;
    /** @settingKey ReCaptchaSettings.IpWhitelistEnabled */
    ipWhitelistEnabled: boolean;
    /** @settingKey ReCaptchaSettings.IpWhitelist */
    list: IpWhitelist;
}
