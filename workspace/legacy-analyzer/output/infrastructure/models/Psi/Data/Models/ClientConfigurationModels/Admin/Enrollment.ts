import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EnrollmentConfig {
    ShouldRequirePasswordChange: boolean;
}

export class Enrollment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Enrollment'
    };


            private _shouldRequirePasswordChange: boolean;
            get shouldRequirePasswordChange(): boolean {
                return this._shouldRequirePasswordChange;
            }
            set shouldRequirePasswordChange(value: boolean) {
                this._shouldRequirePasswordChange = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Enrollment.ShouldRequirePasswordChange", value: this._shouldRequirePasswordChange, dataType: 'boolean', label: "Should Require Password Change" },
            ];
        }

}