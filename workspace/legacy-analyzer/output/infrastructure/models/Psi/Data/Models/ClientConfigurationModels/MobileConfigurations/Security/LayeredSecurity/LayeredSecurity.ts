import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LayeredSecurityConfig {
    DeleteOnlyInvalidTokens: boolean;
    DisableQuickAccessOnFailedPasswordLogin: boolean;
    MemberCanSkipToFallbackMethod: boolean;
}

export class LayeredSecurity implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LayeredSecurity'
    };


            private _deleteOnlyInvalidTokens: boolean;
            get deleteOnlyInvalidTokens(): boolean {
                return this._deleteOnlyInvalidTokens;
            }
            set deleteOnlyInvalidTokens(value: boolean) {
                this._deleteOnlyInvalidTokens = value;
            }

            private _disableQuickAccessOnFailedPasswordLogin: boolean;
            get disableQuickAccessOnFailedPasswordLogin(): boolean {
                return this._disableQuickAccessOnFailedPasswordLogin;
            }
            set disableQuickAccessOnFailedPasswordLogin(value: boolean) {
                this._disableQuickAccessOnFailedPasswordLogin = value;
            }

            private _memberCanSkipToFallbackMethod: boolean;
            get memberCanSkipToFallbackMethod(): boolean {
                return this._memberCanSkipToFallbackMethod;
            }
            set memberCanSkipToFallbackMethod(value: boolean) {
                this._memberCanSkipToFallbackMethod = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LayeredSecurity.DeleteOnlyInvalidTokens", value: this._deleteOnlyInvalidTokens, dataType: 'boolean', label: "Delete Only Invalid Tokens" },
                { key: "LayeredSecurity.DisableQuickAccessOnFailedPasswordLogin", value: this._disableQuickAccessOnFailedPasswordLogin, dataType: 'boolean', label: "Disable Quick Access On Failed Password Login" },
                { key: "LayeredSecurity.MemberCanSkipToFallbackMethod", value: this._memberCanSkipToFallbackMethod, dataType: 'boolean', label: "Member Can Skip To Fallback Method" },
            ];
        }

}