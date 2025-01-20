// Generated imports
import { EyeScan } from '../EyeScan';
import { FaceUnlock } from '../FaceUnlock';

export interface Biometrics {
    /** @settingKey Mobile.Security.Biometrics.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Security.Biometrics.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Security.Biometrics.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Security.Biometrics.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Security.Biometrics.ShouldAutoPrompt */
    shouldAutoPrompt: boolean;
    eyeScan: EyeScan;
    faceUnlock: FaceUnlock;
}
