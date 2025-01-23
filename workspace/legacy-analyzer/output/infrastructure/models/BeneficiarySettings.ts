import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BeneficiarySettingsConfig {
    ShouldRequireBirthday: boolean;
    ShouldValidateBirthdayFields: boolean;
}

export class BeneficiarySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BeneficiarySettings'
    };


            private _shouldRequireBirthday: boolean;
            get shouldRequireBirthday(): boolean {
                return this._shouldRequireBirthday;
            }
            set shouldRequireBirthday(value: boolean) {
                this._shouldRequireBirthday = value;
            }

            private _shouldValidateBirthdayFields: boolean;
            get shouldValidateBirthdayFields(): boolean {
                return this._shouldValidateBirthdayFields;
            }
            set shouldValidateBirthdayFields(value: boolean) {
                this._shouldValidateBirthdayFields = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BeneficiarySettings.ShouldRequireBirthday", value: this._shouldRequireBirthday, dataType: 'boolean', label: "Should Require Birthday" },
                { key: "BeneficiarySettings.ShouldValidateBirthdayFields", value: this._shouldValidateBirthdayFields, dataType: 'boolean', label: "Should Validate Birthday Fields" },
            ];
        }

}