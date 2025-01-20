// Generated imports
import { EyeScanVendor } from '../EyeScanVendor';

export interface EyeScan {
    /** @settingKey Mobile.Security.Biometrics.EyeScan.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Security.Biometrics.EyeScan.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Security.Biometrics.EyeScan.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Security.Biometrics.EyeScan.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Security.Biometrics.EyeScan.Vendor */
    eyeScanVendor: EyeScanVendor;
    /** @settingKey Mobile.Security.Biometrics.EyeScan.ApiKey */
    apiKey: string;
}
