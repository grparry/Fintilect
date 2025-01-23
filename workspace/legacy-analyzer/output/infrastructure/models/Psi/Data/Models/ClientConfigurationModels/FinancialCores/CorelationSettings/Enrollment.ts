import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EnrollmentConfig {
    AllowEnrollmentWithMailingAddress: boolean;
}

export class Enrollment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Enrollment'
    };


            private _allowEnrollmentWithMailingAddress: boolean;
            get allowEnrollmentWithMailingAddress(): boolean {
                return this._allowEnrollmentWithMailingAddress;
            }
            set allowEnrollmentWithMailingAddress(value: boolean) {
                this._allowEnrollmentWithMailingAddress = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Enrollment.AllowEnrollmentWithMailingAddress", value: this._allowEnrollmentWithMailingAddress, dataType: 'boolean', label: "Allow Enrollment With Mailing Address" },
            ];
        }

}