// Generated imports
import { QuickAccess } from '../MobileConfigurations/Security/QuickAccess/QuickAccess';
import { Biometrics } from '../MobileConfigurations/Security/Biometrics/Biometrics';
import { PermissionLevel } from '../MobileConfigurations/Security/PermissionLevel/PermissionLevel';
import { Settings } from '../Settings';
import { AppShield } from '../MobileConfigurations/Security/AppShield/AppShield';
import { LayeredSecurity } from '../MobileConfigurations/Security/LayeredSecurity/LayeredSecurity';
import { SmsSecurityCode } from '../MobileConfigurations/Security/Mfa/SmsSecurityCode';

export interface Security {
    quickAccess: QuickAccess;
    biometrics: Biometrics;
    permissionLevel: PermissionLevel;
    settings: Settings;
    appShield: AppShield;
    layeredSecurity: LayeredSecurity;
    mfa: SmsSecurityCode;
}
