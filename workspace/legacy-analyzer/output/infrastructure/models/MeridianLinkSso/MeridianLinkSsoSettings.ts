// Generated imports
import { MemberInfo } from '../MemberInfo';

export interface MeridianLinkSsoSettings {
    /** @settingKey MeridianLinkSso.ShouldUseMemberNumber */
    shouldUseMemberNumber: boolean;
    /** @settingKey MeridianLinkSso.SendMemberInfoEnabled */
    shouldSendMemberInfo: boolean;
    /** @settingKey MeridianLinkSso.Version3.Enabled */
    shouldUseVersion3: boolean;
    /** @settingKey MeridianLinkSso.SendMemberInfo.FieldsToSend */
    dictionary: MemberInfo;
}
