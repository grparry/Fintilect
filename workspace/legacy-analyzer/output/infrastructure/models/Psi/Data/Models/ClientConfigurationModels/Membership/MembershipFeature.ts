import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MemberProfile } from './MemberProfile';
import { Flags } from './Flags';
export interface MembershipFeatureConfig {
    MembershipEnabled: boolean;
    MinVersion: number;
    GetMyCUClubSettingsFromDatabase: boolean;
    MemberProfile: MemberProfile;
    Flags: Flags;
    ShouldAllowForeignAddressUpdate: boolean;
}

export class MembershipFeature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MembershipFeature'
    };


            private _membershipEnabled: boolean;
            get membershipEnabled(): boolean {
                return this._membershipEnabled;
            }
            set membershipEnabled(value: boolean) {
                this._membershipEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _getMyCUClubSettingsFromDatabase: boolean;
            get getMyCUClubSettingsFromDatabase(): boolean {
                return this._getMyCUClubSettingsFromDatabase;
            }
            set getMyCUClubSettingsFromDatabase(value: boolean) {
                this._getMyCUClubSettingsFromDatabase = value;
            }

            private _memberProfile: MemberProfile;
            get memberProfile(): MemberProfile {
                return this._memberProfile;
            }
            set memberProfile(value: MemberProfile) {
                this._memberProfile = value;
            }

            private _flags: Flags;
            get flags(): Flags {
                return this._flags;
            }
            set flags(value: Flags) {
                this._flags = value;
            }

            private _shouldAllowForeignAddressUpdate: boolean;
            get shouldAllowForeignAddressUpdate(): boolean {
                return this._shouldAllowForeignAddressUpdate;
            }
            set shouldAllowForeignAddressUpdate(value: boolean) {
                this._shouldAllowForeignAddressUpdate = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MembershipFeature.MembershipEnabled", value: this._membershipEnabled, dataType: 'boolean', label: "Membership Enabled" },
                { key: "MembershipFeature.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MembershipFeature.GetMyCUClubSettingsFromDatabase", value: this._getMyCUClubSettingsFromDatabase, dataType: 'boolean', label: "Get My C U Club Settings From Database" },
                { key: "MembershipFeature.MemberProfile", value: this._memberProfile, dataType: 'memberprofile', label: "Member Profile" },
                { key: "MembershipFeature.Flags", value: this._flags, dataType: 'flags', label: "Flags" },
                { key: "MembershipFeature.ShouldAllowForeignAddressUpdate", value: this._shouldAllowForeignAddressUpdate, dataType: 'boolean', label: "Should Allow Foreign Address Update" },
            ];
        }

}