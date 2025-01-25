import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AuditLoggingFeatureConfig {
    ShouldShowReasonFlagsOnLoginFailure: boolean;
    RestrictedFlagsForAuditLoggingDuringLogin: string;
}

export class AuditLoggingFeature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AuditLoggingFeature'
    };


            private _shouldShowReasonFlagsOnLoginFailure: boolean;
            get shouldShowReasonFlagsOnLoginFailure(): boolean {
                return this._shouldShowReasonFlagsOnLoginFailure;
            }
            set shouldShowReasonFlagsOnLoginFailure(value: boolean) {
                this._shouldShowReasonFlagsOnLoginFailure = value;
            }

            private _restrictedFlagsForAuditLoggingDuringLogin: string;
            get restrictedFlagsForAuditLoggingDuringLogin(): string {
                return this._restrictedFlagsForAuditLoggingDuringLogin;
            }
            set restrictedFlagsForAuditLoggingDuringLogin(value: string) {
                this._restrictedFlagsForAuditLoggingDuringLogin = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AuditLoggingFeature.ShouldShowReasonFlagsOnLoginFailure", value: this._shouldShowReasonFlagsOnLoginFailure, dataType: 'boolean', label: "Should Show Reason Flags On Login Failure" },
                { key: "AuditLoggingFeature.RestrictedFlagsForAuditLoggingDuringLogin", value: this._restrictedFlagsForAuditLoggingDuringLogin, dataType: 'string', label: "Restricted Flags For Audit Logging During Login" },
            ];
        }

}