// Generated imports
import { HarlandCheckReorder } from '../HarlandCheckReorder';
import { MainStreetCheckReorder } from '../MainStreetCheckReorder';

export interface CheckReorder {
    harlandCheckReorder: HarlandCheckReorder;
    mainStreetCheckReorder: MainStreetCheckReorder;
    /** @settingKey CheckReorder.AccountInfoCacheExpirationTimeInHours */
    accountInfoCacheExpirationTimeInHours: number;
    /** @settingKey CheckReorder.JointOwnerOnChecksIsEnabled */
    jointOwnerOnChecksIsEnabled: boolean;
}
