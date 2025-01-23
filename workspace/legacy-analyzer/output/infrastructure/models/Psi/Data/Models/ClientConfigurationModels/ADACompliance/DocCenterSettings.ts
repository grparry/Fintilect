import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DocCenterSettingsConfig {
    SSOFromAdminEnabled: boolean;
    SSOFromAdminDocCenterLanding: string;
    MemberViewIsEnabled: boolean;
    MemberViewUrl: string;
    OlbSsoId: string;
    OlbSsoPassword: string;
    ApiUrl: string;
}

export class DocCenterSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DocCenterSettings'
    };


            private _sSOFromAdminEnabled: boolean;
            get sSOFromAdminEnabled(): boolean {
                return this._sSOFromAdminEnabled;
            }
            set sSOFromAdminEnabled(value: boolean) {
                this._sSOFromAdminEnabled = value;
            }

            private _sSOFromAdminDocCenterLanding: string;
            get sSOFromAdminDocCenterLanding(): string {
                return this._sSOFromAdminDocCenterLanding;
            }
            set sSOFromAdminDocCenterLanding(value: string) {
                this._sSOFromAdminDocCenterLanding = value;
            }

            private _memberViewIsEnabled: boolean;
            get memberViewIsEnabled(): boolean {
                return this._memberViewIsEnabled;
            }
            set memberViewIsEnabled(value: boolean) {
                this._memberViewIsEnabled = value;
            }

            private _memberViewUrl: string;
            get memberViewUrl(): string {
                return this._memberViewUrl;
            }
            set memberViewUrl(value: string) {
                this._memberViewUrl = value;
            }

            private _olbSsoId: string;
            get olbSsoId(): string {
                return this._olbSsoId;
            }
            set olbSsoId(value: string) {
                this._olbSsoId = value;
            }

            private _olbSsoPassword: string;
            get olbSsoPassword(): string {
                return this._olbSsoPassword;
            }
            set olbSsoPassword(value: string) {
                this._olbSsoPassword = value;
            }

            private _apiUrl: string;
            get apiUrl(): string {
                return this._apiUrl;
            }
            set apiUrl(value: string) {
                this._apiUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DocCenterSettings.SSOFromAdminEnabled", value: this._sSOFromAdminEnabled, dataType: 'boolean', label: "S S O From Admin Enabled" },
                { key: "DocCenterSettings.SSOFromAdminDocCenterLanding", value: this._sSOFromAdminDocCenterLanding, dataType: 'string', label: "S S O From Admin Doc Center Landing" },
                { key: "DocCenterSettings.MemberViewIsEnabled", value: this._memberViewIsEnabled, dataType: 'boolean', label: "Member View Is Enabled" },
                { key: "DocCenterSettings.MemberViewUrl", value: this._memberViewUrl, dataType: 'string', label: "Member View Url" },
                { key: "DocCenterSettings.OlbSsoId", value: this._olbSsoId, dataType: 'string', label: "Olb Sso Id" },
                { key: "DocCenterSettings.OlbSsoPassword", value: this._olbSsoPassword, dataType: 'string', label: "Olb Sso Password" },
                { key: "DocCenterSettings.ApiUrl", value: this._apiUrl, dataType: 'string', label: "Api Url" },
            ];
        }

}