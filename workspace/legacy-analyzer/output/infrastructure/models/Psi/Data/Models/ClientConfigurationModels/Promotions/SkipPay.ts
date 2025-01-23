import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SkipPayConfig {
    ShouldGetQualifiedLoansFromPermissions: boolean;
    ShouldClearSkipPayQualifyPermissionAfterSuccess: boolean;
}

export class SkipPay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SkipPay'
    };


            private _shouldGetQualifiedLoansFromPermissions: boolean;
            get shouldGetQualifiedLoansFromPermissions(): boolean {
                return this._shouldGetQualifiedLoansFromPermissions;
            }
            set shouldGetQualifiedLoansFromPermissions(value: boolean) {
                this._shouldGetQualifiedLoansFromPermissions = value;
            }

            private _shouldClearSkipPayQualifyPermissionAfterSuccess: boolean;
            get shouldClearSkipPayQualifyPermissionAfterSuccess(): boolean {
                return this._shouldClearSkipPayQualifyPermissionAfterSuccess;
            }
            set shouldClearSkipPayQualifyPermissionAfterSuccess(value: boolean) {
                this._shouldClearSkipPayQualifyPermissionAfterSuccess = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SkipPay.ShouldGetQualifiedLoansFromPermissions", value: this._shouldGetQualifiedLoansFromPermissions, dataType: 'boolean', label: "Should Get Qualified Loans From Permissions" },
                { key: "SkipPay.ShouldClearSkipPayQualifyPermissionAfterSuccess", value: this._shouldClearSkipPayQualifyPermissionAfterSuccess, dataType: 'boolean', label: "Should Clear Skip Pay Qualify Permission After Success" },
            ];
        }

}