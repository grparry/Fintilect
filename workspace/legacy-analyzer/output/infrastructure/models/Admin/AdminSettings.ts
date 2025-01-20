// Generated imports
import { AdminAccountSettings } from './AdminAccountSettings';
import { Enrollment } from '../Enrollment';
import { MemberSettings } from '../MemberSettings';
import { DeviceSettings } from '../DeviceSettings';
import { MfaSettings } from '../MfaSettings';
import { AuditLogs } from '../AuditLogs';
import { SmsSettings } from '../SmsSettings';
import { MemberView } from '../MemberView';
import { TransferSettings } from '../TransferSettings';

export interface AdminSettings {
    /** @settingKey X.App.HomeBanking.AdminPasswordExpires */
    doesAdminPasswordExpire: boolean;
    adminAccountSettings: AdminAccountSettings;
    enrollment: Enrollment;
    memberSettings: MemberSettings;
    deviceSettings: DeviceSettings;
    mfaSettings: MfaSettings;
    auditLogs: AuditLogs;
    smsSettings: SmsSettings;
    memberView: MemberView;
    transferSettings: TransferSettings;
}
