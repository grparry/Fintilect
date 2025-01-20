// Generated imports
import { MemberProfile } from './MemberProfile';
import { Flags } from './Flags';

export interface MembershipFeature {
    /** @settingKey Membership.MembershipEnabled */
    membershipEnabled: boolean;
    /** @settingKey Membership.MinVersion */
    minVersion: number;
    /** @settingKey Membership.GetMyCUClubSettingsFromDatabase */
    getMyCUClubSettingsFromDatabase: boolean;
    memberProfile: MemberProfile;
    flags: Flags;
    /** @settingKey X.App.HomeBanking.AllowForeignAddressUpdate */
    shouldAllowForeignAddressUpdate: boolean;
}
