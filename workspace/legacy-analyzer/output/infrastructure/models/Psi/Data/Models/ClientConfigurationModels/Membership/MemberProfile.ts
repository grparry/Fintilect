import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MemberProfileConfig {
    Enabled: boolean;
    UsPhoneRegex: string;
    ShouldGetBeneficiaryFields: boolean;
    ShouldHideAddressLineThree: boolean;
}

export class MemberProfile implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MemberProfile'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _usPhoneRegex: string;
            get usPhoneRegex(): string {
                return this._usPhoneRegex;
            }
            set usPhoneRegex(value: string) {
                this._usPhoneRegex = value;
            }

            private _shouldGetBeneficiaryFields: boolean;
            get shouldGetBeneficiaryFields(): boolean {
                return this._shouldGetBeneficiaryFields;
            }
            set shouldGetBeneficiaryFields(value: boolean) {
                this._shouldGetBeneficiaryFields = value;
            }

            private _shouldHideAddressLineThree: boolean;
            get shouldHideAddressLineThree(): boolean {
                return this._shouldHideAddressLineThree;
            }
            set shouldHideAddressLineThree(value: boolean) {
                this._shouldHideAddressLineThree = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MemberProfile.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MemberProfile.UsPhoneRegex", value: this._usPhoneRegex, dataType: 'string', label: "Us Phone Regex" },
                { key: "MemberProfile.ShouldGetBeneficiaryFields", value: this._shouldGetBeneficiaryFields, dataType: 'boolean', label: "Should Get Beneficiary Fields" },
                { key: "MemberProfile.ShouldHideAddressLineThree", value: this._shouldHideAddressLineThree, dataType: 'boolean', label: "Should Hide Address Line Three" },
            ];
        }

}