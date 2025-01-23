import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EnrollmentConfig {
    ShouldUseDefaultPhoneNumber: boolean;
}

export class Enrollment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Enrollment'
    };


            private _shouldUseDefaultPhoneNumber: boolean;
            get shouldUseDefaultPhoneNumber(): boolean {
                return this._shouldUseDefaultPhoneNumber;
            }
            set shouldUseDefaultPhoneNumber(value: boolean) {
                this._shouldUseDefaultPhoneNumber = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Enrollment.ShouldUseDefaultPhoneNumber", value: this._shouldUseDefaultPhoneNumber, dataType: 'boolean', label: "Should Use Default Phone Number" },
            ];
        }

}