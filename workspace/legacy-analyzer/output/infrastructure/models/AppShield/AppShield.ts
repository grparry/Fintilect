// Generated imports
import { ModulePortAuthority } from '../ModulePortAuthority';
import { ModuleSecureCamera } from '../ModuleSecureCamera';
import { ModuleSecureKeyboard } from '../ModuleSecureKeyboard';

export interface AppShield {
    /** @settingKey Mobile.Security.AppShield.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Security.AppShield.AndroidDevLicenseKey */
    androidDevLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.AndroidQualityAssessmentLicenseKey */
    androidQualityAssessmentLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.AndroidTestLicenseKey */
    androidTestLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.AndroidProdTestLicenseKey */
    androidProdTestLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.AndroidStageLicenseKey */
    androidStageLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.AndroidReleaseLicenseKey */
    androidReleaseLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.IosDevLicenseKey */
    iosDevLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.IosTestLicenseKey */
    iosTestLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.IosProdTestLicenseKey */
    iosProdTestLicenseKey: string;
    /** @settingKey Mobile.Security.AppShield.IosReleaseLicenseKey */
    iosReleaseLicenseKey: string;
    appWhiteList: ModulePortAuthority;
    appWhiteList: ModuleSecureCamera;
    appWhiteList: ModuleSecureKeyboard;
}
