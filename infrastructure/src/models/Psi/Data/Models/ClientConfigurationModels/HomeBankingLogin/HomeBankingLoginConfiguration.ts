import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface HomeBankingLoginConfigurationConfig {
    UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount: boolean;
    UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount: boolean;
    MimeTypeRegex: string;
    ReorderCaptchaTabOrder: boolean;
    RemoveLeadingZerosFromUid: boolean;
    ShouldNewUserLinkNavigateToNewUserForm: boolean;
    IpWhitelistEnabled: boolean;
    IpWhitelist: string[];
}

export class HomeBankingLoginConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'HomeBankingLoginConfiguration'
    };


            private _usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount: boolean;
            get usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount(): boolean {
                return this._usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount;
            }
            set usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount(value: boolean) {
                this._usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount = value;
            }

            private _usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount: boolean;
            get usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount(): boolean {
                return this._usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount;
            }
            set usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount(value: boolean) {
                this._usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount = value;
            }

            private _mimeTypeRegex: string;
            get mimeTypeRegex(): string {
                return this._mimeTypeRegex;
            }
            set mimeTypeRegex(value: string) {
                this._mimeTypeRegex = value;
            }

            private _reorderCaptchaTabOrder: boolean;
            get reorderCaptchaTabOrder(): boolean {
                return this._reorderCaptchaTabOrder;
            }
            set reorderCaptchaTabOrder(value: boolean) {
                this._reorderCaptchaTabOrder = value;
            }

            private _removeLeadingZerosFromUid: boolean;
            get removeLeadingZerosFromUid(): boolean {
                return this._removeLeadingZerosFromUid;
            }
            set removeLeadingZerosFromUid(value: boolean) {
                this._removeLeadingZerosFromUid = value;
            }

            private _shouldNewUserLinkNavigateToNewUserForm: boolean;
            get shouldNewUserLinkNavigateToNewUserForm(): boolean {
                return this._shouldNewUserLinkNavigateToNewUserForm;
            }
            set shouldNewUserLinkNavigateToNewUserForm(value: boolean) {
                this._shouldNewUserLinkNavigateToNewUserForm = value;
            }

            private _ipWhitelistEnabled: boolean;
            get ipWhitelistEnabled(): boolean {
                return this._ipWhitelistEnabled;
            }
            set ipWhitelistEnabled(value: boolean) {
                this._ipWhitelistEnabled = value;
            }

            private _ipWhitelist: string[];
            get ipWhitelist(): string[] {
                return this._ipWhitelist;
            }
            set ipWhitelist(value: string[]) {
                this._ipWhitelist = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "HomeBankingLoginConfiguration.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount", value: this._usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount, dataType: 'boolean', label: "Users Can Log In With Any Last4 Tax Id Associated With Member Account" },
                { key: "HomeBankingLoginConfiguration.UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount", value: this._usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount, dataType: 'boolean', label: "Users Can Enroll With Any Personal Information Associated With Member Account" },
                { key: "HomeBankingLoginConfiguration.MimeTypeRegex", value: this._mimeTypeRegex, dataType: 'string', label: "Mime Type Regex" },
                { key: "HomeBankingLoginConfiguration.ReorderCaptchaTabOrder", value: this._reorderCaptchaTabOrder, dataType: 'boolean', label: "Reorder Captcha Tab Order" },
                { key: "HomeBankingLoginConfiguration.RemoveLeadingZerosFromUid", value: this._removeLeadingZerosFromUid, dataType: 'boolean', label: "Remove Leading Zeros From Uid" },
                { key: "HomeBankingLoginConfiguration.ShouldNewUserLinkNavigateToNewUserForm", value: this._shouldNewUserLinkNavigateToNewUserForm, dataType: 'boolean', label: "Should New User Link Navigate To New User Form" },
                { key: "HomeBankingLoginConfiguration.IpWhitelistEnabled", value: this._ipWhitelistEnabled, dataType: 'boolean', label: "Ip Whitelist Enabled" },
                { key: "HomeBankingLoginConfiguration.IpWhitelist", value: this._ipWhitelist, dataType: 'list<string>', label: "Ip Whitelist" },
            ];
        }

}