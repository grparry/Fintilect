import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AdminAccountSettings } from './AdminAccountSettings';
import { Enrollment } from './Enrollment';
import { MemberSettings } from './MemberSettings';
import { DeviceSettings } from './DeviceSettings';
import { MfaSettings } from './MfaSettings';
import { AuditLogs } from './AuditLogs';
import { SmsSettings } from './SmsSettings';
import { MemberView } from './MemberView';
import { TransferSettings } from './TransferSettings';
export interface AdminSettingsConfig {
    DoesAdminPasswordExpire: boolean;
    Account: AdminAccountSettings;
    Enrollment: Enrollment;
    Member: MemberSettings;
    Device: DeviceSettings;
    Mfa: MfaSettings;
    AuditLogs: AuditLogs;
    SmsSettings: SmsSettings;
    MemberView: MemberView;
    Transfer: TransferSettings;
}

export class AdminSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AdminSettings'
    };


            private _doesAdminPasswordExpire: boolean;
            get doesAdminPasswordExpire(): boolean {
                return this._doesAdminPasswordExpire;
            }
            set doesAdminPasswordExpire(value: boolean) {
                this._doesAdminPasswordExpire = value;
            }

            private _account: AdminAccountSettings;
            get account(): AdminAccountSettings {
                return this._account;
            }
            set account(value: AdminAccountSettings) {
                this._account = value;
            }

            private _enrollment: Enrollment;
            get enrollment(): Enrollment {
                return this._enrollment;
            }
            set enrollment(value: Enrollment) {
                this._enrollment = value;
            }

            private _member: MemberSettings;
            get member(): MemberSettings {
                return this._member;
            }
            set member(value: MemberSettings) {
                this._member = value;
            }

            private _device: DeviceSettings;
            get device(): DeviceSettings {
                return this._device;
            }
            set device(value: DeviceSettings) {
                this._device = value;
            }

            private _mfa: MfaSettings;
            get mfa(): MfaSettings {
                return this._mfa;
            }
            set mfa(value: MfaSettings) {
                this._mfa = value;
            }

            private _auditLogs: AuditLogs;
            get auditLogs(): AuditLogs {
                return this._auditLogs;
            }
            set auditLogs(value: AuditLogs) {
                this._auditLogs = value;
            }

            private _smsSettings: SmsSettings;
            get smsSettings(): SmsSettings {
                return this._smsSettings;
            }
            set smsSettings(value: SmsSettings) {
                this._smsSettings = value;
            }

            private _memberView: MemberView;
            get memberView(): MemberView {
                return this._memberView;
            }
            set memberView(value: MemberView) {
                this._memberView = value;
            }

            private _transfer: TransferSettings;
            get transfer(): TransferSettings {
                return this._transfer;
            }
            set transfer(value: TransferSettings) {
                this._transfer = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AdminSettings.DoesAdminPasswordExpire", value: this._doesAdminPasswordExpire, dataType: 'boolean', label: "Does Admin Password Expire" },
                { key: "AdminSettings.Account", value: this._account, dataType: 'adminaccountsettings', label: "Account" },
                { key: "AdminSettings.Enrollment", value: this._enrollment, dataType: 'enrollment', label: "Enrollment" },
                { key: "AdminSettings.Member", value: this._member, dataType: 'membersettings', label: "Member" },
                { key: "AdminSettings.Device", value: this._device, dataType: 'devicesettings', label: "Device" },
                { key: "AdminSettings.Mfa", value: this._mfa, dataType: 'mfasettings', label: "Mfa" },
                { key: "AdminSettings.AuditLogs", value: this._auditLogs, dataType: 'auditlogs', label: "Audit Logs" },
                { key: "AdminSettings.SmsSettings", value: this._smsSettings, dataType: 'smssettings', label: "Sms Settings" },
                { key: "AdminSettings.MemberView", value: this._memberView, dataType: 'memberview', label: "Member View" },
                { key: "AdminSettings.Transfer", value: this._transfer, dataType: 'transfersettings', label: "Transfer" },
            ];
        }

}