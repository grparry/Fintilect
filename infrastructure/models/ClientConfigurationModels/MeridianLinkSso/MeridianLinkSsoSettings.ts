import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MeridianLinkFields } from '../MeridianLinkFields';
export interface MeridianLinkSsoSettingsConfig {
    ShouldUseMemberNumber: boolean;
    ShouldSendMemberInfo: boolean;
    ShouldUseVersion3: boolean;
    MemberInfo: Record<MeridianLinkFields, boolean>;
}

export class MeridianLinkSsoSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MeridianLinkSsoSettings'
    };


            private _shouldUseMemberNumber: boolean;
            get shouldUseMemberNumber(): boolean {
                return this._shouldUseMemberNumber;
            }
            set shouldUseMemberNumber(value: boolean) {
                this._shouldUseMemberNumber = value;
            }

            private _shouldSendMemberInfo: boolean;
            get shouldSendMemberInfo(): boolean {
                return this._shouldSendMemberInfo;
            }
            set shouldSendMemberInfo(value: boolean) {
                this._shouldSendMemberInfo = value;
            }

            private _shouldUseVersion3: boolean;
            get shouldUseVersion3(): boolean {
                return this._shouldUseVersion3;
            }
            set shouldUseVersion3(value: boolean) {
                this._shouldUseVersion3 = value;
            }

            private _memberInfo: Record<MeridianLinkFields, boolean>;
            get memberInfo(): Record<MeridianLinkFields, boolean> {
                return this._memberInfo;
            }
            set memberInfo(value: Record<MeridianLinkFields, boolean>) {
                this._memberInfo = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MeridianLinkSsoSettings.ShouldUseMemberNumber", value: this._shouldUseMemberNumber, dataType: 'boolean', label: "Should Use Member Number" },
                { key: "MeridianLinkSsoSettings.ShouldSendMemberInfo", value: this._shouldSendMemberInfo, dataType: 'boolean', label: "Should Send Member Info" },
                { key: "MeridianLinkSsoSettings.ShouldUseVersion3", value: this._shouldUseVersion3, dataType: 'boolean', label: "Should Use Version3" },
                { key: "MeridianLinkSsoSettings.MemberInfo", value: this._memberInfo, dataType: 'record<meridianlinkfields, boolean>', label: "Member Info" },
            ];
        }

}