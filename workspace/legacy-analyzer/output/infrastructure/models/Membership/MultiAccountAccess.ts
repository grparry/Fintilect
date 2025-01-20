// Generated imports
import { MultiAccountAccessPermissionSource } from '../MultiAccountAccessPermissionSource';

export interface MultiAccountAccess {
    /** @settingKey MultiAccountAccess.Enabled */
    enabled: boolean;
    /** @settingKey MultiAccountAccess.MinVersion */
    minVersion: number;
    /** @settingKey MultiAccountAccess.MobileEnabled */
    mobileEnabled: boolean;
    /** @settingKey MultiAccountAccess.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey MultiAccountAccess.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey MultiAccountAccess.PermissionSource */
    multiAccountAccessPermissionSource: MultiAccountAccessPermissionSource;
    /** @settingKey MultiAccountAccess.LastNameMatching.NumberOfCharactersToMatch */
    lastNameMatchingNumberOfCharactersToMatch: number;
    /** @settingKey MultiAccountAccess.Disclosure.ShouldShowLink */
    disclosureShouldShowLink: boolean;
    /** @settingKey MultiAccountAccess.GlobalFeatureAccess */
    globalFeatureAccessEncrypted: string;
}
