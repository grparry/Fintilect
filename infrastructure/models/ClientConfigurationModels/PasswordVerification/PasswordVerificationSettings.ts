import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PasswordVerificationSettingsConfig {
    PasswordResetCannotContainSSNumber: boolean;
}

export class PasswordVerificationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PasswordVerificationSettings'
    };


            private _passwordResetCannotContainSSNumber: boolean;
            get passwordResetCannotContainSSNumber(): boolean {
                return this._passwordResetCannotContainSSNumber;
            }
            set passwordResetCannotContainSSNumber(value: boolean) {
                this._passwordResetCannotContainSSNumber = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PasswordVerificationSettings.PasswordResetCannotContainSSNumber", value: this._passwordResetCannotContainSSNumber, dataType: 'boolean', label: "Password Reset Cannot Contain S S Number" },
            ];
        }

}