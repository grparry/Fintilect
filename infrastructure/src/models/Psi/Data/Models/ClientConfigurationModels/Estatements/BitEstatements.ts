import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BitEstatementsConfig {
    ShouldUseFirstStatementAccountForEnrollment: boolean;
}

export class BitEstatements implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BitEstatements'
    };


            private _shouldUseFirstStatementAccountForEnrollment: boolean;
            get shouldUseFirstStatementAccountForEnrollment(): boolean {
                return this._shouldUseFirstStatementAccountForEnrollment;
            }
            set shouldUseFirstStatementAccountForEnrollment(value: boolean) {
                this._shouldUseFirstStatementAccountForEnrollment = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BitEstatements.ShouldUseFirstStatementAccountForEnrollment", value: this._shouldUseFirstStatementAccountForEnrollment, dataType: 'boolean', label: "Should Use First Statement Account For Enrollment" },
            ];
        }

}